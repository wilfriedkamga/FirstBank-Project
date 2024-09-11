import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CSSProperties } from "@mui/material/styles/createMixins";
import AssociationServices from "../../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";
import { Add } from "@mui/icons-material";
import AdminForm from "../../Component/AddMemberForm";
import { rolesData } from "../../../../../Services/data";
import { RoleAssoModel } from "../../../../../Services/Types";
import ListeRoles from "./ListeRoles";

type RoleWithPrivileges = {
  role: string;
  privileges: string[];
};

const availablePrivileges = [
  { name: "Administrateur", description: "Gestion complète de la plateforme" },
  {
    name: "Superadministrateur",
    description: "Accès à toutes les fonctionnalités",
  },
  {
    name: "Membre du bureau",
    description: "Gestion des membres et des ressources",
  },
  {
    name: "Créateur",
    description: "Création de contenu et gestion de ses propres données",
  },
];

const MesRoles = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [contact, setContact] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<RoleWithPrivileges | null>(
    null
  );
  const [role, setRole] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [data, setData] = useState<RoleAssoModel[]>([]);
  const [newRole, setNewRole] = useState<string>("");
  const [newRoleDescription, setNewRoleDescription] = useState<string>("");
  const [newRolePrivileges, setNewRolePrivileges] = useState<string[]>([]);
  const [rolesWithPrivileges, setRolesWithPrivileges] = useState<
    RoleWithPrivileges[]
  >([
    {
      role: "Président",
      privileges: ["Administrateur", "Superadministrateur", "Membre du bureau"],
    },
    {
      role: "Vice-Président",
      privileges: ["Administrateur", "Membre du bureau"],
    },
  ]);

  const location = useLocation();

  useEffect(() => {
    MembreAssoInit(location.pathname.split("/")[3]);
  }, []);

  const MembreAssoInit = (idAsso: string) => {
    AssociationServices.GetMembersByAssociationId(idAsso)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(
          "erreur survenue lors de la recuperation des membres de l'association"
        );
      });
  };

  const handleAddMember = (data: any) => {
    AssociationServices.AddMemberInCreation(data)
      .then((response) => {
        const membre: RoleAssoModel = response.data.data;
        setData((prevData) => [...prevData, membre]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddMemberLocal = () => {
    const temp = {
      associationId: location.pathname.split("/")[3],
      fullName: fullName,
      phone: contact,
      role: rolesData.find((role1) => role1.id == role)?.label,
    };

    handleAddMember(temp);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleSaveRole = () => {
    if (selectedRole) {
      setRolesWithPrivileges(
        rolesWithPrivileges.map((r) =>
          r.role === selectedRole.role
            ? { ...r, privileges: newRolePrivileges }
            : r
        )
      );
    } else {
      setRolesWithPrivileges([
        ...rolesWithPrivileges,
        {
          role: newRole,
          privileges: newRolePrivileges,
        },
      ]);
    }
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewRole("");
    setNewRoleDescription("");
    setNewRolePrivileges([]);
    setSelectedRole(null);
  };

  return (
    <div>
      <Box m={4}>
        <Box
          sx={{
            marginBottom: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#dc2626",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: 2,
            border: "1px solid gray",
          }}
        >
          <h1>association: les enfants de Dieu =={">"} Gestion des roles</h1>
        </Box>

        <Box sx={{ display: "flex", gap: 2, margin: 1, justifyContent: "end" }}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              padding: 1,
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#b00", color: "white" },
              "&:disabled": { backgroundColor: "#c00", color: "gray" },
            }}
          >
            <Add /> Ajouter
          </Button>

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle sx={{ backgroundColor: "#b00", color: "white" }}>
              Ajouter un rôle
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Nom du rôle"
                fullWidth
                variant="outlined"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                variant="outlined"
                value={newRoleDescription}
                onChange={(e) => setNewRoleDescription(e.target.value)}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Privilèges</InputLabel>
                <Select
                  multiple
                  value={newRolePrivileges}
                  onChange={(e) =>
                    setNewRolePrivileges(e.target.value as string[])
                  }
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {availablePrivileges.map((privilege) => (
                    <MenuItem key={privilege.name} value={privilege.name}>
                      <Checkbox
                        checked={newRolePrivileges.indexOf(privilege.name) > -1}
                      />
                      <ListItemText primary={privilege.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#666",
                  "&:hover": { backgroundColor: "#444" },
                }}
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#c00",
                  "&:hover": { backgroundColor: "#a00" },
                }}
                onClick={handleSaveRole}
              >
                Sauvegarder
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            onClick={() => setOpenHelp(true)}
            variant="contained"
            sx={{
              padding: 1,
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#b00", color: "white" },
              "&:disabled": { backgroundColor: "#c00", color: "gray" },
            }}
          >
            <Add /> Aide
          </Button>
          <Dialog
            open={openHelp}
            onClose={() => setOpenHelp(false)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle sx={{ backgroundColor: "#b00", color: "white" }}>Aide sur les privilèges</DialogTitle>
            <Divider/>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Privilège</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availablePrivileges.map((privilege) => (
                      <TableRow key={privilege.name}>
                        <TableCell>{privilege.name}</TableCell>
                        <TableCell>{privilege.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <Divider/>
            <DialogActions>
              <Button
                variant="contained"
                sx={{
                  padding: 1,
                  backgroundColor: "#c00",
                  "&:hover": { backgroundColor: "#b00", color: "white" },
                  "&:disabled": { backgroundColor: "#c00", color: "gray" },
                }}
                onClick={() => setOpenHelp(false)}
              >
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <ListeRoles data={rolesData} />
      </Box>
    </div>
  );
};

export default MesRoles;
