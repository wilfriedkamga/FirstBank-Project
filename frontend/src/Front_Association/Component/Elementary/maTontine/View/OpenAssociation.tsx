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

interface props{
  association:AssociationModel
}
export const OpenedAssociation = ({association}:props) => {
  const [nbTontine, setNbTontine] = useState("");
  const [nbEvenement, setNbEvenement] = useState("");
  const [nbReunion, setNbReunion] = useState("");
  const [nbMembre, setNbMembre] = useState("");
  const [nbDocument, setNbDocument] = useState("");


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    const myPhone = user.user.phone;})

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
      _id: "6",
      label: "parametres",
      lable_visible: "Paramètres",
      total: null,
      logo: logo_parametre,
    },
    {
      _id: "7",
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


  const viewCard = (path: string) => {
    navigate(path);
  };


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
          <div className="grid  grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map(({ logo, lable_visible, label, total }, index) => (
              <div
                onClick={() => viewCard(location.pathname +"/"+ label)}
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
        
      </div>
     
    </div>
  );}
