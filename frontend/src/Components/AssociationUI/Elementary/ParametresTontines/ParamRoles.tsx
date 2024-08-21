import React, { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  DialogContentText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; // Pour supprimer un rôle
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Pour le bouton d'aide
import Footer from '../Footer/Footer';

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

const ParamRoles = () => {
  const [rolesWithPrivileges, setRolesWithPrivileges] = useState<RoleWithPrivileges[]>([
    { role: 'Président', privileges: ['Administrateur', 'Superadministrateur', 'Membre du bureau'] },
    { role: 'Vice-Président', privileges: ['Administrateur', 'Membre du bureau'] },
  ]);

  const [selectedRole, setSelectedRole] = useState<RoleWithPrivileges | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<RoleWithPrivileges | null>(null);
  const [newRole, setNewRole] = useState<string>('');
  const [newRoleDescription, setNewRoleDescription] = useState<string>('');
  const [newRolePrivileges, setNewRolePrivileges] = useState<string[]>([]);

  const handleRoleChange = (role: RoleWithPrivileges) => {
    setSelectedRole(role);
    setNewRole(role.role);
    setNewRolePrivileges(role.privileges);
    setDialogOpen(true);
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

  const handleDeleteRole = (roleToDelete: RoleWithPrivileges) => {
    setRoleToDelete(roleToDelete);
    setConfirmationDialogOpen(true);
  };

  const confirmDeleteRole = () => {
    if (roleToDelete) {
      setRolesWithPrivileges(rolesWithPrivileges.filter(r => r.role !== roleToDelete.role));
      setRoleToDelete(null);
    }
    setConfirmationDialogOpen(false);
  };

  const cancelDeleteRole = () => {
    setRoleToDelete(null);
    setConfirmationDialogOpen(false);
  };

  const resetForm = () => {
    setNewRole('');
    setNewRoleDescription('');
    setNewRolePrivileges([]);
    setSelectedRole(null);
  };

  return (
    <div className="w-full bg-gray-300 pt-6 h-full min-h-[100vh] flex flex-col">
      <Grid container spacing={2} className="flex-grow p-2">
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h5" gutterBottom>
                Gérer les rôles ici
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="right">
              <Tooltip title="Aide sur les privilèges">
                <IconButton onClick={() => setHelpDialogOpen(true)}>
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rôle</TableCell>
                  <TableCell>Privilèges</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rolesWithPrivileges.map((role) => (
                  <TableRow key={role.role}>
                    <TableCell>{role.role}</TableCell>
                    <TableCell>{role.privileges.join(', ')}</TableCell>
                    <TableCell>
                      <Tooltip title="Modifier le rôle">
                        <IconButton onClick={() => handleRoleChange(role)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer le rôle">
                        <IconButton onClick={() => handleDeleteRole(role)}>
                          <DeleteForeverIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={() => setDialogOpen(true)} sx={{ mt: 2 }}>
            Ajouter un rôle
          </Button>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{selectedRole ? 'Modifier le rôle' : 'Ajouter un rôle'}</DialogTitle>
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
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleSaveRole}>Sauvegarder</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmationDialogOpen} onClose={cancelDeleteRole}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer le rôle "{roleToDelete?.role}" ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteRole}>Annuler</Button>
          <Button onClick={confirmDeleteRole} color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={helpDialogOpen} onClose={() => setHelpDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Aide sur les privilèges</DialogTitle>
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
        <DialogActions>
          <Button onClick={() => setHelpDialogOpen(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
      <div className="w-full h-fit z-20">
        <Footer />
      </div>
    </div>
  );
};

export default ParamRoles;
