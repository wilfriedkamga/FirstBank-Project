import { Box, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Cancel, Check, CloudDownload, Delete, Details, DocumentScannerSharp, Edit, HourglassBottom } from "@mui/icons-material";
import MUIDatatable from "../../maTontine/MUIDatatable";
import DownloadButton from "./DownloadButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { EtatMembre, membreAssoModel } from "../../../../../Services/Types";

interface Props {
  data: membreAssoModel[];
}


const ListeMembresAssociation = ({ data }: Props) => {
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
                  <HourglassBottom sx={{ color: "gray" }} />
                </IconButton>
              </Tooltip>
              <DeleteButton handleDelete={()=>null} member={params.row} />
            </>
          ) : null}
          {params.row.state === EtatMembre.ACTIF ? (
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
          {params.row.state === EtatMembre.REFUSE ? (
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

      <MUIDatatable<membreAssoModel> columns={columns} data={data} />
    </div>
  );
};

export default ListeMembresAssociation;
