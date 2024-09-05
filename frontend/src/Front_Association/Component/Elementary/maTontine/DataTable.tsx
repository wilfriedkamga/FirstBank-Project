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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  TextField,
  TableSortLabel,
  CircularProgress,
  Skeleton,
  Box,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import AdminForm from "../Component/AddMemberForm";
import SearchIcon from "@mui/icons-material/Search";
import { visuallyHidden } from "@mui/utils";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssociationServices from "../../../../Services/AssociationServices";
import ButtonComponent from "../../MuiCustomComponent/ButtonCompoenent";
import { AssociationModel } from "../../../../Services/Types/AssociationModels";
import { EtatMembre, membreAssoModel } from "../../../../Services/Types";

// Tableau de couleurs prédéfinies
const avatarColors = [
  "#bb0000", // Rouge vif
  "#119911", // Vert vif
  "#3357FF", // Bleu vif
  "#FF33A6", // Rose vif
  "#FF8C33", // Orange vif
  "#8C33FF", // Violet vif
  "#33FFF6", // Cyan vif
  "#FFDD33", // Jaune vif
];

type props = {
  data: membreAssoModel[];
  nombre_max: number;
};

export default function AccessibleTable({ data, nombre_max = 2 }: props) {
  const [localData, setLocalData] = React.useState<membreAssoModel[]>([]);
  const [open, setOpen] = React.useState(false);
  const [contact, setContact] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof membreAssoModel>("memberName");
  const [loading, setLoading] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [colorIndex, setColorIndex] = React.useState(1); // Suivi de l'indice de couleur

  // Simuler le chargement des données pendant 2 secondes
  React.useEffect(() => {
    console.log("voici les donnees que j'ai reçu" + data);
    setTimeout(() => {
      setLocalData(data);
      setLoading(false);
    }, 2000);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddMember = () => {
    setButtonLoading(true);

    setTimeout(() => {
      const newMember: membreAssoModel = {
        id: (Math.random() * 1000).toString(),
        memberName: "New Member",
        memberPhone: contact,
        creationDate: new Date().toLocaleDateString(),
        role: role, // Assigner une couleur en fonction de l'indice actuel
      };

      setLocalData((prevData) => [...prevData, newMember]);
      setContact("");
      setRole("");
      setButtonLoading(false);
      setColorIndex(colorIndex + 1); // Incrémenter l'indice de couleur
      handleClose();
    }, 2000);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (property: keyof membreAssoModel) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleAnnuler = (member: membreAssoModel) => {
    AssociationServices.AnswerInvitation(member.id)
      .then((response) => {
        const updateMember = {
          ...member,
          statusConfirmation: false,
          stateConfirmation: true,
        };
        setLocalData(
          localData.map((m) => (member.id == m.id ? updateMember : m))
        );
        console.log(localData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRessend = (member: membreAssoModel) => {
    const updateMember = {
      ...member,
      statusConfirmation: false,
      stateConfirmation: false,
    };
    setLocalData(localData.map((m) => (member.id == m.id ? updateMember : m)));
    console.log(localData);
  };

  const handleRemoveMember = (memberId: string) => {
    setLocalData((prevData) =>
      prevData.filter((member) => member.id !== memberId)
    );
  };

  const renderActionButton = (member: membreAssoModel) => {
    if (member.state === EtatMembre.INVITE) {
      return (
        <Tooltip title="En attente de validation">
          <HourglassEmptyIcon sx={{ color: "orange" }} />
        </Tooltip>
      );
    } else if (
      member.state === EtatMembre.ACCEPTE ||
      member.state === EtatMembre.ACTIF
    ) {
      return (
        <Tooltip title="Invitation validée">
          <CheckCircleIcon sx={{ color: "green" }} />
        </Tooltip>
      );
    } else {
      return (
        <div>
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

  const handleResendInvitation = (member: membreAssoModel) => {
    setButtonLoading(true);
    setTimeout(() => {
      console.log("Renvoyer l'invitation à :", member.memberPhone);
      setButtonLoading(false);
    }, 2000);
  };

  const filteredData = localData.filter((member) =>
    [member.memberName, member.memberPhone, member.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedData = React.useMemo(() => {
    return filteredData.sort((a, b) => {
      if (
        orderBy === "memberName" ||
        orderBy === "memberPhone" ||
        orderBy === "role"
      ) {
        if (order === "asc") {
          return a[orderBy]!.localeCompare(b[orderBy]!);
        } else {
          return b[orderBy]!.localeCompare(a[orderBy]!);
        }
      }
      return 0;
    });
  }, [filteredData, order, orderBy]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: 3,
          marginBottom: "10px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Rechercher..."
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{ backgroundColor: "white", borderRadius: "10px" }}
        />
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: "#bb0000",
            borderRadius: "100%",
            "&hover": { backgroundColor: "#aa0000" },
          }}
          disabled={sortedData.length >= nombre_max}
        >
          {buttonLoading ? (
            <CircularProgress size={24} />
          ) : (
            <PersonAddIcon
              sx={{
                fontSize: "20px",
                color: "#ffffff",
                "&hover": { color: "#aa0000" },
              }}
            />
          )}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, padding: "4px" }}
          aria-label="caption table"
        >
          <caption>Members List</caption>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "memberName"}
                  direction={orderBy === "memberName" ? order : "asc"}
                  onClick={() => handleSort("memberName")}
                >
                  Name
                  {orderBy === "memberName" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "memberPhone"}
                  direction={orderBy === "memberPhone" ? order : "asc"}
                  onClick={() => handleSort("memberPhone")}
                >
                  Phone
                  {orderBy === "memberPhone" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "role"}
                  direction={orderBy === "role" ? order : "asc"}
                  onClick={() => handleSort("role")}
                >
                  Role
                  {orderBy === "role" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>État</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar
                    sx={{
                      backgroundColor:
                        avatarColors[index % avatarColors.length],
                    }}
                  >
                    {member.memberName.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>{member.memberName}</TableCell>
                <TableCell>{member.memberPhone}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.creationDate}</TableCell>
                <TableCell>{renderActionButton(member)}</TableCell>
                <TableCell>
                  <ButtonComponent
                    onClick={() => handleAnnuler(member)}
                    text="Annuler"
                    type="error"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box></Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inviter un autre administrateur</DialogTitle>
        <Divider />
        <DialogContent>
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
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button
            onClick={handleAddMember}
            color="primary"
            disabled={buttonLoading}
          >
            {buttonLoading ? <CircularProgress size={24} /> : "Envoyer"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
