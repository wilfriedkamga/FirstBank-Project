import { createBrowserRouter } from "react-router-dom";
import Authentification from "../Front_Usermanagement/Page/Authentification/Authentification";
import { ErrorElement } from "./ErrorElement";
import ProtectedRoute from "./ProtectedRoutes";
import TontineHomePage from "../Front_Association/Pages/TontineHomePage/TontineHomePage";
import Dashboard from "../Front_Association/Component/Elementary/Dashboard/Dashboard";
import MesTontines from "../Front_Association/Component/Elementary/MesTontines/MesTontines";
import BoardView from "../Front_Association/Component/Elementary/MesTontines/BoardView";
import TontineContent from "../Front_Association/Component/Elementary/maTontine/TontineContent";
import { MaTontine } from "../Front_Association/Component/Elementary/maTontine/MaTontine";
import CaisseContent from "../Front_Association/Component/Elementary/Caisses/CaisseContent";
import MaCaisse from "../Front_Association/Component/Elementary/Caisses/MaCaisse";
import MesCaisse from "../Front_Association/Component/Elementary/Caisses/MesCaisse";
import UneCaisseContent from "../Front_Association/Component/Elementary/Caisses/UneCaisseContent";
import UneCaisse from "../Front_Association/Component/Elementary/Caisses/UneCaisse";
import ParamTontines from "../Front_Association/Component/Elementary/Caisses/ParamTontines ";
import Cotisation from "../Front_Association/Component/Elementary/Caisses/Cotisation";
import FeatureInProgress from "../Front_Association/Component/Elementary/FeatureInProgress";
import MembresCaisseContent from "../Front_Association/Component/Elementary/Caisses/MembresCaisseContent";
import MesReunnionsContent from "../Front_Association/Component/Elementary/MesTontines/Reunions/MesReunnionsContent";
import MesReunions from "../Front_Association/Component/Elementary/MesTontines/Reunions/MesReunions";
import UneReunionContent from "../Front_Association/Component/Elementary/MesTontines/Reunions/UneReunionContent";
import MembresTontine from "../Front_Association/Component/Elementary/MesTontines/MembresTontine";
import MesDocuments from "../Front_Association/Component/Elementary/MesDocuments/MesDocuments";
import ParametreContent from "../Front_Association/Component/Elementary/ParametresTontines/ParametreContent";
import Parametres from "../Front_Association/Component/Elementary/ParametresTontines/Parametres";
import ParamInfo from "../Front_Association/Component/Elementary/ParametresTontines/ParamInfo";
import ParamRoles from "../Front_Association/Component/Elementary/ParametresTontines/ParamRoles";
import ParamReunions from "../Front_Association/Component/Elementary/ParametresTontines/ParamReunions";
import ParamSanction from "../Front_Association/Component/Elementary/ParametresTontines/ParamSanction";
import ParamSession from "../Front_Association/Component/Elementary/ParametresTontines/ParamSession";
import MesCotisation from "../Front_Association/Component/Elementary/Dashboard/MesCotisation";
import MesSanctions from "../Front_Association/Component/Elementary/Dashboard/MesSanctions";
import Settings from "../Front_Saving/Page/Settings/Settings";
import ProfileSettings from "../Front_Usermanagement/Component/ProfileSettings/ProfileSettings";
import Notifications from "../Front_Usermanagement/Component/nootifications/Notifications";
import Search from "../Front_Saving/Page/search/Search";
import SavingsDash from "../Front_Saving/Page/dashboard/SavingsDash";
import EditProfile from "../Front_Usermanagement/Component/ProfileSettings/EditProfile";
import ModifyPassword from "../Front_Usermanagement/Component/ProfileSettings/ModifyPassword";
import EmailVerification from "../Front_Usermanagement/Component/ProfileSettings/EmailVerification";
import AddSignature from "../Front_Usermanagement/Component/ProfileSettings/AddSignature";
import AddCNI from "../Front_Usermanagement/Component/ProfileSettings/AddCNI";
import UneReunion from "../Front_Association/Component/Elementary/MesTontines/Reunions/UneReunion";
import CreatePlan from "../Front_Saving/Page/plan/CreatePlan";
import Plans from "../Front_Saving/Page/plan/Plans";
import Details from "../Front_Saving/Page/plan/Details";
import Portal from "../Front_Usermanagement/Page/Dashboard/Portal";

