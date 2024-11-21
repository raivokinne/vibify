import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import Playlist from "./pages/Playlist";
import Playlists from "./pages/Playlists";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/playlist/:albumId",
    element: <Playlist />,
  },
  {
    path: "/playlists",
    element: <Playlists />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

]);

export default router;
