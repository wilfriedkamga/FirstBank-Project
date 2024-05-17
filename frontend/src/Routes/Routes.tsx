import { createBrowserRouter } from "react-router-dom";
import Authentification from "../UserManagement/User/Pages/Authentification/Authentification";
import TontineHomePage from "../UserManagement/User/Pages/TontineHomePage/TontineHomePage";
import Home2 from "../UserManagement/User/Pages/Home/Home2";
import Dashboard from "../UserManagement/User/Components/Elementary/Dashboard/Dashboard";
import MesTontines from "../UserManagement/User/Components/Elementary/MesTontines/MesTontines";

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
    children:[
      {
        path: "/tontine/",
        element: <Dashboard/>,
      },
      {
        path: "/tontine/mestontines",
        element: <MesTontines/>,
      },
      {
        path: "/tontine/mescotisations",
        element: <div>mes cotisations</div>,
      },
      {
        path: "/tontine/messanctions",
        element: <div>mes sanctions</div>,
      },
      {
        path: "/tontine/mesdettes",
        element: <div>mes dettes</div>,
      },
      {
        path: "/tontine/mestontines",
        element: <div>mes tontines</div>,
      },
    ]
  }
]);
