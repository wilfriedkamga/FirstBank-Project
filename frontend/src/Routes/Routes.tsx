import { createBrowserRouter } from "react-router-dom";
import Authentification from "../Pages/AssociationUI/Authentification/Authentification";
import { ErrorElement } from "./ErrorElement";
import ProtectedRoute from "./ProtectedRoutes";
import TontineHomePage from "../Pages/AssociationUI/TontineHomePage/TontineHomePage";
import Dashboard from "../Components/AssociationUI/Elementary/Dashboard/Dashboard";
import MesTontines from "../Components/AssociationUI/Elementary/MesTontines/MesTontines";
import BoardView from "../Components/AssociationUI/Elementary/MesTontines/BoardView";
import TontineContent from "../Components/AssociationUI/Elementary/maTontine/TontineContent";
import { MaTontine } from "../Components/AssociationUI/Elementary/maTontine/MaTontine";
import CaisseContent from "../Components/AssociationUI/Elementary/Caisses/CaisseContent";
import MaCaisse from "../Components/AssociationUI/Elementary/Caisses/MaCaisse";
import MesCaisse from "../Components/AssociationUI/Elementary/Caisses/MesCaisse";
import UneCaisseContent from "../Components/AssociationUI/Elementary/Caisses/UneCaisseContent";
import UneCaisse from "../Components/AssociationUI/Elementary/Caisses/UneCaisse";
import Parametres from "../Components/AssociationUI/Elementary/ParametresTontines/Parametres";
import Cotisation from "../Components/AssociationUI/Elementary/Caisses/Cotisation";
import MembresCaisseContent from "../Components/AssociationUI/Elementary/Caisses/MembresCaisseContent";
import MesReunnionsContent from "../Components/AssociationUI/Elementary/MesTontines/Reunions/MesReunnionsContent";
import MesReunions from "../Components/AssociationUI/Elementary/MesTontines/Reunions/MesReunions";
import UneReunion from "../Components/AssociationUI/Elementary/MesTontines/Reunions/UneReunion";
import MembresTontine from "../Components/AssociationUI/Elementary/MesTontines/MembresTontine";
import { MesDocuments } from "../Components/AssociationUI/Elementary/MesDocuments/MesDocuments";
import ParametreContent from "../Components/AssociationUI/Elementary/ParametresTontines/ParametreContent";
import RoleAssociation from "../Components/AssociationUI/Elementary/ParametresTontines/RoleAssociation";
import MesCotisation from "../Components/AssociationUI/Elementary/Dashboard/MesCotisation";
import MesSanctions from "../Components/AssociationUI/Elementary/Dashboard/MesSanctions";
import Settings from "../Pages/SavingPlanUI/Settings/Settings";
import ProfileSettings from "../Pages/SavingPlanUI/ProfileSettings/ProfileSettings";
import Notifications from "../Pages/SavingPlanUI/nootifications/Notifications";
import Search from "../Pages/SavingPlanUI/search/Search";
import SavingsDash from "../Pages/SavingPlanUI/savingsApp/dashboard/SavingsDash";
import CreatePlan from "../Pages/SavingPlanUI/savingsApp/plan/CreatePlan";
import EditProfile from "../Pages/SavingPlanUI/ProfileSettings/EditProfile";
import ModifyPassword from "../Pages/SavingPlanUI/ProfileSettings/ModifyPassword";
import EmailVerification from "../Pages/SavingPlanUI/ProfileSettings/EmailVerification";
import Plans from "../Pages/SavingPlanUI/savingsApp/plan/Plans";
import AddSignature from "../Pages/SavingPlanUI/ProfileSettings/AddSignature";
import AddCNI from "../Pages/SavingPlanUI/ProfileSettings/AddCNI";
import Details from "../Pages/SavingPlanUI/savingsApp/plan/Details";
import Portal from "../Pages/SavingPlanUI/dashboard/Portal";
import ParamInfo from "../Components/AssociationUI/Elementary/ParametresTontines/ParamInfo";
import ParamRoles from "../Components/AssociationUI/Elementary/ParametresTontines/ParamRoles";
import ParamReunions from "../Components/AssociationUI/Elementary/ParametresTontines/ParamReunions";
import ParamSanction from "../Components/AssociationUI/Elementary/ParametresTontines/ParamSanction";
import ParamSession from "../Components/AssociationUI/Elementary/ParametresTontines/ParamSession";


