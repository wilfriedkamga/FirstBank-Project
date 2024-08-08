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
import MesDocuments  from "../Components/AssociationUI/Elementary/MesDocuments/MesDocuments";
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
import FeatureInProgress from "../Components/AssociationUI/Elementary/FeatureInProgress";
import UneReunionContent from "../Components/AssociationUI/Elementary/MesTontines/Reunions/UneReunionContent";
import Cotisations from "../Components/AssociationUI/Elementary/MesTontines/Reunions/Cotisations";
import ParamTontines from "../Components/AssociationUI/Elementary/Caisses/ParamTontines ";

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
        path: "/association/",
        element: <TontineHomePage />,
        errorElement: <ErrorElement />,
        children: [
          {
            path: "/association/",
            element: <Dashboard />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/association/mes associations",
            element: <MesTontines />,
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
                            element: <Cotisations />,
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
        element: <AddCNI />,
        errorElement: <ErrorElement />,
      },
    ],
  },
]);
