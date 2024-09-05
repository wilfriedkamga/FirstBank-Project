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
import { CagnotteModel } from "./MesCagnottes";
import DownloadButton from "./ButtonAction/DownloadButton";
import DeleteButton from "./ButtonAction/DeleteButton";
import EditButton from "./ButtonAction/EditButton";

interface Props {
  data: CagnotteModel[];
}
const ListeDettes = ({ data }: Props) => {
  const columns: GridColDef<CagnotteModel>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name_association",
      headerName: "Association",
      flex: 1,
      editable: true,
    },
    {
      field: "name_fund",
      headerName: "Tontine",
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
      field: "mode",
      headerName: "Mode de paiement",
      flex: 1,
      editable: true,
    },
    {
      field: "validateur1",
      headerName: "Validateur 1",
      flex: 1,
      editable: true,
      renderCell: (param) => (
        <>
          {" ++ "}
          <CircularProgress /> {param.row.validateur2}{" "}
        </>
      ),
    },
    {
      field: "validateur2",
      headerName: "Validateur 2",
      flex: 1,
      editable: true,
      renderCell: (param) => (
        <>
          <CircularProgress /> {param.row.validateur2}{" "}
        </>
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

          <DeleteButton cag={params.row} handleDelete={() => null} />
          <DownloadButton cag={params.row} handleDownload={() => null} />
          <EditButton cag={params.row} handleSave={() => null} />
        </Box>
      ),
    },
  ];

  return (
    <div>
      <MUIDatatable<CagnotteModel> columns={columns} data={data} />
    </div>
  );
};

export default ListeDettes;
