import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { AssociationModel } from "../../../../Services/Types";
import AssociationServices from "../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";


interface props{
  association?:AssociationModel
}

export default function AssoInfo({association}:props) {
  const data = {
    "Nom de l'associaition": "les enfants de Dieu",
    "Date de création": "12 septembre 2024",
  };
  const location=useLocation();
  const [association2, setAssociation2]=React.useState<AssociationModel>()
  

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader title="Information de l'associaiton " />
      <Divider sx={{ position: "relative", bottom: "20px" }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="caption table">
            <TableBody>
              <TableRow key={1}>
                <TableCell component="th" scope="row">
                  Nom de l'association
                </TableCell>
                <TableCell align="right">{association?.assoName}</TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell component="th" scope="row">
                  Nombre de membre
                </TableCell>
                <TableCell align="right">{association?.nbMembre}</TableCell>
              </TableRow>
              <TableRow key={3}>
                <TableCell component="th" scope="row">
                  Date de création
                </TableCell>
                <TableCell align="right">{association?.creationDate}</TableCell>
              </TableRow>
              <TableRow key={4}>
                <TableCell component="th" scope="row">
                  Etat de l'association
                </TableCell>
                <TableCell align="right">{association?.state}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
