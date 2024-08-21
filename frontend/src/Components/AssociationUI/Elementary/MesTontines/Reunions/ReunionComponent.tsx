import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Paper, Typography, styled } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Icône pour visualiser la réunion

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type ReunionProps = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  lieu: string;
  receveur: string;
  etat: number;
  rapport: string;
  typeReunion: string; // Ajouter typeReunion ici
};

const ReunionComponent: React.FC<ReunionProps> = ({
  id,
  date,
  startTime,
  endTime,
  lieu,
  receveur,
  etat,
  rapport,
  typeReunion, // Nouveau prop
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Item
        sx={{
          display: "flex",
          alignItems: "center",
          color: "black",
          gap: 2,
        }}
      >
        <div>
          {etat === 1 && (
            <AccessTimeIcon sx={{ fontSize: "40px", color: "#888" }} />
          )}
          {etat === 2 && (
            <CheckCircleIcon sx={{ fontSize: "40px", color: "#00bb00" }} />
          )}
          {etat === 0 && (
            <CancelIcon sx={{ fontSize: "40px", color: "#bb0000" }} />
          )}
        </div>
        <div>
          <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
            {date}
          </Typography>
          <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
            Heure de début: {startTime}
          </Typography>
          <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
            Heure de fin: {endTime}
          </Typography>
          {typeReunion === "présentiel" && (
            <>
              <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
                Lieu: {lieu}
              </Typography>
              <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
                {receveur}
              </Typography>
            </>
          )}
        </div>
        <div className="left-[50px] flex items-center gap-2 rounded-lg relative left-[60px]">
          <div className="hover:bg-gray-200 rounded-lg">
            {etat === 2 && (
              <DownloadForOfflineIcon
                sx={{ fontSize: "35px", color: "#bb0000", zIndex: "0" }}
              />
            )}
          </div>
          <div className="hover:bg-gray-200 rounded-lg cursor-pointer">
            <button
              onClick={() => {
                navigate(location.pathname + "/" + id)
              }}
            >
              <VisibilityIcon
                sx={{ fontSize: "35px", color: "#bb0000", zIndex: "0" }}
              />
            </button>
          </div>
        </div>
      </Item>
    </Grid>
  );
};

export default ReunionComponent;
