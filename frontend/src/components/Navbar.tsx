import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { instance } from "@/lib/axios";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const navigate = useNavigate(); // Izmanto `useNavigate`, lai veiktu pāradresēšanu uz citu lapu

  // Ielogotā lietotāja datu ielāde
  useEffect(() => {
    instance
      .get("/api/emotions", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          console.log("User Info:");
          console.log("User ID:", response.data.user.id);
          console.log("User Name:", response.data.user.name);
          console.log("User Email:", response.data.user.email);
          setUser({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
          });
        } else {
          console.log("User info not found in response data.");
          setUser(null);
        }

        if (response.data.emotions) {
          console.log("Emotions:");
          response.data.emotions.forEach((emotion: { emotion: string }) => {
            console.log(emotion.emotion);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching emotions:", error);
        if (error.response) {
          console.log("Error Response Info:");
          console.log("Status:", error.response.status);
          console.log("Data:", error.response.data);
        }
      });
  }, []);

  // Funkcija, lai izlogotos
  const handleLogout = () => {
    // Dzēst lietotāja sesijas datus (piemēram, izdzēst cookies)
    instance
      .post("/api/logout", {}, { withCredentials: true }) // Pieprasījums serverim, lai izdzēstu sesiju
      .then(() => {
        setUser(null); // Atiestatīt lietotāja stāvokli
        navigate("/login"); // Pāradresēt uz login lapu pēc iziešanas
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <header className="fixed w-full top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl justify-between items-center gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
        <div className="relative flex items-center w-full">
          <Link to="/">
            <img src="/logo.jpg" className="h-10 w-10 rounded-full" alt="Logo" />
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

        {/* Dynamiski rādam lietotāja info vai logina/ signup pogas */}
        <div className="hidden items-center w-full justify-center gap-8 md:flex">
          {user ? (
            <>
              <span className="font-dm text-lg font-medium text-slate-700">
                Welcome, {user.name}
              </span>
              {/* Logout pogas */}
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-dm text-lg font-medium text-slate-700">
                Log in
              </Link>
              <Button>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <div className="relative flex items-center justify-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-8 w-auto text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col items-center py-4 gap-4">
            <li className="font-dm text-lg font-medium text-slate-700">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="font-dm text-lg font-medium text-slate-700">
              <Link to="/upload" onClick={() => setMobileMenuOpen(false)}>
                Upload
              </Link>
            </li>
            <li className="font-dm text-lg font-medium text-slate-700">
              <Link to="/playlists" onClick={() => setMobileMenuOpen(false)}>
                Playlists
              </Link>
            </li>
            {user ? (
              <>
                <li className="font-dm text-lg font-medium text-slate-700">
                  <span>Welcome, {user.name}</span>
                </li>
                <Button onClick={handleLogout}>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Logout
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <li className="font-dm text-lg font-medium text-slate-700">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Log in
                  </Link>
                </li>
                <Button>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
