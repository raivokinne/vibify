import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { formSchema } from "@/data/schema";
import { instance } from "@/lib/axios";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Response } from "@/types";
import { Navbar } from "@/components/Navbar";

export function UploadForm() {
  const [data, setData] = useState<Response | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit, control } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.files && values.files.length > 0) {
        const formData = new FormData();
        Array.from(values.files).forEach((file: File) => {
          formData.append("files", file);
        });
        const response = await instance.post("/upload", formData);
        setData(response.data as Response);
      } else {
        console.log("No file selected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-md w-full mx-4 sm:mx-0">
          <h2 className="text-2xl font-bold mb-6">Upload Mood Playlist</h2>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium">
                      Select Files
                    </FormLabel>
                    <FormControl>
                      <Controller
                        name="files"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="file"
                            multiple
                            onChange={(e) => field.onChange(e.target.files)}
                            className="block w-full text-sm border-gray-300 rounded-md"
                          />
                        )}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Please select one or more files.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800"
              >
                Upload
              </Button>
            </form>
          </Form>
          {data && (
            <div className="mt-6">
              <h3 className="font-bold text-xl">Analysis Results:</h3>
              {data.faces[0].map((face: any, index: number) => (
                <div key={index} className="mt-4 bg-gray-100 p-4 rounded">
                  <p className="text-gray-800 font-medium">
                    Dominant Emotion: {face.dominant_emotion}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
