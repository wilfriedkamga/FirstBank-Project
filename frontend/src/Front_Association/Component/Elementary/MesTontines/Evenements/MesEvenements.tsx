
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { CSSProperties } from "@mui/material/styles/createMixins";
import ListeAssociations from "../ListeAssociations";
import ListeMembresAssociation from "./ListeEvenements";


export interface MembresAssociationModel {
  id: number;
  name: string;
  role: string;
  phone: string;
  date: Date;
  email: string;

}

const MembresAssociation= () => {

  const [associationList, setAssociationList] = useState<MembresAssociationModel[]>(
    []
  );

 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "absolute",
    fontWeight: "bold",
  };
  const data: MembresAssociationModel[] = [
    {
      id: 1,
      name: "KAMGA DJIDJOU WILFRIED JUNIOR",
      role: "Admin",
      phone: "237650641633",
      date: new Date(12, 8, 2024),
      email:"kamga@gmail.com"
    },
  ];

  return (
    <div>
      <Box m={4}>
      <Box sx={{ marginBottom: "12px",fontWeight:"bold", fontSize:"18px", color:"#dc2626", backgroundColor:"white",borderRadius:"10px", padding:2,  border:"1px solid gray" }}>
          <h1>Les membres de l'association</h1>
        </Box>
        <ListeMembresAssociation data={data} />
      </Box>
    </div>
  );
};

export default MembresAssociation;
