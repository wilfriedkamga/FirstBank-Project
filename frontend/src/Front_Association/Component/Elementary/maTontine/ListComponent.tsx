import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ListProps<T> {
  data: T[];
  columns: { field: string; headerName: string }[];
  actions?: { name: string; action: (item: T) => void }[];
}

export default function ListComponent<T>({
  data,
  columns,
  actions = [],
}: ListProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleActionClick = (action: (item: T) => void) => {
    if (selectedItem) {
      action(selectedItem);
    }
    handleMenuClose();
  };

  return (
    <div className="w-full bg-white ">
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            padding: 1,
          }}
        >
          <Box  sx={{display:"flex",justifyContent:"center", alignItems:"center",gap:2 }}>
            <Avatar />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                200000 FCFA
              </Typography>
              <Typography variant="body2">
                {/*item[columns[1].field] as React.ReactNode*/}12 septembre 2024
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {/*item[columns[2].field] as React.ReactNode*/}12 octobre 2024
              </Typography>
            </Box>
          </Box>

          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(event) => handleMenuOpen(event, item)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      ))}

      {/* Menu contextuel pour les actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => handleActionClick(action.action)}
          >
            {action.name}
          </MenuItem>
        ))}
        <MenuItem onClick={handleModalOpen}>Détails</MenuItem>
      </Menu>

      {/* Modale pour afficher les détails */}
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Détails de l'élément</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {selectedItem &&
              Object.keys(selectedItem).map((key, index) => (
                <Grid item xs={6} key={index}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {key}:
                  </Typography>
                  <Typography variant="body2">
                    {String(selectedItem[key as keyof T])}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
