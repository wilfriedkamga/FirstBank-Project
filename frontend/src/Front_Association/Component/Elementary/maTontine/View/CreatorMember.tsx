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
  ActionType,
  AssociationModel,
  EtatMembre,
  InvitationType,
  membreAssoModel,
} from "../../../../../Services/Types";
import MembersInCreation from "./Creator/MembersInCreation";

interface props {
  data: membreAssoModel[];
  association: AssociationModel | undefined;
  handleAddMember: (data: any) => void;
  handleAction: (memb: membreAssoModel, type: ActionType) => void;
  handleDeleteAssociation: () => void;
  handleOpenAssociation: () => void;
}
export const CreatorView = ({
  data,
  association,
  handleAddMember,
  handleAction,
  handleDeleteAssociation,
  handleOpenAssociation,
}: props) => {
  
  const [open,setOpen]=useState(false)
  const messageList = {
    deleting: "Suppression de votre association.",
    opening: "Ouverture de votre association.",
    rejecting: "Vous n'allez plus accéder à cette page ci.",
  };

  const [message, setMessage] = useState<String>("");

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
          <h1>mon association</h1>
        </Box>
        <>
          <div className="">
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
                  sm={8}
                >
                  <WelcomeMessage>
                    Vous avez initié la création de cette nouvelle association
                    qui va vous permettre de gérer vos tontines. Avant de 8888
                    pouvoir utiliser les différentes fonctionnalités de cette
                    association, les différents membres que vous avez invité
                    doivent accepter votre invitation. Ce n'est que lorsqu'ils
                    auront accepté votre invitation que vous pourrez commencer à
                    utiliser cette application. Vous pouvez cependant annuler la
                    création de cette association, ou alors annuler les
                    invitations envoyés aux administrateurs pour inviter
                    d'autres à leur place. Veuillez consulter ci-dessous les
                    informations sur la validations des différents membres que
                    vous avez invité.
                  </WelcomeMessage>
                </Grid>
                <Grid item sx={{ width: "100%" }} sm={8} xs={0}>
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              sx={{ marginBottom: "50px" }}
              container
              spacing={2}
              columns={16}
            >
              <Grid item xs={16}>
                <Accordion
                  sx={{
                    bgcolor: "#ffffff",
                    padding: "25px",
                    height: "100%",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    sx={{ fontWeight: "bold" }}
                  >
                    État des invitations des membres
                  </AccordionSummary>

                  <AccordionDetails>
                    <div className="hidden lg:block">
                      <MembersInCreation
                        handleAddMember={handleAddMember}
                        handleAction={handleAction}
                        data={data.filter(
                          (memb) =>
                            memb.state != EtatMembre.SUPPRIME &&
                            memb.state != EtatMembre.REJETTE
                        )}
                      />
                    </div>
                    <div className="lg:hidden block">
                      <MobileCardView />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>

            <Grid
              sx={{ marginBottom: "50px" }}
              container
              spacing={2}
              columns={16}
            >
              <Grid
                item
                xs={16}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  onClick={handleDeleteAssociation}
                  variant="contained"
                  sx={{ padding: "30px" }}
                  color="error"
                >
                  Supprimer cette association
                </Button>
                <Button
                  onClick={handleOpenAssociation}
                  variant="contained"
                  sx={{ padding: "30px" }}
                  color="success"
                  disabled={
                    !(
                      data.filter((memb) => memb.state == EtatMembre.ACTIF)
                        .length === 3
                    )
                  }
                >
                  Ouvrir cette association
                </Button>
              </Grid>
            </Grid>
            <Grid
              sx={{ marginBottom: "50px" }}
              container
              spacing={2}
              columns={16}
            ></Grid>
          </Box>
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
