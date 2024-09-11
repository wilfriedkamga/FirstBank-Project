import { Add } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";

const styles = {
  header: {
    backgroundColor: "#DC2626", // Couleur de l'en-tête
    color: "#FFFFFF", // Couleur du texte de l'en-tête
  },
  body: {
    backgroundColor: "#fff", // Couleur du corps
    color: "#000000", // Couleur du texte du corps
    fontSize: "16px",
  },
  rowHover: {
    backgroundColor: "red.300",
  },
};

interface Props<T> {
  data: T[];
  columns: GridColDef[];
}

export default function MUIDatatable<T>({ data, columns }: Props<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<keyof T[] | [""]>();

  // Filtrer les colonnes avec isFilter: true
  const filterColumns = columns.filter((column) => column.field);

  // Gérer la recherche globale
  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value.toLowerCase());
  // };

  // Gérer le changement de filtre
  const handleFilterChange = (event: SelectChangeEvent<string>) => {};

  return (
    <Box
      sx={{
        maxHeight: 700,
        minHeight: "100px",
        width: "100%",
        marginBottom: "1px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders div": styles.header,
          "& .MuiDataGrid-row:hover": styles.rowHover,
          "& .MuiDataGrid-cell": styles.body,
          "& .MuiDataGrid-footerContainer": styles.body,
        }}
      />
    </Box>
  );
}
