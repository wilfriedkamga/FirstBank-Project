import ListeCotisations from "./ListeCotisations";
import { Box } from "@mui/material";

export interface CotisationModel {
  id: number;
  name_association: string;
  name_fund: string;
  mode: string;
  date: Date;
  amount: number;
  validateur1: string;
  validateur2: string;
}

const MesCotisation = () => {
  const data: CotisationModel[] = [
    {
      id: 1,
      name_association: "Les enfants de Dieu",
      name_fund: "Tontine de 2000",
      date: new Date(2024, 7, 29),
      mode: "Orange money",
      amount: 20000,
      validateur1: "wilfried junior",
      validateur2: "wilfriedjunior",
    },
  ];

  return (
    <div>
      <Box m={4}>
        <Box sx={{ marginBottom: "12px",fontWeight:"bold", fontSize:"18px", color:"#dc2626", backgroundColor:"white",borderRadius:"10px", padding:2,  border:"1px solid gray" }}>
          <h1>Mes Cotisations</h1>
        </Box>
        <ListeCotisations data={data} />
      </Box>
    </div>
  );
};

export default MesCotisation;
