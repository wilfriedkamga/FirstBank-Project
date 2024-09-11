import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Divider,
  Box,
} from "@mui/material";
import { ReactNode, useState } from "react";

// ButtonDialogTitle Component
const ButtonDialogTitle = ({ children }: { children: ReactNode }) => (
  <MuiDialogTitle
    sx={{
      padding: 1,
      backgroundColor: "#b00",
      color: "white",
      "&:hover": { backgroundColor: "#a00", color: "white" },
    }}
  >
    {children}
  </MuiDialogTitle>
);

// ButtonDialogContent Component
const ButtonDialogContent = ({ children }: { children: ReactNode }) => (
  <MuiDialogContent>{children}</MuiDialogContent>
);

// ButtonDialogActions Component
const ButtonDialogActions = ({ children }: { children: ReactNode }) => (
  <MuiDialogActions sx={{ padding: 1 }}>{children}</MuiDialogActions>
);

// ButtonDialog Component
interface ButtonDialogProps {
  icon?: ReactNode;
  buttonText: string;
  children: ReactNode;
  open:boolean;
  setOpen:(show:boolean)=>void; // The content inside the Dialog, can contain ButtonDialogTitle, ButtonDialogContent, ButtonDialogActions, etc.
}

const ButtonDialog = ({ icon = <Add />, buttonText, children,open,setOpen }: ButtonDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ display: "flex", margin: 1, justifyContent: "end" }}>
      <Button
        onClick={()=>setOpen(true)}
        variant="contained"
        sx={{
          padding: 1,
          backgroundColor: "#c00",
          "&:hover": { backgroundColor: "#b00", color: "white" },
          "&:disabled": { backgroundColor: "#c00", color: "gray" },
        }}
        startIcon={icon}
      >
        {buttonText}
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        {children}
      </Dialog>
    </Box>
  );
};

export { ButtonDialog, ButtonDialogTitle, ButtonDialogContent, ButtonDialogActions };
