import React, { useEffect, useState } from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import { useNavigate, useLocation } from "react-router-dom";
import logo_caisse from "../../../Assets/caisse.png";
import logo_membre from "../../../Assets/membre.png";
import logo_parametre from "../../../Assets/parametre.png";
import logo_reunion from "../../../Assets/reunion.png";
import logo_evenement from "../../../Assets/Evenement.png";
import AssociationServices from "../../../../Services/AssociationServices";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AccessibleTable from "./DataTable";
import MobileCardView from "./DataCardViewM";
import { membre_AssoModel } from "../../../../Services/Types";
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

export const MaTontine = () => {
  const [assocaciation, setAssociation] = useState<any>();

  const [data, setData] = useState<membre_AssoModel[]>([]);
  const [nbTontine, setNbTontine] = useState("");
  const [nbEvenement, setNbEvenement] = useState("");
  const [nbReunion, setNbReunion] = useState("");
  const [nbMembre, setNbMembre] = useState("");
  const [nbDocument, setNbDocument] = useState("");
  const [isFunctional, setIsFunctional] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AssociationServices.GetAssociationDetails(location.pathname.split("/")[3])
      .then((response) => {
        setAssociation(response.data);
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

    AssociationServices.GetMembersByAssociationId(
      location.pathname.split("/")[3]
    ).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);
  const stats = [
    {
      _id: "1",
      label: "tontines",
      lable_visible: "Tontines",
      total: nbTontine,
      logo: logo_caisse,
    },
    {
      _id: "2",
      label: "reunions",
      lable_visible: "Réunions",
      total: nbReunion,
      logo: logo_reunion,
    },
    {
      _id: "3",
      label: "evenements",
      lable_visible: "Evenements",
      total: nbEvenement,
      logo: logo_evenement,
    },
    {
      _id: "4",
      label: "membres",
      lable_visible: "Membres",
      total: nbMembre,
      logo: logo_membre,
    },

    {
      _id: "4",
      label: "parametres",
      lable_visible: "Paramètres",
      total: null,
      logo: logo_parametre,
    },
    {
      _id: "5",
      label: "documents",
      lable_visible: "Documents",
      total: nbDocument,
      logo: logo_parametre,
    },
  ];

  const CardElement = ({ label, count, logo, bool }: any) => {
    return (
      <div className="sm:w-[250px] sm:h-[200px] w-full h-[150px] bg-white flex flex-col items-center justify-center  shadow-md rounded-md">
        <div className="h-10 flex justify-center items-center flex-col ">
          <img
            src={logo}
            className=" w-[110px] mb-2 h-[120px] sm:w-[120px] sm:h-[120px]"
            alt=""
          />
          {count === null ? (
            <p className="text-base text-gray-800 font-bold">{label}</p>
          ) : (
            <p className="text-base text-gray-800 font-bold">
              {label} {"(" + count + ")"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const handleDelete = () => {
    setMessage(messageList.deleting);
    setOpen(true);
    navigate("/association/mes associations");

    AssociationServices.delete_association(location.pathname.split("/")[3])
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleOpen = () => {
    setMessage(messageList.opening);
    setOpen(true);
    setTimeout(() => {
      AssociationServices.initialize_association(
        location.pathname.split("/")[3]
      )
        .then((response) => {
          
          setIsFunctional(true);
          setOpen(false);
        })
        .catch((error) => {setOpen(false); console.log("Nous n'avons pas pu ouvrir cette association")});
    }, 3000);
  };

  const messageList = {
    deleting: "Suppression de votre association.",
    opening: "Ouverture de votre association.",
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
        {!isFunctional ? (
          <>
            <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={16}>
                  <Card sx={{ maxWidth: "100%" }}>
                    <CardHeader title="Message d'information" />
                    <Divider sx={{ position: "relative", bottom: "20px" }} />
                    <CardContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eius modi ipsam expedita quam asperiores repellendus
                      laboriosam sed! At, a reiciendis?
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
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
                        <AccessibleTable nombre_max={3} data={data} />
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
                    onClick={handleDelete}
                    variant="contained"
                    sx={{ padding: "30px" }}
                    color="error"
                  >
                    Supprimer cette association
                  </Button>
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{ padding: "30px" }}
                    color="success"
                  >
                    Ouvrir cette association
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <div className="grid  grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map(({ logo, lable_visible, label, total }, index) => (
              <div
                onClick={() => viewCard(currentPath + label)}
                className="cursor-pointer "
                key={index}
              >
                <CardElement
                  key={index}
                  logo={logo}
                  bg="w-10 cursor-pointer rounded-full flex items-center bg-red-600 justify-center text-white"
                  label={lable_visible}
                  count={total}
                  bool={false}
                />
              </div>
            ))}
          </div>
        )}
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
