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
			if (!accessToken) return [];

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
				console.error('Error fetching album tracks:', err);
				setAlbumTracks([]);
			}
		};

		fetchAlbumTracks();
	}, [albumId]);

	const getSpotifyAccessToken = async () => {
		const clientId = '325d5315e18f43babf07b10821909d17';
		const clientSecret = 'fd823945d8a04cd7b0bbf1e22570e8b5';

		const authHeader = {
			headers: {
				'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		const data = new URLSearchParams({
			grant_type: 'client_credentials',
		});

		try {
			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: authHeader.headers,
				body: data,
			});

			const result = await response.json();
			return result.access_token;
		} catch (err) {
			console.error('Error getting access token:', err);
			return null;
		}
	};

	const playTrack = (trackUrl: string, track: Track) => {
		if (audioPlayer) {
			audioPlayer.pause();
		}

		const player = new Audio(trackUrl);
		setAudioPlayer(player);
		setCurrentTrack(track);
		player.volume = volume[0];
		player.play();
		setIsPlaying(true);
		setDuration(player.duration || 0);

		player.ontimeupdate = () => {
			setProgress([(player.currentTime / player.duration) * 100]);
		};

		player.onended = () => {
			setIsPlaying(false);
			setProgress([0]);
		};
	};

	const pauseTrack = () => {
		if (audioPlayer) {
			audioPlayer.pause();
			setIsPlaying(false);
		}
	};

	const resumeTrack = () => {
		if (audioPlayer) {
			audioPlayer.play();
			setIsPlaying(true);
		}
	};

	const handleVolumeChange = (newVolume: number[]) => {
		setVolume(newVolume);
		if (audioPlayer) {
			audioPlayer.volume = newVolume[0];
		}
	};

	const handleProgressChange = (newProgress: number[]) => {
		if (audioPlayer) {
			const newTime = (newProgress[0] / 100) * audioPlayer.duration;
			audioPlayer.currentTime = newTime;
		}
	};

	const formatTime = (seconds: number) => {
		if (isNaN(seconds) || seconds === Infinity) {
			return '0:00';
		}
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
	};

	return (
		<div className="bg-background text-foreground min-h-screen">
			<Navbar />
			<div className="container mx-auto px-4 py-8 mt-20">
				<Card>
					<CardHeader>
						<CardTitle className="text-3xl font-bold">Playlist</CardTitle>
					</CardHeader>
					<CardContent>
						{currentTrack && (
							<div className="mt-8 space-y-4 mb-6">
								<div>
									<label className="block text-sm font-medium text-muted-foreground mb-2">
										Volume
									</label>
									<Slider
										value={volume}
										onValueChange={handleVolumeChange}
										max={1}
										step={0.01}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-muted-foreground mb-2">
										Progress
									</label>
									<div className="flex items-center space-x-4">
										<Slider
											value={progress}
											onValueChange={handleProgressChange}
											max={100}
										/>
										<div className="text-sm text-muted-foreground">
											{formatTime(audioPlayer?.currentTime || 0)} / {formatTime(duration)}
										</div>
									</div>
								</div>

								<div className="flex justify-center">
									{isPlaying ? (
										<Button onClick={pauseTrack} variant="destructive">
											<PauseIcon className="mr-2" /> Pause
										</Button>
									) : (
										<Button onClick={resumeTrack}>
											<PlayIcon className="mr-2" /> Resume
										</Button>
									)}
								</div>
							</div>
						)}
						<div className="space-y-4">
							{albumTracks.length > 0 ? (
								albumTracks.map((track, index) => (
									<div
										key={index}
										className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent transition-colors"
									>
										<div>
											<h3 className="text-lg font-semibold">{track.name}</h3>
											<p className="text-muted-foreground">
												{track.artists[0].name}
											</p>
										</div>
										<Button
											variant="outline"
											onClick={() => playTrack(track.preview_url, track)}
										>
											<PlayIcon className="mr-2" />
											<p>Play</p>
										</Button>
									</div>
								))
							) : (
								<p className="text-muted-foreground">Loading album tracks...</p>
							)}
						</div>

					</CardContent>
				</Card>
			</div>
		</div>
	);
}
