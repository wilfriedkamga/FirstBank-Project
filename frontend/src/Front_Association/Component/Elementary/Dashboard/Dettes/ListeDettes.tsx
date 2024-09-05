import { Box, Button, CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import {
  CloudDownload,
  Delete,
  Details,
  DocumentScannerSharp,
  Edit,
} from "@mui/icons-material";
import { DetteModel } from "./MesDettes";
import MUIDatatable from "../../maTontine/MUIDatatable";
import ListComponent from "../../maTontine/ListComponent";

interface Props {
  data: DetteModel[];
}
const ListeDettes = ({ data }: Props) => {
  const columns: GridColDef<DetteModel>[] = [
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
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* <Button variant="contained">Détails</Button>
          <Button variant="contained" color="warning">Modifier</Button>
          <Button variant="contained" color="error">Supprimer</Button> */}

          <CloudDownload sx={{ cursor: "pointer" }} />
          <Edit sx={{ cursor: "pointer" }} color="primary" />
          <Delete sx={{ cursor: "pointer" }} color="error" />
        </Box>
      ),
    },
  ];

  type dataModel = {
    id: number;
    title: string;
    date: string;
    size: string;
  };

  const data2: dataModel[] = [
    { id: 1, title: "Document 1", date: "2024-08-01", size: "14.37 MB" },
    { id: 2, title: "Document 2", date: "2024-08-02", size: "4.56 MB" },
    { id: 3, title: "Document 1", date: "2024-08-01", size: "14.37 MB" },
    { id: 4, title: "Document 2", date: "2024-08-02", size: "4.56 MB" },
    { id: 5, title: "Document 1", date: "2024-08-01", size: "14.37 MB" },
    { id: 6, title: "Document 2", date: "2024-08-02", size: "4.56 MB" },
    { id: 7, title: "Document 2", date: "2024-08-02", size: "4.56 MB" },
    { id: 8, title: "Document 1", date: "2024-08-01", size: "14.37 MB" },
    { id: 9, title: "Document 2", date: "2024-08-02", size: "4.56 MB" },
    { id: 10, title: "Document 1", date: "2024-08-01", size: "14.37 MB" },
    { id: 11, title: "Document 2", date: "2024-08-02", size: "4.56 MB" },
    // Autres données...
  ];

  const columns22 = [
    { field: "title", headerName: "Titre" },
    { field: "date", headerName: "Date" },
    { field: "size", headerName: "Taille" },
    { field: "size4", headerName: "Taille" },
  ];

  const actions = [
    {
      name: "Supprimer",
      action: (item: dataModel) => console.log("Supprimer", item),
    },
    // Autres actions...
  ];

  return (
    <div>
      <div className="hidden lg:block">
        <MUIDatatable<DetteModel> columns={columns} data={data} />
      </div>
      <div className="block lg:hidden">
        <ListComponent columns={columns22} actions={actions} data={data2} />
      </div>
    </div>
  );
};

export default ListeDettes;
