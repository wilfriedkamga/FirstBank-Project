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
import { MembreTontineModel } from "./MesMembresTontines";
import DeleteButton from "./ButtonAction/DeleteButton";
import DownloadButton from "./ButtonAction/DownloadButton";
import EditButton from "./ButtonAction/EditButton";

interface Props {
  data: MembreTontineModel[];
}
const ListeDettes = ({ data }: Props) => {
  const columns: GridColDef<MembreTontineModel>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name_association",
      headerName: "Nom du membre",
      flex: 1,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Téléphone",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "name_fund",
      headerName: "Nombre de noms",
      flex: 1,
      editable: true,
    },
    
    {
      field: "date",
      headerName: "Date d'arrivée",
      flex: 1,
      editable: true,
    },
    {
      field: "mode",
      headerName: "Validateur",
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
          <DeleteButton member={params.row} handleDelete={() => null} />
          <DownloadButton member={params.row} handleDownload={() => null} />
          <EditButton member={params.row} handleSave={() => null} />
        </Box>
      ),
    },
  ];

  return (
    <div>
      <MUIDatatable<MembreTontineModel> columns={columns} data={data} />
    </div>
  );
};

export default ListeDettes;
