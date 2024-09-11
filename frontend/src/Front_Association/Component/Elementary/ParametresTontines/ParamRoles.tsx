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
import MesRoles from './ParamRoles/MesRoles';

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
    <div className="w-full pt-6 h-full min-h-[100vh] flex flex-col">
      <MesRoles/>
    </div>
  );
};

export default ParamRoles;
