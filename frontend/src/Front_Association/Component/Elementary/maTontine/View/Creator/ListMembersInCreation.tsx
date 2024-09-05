import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteButton from "./ButtonActions/DeleteButton";
import MUIDatatable from "../../MUIDatatable";
import { ActionType, EtatMembre, membreAssoModel } from "../../../../../../Services/Types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import { Delete } from "@mui/icons-material";

interface Props {
  data: membreAssoModel[];
  handleAction:(memb:membreAssoModel, type:ActionType)=>void;
}
const ListMembersInCreation = ({ data, handleAction }: Props) => {
   
   
  const columns: GridColDef<membreAssoModel>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "memberName",
      headerName: "Nom complet",
      flex: 1,
      editable: true,
    },
    {
      field: "memberPhone",
      headerName: "Téléphone",
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
      field: "creationDate",
      headerName: "Date d'arrivée",
      flex: 1,
      editable: true,
    },
    {
      field: "state",
      headerName: "etat",
      flex: 1,
      editable: true,
    },
    {
      field: "state2",
      headerName: "Etat du membre",
      type: "actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2 }}>
          {params.row.state === EtatMembre.INVITE ? (
            <>
              <Tooltip title="En attente de validation">
                <IconButton>
                  <HourglassEmptyIcon sx={{ color: "gray" }} />
                </IconButton>
              </Tooltip>
              <DeleteButton handleDelete={()=>handleAction(params.row,ActionType.CANCEL)} memb={params.row} />
            </>
          ) : null}
          {params.row.state === EtatMembre.ACTIF ? (
            <>
              <Tooltip title="Vous êtes déjà membre de l'association">
                <IconButton>
                  <CheckCircleIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Vous êtes déjà membre de l'association">
                <IconButton disabled>
                  <CancelIcon sx={{ color: "gray" }} />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
          {params.row.state === EtatMembre.REFUSE ? (
            <>
              <Tooltip title="Cette utilisateur a refusé votre invitation">
                <IconButton >
                  <CancelIcon sx={{ color: "#c00" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Supprimer cette utilisateur">
                <IconButton onClick={()=>handleAction(params.row,ActionType.DELETE)}>
                  <Delete sx={{ color: "#c00" }} />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </Box>
      ),
    },
  ];

  return (
    <div>
      <MUIDatatable<membreAssoModel> columns={columns} data={data} />
    </div>
  );
};

export default ListMembersInCreation;
