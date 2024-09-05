import ListeCotisations from "./ListeSanctions";
import { Box } from "@mui/material";

export interface SanctionModel {
  id: number;
  name_association: string;
  name_fund: string;
  state: boolean;
  date: Date;
  delay:Date;
  amount: number;
  validateur1: string;
  validateur2: string;
}

const MesSanctions = () => {
  
  const data: SanctionModel[] = [
    {
      id: 1,
      name_association: "Les enfants de Dieu",
      name_fund: "Caisse 1",
      state: false,
      date: new Date(12, 8, 2024),
      delay:new Date(24,8,2024),
      amount: 2000,
      validateur1: "",
      validateur2: "",
    },
  ];

  return (
    <div>
      <Box m={4}>
      <Box sx={{ marginBottom: "12px",fontWeight:"bold", fontSize:"18px", color:"#dc2626", backgroundColor:"white",borderRadius:"10px", padding:2,  border:"1px solid gray" }}>
          <h1>Mes Sanctions</h1>
        </Box>
        <ListeCotisations data={data} />
      </Box>
    </div>
  );
};

export default MesSanctions;
