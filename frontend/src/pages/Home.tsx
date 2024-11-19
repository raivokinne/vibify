import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <Navbar />
      <div className="container mx-auto px-4 py-12">

        <section className="flex items-center justify-between h-screen bg-blue-200 p-8">
          <div className="w-1/2 text-left">
            <h1 className="text-6xl bg-gradient-to-r from-zinc-600 to-cyan-200 bg-clip-text text-transparent sm:text-7xl font-extrabold leading-tight mb-6">
              Vibify
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Our goal is to create a web app that allows users to input their emotional state and receive a personalized playlist that matches their emotions.
            </p>
            <a href="/upload" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition duration-200">
              Get Started
            </a>
          </div>
          <div className="w-1/2 h-full bg-cover bg-center bg-[url('./public/image3.png')]"></div>
        </section>

        <section className="flex items-center justify-between h-screen bg-green-200 p-8">
          <div className="w-1/2 h-full bg-cover bg-center bg-[url('./public/image3.png')]"></div>
          <div className="w-1/2 text-left px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">AI-Powered Mood Detection</h2>
            <p className="text-lg text-gray-600 mb-8">
              Vibify’s integration with AI technology allows the app to analyze facial expressions to determine a user’s emotional state and suggest a personalized Spotify playlist. Whether you're feeling upbeat, mellow, or introspective, Vibify tunes into your mood.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-between h-screen bg-red-200 p-8">
          <div className="w-1/2 text-left px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Emotion-Based Playlists</h2>
            <p className="text-lg text-gray-600 mb-8">
              By capturing emotions in real-time, Vibify matches your feelings with curated playlists tailored to suit your current mood. Just smile, frown, or let your expression be your guide, and let the music reflect what you feel.
            </p>
          </div>
          <div className="w-1/2 h-full bg-cover bg-center bg-[url('./public/image3.png')]"></div>
        </section>

        <section className="flex items-center justify-between h-screen bg-yellow-200">
          <div className="w-1/2 h-full bg-cover bg-center bg-[url('./public/image3.png')]"></div>
          <div className="w-1/2 text-left px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Seamless Spotify Integration</h2>
            <p className="text-lg text-gray-600 mb-8">
              Vibify is powered by Spotify’s vast library, bringing you an endless collection of songs that suit any mood or moment. The app leverages Spotify’s advanced APIs, ensuring smooth streaming and seamless transitions from one emotion to the next.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
