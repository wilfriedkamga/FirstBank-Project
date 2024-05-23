import { createBrowserRouter } from "react-router-dom";
import Authentification from "../UserManagement/User/Pages/Authentification/Authentification";
import TontineHomePage from "../UserManagement/User/Pages/TontineHomePage/TontineHomePage";
import Home2 from "../UserManagement/User/Pages/Home/Home2";
import Dashboard from "../UserManagement/User/Components/Elementary/Dashboard/Dashboard";
import MesTontines from "../UserManagement/User/Components/Elementary/MesTontines/MesTontines";
import ProtectedRoute from "./ProtectedRoutes";
import { MaTontine } from "../UserManagement/User/Components/Elementary/maTontine/MaTontine";
import BoardView from "../UserManagement/User/Components/Elementary/MesTontines/BoardView";
import TontineContent from "../UserManagement/User/Components/Elementary/maTontine/TontineContent";
import CaisseContent from "../UserManagement/User/Components/Elementary/Caisses/CaisseContent";
import MesCaisse from "../UserManagement/User/Components/Elementary/Caisses/MesCaisse";
import MaCaisse from "../UserManagement/User/Components/Elementary/Caisses/MaCaisse";
import UneCaisse from "../UserManagement/User/Components/Elementary/Caisses/UneCaisse";
import UneCaisseContent from "../UserManagement/User/Components/Elementary/Caisses/UneCaisseContent";
import Cotisation from "../UserManagement/User/Components/Elementary/Caisses/Cotisation";
import CotisationMembre from "../UserManagement/User/Components/Elementary/Caisses/CotisationMembre";
import MesCotisation from "../UserManagement/User/Components/Elementary/Dashboard/MesCotisation";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentification />,
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
  {
    element: <ProtectedRoute isAuthenticated={true} />,
    children: [
      {
        path: "/home",
        element: <Home2 />,
      },
      {
        path: "/tontine",
        element: <TontineHomePage />,
        children: [
          {
            path: "/tontine/",
            element: <Dashboard />,
          },
          {
            path: "/tontine/mestontines",
            element: <MesTontines />,
            children: [
              {
                path: "/tontine/mestontines/",
                element: <BoardView />,
              },
              {
                path: "/tontine/mestontines/:idTontine",
                element: <TontineContent />,
                children: [
                  {
                    path: "/tontine/mestontines/:idTontine/",
                    element: <MaTontine />,
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/caisses",
                    element: <CaisseContent/>,
                    children:[
                      {
                        path: "/tontine/mestontines/:idTontine/caisses/",
                        element: <MaCaisse/>,
                        children:[
                          {
                            path: "/tontine/mestontines/:idTontine/caisses/",
                            element: <MesCaisse/>,

                          },
                          {
                            path: "/tontine/mestontines/:idTontine/caisses/:idCaisse",
                            element: <CaisseContent/>,
                            children:[
                              { 
                                path: "/tontine/mestontines/:idTontine/caisses/:idCaisse",
                                element: <UneCaisseContent/>,
                                children:[
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/",
                                    element: <UneCaisse/>, 
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/parametres",
                                    element: <div>parametres de la caisse</div>, 
                                  }
                                  ,
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/cotisations",
                                    element: <Cotisation/>, 
                                  },
                                  
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/dettes",
                                    element: <div>les dettes de la caisse</div>, 
                                  }
                                  ,
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/sanctions",
                                    element: <div>les sanctions de la caisse</div>, 
                                  }
                                  ,
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/cagnotte",
                                    element: <div>Les cagnottes de la caisse</div>, 
                                  }
                                ]
                              }
                            ]

                          }
                        ]
                      }
                    ]
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/reunions",
                    element: <div> une reunion</div>,
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/evenements",
                    element: <div> les évènements</div>,
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/membres",
                    element: <div> les évènements</div>,
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/parametres",
                    element: <div> les évènements</div>,
                  },
                ],
              },
              {},
            ],
          },
          {
            path: "/tontine/mescotisations",
            element: <MesCotisation/>,
          },
          {
            path: "/tontine/messanctions",
            element: <div>mes sanctions</div>,
          },
          {
            path: "/tontine/mesdettes",
            element: <div>mes dettes</div>,
          },
        ],
      },
    ],
  },
]);
