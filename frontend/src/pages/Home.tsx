import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex items-center h-screen justify-center text-center">
        <div className="container mx-auto text-center px-4 py-12">
          <h1 className="text-6xl bg-gradient-to-r from-zinc-600 to-cyan-200 bg-clip-text text-transparent sm:text-7xl font-extrabold leading-tight mb-6 text-black">
            Vibify
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Our goal is to create a web app that allows users to input their
            emotional state and receive a personalized playlist that matches
            their emotions.
          </p>
        </div>
      </main>
    </>
  );
}