const isKeyInLocalStorage = (key: string): boolean => {
  const token = localStorage.getItem(key);

  return token != null && token != "";
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentification/>,
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
        path: "/association/",
        element: <TontineHomePage />,
        errorElement: <ErrorElement />,
        children: [
          {
            path: "/association/",
            element: <Dashboard/>,
            errorElement: <ErrorElement />,
          },
          {
            path: "/association/mes associations",
            element: <MesTontines/>,
            errorElement: <ErrorElement />,
            children: [
              {
                path: "/association/mes associations/",
                element: <BoardView />,
                errorElement: <ErrorElement />,
              },
              {
                path: "/association/mes associations/:idassociation",
                element: <TontineContent />,
                errorElement: <ErrorElement />,
                children: [
                  {
                    path: "/association/mes associations/:idassociation/",
                    element: <MaTontine />,
                    errorElement: <ErrorElement />,
                  },

                  {
                    path: "/association/mes associations/:idassociation/tontines",
                    element: <CaisseContent />,
                    errorElement: <ErrorElement />,
                    children: [
                      {
                        path: "/association/mes associations/:idassociation/tontines/",
                        element: <MaCaisse />,
                        errorElement: <ErrorElement />,
                        children: [
                          {
                            path: "/association/mes associations/:idassociation/tontines/",
                            element: <MesCaisse />,
                            errorElement: <ErrorElement />,
                          },
                          {
                            path: "/association/mes associations/:idassociation/tontines/:idCaisse",
                            element: <CaisseContent />,
                            errorElement: <ErrorElement />,
                            children: [
                              {
                                path: "/association/mes associations/:idassociation/tontines/:idCaisse",
                                element: <UneCaisseContent />,
                                errorElement: <ErrorElement />,
                                children: [
                                  {
                                    path: "/association/mes associations/:idassociation/tontines/:idCaisse/",
                                    element: <UneCaisse />,
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/association/mes associations/:idassociation/tontines/:idCaisse/parametres",
                                    element: <ParamTontines />,
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/association/mes associations/:idassociation/tontines/:idCaisse/cotisations",
                                    element: <Cotisation />,
                                    errorElement: <ErrorElement />,
                                  },

                                  {
                                    path: "/association/mes associations/:idassociation/tontines/:idCaisse/dettes",
                                    element: <div><FeatureInProgress/></div>,
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/association/mes associations/:idassociation/tontines/:idCaisse/sanctions",
                                    element: (
                                      <div><FeatureInProgress/></div>
                                    ),
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/association/mes associations/:idassociation/tontines/:idCaisse/cagnotte",
                                    element: (
                                      <div><FeatureInProgress/></div>
                                    ),
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/association/mes associations/:idassociation/tontines/:idCaisse/membre",
                                    element: <MembresCaisseContent />,
                                    errorElement: <ErrorElement />,
                                  },
                                  {
                                    path: "/association/mes associations/:idassociation/tontines/:idCaisse/remboursements",
                                    element: <div><FeatureInProgress/></div>,
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
                    path: "/association/mes associations/:idassociation/reunions",
                    element: <MesReunnionsContent />,
                    errorElement: <ErrorElement />,
                    children: [
                      {
                        path: "/association/mes associations/:idassociation/reunions",
                        element: <MesReunions />,
                      },

                      {
                        path: "/association/mes associations/:idassociation/reunions/:idReunion",
                        element: <UneReunionContent />,
                        children:[
                          {
                            path: "/association/mes associations/:idassociation/reunions/:idReunion/",
                            element: <UneReunion />,
                          },
                          {
                            path: "/association/mes associations/:idassociation/reunions/:idReunion/cotisation/:idtontine",
                            element: <Cotisation />,
                          }
                        ]
                      },
                    ],
                  },
                  {
                    path: "/association/mes associations/:idassociation/evenements",
                    element: <div> <FeatureInProgress/></div>,
                    errorElement: <ErrorElement />,
                  },
                  {
                    path: "/association/mes associations/:idassociation/membres",
                    element: <MembresTontine />,
                    errorElement: <ErrorElement />,
                  },
                  {
                    path: "/association/mes associations/:idassociation/documents",
                    element: <MesDocuments />,
                    errorElement: <ErrorElement />,
                  },
                  {
                    path: "/association/mes associations/:idassociation/parametres",
                    element: <ParametreContent />,
                    errorElement: <ErrorElement />,
                    children: [
                      {
                        path: "/association/mes associations/:idassociation/parametres/",
                        element: <Parametres />,
                      },
                      {
                        path: "/association/mes associations/:idassociation/parametres/info",
                        element: <ParamInfo />,
                      },
                      {
                        path: "/association/mes associations/:idassociation/parametres/roles",
                        element: <ParamRoles />,
                      },
                      {
                        path: "/association/mes associations/:idassociation/parametres/reunions",
                        element: <ParamReunions />,
                      },
                      {
                        path: "/association/mes associations/:idassociation/parametres/sanctions",
                        element: <ParamSanction />,
                      },
                      {
                        path: "/association/mes associations/:idassociation/parametres/sessions",
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
            path: "/association/mes cotisations",
            element: <MesCotisation />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/association/mes sanctions",
            element: <MesSanctions />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/association/mes dettes",
            element: <div><FeatureInProgress/></div>,
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
        element: <ProfileSettings />,
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
        path: "/savings/newPlan",
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
        path: "/savings/all-plans",
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
        path: "savings/plan/:id",
        element: <Details />,
      },
      {
        path: "/add_signature",
        element: <AddSignature />,
        errorElement: <ErrorElement />,
      },
    ],
  },
]);
