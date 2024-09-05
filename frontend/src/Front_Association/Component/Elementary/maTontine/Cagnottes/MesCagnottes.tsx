
import { Box } from "@mui/material";
import ListeDettes from "./ListeCagnottes";

export interface CagnotteModel {
  id: number;
  name_association: string;
  name_fund: string;
  mode: string;
  date: Date;
  amount: number;
  validateur1: string;
  validateur2: string;
}

const Mescagnottes= () => {
  const data: CagnotteModel[] = [
    {
      id: 1,
      name_association: "Les enfants de Dieu",
      name_fund: "Caisse 1",
      mode: "En ligne",
      date: new Date(12, 8, 2024),
      amount: 4000000,
      validateur1: "",
      validateur2: "",
    },
  ];

  return (
    <div>
      <Box m={4}>
      <Box sx={{ marginBottom: "12px",fontWeight:"bold", fontSize:"18px", color:"#dc2626", backgroundColor:"white",borderRadius:"10px", padding:2,  border:"1px solid gray" }}>
          <h1>Mes Dettes</h1>
        </Box>
        <ListeDettes data={data} />
      </Box>
    </div>
  );
};

export default Mescagnottes;
