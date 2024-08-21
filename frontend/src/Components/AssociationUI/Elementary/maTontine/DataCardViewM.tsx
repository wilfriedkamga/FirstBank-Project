import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  CircularProgress,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";

type membre_AssoModel = {
  id: string;
  name: string;
  phone: string;
  creationDate: string;
  role: string;
  stateConfirmation: boolean;
  statusConfirmation: boolean;
  color?: string;
};

const initialData: membre_AssoModel[] = [
  {
    id: "123",
    name: "kamga djidjou",
    phone: "2376506416",
    creationDate: "12-08-2024",
    role: "Admin",
    stateConfirmation: true,
    statusConfirmation: false,
    color: "#bb0000",
  },
  // Ajoutez d'autres membres pour tester la recherche
];

export default function MobileCardView({ nombre_max = 2 }) {
  const [data, setData] = React.useState<membre_AssoModel[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [buttonLoading, setButtonLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setData(initialData);
    }, 2000);
  }, []);

  const handleRemoveMember = (memberId: string) => {
    setData((prevData) => prevData.filter((member) => member.id !== memberId));
  };

  const handleResendInvitation = (member: membre_AssoModel) => {
    setButtonLoading(true);
    setTimeout(() => {
      console.log("Renvoyer l'invitation à :", member.phone);
      setButtonLoading(false);
    }, 2000);
  };

  const renderActionButtons = (member: membre_AssoModel) => {
    if (!member.stateConfirmation) {
      return (
        <Tooltip title="En attente de validation">
          <HourglassEmptyIcon sx={{ color: "orange" }} />
        </Tooltip>
      );
    } else if (member.stateConfirmation && member.statusConfirmation) {
      return (
        <Tooltip title="Invitation validée">
          <CheckCircleIcon sx={{ color: "green" }} />
        </Tooltip>
      );
    } else {
      return (
        <div>
          <Tooltip title="Échec, renvoyer l'invitation">
            <IconButton onClick={() => handleResendInvitation(member)}>
              {buttonLoading ? (
                <CircularProgress size={24} />
              ) : (
                <CancelIcon sx={{ color: "red" }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Retirer le membre">
            <IconButton onClick={() => handleRemoveMember(member.id)}>
              {buttonLoading ? (
                <CircularProgress size={24} />
              ) : (
                <CancelIcon sx={{ color: "red" }} />
              )}
            </IconButton>
          </Tooltip>
        </div>
      );
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((member) =>
    [member.name, member.phone, member.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, padding: "0px" }}>
      <TextField
        variant="outlined"
        placeholder="Rechercher..."
        onChange={handleSearch}
        sx={{
          marginBottom: "16px",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <Grid container spacing={2}>
        {filteredData.map((member) => (
          <Grid item xs={12} key={member.id}>
            <Card
              sx={{ display: "flex", flexDirection: "column", padding: "0px" }}
            >
              <CardContent
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
              >
                <Avatar sx={{ backgroundColor: member.color }}>
                  {member.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 4 }}>
                  <Typography variant="body1">{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.phone}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#bb0000" }}>
                    {member.role}
                  </Typography>
                  <CardActions>{renderActionButtons(member)}</CardActions>
                </Box>
              </CardContent>
              <Divider sx={{ position: "relative", bottom: "10px" }} />
              <Typography
                variant="body1"
                sx={{ color: "#666666", textAlign: "center" }}
              >
                Invitation initiée le 12 mai 2024
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
