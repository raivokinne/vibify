import { useState } from "react";

export default function HomePage() {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 h-screen overflow-hidden relative text-white">
      <nav className="border-b border-gray-700 bg-black/60 backdrop-blur-lg">
        <div className="container mx-auto px-6 flex items-center justify-between py-4">
          <img
            className="w-14 md:w-auto"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg"
            alt="logo"
          />
          <div>
            <button
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
              className="md:hidden text-gray-300 hover:text-gray-100 focus:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <svg
                aria-haspopup="true"
                aria-label="open Main Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu"
                width={28}
                height={28}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={4} y1={8} x2={20} y2={8} />
                <line x1={4} y1={16} x2={20} y2={16} />
              </svg>
            </button>
            <div
              id="mainMenu"
              className={`md:block lg:block ${isMainMenuOpen ? "" : "hidden"}`}
            >
              <button
                onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
                className="md:hidden lg:hidden text-gray-300 hover:text-gray-100 focus:text-gray-100 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6"
              >
                <svg
                  aria-label="close main menu"
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
              <ul className="flex flex-col md:flex-row items-center md:space-x-8 text-lg text-gray-300 bg-gray-800 md:bg-transparent fixed inset-0 md:relative z-20 pt-20 md:pt-0 backdrop-blur-sm">
                {["Feature", "Marketplace", "Company", "Features", "Contact"].map((item, index) => (
                  <li key={index} className="hover:text-purple-400 cursor-pointer py-2 transition duration-150 ease-in-out transform hover:scale-110">
                    <a href="javascript: void(0)">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className="hidden md:block bg-purple-700/80 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition duration-150">
            <a href="/login">Sign In</a>
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center text-center">
        <div className="relative w-full text-center">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Vibify - Mūsu mājas lapa
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-300 max-w-3xl mx-auto mb-12">
              Mūsu mērķis ir izveidot WEB App, kas ļauj lietotājiem ievadīt savu emocionālo stāvokli un saņemt personalizētu Play-Listi, kas atbilst viņu emocijām.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-8 lg:px-16">
              <div className="bg-gray-700/30 backdrop-blur-md shadow-lg p-6 rounded-lg transition transform hover:scale-105 hover:bg-gray-700/40">
                <h2 className="text-3xl font-semibold text-gray-200 mb-4">Mūsu Mērķis</h2>
                <p className="text-gray-300">
                  Mūsu mērķis ir izveidot lietotājiem draudzīgu aplikāciju, kas ļauj pielāgot mūziku viņu noskaņojumam.
                </p>
              </div>
              <div className="bg-gray-700/30 backdrop-blur-md shadow-lg p-6 rounded-lg transition transform hover:scale-105 hover:bg-gray-700/40">
                <h2 className="text-3xl font-semibold text-gray-200 mb-4">Funkcionalitāte</h2>
                <p className="text-gray-300">
                  Lietotājs ievada savu emocionālo stāvokli, un aplikācija ģenerē atbilstošu Play-Listi, pieejamu uz dažādām platformām.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full bg-gradient-to-t from-gray-900 to-transparent text-gray-400 py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Vibify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
