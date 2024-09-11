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
  EtatMembre,
  membreAssoModel,
} from "../../../../../Services/Types";

interface props {
  data: membreAssoModel[];
  currentMember:membreAssoModel|undefined;
  handleAnswer:(res:boolean)=>void;
  association:AssociationModel|undefined;
}
export const InviteMemberView = ({ data, handleAnswer, currentMember, association }: props) => {
 
  const [open, setOpen] = useState<boolean>(false); 
  const [message, setMessage] = useState<String>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    const myPhone = user.user.phone;
  }, []);
   
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
          <h1>{association?.assoName}</h1>
        </Box>
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
                    isAlreadyValid={!!currentMember && currentMember.state==EtatMembre.ACTIF}
                  />
                </Grid>
                <Grid item sx={{ width: "100%" }} xs={8}>
                  <AssoInfo association={association} />
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
