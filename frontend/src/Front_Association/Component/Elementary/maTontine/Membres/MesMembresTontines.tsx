import { Box } from "@mui/material";
import ListeDettes from "./ListeMembresTontine";
import AddButton from "./ButtonAction/AddButton";
import RefreshButton from "./ButtonAction/RefreshButton";

export interface MembreTontineModel {
  id: number;
  name_association: string;
  name_fund: string;
  mode: string;
  date: Date;
  amount: number;
  validateur1: string;
  validateur2: string;
}

const MesMembresTontine = () => {
  const data: MembreTontineModel[] = [
    {
      id: 1,
      name_association: "KAMGA DJIDJOU WILFRIED",
      name_fund: "2",
      mode: "237650641633",
      date: new Date(12, 8, 2024),
      amount: 237650641633,
      validateur1: "",
      validateur2: "",
    },
  ];

  return (
    <div>
      <Box m={4}>
        <Box
          sx={{
            marginBottom: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#dc2626",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: 2,
            border: "1px solid gray",
          }}
        >
          <h1>Mes Dettes</h1>
        </Box>
        <Box sx={{ display: "flex",gap:2, margin: 1, justifyContent: "end" }}>
        <AddButton/>  
        <RefreshButton/>
        </Box>
        <ListeDettes data={data} />
      </Box>
    </div>
  );
};

export default MesMembresTontine;
