import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="fixed w-full top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
        <div className="relative flex items-center">
          <Link to="/">
            <img src="/logo.jpg" className="h-10 w-10 rounded-full" alt="" />
          </Link>
        </div>
        <div className="flex-grow"></div>
        <div className="hidden items-center justify-center gap-8 md:flex">
          <Link to="#" className="font-dm text-lg font-medium text-slate-700">
            Log in
          </Link>
          <Button>
            <Link to="#">Sign up</Link>
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
