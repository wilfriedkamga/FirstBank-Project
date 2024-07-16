import { Box, Grid, Paper, styled } from "@mui/material";
import ReunionComponent from "./ReunionComponent";

const reunion = {
  id: "1234567",
  date: "le 12 janvier 2024",
  receveur: "Wilfried junior",
  etat: 1,
  rapport: "",
};
const reunion2 = {
  id: "1234556",
  date: "le 12 janvier 2024",
  receveur: "Wilfried junior",
  etat: 2,
  rapport: "",
};
const reunion3 = {
  id: "123456",
  date: "le 12 janvier 2024",
  receveur: "Wilfried junior",
  etat: 0,
  rapport: "",
};
const reunions = [reunion, reunion2, reunion2, reunion3, reunion3];

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 3 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 1, sm: 2, md: 3 }}
      >
        {reunions.map((item, index) => (
          <ReunionComponent
            id={item.id}
            date={item.date}
            receveur={item.receveur}
            etat={item.etat}
            rapport={item.rapport}
          />
        ))}
      </Grid>
    </Box>
  );
}
