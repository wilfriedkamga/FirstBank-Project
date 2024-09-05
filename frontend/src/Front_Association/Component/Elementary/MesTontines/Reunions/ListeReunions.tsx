import { Box, Button, CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { CloudDownload, Delete, Details, DocumentScannerSharp, Edit } from "@mui/icons-material";
import MUIDatatable from "../../maTontine/MUIDatatable";
import { ReunionModel } from "./MesReunions";
import DownloadButton from "./DownloadButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";


interface Props {
  data: ReunionModel[];
}


const ListeMembresAssociation = ({ data }: Props) => {
  const columns: GridColDef<ReunionModel>[] = [
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
      renderCell: (params) => (
        <Box sx={{display:"flex", gap:2}}>
          {/* <Button variant="contained">Détails</Button>
          <Button variant="contained" color="warning">Modifier</Button>
          <Button variant="contained" color="error">Supprimer</Button> */}
          <EditButton meet={params.row} handleSave={()=>null} />
          <DeleteButton meet={params.row} handleDelete={()=>null}/>
          <DownloadButton meet={params.row} handleDownload={()=>null}/>
        </Box>
      ),
    },
  ];

  return (
    <div>

      <MUIDatatable<ReunionModel> columns={columns} data={data} />
    </div>
  );
};

export default ListeMembresAssociation;
