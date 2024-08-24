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

type membre_AssoModel = {
  id: string;
  name: string;
  phone: string;
  creationDate: string;
  role: string;
  stateConfirmation: boolean;
  statusConfirmation: boolean;
  color?: string; // Ajouter une propriété de couleur
};

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

const initialData: membre_AssoModel[] = [
  {
    id: "123",
    name: "kamga djidjou",
    phone: "2376506416",
    creationDate: "12-08-2024",
    role: "Admin",
    stateConfirmation: true,
    statusConfirmation: true,
    color: avatarColors[0], // Assigner une couleur initiale
  },
];
type props = {
  data: membre_AssoModel[];
  nombre_max: number;
};

export default function AccessibleTable({ data, nombre_max = 2 }: props) {
  const [localData, setLocalData] = React.useState<membre_AssoModel[]>([]);
  const [open, setOpen] = React.useState(false);
  const [contact, setContact] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof membre_AssoModel>("name");
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
      const newMember: membre_AssoModel = {
        id: (Math.random() * 1000).toString(),
        name: "New Member",
        phone: contact,
        creationDate: new Date().toLocaleDateString(),
        role: role,
        stateConfirmation: false,
        statusConfirmation: false,
        color: avatarColors[colorIndex % avatarColors.length], // Assigner une couleur en fonction de l'indice actuel
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

  const handleSort = (property: keyof membre_AssoModel) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleAnnuler=(member:membre_AssoModel)=>{
    const updateMember={...member, statusConfirmation:false, stateConfirmation:true}
    setLocalData(localData.map(m=>member.id==m.id?updateMember:m))
    console.log(localData)
  }

  const handleRessend=(member:membre_AssoModel)=>{
    const updateMember={...member, statusConfirmation:false, stateConfirmation:false}
    setLocalData(localData.map(m=>member.id==m.id?updateMember:m))
    console.log(localData)
  }

  const handleRemoveMember = (memberId: string) => {
    setLocalData((prevData) =>
      prevData.filter((member) => member.id !== memberId)
    );
  };

  const renderActionButton = (member: membre_AssoModel) => {
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

  const handleResendInvitation = (member: membre_AssoModel) => {
    setButtonLoading(true);
    setTimeout(() => {
      console.log("Renvoyer l'invitation à :", member.phone);
      setButtonLoading(false);
    }, 2000);
  };

  const filteredData = localData.filter((member) =>
    [member.name, member.phone, member.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedData = React.useMemo(() => {
    return filteredData.sort((a, b) => {
      if (orderBy === "name" || orderBy === "phone" || orderBy === "role") {
        if (order === "asc") {
          return a[orderBy].localeCompare(b[orderBy]);
        } else {
          return b[orderBy].localeCompare(a[orderBy]);
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
          sx={{ backgroundColor: "#bb0000", borderRadius:"100%", "&hover":{backgroundColor:"#aa0000"} }}
          disabled={sortedData.length>=nombre_max}
        >
          {buttonLoading ? (
            <CircularProgress size={24} />
          ) : (
            
            <PersonAddIcon sx={{ fontSize: "20px", color:"#ffffff","&hover":{color:"#aa0000"}}} />
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
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                  {orderBy === "name" ? (
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
                  active={orderBy === "phone"}
                  direction={orderBy === "phone" ? order : "asc"}
                  onClick={() => handleSort("phone")}
                >
                  Phone
                  {orderBy === "phone" ? (
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
                    {member.name.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.creationDate}</TableCell>
                <TableCell>{renderActionButton(member)}</TableCell>
                <TableCell>
                 {!member.stateConfirmation&&<ButtonComponent onClick={()=>handleAnnuler(member)} text="Annuler" type="error"/>}
                 {member.stateConfirmation && !member.statusConfirmation?<ButtonComponent onClick={()=>handleRessend(member)} type="error" text="Renvoyer"/>: member.stateConfirmation &&<ButtonComponent type="warning" text="Terminé"/>}
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box></Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inviter un autre administrateur</DialogTitle>
        <Divider/>
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
        <Divider/>
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
