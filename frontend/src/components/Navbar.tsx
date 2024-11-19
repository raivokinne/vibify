import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="fixed w-full top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl justify-between items-center gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
        <div className="relative flex items-center w-full">
          <Link to="/">
            <img src="/logo.jpg" className="h-10 w-10 rounded-full" alt="" />
          </Link>
        </div>
        <ul className="hidden w-full items-center justify-center gap-8 md:flex">
          <li className="font-dm text-lg font-medium text-slate-700">
            <Link to="/">Home</Link>
          </li>
          <li className="font-dm text-lg font-medium text-slate-700">
            <Link to="/upload">Upload</Link>
          </li>
          <li className="font-dm text-lg font-medium text-slate-700">
            <Link to="/playlists">Playlists</Link>
          </li>
        </ul>
        <div className="flex-grow"></div>
        <div className="hidden items-center w-full justify-center gap-8 md:flex">
          <Link
            to="/login"
            className="font-dm text-lg font-medium text-slate-700"
          >
            Log in
          </Link>
          <Button>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
        <div className="relative flex items-center justify-center md:hidden">
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-8 w-auto text-slate-900"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
