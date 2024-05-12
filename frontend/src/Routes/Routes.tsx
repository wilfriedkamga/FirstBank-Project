import { createBrowserRouter } from "react-router-dom";
import Home from "../UserManagement/User/Pages/Home/Home";
import Authentification from "../UserManagement/User/Pages/Authentification/Authentification";
import TontineHomePage from "../UserManagement/User/Pages/TontineHomePage/TontineHomePage";
import Home2 from "../UserManagement/User/Pages/Home/Home2";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home2 />,
  },
  {
    path: "/",
    element: <Authentification />,
  },
  {
    path: "/tontine",
    element: <TontineHomePage />,
  }
]);
