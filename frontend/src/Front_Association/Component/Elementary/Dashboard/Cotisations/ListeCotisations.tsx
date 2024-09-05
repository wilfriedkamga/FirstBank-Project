import { Box, Button, CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import MUIDatatable from "../../maTontine/MUIDatatable";
import { CotisationModel } from "./MesCotisation";
import { Delete, DocumentScannerSharp, Edit } from "@mui/icons-material";

interface Props {
  data: CotisationModel[];
}
const ListeCotisations = ({ data }: Props) => {
  const columns: GridColDef<CotisationModel>[] = [
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
        <>
          {/* <Button variant="contained">Détails</Button>
          <Button variant="contained" color="warning">Modifier</Button>
          <Button variant="contained" color="error">Supprimer</Button> */}

          <DocumentScannerSharp color="primary" />
          <Edit color="primary" />
          <Delete color="error" />
        </>
      ),
    },
  ];

  return (
    <div>
      <MUIDatatable<CotisationModel> columns={columns} data={data} />
    </div>
  );
};

export default ListeCotisations;
