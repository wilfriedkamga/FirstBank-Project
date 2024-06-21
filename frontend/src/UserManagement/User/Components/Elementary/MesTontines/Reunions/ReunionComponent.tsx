import { Grid, Paper, Typography, styled } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type childComponents = {
  id: string;
  date: string;
  receveur: string;
  etat: number;
  rapport: string;
};
const ReunionComponent = ({
  id,
  date,
  receveur,
  etat,
  rapport,
}: childComponents) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const extractIdTontine = (path: string) => {
    const path1 = path.split("/");
    return path1[3];
  };
  const redirectPath = () => {};

  return (
    <Grid item xs={1} sm={1} md={1}>
      <Item
        sx={{
          display: "flex",
          alignItems: "center",
          color: "black",
          gap: 2,
        }}
      >
        <div>
          {etat == 1 ? (
            <AccessTimeIcon sx={{ fontSize: "40px", color: "#888" }} />
          ) : null}
          {etat == 2 ? (
            <CheckCircleIcon sx={{ fontSize: "40px", color: "#00bb00" }} />
          ) : null}
          {etat == 0 ? (
            <CancelIcon sx={{ fontSize: "40px", color: "#bb0000" }} />
          ) : null}
        </div>
        <div>
          <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
            {date}
          </Typography>
          <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
            {" "}
            {receveur}
          </Typography>
        </div>
        <div className=" left-[50px] flex items-center gap-2 rounded-lg relative left-[60px]">
          <div className="hover:bg-gray-200 rounded-lg">
            <DownloadForOfflineIcon
              sx={{ fontSize: "35px", color: "#bb0000", zIndex: "0" }}
            />
          </div>
          <div className="hover:bg-gray-200 rounded-lg cursor-pointer">
            <button
              onClick={() => {
                navigate(location.pathname + "/" + id);
              }}
            >
              <ExpandCircleDownIcon
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
