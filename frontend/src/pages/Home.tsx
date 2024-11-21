import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <Navbar />
      <div className="container mx-auto px-4 py-12 space-y-2">

      <section className="relative flex h-fullflex-col md:flex-row items-center text-left py-16 bg-white shadow-lg rounded-lg">
        <div className="w-full md:w-1/2 px-6">
          <h1 className="text-6xl sm:text-7xl bg-gradient-to-r from-zinc-600 to-cyan-500 bg-clip-text text-transparent font-extrabold leading-tight mb-6">
            Vibify
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            Our goal is to create a web app that allows users to input their emotional state and receive a personalized playlist that matches their emotions.
          </p>
          <a href="/upload" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition duration-200">
            Get Started
          </a>
        </div>
      </section>

        <section className="relative flex flex-col md:flex-row items-center text-left py-16 bg-white shadow-lg rounded-lg">
          <div className="w-full md:w-1/2 h-64 bg-cover bg-center bg-[url('./public/image1.png')] rounded-lg shadow-lg mb-8 md:mb-0"></div>
          <div className="w-full md:w-1/2 px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">AI-Powered Mood Detection</h2>
            <p className="text-lg text-gray-700">
              Vibify’s integration with AI technology allows the app to analyze facial expressions to determine a user’s emotional state and suggest a personalized Spotify playlist. Whether you're feeling upbeat, mellow, or introspective, Vibify tunes into your mood.
            </p>
          </div>
        </section>

        <section className="relative flex flex-col md:flex-row items-center text-left py-16 bg-white shadow-lg rounded-lg">
          <div className="w-full md:w-1/2 px-6 order-last md:order-first">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Emotion-Based Playlists</h2>
            <p className="text-lg text-gray-700">
              By capturing emotions in real-time, Vibify matches your feelings with curated playlists tailored to suit your current mood. Just smile, frown, or let your expression be your guide, and let the music reflect what you feel.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-64 bg-cover bg-center bg-[url('./public/image4.png')] rounded-lg shadow-lg mb-8 md:mb-0"></div>
        </section>
        
        <section className="relative flex flex-col md:flex-row items-center text-left py-16 bg-white shadow-lg rounded-lg">
          <div className="w-full md:w-1/2 h-64 bg-cover bg-center bg-[url('./public/image3.png')] rounded-lg shadow-lg mb-8 md:mb-0"></div>
          <div className="w-full md:w-1/2 px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Seamless Spotify Integration</h2>
            <p className="text-lg text-gray-700">
              Vibify is powered by Spotify’s vast library, bringing you an endless collection of songs that suit any mood or moment. The app leverages Spotify’s advanced APIs, ensuring smooth streaming and seamless transitions from one emotion to the next.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
