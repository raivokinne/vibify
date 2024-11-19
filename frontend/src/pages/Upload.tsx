import { Navbar } from "@/components/Navbar";
import { UploadForm } from "@/components/UploadForm";

export default function Upload() {
  return (
    <>
      <Navbar />
      <div className="h-screen w-screen display flex justify-center items-center">
        <UploadForm />
      </div>
    </>
  );
}
