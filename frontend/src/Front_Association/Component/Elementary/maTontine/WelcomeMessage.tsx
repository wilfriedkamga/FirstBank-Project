import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import React, { ReactNode } from "react";

interface props{
    children:ReactNode;
}
const WelcomeMessage = ({children}:props) => {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader title="Message d'information" />
      <Divider sx={{ position: "relative", bottom: "20px" }} />
      <CardContent>
        {children}

      </CardContent>
    </Card>
  );
};

export default WelcomeMessage;
