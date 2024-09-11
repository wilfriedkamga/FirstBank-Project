import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import ButtonComponent from "../../MuiCustomComponent/ButtonCompoenent";
import { membreAssoModel } from "../../../../Services/Types";
import AssociationServices from "../../../../Services/AssociationServices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface props {
  handleAccept: () => void;
  handleReject: () => void;
  isAlreadyValid?: boolean;
}
const InvitationValidation = ({
  handleAccept,
  handleReject,
  isAlreadyValid,
}: props) => {
  useEffect(() => {}, [isAlreadyValid]);

  console.log("L'utilisateur est il déjà valide ?", isAlreadyValid);

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader title="Validation de votre invitation" />
      <Divider sx={{ position: "relative", bottom: "20px" }} />
      <CardContent>
        {isAlreadyValid
          ? "Vous avez accepté de faire partie de cette association. Veuillez patientez que l'administrateur puisse ouvrir l'association"
          : "Pour accepter ou refuser l'invitation, utilisez les boutons ci-dessous Nous espérons que vous choisirez de faire partie de notre aventurecollective "}
      </CardContent>
      {isAlreadyValid ? (
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <CheckCircleIcon sx={{ color: "green" }} />
        </CardActions>
      ) : (
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <ButtonComponent
            onClick={handleAccept}
            type="success"
            text="Invitation acceptée"
          />
          <ButtonComponent
            onClick={handleReject}
            type="error"
            text="Rejecter l'invitation"
          />
        </CardActions>
      )}
    </Card>
  );
};

export default InvitationValidation;