const isKeyInLocalStorage = (key: string): boolean => {
  const token = localStorage.getItem(key);

  return token != null && token != "";
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentification />,
    errorElement: <ErrorElement />,
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
    errorElement: <ErrorElement />,
  },
  {
    element: <ProtectedRoute isAuthenticated={isKeyInLocalStorage("user")} />,

    children: [
      /***************** Les routes pour le module de tontine */
      {
        path: "/tontine",
        element: <TontineHomePage />,
        errorElement: <ErrorElement />,
        children: [
          {
            path: "/tontine/",
            element: <Dashboard />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/tontine/mestontines",
            element: <MesTontines />,
            errorElement: <ErrorElement />,
            children: [
              {
                path: "/tontine/mestontines/",
                element: <BoardView />,
                errorElement: <ErrorElement />,
              },
              {
                path: "/tontine/mestontines/:idTontine",
                element: <TontineContent />,
                errorElement: <ErrorElement />,
                children: [
                  {
                    path: "/tontine/mestontines/:idTontine/",
                    element: <MaTontine />,
                    errorElement: <ErrorElement />,
                  },
                  
                  {
                    path: "/tontine/mestontines/:idTontine/tontines",
                    element: <CaisseContent />,
                    errorElement: <ErrorElement />,
                    children: [
                      {
                        path: "/tontine/mestontines/:idTontine/tontines/",
                        element: <MaCaisse />,
                        errorElement: <ErrorElement />,
                        children: [
                          {
                            path: "/tontine/mestontines/:idTontine/tontines/",
                            element: <MesCaisse />,
                            errorElement: <ErrorElement />,
                          },
                          {
                            path: "/tontine/mestontines/:idTontine/tontines/:idCaisse",
                            element: <CaisseContent />,
                            errorElement: <ErrorElement />,
                            children: [
                              {
                                path: "/tontine/mestontines/:idTontine/tontines/:idCaisse",
                                element: <UneCaisseContent />,
                                errorElement: <ErrorElement />,
                                children: [
                                  {
                                    path: "/tontine/mestontines/:idTontine/tontines/:idCaisse/",
                                    element: <UneCaisse />,
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/tontines/:idCaisse/parametres",
                                    element: <Parametres />,
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/tontines/:idCaisse/cotisations",
                                    element: <Cotisation />,
                                    errorElement: <ErrorElement />,
                                  },

                                  {
                                    path: "/tontine/mestontines/:idTontine/tontines/:idCaisse/dettes",
                                    element: <div>les dettes de la caisse</div>,
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/tontines/:idCaisse/sanctions",
                                    element: (
                                      <div>les sanctions de la caisse</div>
                                    ),
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/tontines/:idCaisse/cagnotte",
                                    element: (
                                      <div>Les cagnottes de la caisse</div>
                                    ),
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/tontine/mestontines/:idTontine/tontines/:idCaisse/membre",
                                    element: <MembresCaisseContent />,
                                    errorElement: <ErrorElement />,
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
                    element: <MesReunnionsContent/>,
                    errorElement: <ErrorElement />,
                    children:[
                      {
                        path: "/tontine/mestontines/:idTontine/reunions",
                        element: <MesReunions/>,
                      },
                      
                      {
                        path: "/tontine/mestontines/:idTontine/reunions/:idReunion",
                        element: <UneReunion/>,
                      }
                    ]
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/evenements",
                    element: <div> les évènements</div>,
                    errorElement: <ErrorElement />,
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/membres",
                    element: <MembresTontine />,
                    errorElement: <ErrorElement />,
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/documents",
                    element: <MesDocuments/>,
                    errorElement: <ErrorElement />,
                  },
                  {
                    path: "/tontine/mestontines/:idTontine/parametres",
                    element: <ParametreContent />,
                    errorElement: <ErrorElement />,
                    children: [
                      {
                        path: "/tontine/mestontines/:idTontine/parametres/",
                        element: <Parametres />,
                      },
                      {
                        path: "/tontine/mestontines/:idTontine/parametres/info",
                        element: <ParamInfo />,
                      },
                      {
                        path: "/tontine/mestontines/:idTontine/parametres/roles",
                        element: <ParamRoles />,
                      },
                      {
                        path: "/tontine/mestontines/:idTontine/parametres/reunions",
                        element: <ParamReunions/>,
                      },
                      {
                        path: "/tontine/mestontines/:idTontine/parametres/sanctions",
                        element: <ParamSanction />,
                      },
                      {
                        path: "/tontine/mestontines/:idTontine/parametres/sessions",
                        element: <ParamSession />,
                      },
                    ],
                  },
                ],
              },
              {},
            ],
          },
          {
            path: "/tontine/mescotisations",
            element: <MesCotisation />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/tontine/messanctions",
            element: <MesSanctions/>,
            errorElement: <ErrorElement />,
          },
          {
            path: "/tontine/mesdettes",
            element: <div>mes dettes</div>,
            errorElement: <ErrorElement />,
          },
        ],
      },
      /***************** Les routes pour le module de Saving */
      {
        path: "/home",
        element: <Portal />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/settings",
        element: <Settings />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/profile",
        element: <ProfileSettings/>,
        errorElement: <ErrorElement />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/search",
        element: <Search />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/savings",
        element: <SavingsDash />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/newPlan",
        element: <CreatePlan />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/profile/edit-profile",
        element: <EditProfile />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/modify_password",
        element: <ModifyPassword />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/verify_email",
        element: <EmailVerification />,
        errorElement: <ErrorElement />,
      },
      {
        path: '/savings/all-plans',
        element: <Plans />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/signature",
        element: <AddSignature />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/add_cni",
        element: <AddCNI />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'savings/plan/:id',
        element: <Details />,
      },
      {
        path: "/add_signature",
        element: <AddCNI />,
        errorElement: <ErrorElement />,
      },
    ],
  },
]);
