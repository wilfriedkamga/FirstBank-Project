import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const MesReunnionsContent = () => {
  return (
    <div>
      
        <Outlet />
     
    </div>
  );
};

export default MesReunnionsContent;
