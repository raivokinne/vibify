import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { instance } from "@/lib/axios";
import { formSchema } from "@/data/schema";
import { useNavigate } from "react-router-dom";
import Camera from "./Camera";

export function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const formData = new FormData();
      values.files.forEach((file: File) => {
        formData.append("files", file);
      });

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === undefined) return 0;
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      const response = await instance.post("/api/upload", formData, {
        withCredentials: true,
      });

      clearInterval(interval);
      setUploadProgress(undefined);

      if (response.status === 200) {
        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${values.files.length} image${values.files.length > 1 ? "s" : ""}`,
        });
        navigate("/playlists");
      } else {
        toast({
          title: "Error",
          description: "Failed to analyze images. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to analyze images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full mt-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-4 m-4">
          <Camera />
        </div>
        <Card className="backdrop-blur-sm bg-white/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">Mood Analysis Upload</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload your photos to analyze the emotions captured within them
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 h-full w-full"
              >
                <FormField
                  control={form.control}
                  name="files"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Images</FormLabel>
                      <FormControl>
                        <FileUpload
                          onFileSelect={(files) => field.onChange(files)}
                          loading={loading}
                          progress={uploadProgress}
                        />
                      </FormControl>
                      <FormDescription>
                        Supported formats: JPEG, PNG, GIF (max 10MB per file)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Analyze Images
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
