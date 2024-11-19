import { cn } from "@/lib/utils";
import { Cloud, File, Loader2 } from "lucide-react";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "./progress";

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  loading?: boolean;
  onFileSelect: (files: File[]) => void;
  progress?: number;
  maxSize?: number;
}

export function FileUpload({
  className,
  loading = false,
  onFileSelect,
  progress,
  maxSize = 10485760, // 10MB
  ...props
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string>("");

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > maxSize,
      );
      if (oversizedFiles.length > 0) {
        setError(`Some files exceed the ${maxSize / 1048576}MB limit`);
        return;
      }
      setError("");
      setFiles(acceptedFiles);
      onFileSelect(acceptedFiles);
    },
    [maxSize, onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize,
  });

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        {...getRootProps()}
        className={cn(
          "relative rounded-lg border-2 border-dashed p-8 transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
          className,
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Cloud className="h-10 w-10 text-muted-foreground" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">
              {isDragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-xs text-muted-foreground">
              or click to select files
            </p>
          </div>
          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <File className="h-4 w-4 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)}KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {typeof progress === "number" && (
        <div className="mt-4 space-y-2">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground text-center">
            {progress}% uploaded
          </p>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
