import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import { CircularProgress, Divider, IconButton } from "@mui/material";
import { RoleAssoModel } from "../../../../../../Services/Types";

interface props {
  handleDelete: (doc: RoleAssoModel) => void;
  member: RoleAssoModel;
}
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

export default function DeleteButton({ handleDelete, member }: props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    React.useState(false);
  const [roleToDelete, setRoleToDelete] =
    React.useState<RoleWithPrivileges | null>(null);
  const [rolesWithPrivileges, setRolesWithPrivileges] = React.useState<
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const confirmDeleteRole = () => {
    if (roleToDelete) {
      setRolesWithPrivileges(
        rolesWithPrivileges.filter((r) => r.role !== roleToDelete.role)
      );
      setRoleToDelete(null);
    }
    setConfirmationDialogOpen(false);
  };

  const localHandleDelete = (member: RoleAssoModel) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handleDelete(member);
      confirmDeleteRole();
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton size="small" onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ backgroundColor: "#b00", color: "white" }}
          id="alert-dialog-title"
        >
          {"Confirmation de suppression ?"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-description"
          >
            Êtes vous sur de vouloir bien supprimer le role suivant ?
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#a00" },
            }}
            onClick={() => localHandleDelete(member)}
          >
            {" "}
            {!isLoading ? (
              "Oui"
            ) : (
              <CircularProgress
                size={20}
                sx={{ color: "white", fontWeight: "bold" }}
              />
            )}{" "}
            <Delete />
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#666",
              "&:hover": { backgroundColor: "#444" },
            }}
            onClick={handleClose}
            autoFocus
          >
            Non
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "#b00", color: "white" }}>
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer le rôle "{member.label}" ? Cette
            action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#a00" },
            }}
            onClick={() => localHandleDelete(member)}
          >
            Valider
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#666",
              "&:hover": { backgroundColor: "#444" },
            }}
            onClick={handleClose}
            color="error"
          >
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
