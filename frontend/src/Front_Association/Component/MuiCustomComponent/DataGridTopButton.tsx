import { Button } from "@mui/material";
import React from "react";
import { ReactNode, useState } from "react";

interface props {
  children?: ReactNode;
  handleClick: () => void;
  Icon: any;
}
const DataGridTopButton = ({ children, handleClick, Icon }: props) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#c00",
        "&:hover": { backgroundColor: "#b00", color: "white" },
        "&:disabled": { backgroundColor: "#c00", color: "gray" },
      }}
      onClick={handleClick}
      startIcon={Icon}
    >
     
    </Button>
  );
};

export default DataGridTopButton;
