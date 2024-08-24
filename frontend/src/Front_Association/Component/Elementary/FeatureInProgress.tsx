import React from "react";
import { Box, Typography, useTheme, Theme } from "@mui/material";
import { styled } from '@mui/system';

// Styles du thème de l'application
const Container = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "30vh",
  color:"#ffffff",
  textAlign: "center",
  padding: theme.spacing(3),
  backgroundColor: "#444444",
}));

const Message = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
  fontSize: theme.typography.h6.fontSize,
}));

const FeatureInProgress: React.FC = () => {
  const theme = useTheme();

  return (
    <Container  theme={theme}>
      <Typography className="" variant="h4" component="h1">
        Fonctionnalité en cours de développement
      </Typography>
      <Message sx={{color:"white"}} theme={theme} variant="body1">
        Désolé, mais cette fonctionnalité est encore en cours de développement
        et sera prête d'ici quelques temps. Merci de votre compréhension.
      </Message>
    </Container>
  );
};

export default FeatureInProgress;
