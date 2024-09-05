import React, { useEffect, useState } from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import { useNavigate, useLocation } from "react-router-dom";
import logo_caisse from "../../../../Assets/caisse.png";
import logo_membre from "../../../../Assets/membre.png";
import logo_parametre from "../../../../Assets/parametre.png";
import logo_reunion from "../../../../Assets/reunion.png";
import logo_evenement from "../../../../Assets/Evenement.png";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardContent,
  CardHeader,
  Card,
  Divider,
  Grid,
  Paper,
  styled,
  Backdrop,
  CircularProgress,
  BackdropRoot,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { timeout } from "workbox-core/_private";
import Variable from "../../../../../Variable";
import AssociationServices from "../../../../../Services/AssociationServices";
import WelcomeMessage from "../WelcomeMessage";
import InvitationValidation from "../InvitationValidation";
import AssoInfo from "../AssoInfo";
import AccessibleTable from "../DataTable";
import MobileCardView from "../DataCardViewM";
import {
  AssociationModel,
  membreAssoModel,
} from "../../../../../Services/Types";

interface props {
  data: membreAssoModel[];
}
export const InviteMemberView = ({ data }: props) => {
  const [association, setAssociation] = useState<AssociationModel>();
  const [data1, setData] = useState<membreAssoModel[]>([]);
  const [nbTontine, setNbTontine] = useState("");
  const [currentMemberId, setCurrentMemberId]=useState("")
  const [nbEvenement, setNbEvenement] = useState("");
  const [nbReunion, setNbReunion] = useState("");
  const [nbMembre, setNbMembre] = useState("");
  const [nbDocument, setNbDocument] = useState("");
  const [isFunctional, setIsFunctional] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(true);
  const [currentMember, setCurrentMember] = useState<
    membreAssoModel | undefined
  >();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    const myPhone = user.user.phone;

    AssociationServices.GetMembersByAssociationId(
      location.pathname.split("/")[3]
    ).then((response) => {
      setData(response.data.data);
    });

    AssociationServices.GetCurrentMember(
      myPhone,
      location.pathname.split("/")[3]
    )
      .then((response) => {
        console.log("Current member"+response.data.data)
        setCurrentMember(response.data.data);
        setCurrentMemberId(response.data.data.memberPhone)
      })
      .catch((error) => {
        console.log(error);
      });

    AssociationServices.GetAssociationDetails(location.pathname.split("/")[3])
      .then((response) => {
        setAssociation(response.data.data);
        console.log(response);
        setIsFunctional(response.data.alreadyOpen);
        setNbDocument("0");
        setNbTontine(response.data.nbTontine);
        setNbEvenement(response.data.nbEvenement);
        setNbReunion(response.data.nbReunion);
        setNbMembre(response.data.nbMembre);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = () => {
    setMessage(messageList.deleting);
    setOpen(true);
    navigate("/association/mes associations");

    AssociationServices.delete_association(location.pathname.split("/")[3])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
   
const handleAnswer=(res:boolean)=>{
    
  const temp ={
      "responderId":currentMember?.id,
      "response":res,
      "associationId":location.pathname.split("/")[3],
      "type":"CREATE_ASSOCIATION",
      "roleId":""}

  AssociationServices.AnswerInvitation(temp)
  .then((response)=>{
         console.log(response)
  })
  .catch((error)=>{
    console.log(error)
  })
}

  const handleRejectInvitation = () => {
    setMessage(messageList.deleting);
    setOpen(true);
    
    setTimeout(() => {
      handleAnswer(false)
      setOpen(false)
      navigate("/association/mes associations");
    }, 2000);
  };

  const handleAcceptInvitation = () => {
    setMessage(messageList.accepting);
    setOpen(true);
    
    setTimeout(() => {
      handleAnswer(true)
      setOpen(false)
    }, 2000);
  };

  const messageList = {
    deleting: "Suppression de votre association.",
    opening: "Ouverture de votre association.",
    rejecting: "Vous n'allez plus accéder à cette page ci.",
    accepting: "Bienvenue dans notre association",
  };

  const [message, setMessage] = useState<String>("");
  const Style =
    "w-10 h-10 rounded-full flex items-center justify-center text-white";
  const viewCard = (path: string) => {
    navigate(path);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const currentPath = location.pathname + "/";

  return (
    <div className="mb-[20px]">
      <div className="h-full  lg:p-4 ">
        <Box
          sx={{
            marginBottom: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#dc2626",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: 2,
            border: "1px solid gray",
          }}
        >
          <h1>Mes Dettes</h1>
        </Box>

        <>
          <div className="block lg:hidden">
            <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "center" }}
                spacing={2}
                columns={16}
              >
                <Grid
                  sx={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  item
                  sm={1}
                >
                  <WelcomeMessage>
                    Nous sommes ravis de vous informer que vous avez été invité
                    à rejoindre notre association. En tant que membre potentiel,
                    nous vous invitons à explorer notre mission, nos activités,
                    et la communauté dynamique que nous avons construite
                    ensemble. Avant de pouvoir participer pleinement à nos
                    activités, veuillez confirmer ou refuser votre invitation.
                  </WelcomeMessage>

                  <InvitationValidation
                    handleReject={handleRejectInvitation}
                    handleAccept={handleAcceptInvitation}
                  />
                </Grid>
                <Grid item sx={{ width: "100%" }} xs={0}>
                  <AssoInfo />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{ marginTop: "14px" }}
                columns={16}
              >
                <Grid item xs={8}></Grid>
              </Grid>
            </Box>
          </div>

          <div className="hidden lg:block">
            <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "center" }}
                spacing={2}
                columns={16}
              >
                <Grid
                  sx={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  item
                  xs={8}
                >
                  <WelcomeMessage>
                    Nous sommes ravis de vous informer que vous avez été invité
                    à rejoindre notre association. En tant que membre potentiel,
                    nous vous invitons à explorer notre mission, nos activités,
                    et la communauté dynamique que nous avons construite
                    ensemble. Avant de pouvoir participer pleinement à nos
                    activités, veuillez confirmer ou refuser votre invitation.
                  </WelcomeMessage>
                  <InvitationValidation
                    handleReject={handleRejectInvitation}
                    handleAccept={handleAcceptInvitation}
                  />
                </Grid>
                <Grid item sx={{ width: "100%" }} xs={8}>
                  <AssoInfo />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{ marginTop: "14px" }}
                columns={16}
              >
                <Grid item xs={8}></Grid>
              </Grid>
            </Box>
          </div>
        </>
      </div>
      <Backdrop
        sx={{
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          zIndex: 10000 /*marginLeft:"229px", marginTop:"71px"*/,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
        <p className="ml-2 text-lg">{message}</p>
      </Backdrop>
    </div>
  );
};
