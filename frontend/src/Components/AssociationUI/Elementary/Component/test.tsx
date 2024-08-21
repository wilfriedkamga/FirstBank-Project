import * as React from "react";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import AdminForm from "./AddMemberForm"; // Importez le formulaire que nous avons renommé

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type membre_AssoModel = {
  id: string;
  name: string;
  phone: string;
  creationDate: string;
  role: string;
  stateConfirmation: boolean;
  statusConfirmation: boolean;
};

const data: membre_AssoModel[] = [
  {
    id: "123",
    name: "kamga djidjou",
    phone: "2376506416",
    creationDate: "12-08-2024",
    role: "Admin",
    stateConfirmation: false,
    statusConfirmation: false,
  },
];

export default function AccessibleTable() {
  const [open, setOpen] = React.useState(false);
  const [contact, setContact] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderActionButton = (member: membre_AssoModel) => {
    if (!member.stateConfirmation) {
      return <HourglassEmptyIcon sx={{ color: "orange" }} />;
    } else if (member.stateConfirmation && member.statusConfirmation) {
      return <CheckCircleIcon sx={{ color: "green" }} />;
    } else {
      return <CancelIcon sx={{ color: "red" }} />;
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>Members List</caption>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name and Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar>{member.name.charAt(0)}</Avatar>
                </TableCell>
                <TableCell>
                  {member.name} <br /> {member.phone}
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.creationDate}</TableCell>
                <TableCell>{renderActionButton(member)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        disabled={data.length >= 2}
      >
        Ajouter un nouveau membre
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Inviter un autre administrateur
          </Typography>
          <AdminForm
            id="admin-form"
            keepMounted={false}
            open={open}
            contact={contact}
            setContact={setContact}
            setRole={setRole}
            role={role}
            roleDate={[]} // Ajoutez ici vos données de rôle
          />
          <Button onClick={handleClose}>Envoyer</Button>
        </Box>
      </Modal>
    </div>
  );
}
