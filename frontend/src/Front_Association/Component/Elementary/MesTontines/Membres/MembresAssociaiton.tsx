import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { CSSProperties } from "@mui/material/styles/createMixins";
import ListeAssociations from "../ListeAssociations";
import ListeMembresAssociation from "./ListeMembresAssociation";
import AssociationServices from "../../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";

export interface MembresAssociationModel {
  id: number;
  name: string;
  role: string;
  phone: string;
  date: Date;
  email: string;
}

const MembresAssociation = () => {
  const [listMembreAssociation, setListMembreAssociation] = useState<
    MembresAssociationModel[]
  >([]);
  const location=useLocation()

  useEffect(()=>{
    MembreAssoInit(location.pathname.split("/")[3])
    console.log("ce code passe bien par ici")
  },[])
  const MembreAssoInit = (idAsso: string) => {
    AssociationServices.GetMembersByAssociationId(idAsso)
      .then((response) => {
        console.log(response.data);
        setListMembreAssociation(response.data);
      })
      .catch((error) => {
        console.log(
          "erreur survenue lors de la recuperation des membres de l'association"
        );
      });
  };
  const addMember = (data: any) => {
    setListMembreAssociation(listMembreAssociation.concat(data));
  };

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
      email: "kamga@gmail.com",
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
          <h1>Les membres de l'association</h1>
        </Box>
        <ListeMembresAssociation data={listMembreAssociation} />
      </Box>
    </div>
  );
};

export default MembresAssociation;
