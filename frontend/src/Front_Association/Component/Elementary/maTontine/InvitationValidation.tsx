import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import React from "react";
import ButtonComponent from "../../MuiCustomComponent/ButtonCompoenent";
import { membreAssoModel } from "../../../../Services/Types";
import AssociationServices from "../../../../Services/AssociationServices";

interface props {
  handleAccept: () => void;
  handleReject: () => void;
}
const InvitationValidation = ({ handleAccept, handleReject }: props) => {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader title="Validation de votre invitation" />
      <Divider sx={{ position: "relative", bottom: "20px" }} />
      <CardContent>
        Pour accepter ou refuser l'invitation, utilisez les boutons ci-dessous.
        Nous espérons que vous choisirez de faire partie de notre aventure
        collective !
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonComponent
          onClick={handleAccept}
          type="success"
          text="Accepter l'invitation"
        />
        <ButtonComponent
          onClick={handleReject}
          type="error"
          text="Rejecter l'invitation"
        />
      </CardActions>
    </Card>
  );
};

export default InvitationValidation;
