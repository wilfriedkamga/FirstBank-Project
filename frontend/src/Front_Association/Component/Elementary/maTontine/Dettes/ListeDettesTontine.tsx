import { Box, Button, CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import {
  CloudDownload,
  Delete,
  Details,
  DocumentScannerSharp,
  Edit,
} from "@mui/icons-material";

import MUIDatatable from "../../maTontine/MUIDatatable";
import { DetteModel } from "./MesDettesTontines";
import DeleteButton from "./ButtonActions/DeleteButton";
import DownloadButton from "./ButtonActions/DownloadButton";
import EditButton from "./ButtonActions/EditButton";

interface Props {
  data: DetteModel[];
}
const ListeDettes = ({ data }: Props) => {
  const columns: GridColDef<DetteModel>[] = [
    {
      field: "name_association",
      headerName: "Nom du membre",
      flex: 1,
      editable: true,
    },
    {
      field: "name",
      headerName: "Rep",
      width:10,
      editable: true,
    },
    {
      field: "name_fund",
      headerName: "Téléphone",
      flex: 1,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      editable: true,
    },
    {
      field: "date3y",
      headerName: "Délais ",
      flex: 1,
      editable: true,
    },
    {
      field: "mode",
      headerName: "Mode ",
      flex: 1,
      editable: true,
    },
    {
      field: "validateur1",
      headerName: "Val 1",
      flex: 1,
      editable: true,
      renderCell: (param) => (
        <div>
           
        </div>
      ),
    },
    {
      field: "validateur",
      headerName: "Val 2",
      flex: 1,
      editable: true,
      renderCell: (param) => (
        <div>
           
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Montant",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* <Button variant="contained">Détails</Button>
          <Button variant="contained" color="warning">Modifier</Button>
          <Button variant="contained" color="error">Supprimer</Button> */}

          <DeleteButton det={params.row} handleDelete={() => null} />
          <DownloadButton det={params.row} handleDownload={() => null} />
          <EditButton det={params.row} handleSave={() => null} />
        </Box>
      ),
    },
  ];

  return (
    <div>
      <MUIDatatable<DetteModel> columns={columns} data={data} />
    </div>
  );
};

export default ListeDettes;
