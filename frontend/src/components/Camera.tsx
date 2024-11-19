import { FormEvent, useCallback, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";
import { instance } from "@/lib/axios";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Error",
        description: "Please capture an image first",
        variant: "destructive",
      });
      return;
    }

    setIsCapturing(true);

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("files", blob, "capture.jpg");

      const uploadResponse = await instance.post("/api/upload", formData, {
        withCredentials: true,
      });

      if (uploadResponse.status === 200) {
        toast({
          title: "Success",
          description: "Image uploaded and analyzed successfully",
        });
        setUrl(null);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload and analyze image",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setUrl(null)}
              disabled={!url || isCapturing}
            >
              Reset
            </Button>
            <Button type="button" onClick={capture} disabled={isCapturing}>
              Capture
            </Button>
            <Button type="submit" disabled={!url || isCapturing}>
              {isCapturing ? "Uploading..." : "Upload"}
            </Button>
          </div>

          {url && (
            <div className="mt-4 rounded-lg overflow-hidden border">
              <img src={url} alt="Captured" className="w-full h-auto" />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
