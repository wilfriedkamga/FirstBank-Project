import { createBrowserRouter } from "react-router-dom";
import Authentification from "../UserManagement/User/Pages/Authentification/Authentification";
import TontineHomePage from "../UserManagement/User/Pages/TontineHomePage/TontineHomePage";
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
import MembresCaisseContent from "../UserManagement/User/Components/Elementary/Caisses/MembresCaisseContent";
import MembresTontine from "../UserManagement/User/Components/Elementary/MesTontines/MembresTontine";
import Portal from "../SavingManagement/pages/dashboard/Portal";
import ProfileSettings from "../SavingManagement/pages/ProfileSettings/ProfileSettings";
import Notifications from "../SavingManagement/pages/nootifications/Notifications";
import Search from "../SavingManagement/pages/search/Search";
import SavingsDash from "../SavingManagement/pages/savingsApp/dashboard/SavingsDash";
import CreatePlan from "../SavingManagement/pages/savingsApp/plan/CreatePlan";
import EditProfile from "../SavingManagement/pages/ProfileSettings/EditProfile";
import Settings from "../SavingManagement/pages/Settings/Settings";
import ModifyPassword from "../SavingManagement/pages/ProfileSettings/ModifyPassword";
import EmailVerification from "../SavingManagement/pages/ProfileSettings/EmailVerification";
import AddCNI from "../SavingManagement/pages/ProfileSettings/AddCNI";
import { ErrorElement } from "./ErrorElement";
import AddSignature from "../SavingManagement/pages/ProfileSettings/AddSignature";

const isKeyInLocalStorage = (key: string): boolean => {
  const token = localStorage.getItem(key);

  return token != null && token != "";
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentification />,
    errorElement:<ErrorElement/>
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
    errorElement:<ErrorElement/>
  },
  {
    element: <ProtectedRoute isAuthenticated={isKeyInLocalStorage("user")} />,

    children: [
      
      /***************** Les routes pour le module de tontine */
      {
        path: "/tontine",
        element: <TontineHomePage />,
        errorElement:<ErrorElement/>,
        children: [
          {
            path: "/tontine/",
            element: <Dashboard />,
            errorElement:<ErrorElement/>
          },
          {
            path: "/tontine/mestontines",
            element: <MesTontines />,
            errorElement:<ErrorElement/>,
            children: [
              {
                path: "/tontine/mestontines/",
                element: <BoardView />,
                errorElement:<ErrorElement/>,
              },
              {
                path: "/tontine/mestontines/:idTontine",
                element: <TontineContent />,
                errorElement:<ErrorElement/>,
                children: [
                  {
                    path: "/tontine/mestontines/:idTontine/",
                    element: <MaTontine />,
                    errorElement:<ErrorElement/>,
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/caisses",
                    element: <CaisseContent />,
                    errorElement:<ErrorElement/>,
                    children: [
                      {
                        path: "/tontine/mestontines/:idTontine/caisses/",
                        element: <MaCaisse />,
                        errorElement:<ErrorElement/>,
                        children: [
                          {
                            path: "/tontine/mestontines/:idTontine/caisses/",
                            element: <MesCaisse />,
                            errorElement:<ErrorElement/>,
                          },
                          {
                            path: "/tontine/mestontines/:idTontine/caisses/:idCaisse",
                            element: <CaisseContent />,
                            errorElement:<ErrorElement/>,
                            children: [
                              {
                                path: "/tontine/mestontines/:idTontine/caisses/:idCaisse",
                                element: <UneCaisseContent />,
                                errorElement:<ErrorElement/>,
                                children: [
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/",
                                    element: <UneCaisse />,
                                    errorElement:<ErrorElement/>,
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/parametres",
                                    element: <div>parametres de la caisse</div>,
                                    errorElement:<ErrorElement/>,
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/cotisations",
                                    element: <Cotisation />,
                                    errorElement:<ErrorElement/>,
                                  },

                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/dettes",
                                    element: <div>les dettes de la caisse</div>,
                                    errorElement:<ErrorElement/>,
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/sanctions",
                                    element: (<div>les sanctions de la caisse</div>),
                                    errorElement:<ErrorElement/>,
                                    
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/cagnotte",
                                    element: (<div>Les cagnottes de la caisse</div>),
                                    errorElement:<ErrorElement/>
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/caisses/:idCaisse/membre",
                                    element: <MembresCaisseContent />,
                                    errorElement:<ErrorElement/>
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/reunions",
                    element: <div> une reunion</div>,
                    errorElement:<ErrorElement/>
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/evenements",
                    element: <div> les évènements</div>,
                    errorElement:<ErrorElement/>
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/membres",
                    element: <MembresTontine />,
                    errorElement:<ErrorElement/>
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/parametres",
                    element: <div> les évènements</div>,
                    errorElement:<ErrorElement/>
                  },
                ],
              },
              {},
            ],
          },
          {
            path: "/tontine/mescotisations",
            element: <MesCotisation />,
            errorElement:<ErrorElement/>
          },
          {
            path: "/tontine/messanctions",
            element: <div>mes sanctions</div>,
            errorElement:<ErrorElement/>
          },
          {
            path: "/tontine/mesdettes",
            element: <div>mes dettes</div>,
            errorElement:<ErrorElement/>
          },
        ],
      },
      /***************** Les routes pour le module de Saving */
      {
        path:"/home",
        element:<Portal/>,
        errorElement:<ErrorElement/>
      },
      {
        path: "/settings",
        element: <Settings/>,
        errorElement:<ErrorElement/>
      },
      {
        path: "/profile",
        element:<ProfileSettings/>,
        errorElement:<ErrorElement/>
      },
      {
        path: "/notifications",
        element: <Notifications />,
        errorElement:<ErrorElement/>
      },
      {
        path: "/search",
        element: <Search />,
        errorElement:<ErrorElement/>
      },
      {
        path: "/savings",
        element: <SavingsDash />,
        errorElement:<ErrorElement/>
      },
      {
        path: "/newPlan",
        element: <CreatePlan />,
        errorElement:<ErrorElement/>
      },
      {
        path: "/profile/edit-profile",
        element: <EditProfile />,
        errorElement:<ErrorElement/>
      }
      ,
      {
        path: "/modify_password",
        element: <ModifyPassword />,
        errorElement:<ErrorElement/>
      }
      ,
      {
        path: "/verify_email",
        element: <EmailVerification />,
        errorElement:<ErrorElement/>
      },
      {
        path: "/signature",
        element: <AddSignature />,
        errorElement:<ErrorElement/>
      }
      ,
      {
        path: "/add_cni",
        element: <AddCNI />,
        errorElement:<ErrorElement/>
      }
      ,
      {
        path: "/add_signature",
        element: <AddCNI />,
        errorElement:<ErrorElement/>
      }
      
      
    ],
  },
]);
