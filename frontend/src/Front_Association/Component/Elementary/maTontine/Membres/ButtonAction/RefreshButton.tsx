import { TextField, Button, Typography, IconButton } from "@mui/material";
import { Divider } from "@mui/material";
import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import CachedIcon from '@mui/icons-material/Cached';
import {
  ButtonDialog,
  ButtonDialogActions,
  ButtonDialogContent,
  ButtonDialogTitle,
} from "../../../../MuiCustomComponent/ButtonDialog";
import DataGridTopButton from "../../../../MuiCustomComponent/DataGridTopButton";

const RefreshButton = () => {
  const [newDocument, setNewDocument] = useState({ nom: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log("Uploading document");
  };

  return (
    <DataGridTopButton Icon={<CachedIcon/>} handleClick={() => null} />
  );
};

export default RefreshButton;
