import { Box, Button, CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { CloudDownload, Delete, Details, DocumentScannerSharp, Edit } from "@mui/icons-material";
import MUIDatatable from "../../maTontine/MUIDatatable";
import { MembresAssociationModel } from "./MesEvenements";

interface Props {
  data: MembresAssociationModel[];
}


const ListeMembresAssociation = ({ data }: Props) => {
  const columns: GridColDef<MembresAssociationModel>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nom complet",
      flex: 1,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      editable: true,
    },
    {
      field: "date",
      headerName: "Arrivée",
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    
   
    {
      field: "action",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      renderCell: () => (
        <Box sx={{display:"flex", gap:2}}>
          {/* <Button variant="contained">Détails</Button>
          <Button variant="contained" color="warning">Modifier</Button>
          <Button variant="contained" color="error">Supprimer</Button> */}
          <CloudDownload sx={{cursor:"pointer"}}/>
          <Edit sx={{cursor:"pointer"}} color="primary" />
          <Delete  sx={{cursor:"pointer"}} color="error" />
        </Box>
      ),
    },
  ];

  return (
    <div>

      <MUIDatatable<MembresAssociationModel> columns={columns} data={data} />
    </div>
  );
};

export default ListeMembresAssociation;
