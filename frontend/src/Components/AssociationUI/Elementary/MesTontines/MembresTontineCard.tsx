import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

type ChildComponentProps = {
  nom: string;
  phone: string;
  role: string;
  email: string;
  photoUrl: string;
  onRemove: () => void;
  onUpdateRole: (newRole: string) => void;
};

const MembresTontineCard = ({
  nom,
  phone,
  role,
  email,
  photoUrl,
  onRemove,
  onUpdateRole,
}: ChildComponentProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState(role);
  const [roleChanged, setRoleChanged] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setNewRole(event.target.value);
    setRoleChanged(event.target.value !== role);
  };

  const handleRoleUpdate = () => {
    onUpdateRole(newRole);
    setRoleChanged(false);
    handleDialogClose();
  };

  const handleRemoveDialogOpen = () => {
    setIsRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = () => {
    setIsRemoveDialogOpen(false);
  };

  const handleRemoveConfirm = () => {
    onRemove();
    handleRemoveDialogClose();
  };

  return (
    <div className="bg-white h-[80px] flex justify-between p-2 shadow-md rounded-md">
      <div className="flex items-center gap-4">
        <div className="font-bold">
          <Avatar sx={{ width: "50px", height: "50px" }} src={photoUrl} />
        </div>
        <div className="flex flex-col">
          <div className="font-bold">{nom}</div>
          <div>{phone}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="text-sm text-gray-600">{role}</div>
        <div className="flex">
          <div className="w-[30px] h-[30px] text-lg font-bold text-white text-center rounded-full">
            <button onClick={handleRemoveDialogOpen}>
              <RemoveCircleOutlineIcon color="error" />
            </button>
          </div>
          <div className="w-[30px] h-[30px] text-lg font-bold text-white text-center rounded-full">
            <button onClick={handleDialogOpen}>
              <VisibilityIcon color="primary" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Informations de l'utilisateur</DialogTitle>
        <DialogContent>
          <div className="flex flex-col items-center">
            <Avatar sx={{ width: "100px", height: "100px", marginBottom: "20px" }} src={photoUrl} />
            <TextField label="Nom" value={nom} fullWidth margin="normal" disabled />
            <TextField label="Téléphone" value={phone} fullWidth margin="normal" disabled />
            <TextField label="Email" value={email} fullWidth margin="normal" disabled />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Rôle</InputLabel>
              <Select
                labelId="role-select-label"
                value={newRole}
                onChange={handleRoleChange}
              >
                <MenuItem value="créateur">Créateur</MenuItem>
                <MenuItem value="président">Président</MenuItem>
                <MenuItem value="membre">Membre</MenuItem>
                {/* Ajoute d'autres rôles selon les besoins */}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          {roleChanged && (
            <Button onClick={handleRoleUpdate} color="primary">
              Sauvegarder
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={isRemoveDialogOpen} onClose={handleRemoveDialogClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <div>Voulez-vous vraiment retirer {nom} de cette association ?</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleRemoveConfirm} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MembresTontineCard;
