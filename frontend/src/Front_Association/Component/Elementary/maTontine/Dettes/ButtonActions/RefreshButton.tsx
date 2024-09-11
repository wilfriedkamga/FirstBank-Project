import { TextField, Button, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { useState } from 'react';
import { Add } from "@mui/icons-material";
import { ButtonDialog, ButtonDialogActions, ButtonDialogContent, ButtonDialogTitle } from "../../../../MuiCustomComponent/ButtonDialog";

const RefreshButton = () => {
  const [newDocument, setNewDocument] = useState({ nom: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen]=useState<boolean>(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log('Uploading document');
  };

  return (
    <ButtonDialog open={open} setOpen={setOpen} buttonText="Ajouter" icon={<Add/>}>
      <ButtonDialogTitle>Ajouter un nouveau membre</ButtonDialogTitle>
      <Divider />
      <ButtonDialogContent>
        <TextField
          margin="normal"
          label="Nom"
          fullWidth
          value={newDocument.nom}
          onChange={(e) => setNewDocument({ ...newDocument, nom: e.target.value })}
        />
        <TextField
          margin="normal"
          label="Description"
          fullWidth
          multiline
          value={newDocument.description}
          onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
        />
      </ButtonDialogContent>
      <Divider />
      <ButtonDialogActions>
        <Button
          sx={{ backgroundColor: "#666", color: "white", "&:hover": { backgroundColor: "#444", color: "white" } }}
          onClick={() => {setNewDocument({ nom: "", description: "" });setOpen(false)}}
        >
          Annuler
        </Button>
        <Button
          sx={{ backgroundColor: "#b00", color: "white", "&:hover": { backgroundColor: "#a00", color: "white" } }}
          onClick={handleUpload}
          disabled={!newDocument.nom}
        >
          Ajouter
        </Button>
      </ButtonDialogActions>
    </ButtonDialog>
  );
};

export default RefreshButton;
