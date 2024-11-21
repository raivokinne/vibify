import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { instance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cn } from "@/lib/utils";

type Track = {
  name: string;
  artist: string;
  url: string;
  imageUrl: string;
  albumId: string;
};

type Emotion = string;

export default function Playlists() {
  const [dominantEmotions, setDominantEmotions] = useState<{ emotion: string }[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    instance
      .get("/api/emotions", { withCredentials: true })
      .then((res) => {
        setDominantEmotions(res.data.emotions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching results:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedEmotion) {
      searchSpotifyTracks(selectedEmotion);
    }
  }, [selectedEmotion]);

  const getSpotifyAccessToken = async () => {
    const clientId = "325d5315e18f43babf07b10821909d17";
    const clientSecret = "fd823945d8a04cd7b0bbf1e22570e8b5";

    const authHeader = {
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const data = new URLSearchParams({
      grant_type: "client_credentials",
    });

    try {
      const response = await axios.post("https://accounts.spotify.com/api/token", data, authHeader);
      return response.data.access_token;
    } catch (err) {
      console.error("Error getting access token:", err);
      return null;
    }
  };

  const searchSpotifyTracks = async (emotion: Emotion) => {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) return;

    const url = `https://api.spotify.com/v1/search?q=${emotion}&type=track&limit=50`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const tracks = response.data.tracks.items.map((track: any) => ({
        name: track.name,
        artist: track.artists[0].name,
        url: track.external_urls.spotify,
        imageUrl: track.album.images[0]?.url,
        albumId: track.album.id,
      }));
      setTracks(tracks);
    } catch (err) {
      console.error("Error fetching tracks:", err);
      setTracks([]);
    }
  };

  const handleEmotionClick = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleTrackClick = (albumId: string) => {
    navigate(`/playlist/${albumId}`);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Emotions Playlists</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="animate-spin text-4xl" />
              </div>
            ) : dominantEmotions.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {dominantEmotions.map((emotionObj, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn("w-full text-center")}
                    onClick={() => handleEmotionClick(emotionObj.emotion)}
                  >
                    {emotionObj.emotion}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">No emotions available.</p>
            )}
          </CardContent>
        </Card>

        {selectedEmotion && (
          <Card>
            <CardHeader>
              <CardTitle className={cn("text-2xl")}>Recommended Tracks for "{selectedEmotion}"</CardTitle>
            </CardHeader>
            <CardContent>
              {tracks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {tracks.map((track, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={track.imageUrl}
                        alt={track.name}
                        className="w-32 h-32 rounded-lg object-cover mb-4"
                      />
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">{track.name}</h3>
                        <p className="text-muted-foreground">{track.artist}</p>
                      </div>
                      <Button
                        className={cn("mt-4")}
                        onClick={() => handleTrackClick(track.albumId)}
                      >
                        View Playlist
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center">No tracks found for this emotion.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

