import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PauseIcon, PlayIcon } from "lucide-react";

interface Track {
	name: string;
	artists: { name: string }[];
	preview_url: string;
}

export default function Playlist() {
	const { albumId } = useParams<{ albumId: string }>();
	const [albumTracks, setAlbumTracks] = useState<Track[]>([]);
	const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState([1]);
	const [progress, setProgress] = useState([0]);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const fetchAlbumTracks = async () => {
			const accessToken = await getSpotifyAccessToken();
			if (!accessToken) return;

			const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;

			try {
				const response = await fetch(url, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const data = await response.json();
				setAlbumTracks(data.items);
			} catch (err) {
				console.error("Error fetching album tracks:", err);
			}
		};

		fetchAlbumTracks();
	}, [albumId]);

	const getSpotifyAccessToken = async () => {
		const clientId = "325d5315e18f43babf07b10821909d17";
		const clientSecret = "fd823945d8a04cd7b0bbf1e22570e8b5";

		try {
			const response = await fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({ grant_type: "client_credentials" }),
			});
			const result = await response.json();
			return result.access_token;
		} catch (err) {
			console.error("Error getting access token:", err);
			return null;
		}
	};

	const playTrack = (trackUrl: string, track: Track) => {
		if (audioPlayer) audioPlayer.pause();

		const player = new Audio(trackUrl);
		setAudioPlayer(player);
		setCurrentTrack(track);
		player.volume = volume[0];
		player.play();
		setIsPlaying(true);

		player.ontimeupdate = () => {
			setProgress([(player.currentTime / player.duration) * 100]);
		};

		player.onended = () => {
			setIsPlaying(false);
			setProgress([0]);
		};
	};

	const pauseTrack = () => {
		audioPlayer?.pause();
		setIsPlaying(false);
	};

	const resumeTrack = () => {
		audioPlayer?.play();
		setIsPlaying(true);
	};

	const handleVolumeChange = (newVolume: number[]) => {
		setVolume(newVolume);
		if (audioPlayer) audioPlayer.volume = newVolume[0];
	};

	const handleProgressChange = (newProgress: number[]) => {
		if (audioPlayer) audioPlayer.currentTime = (newProgress[0] / 100) * audioPlayer.duration;
	};

	const formatTime = (seconds: number) => {
		if (isNaN(seconds)) return "0:00";
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
	};

	return (
		<div className="bg-background text-foreground min-h-screen">
			<Navbar />
			<div className="container mx-auto px-4 py-8 mt-20">
				<Card>
					<CardHeader>
						<CardTitle className="text-3xl font-bold">Your Playlist</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-6">
							{currentTrack && (
								<div className="p-6 bg-secondary rounded-lg shadow">
									<h2 className="text-xl font-semibold">{currentTrack.name}</h2>
									<p className="text-sm text-muted-foreground">
										{currentTrack.artists[0]?.name}
									</p>

									<div className="mt-4">
										<Slider
											value={volume}
											onValueChange={handleVolumeChange}
											max={1}
											step={0.01}
										/>
									</div>

									<div className="flex items-center justify-between mt-4">
										{isPlaying ? (
											<Button onClick={pauseTrack} variant="destructive">
												<PauseIcon className="mr-2" /> Pause
											</Button>
										) : (
											<Button onClick={resumeTrack}>
												<PlayIcon className="mr-2" /> Resume
											</Button>
										)}
										<div>
											<span>
												{formatTime(audioPlayer?.currentTime || 0)} /{" "}
												{formatTime(duration)}
											</span>
										</div>
									</div>
								</div>
							)}

							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{albumTracks.map((track, index) => (
									<div
										key={index}
										className="p-4 border rounded-lg shadow-sm hover:shadow-md hover:bg-accent transition"
									>
										<h3 className="text-lg font-bold">{track.name}</h3>
										<p className="text-sm text-muted-foreground">
											{track.artists[0]?.name}
										</p>
										<Button
											variant="secondary"
											onClick={() => playTrack(track.preview_url, track)}
											className="mt-2"
										>
											<PlayIcon className="mr-2" /> Play
										</Button>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

