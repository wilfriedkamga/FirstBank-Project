import { Box, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Cancel, Check } from "@mui/icons-material";
import MUIDatatable from "../../maTontine/MUIDatatable";
import { EtatMembre, EtatRole, RoleAssoModel } from "../../../../../Services/Types";
import DeleteButton from "./ActionButtons/DeleteButton";
import EditButton from "./ActionButtons/EditButton";

interface Props {
  data: RoleAssoModel[];
}


const ListeRoles = ({ data }: Props) => {
  const columns: GridColDef<RoleAssoModel>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "label",
      headerName: "Label",
      flex: 1,
      editable: true,
    },
    {
      field: "labelV",
      headerName: "Nom du role",
      flex: 1,
      editable: true,
    },
    {
      field: "nbMaxOcc",
      headerName: "Nombre restant",
      flex: 1,
      editable: true,
    },
    {
      field: "privillege",
      headerName: "Privilege du role",
      flex: 1,
      editable: true,
    },
    {
      field: "action",
      headerName: "État du role",
      type: "actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2 }}>
          {params.row.state === EtatRole.VALIDE ? (
            <>
              <EditButton handleDelete={()=>null} member={params.row}/>
              <DeleteButton handleDelete={()=>null} member={params.row} />
            </>
          ) : null}
          {params.row.state === EtatRole.LIMITE ? (
            <>
              <Tooltip title="Vous êtes déjà membre de l'association">
                <IconButton>
                  <Check sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Vous êtes déjà membre de l'association">
                <IconButton >
                  <Cancel sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
          {params.row.state === EtatRole.SUPPRIME ? (
            <>
              <Tooltip title="Cette utilisateur a refusé votre invitation">
                <IconButton >
                  <Cancel sx={{ color: "#c00" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Supprimer cette utilisateur">
                <IconButton onClick={()=>null}>
                  <DeleteButton handleDelete={()=>null} member={params.row} />
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

      <MUIDatatable<RoleAssoModel> columns={columns} data={data} />
    </div>
  );
};

export default ListeRoles;
