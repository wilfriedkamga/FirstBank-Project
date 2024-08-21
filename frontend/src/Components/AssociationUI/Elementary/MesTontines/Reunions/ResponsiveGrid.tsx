import React, { useEffect, useState } from "react";
import { Box, Grid, Modal, Paper, Typography, Button } from "@mui/material";
import ReunionComponent from "./ReunionComponent";

const reunion = {
  id: "1234567",
  date: "le 12 janvier 2024",
  receveur: "Wilfried junior",
  etat: 1,
  rapport: "",
  typeReunion: "présentiel", // nouveau champ
};
const reunion2 = {
  id: "1234556",
  date: "le 12 janvier 2024",
  receveur: "Wilfried junior",
  etat: 2,
  rapport: "",
  typeReunion: "présentiel", // nouveau champ
};
const reunion3 = {
  id: "123456",
  date: "le 12 janvier 2024",
  receveur: "Wilfried junior",
  etat: 0,
  rapport: "",
  typeReunion: "en ligne", // nouveau champ
};
const reunions = [reunion, reunion2, reunion3];

export default function ResponsiveGrid() {
  const [openModal, setOpenModal] = useState(true);

  const handleClose = () => setOpenModal(false);

  return (
    <Box sx={{ flexGrow: 2 }}>
      <Modal open={false} onClose={handleClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            textAlign: "center",
            width: "80%",
            maxWidth: "500px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Bienvenue !
          </Typography>
          <Typography variant="body1">
            Nous sommes ravis de vous retrouver. Vous pouvez consulter les réunions
            planifiées ci-dessous.
          </Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
            Continuer
          </Button>
        </Paper>
      </Modal>

      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 1, md: 3 }}>
        {reunions.map((item, index) => (
          <ReunionComponent
            key={index} // Ajouter la clé ici pour éviter les avertissements React
            id={item.id}
            date={item.date}
            receveur={item.receveur}
            etat={item.etat}
            rapport={item.rapport}
            startTime="12:00"
            endTime="15:00"
            lieu="chateau Ngoa-ekele"
            typeReunion={item.typeReunion} // nouveau champ
          />
        ))}
      </Grid>
    </Box>
  );
}
