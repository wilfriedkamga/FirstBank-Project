import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { CSSProperties } from "@mui/material/styles/createMixins";
import ListeAssociations from "../ListeAssociations";
import ListeMembresAssociation from "./ListeMembresAssociation";
import AssociationServices from "../../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";
import { Add } from "@mui/icons-material";
import AdminForm from "../../Component/AddMemberForm";
import { rolesData } from "../../../../../Services/data";
import { membreAssoModel } from "../../../../../Services/Types";

export interface MembresAssociationModel {
  id: number;
  name: string;
  role: string;
  phone: string;
  date: Date;
  email: string;
}

const MembresAssociation = () => {
 
  const [open, setOpen] = useState<boolean>(false);
  const [contact, setContact] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [data, setData]=useState<membreAssoModel[]>([])
  
  const location=useLocation()

  useEffect(()=>{
    MembreAssoInit(location.pathname.split("/")[3])
  },[])

  const MembreAssoInit = (idAsso: string) => {
    AssociationServices.GetMembersByAssociationId(idAsso)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data)
      })
      .catch((error) => {
        console.log(
          "erreur survenue lors de la recuperation des membres de l'association"
        );
      });
  };

  const handleAddMember=(data:any)=>{
    AssociationServices.AddMemberInCreation(data)
        .then((response) => {
          const membre: membreAssoModel = response.data.data;
          setData((prevData) => [...prevData, membre])
        })
        .catch((error) => {
          console.log(error);
        });
   }

  const handleAddMemberLocal = () => {
    const temp = {
      associationId: location.pathname.split("/")[3],
      fullName: fullName,
      phone: contact,
      role: rolesData.find((role1) => role1.id == role)?.label,
    };
    
    handleAddMember(temp)
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    
  };

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

        <Box sx={{ display: "flex", margin: 1, justifyContent: "end" }}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              padding: 1,
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#b00", color: "white" },
              "&:disabled": { backgroundColor: "#c00", color: "gray" },
            }}
          
          >
            <Add /> Ajouter
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ padding: 2 }}
          >
            <DialogTitle
              sx={{ backgroundColor: "#b00", color: "white" }}
              id="alert-dialog-title"
            >
              Inviter un nouveau membre du bureau
            </DialogTitle>
            <Divider />
            <DialogContent>
              <AdminForm
                id="admin-form"
                keepMounted={false}
                open={open}
                contact={contact}
                setContact={setContact}
                setRole={setRole}
                role={role}
                roleDate={[]} // Ajoutez ici vos données de rôle
              />
            </DialogContent>
            <Divider />
            <DialogActions sx={{ padding: 1 }}>
              <Button
                variant="contained"
                onClick={() =>{ handleAddMemberLocal();}}
                sx={{
                  backgroundColor: "#c00",
                  "&:hover": { backgroundColor: "#a00" },
                }}
              >
                Valider
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#666",
                  "&:hover": { backgroundColor: "#444" },
                }}
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <ListeMembresAssociation data={data} />
      </Box>
    </div>
  );
};

export default MembresAssociation;
