import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import { Checkbox, CircularProgress, Divider, FormControl, IconButton, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { RoleAssoModel } from "../../../../../../Services/Types";
import { Edit } from "@mui/icons-material";




interface props{
    handleDelete:(doc:RoleAssoModel)=>void;
    member:RoleAssoModel;
}
type RoleWithPrivileges = {
  role: string;
  privileges: string[];
};

const availablePrivileges = [
  { name: 'Administrateur', description: 'Gestion complète de la plateforme' },
  { name: 'Superadministrateur', description: 'Accès à toutes les fonctionnalités' },
  { name: 'Membre du bureau', description: 'Gestion des membres et des ressources' },
  { name: 'Créateur', description: 'Création de contenu et gestion de ses propres données' },
];

export default function EditButton({handleDelete, member}:props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<RoleWithPrivileges | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = React.useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);
  const [roleToDelete, setRoleToDelete] = React.useState<RoleWithPrivileges | null>(null);
  const [newRole, setNewRole] = React.useState<string>('');
  const [newRoleDescription, setNewRoleDescription] = React.useState<string>('');
  const [newRolePrivileges, setNewRolePrivileges] = React.useState<string[]>([]);
  const [rolesWithPrivileges, setRolesWithPrivileges] = React.useState<RoleWithPrivileges[]>([
    { role: 'Président', privileges: ['Administrateur', 'Superadministrateur', 'Membre du bureau'] },
    { role: 'Vice-Président', privileges: ['Administrateur', 'Membre du bureau'] },
  ]);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const localHandleDelete=(member:RoleAssoModel)=>{
    setIsLoading(true)

    setTimeout(() => {
        setIsLoading(false)
        handleDelete(member)
        
    }, 2000);
  }

  const handleClose = () => {
    setDialogOpen(false);
  };

  
  const handleSaveRole = () => {
    if (selectedRole) {
      setRolesWithPrivileges(rolesWithPrivileges.map(r =>
        r.role === selectedRole.role ? { ...r, privileges: newRolePrivileges } : r
      ));
    } else {
      setRolesWithPrivileges([...rolesWithPrivileges, {
        role: newRole,
        privileges: newRolePrivileges,
      }]);
    }
    setDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewRole('');
    setNewRoleDescription('');
    setNewRolePrivileges([]);
    setSelectedRole(null);
  };

  return (
    <React.Fragment>
      <IconButton size="small" onClick={handleClickOpen}>
        <Edit/>
      </IconButton>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{backgroundColor:"#b00", color:"white"}}>{selectedRole ? 'Modifier le rôle' : 'Ajouter un rôle'}</DialogTitle>
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
              onChange={(e) => setNewRolePrivileges(e.target.value as string[])}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {availablePrivileges.map((privilege) => (
                <MenuItem key={privilege.name} value={privilege.name}>
                  <Checkbox checked={newRolePrivileges.indexOf(privilege.name) > -1} />
                  <ListItemText primary={privilege.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button  sx={{backgroundColor:"#666", color:"white","&:hover":{backgroundColor:"#444", color:"white"}}} onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button sx={{backgroundColor:"#c00", color:"white", "&:hover":{backgroundColor:"#a00", color:"white"}}} onClick={handleSaveRole}>Sauvegarder</Button>
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  );
}
