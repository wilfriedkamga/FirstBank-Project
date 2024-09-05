import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { ActionType, membreAssoModel } from "../../../../../../Services/Types";
import ListMembersInCreation from "./ListMembersInCreation";
import { Add, Delete, LocalFireDepartmentSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AdminForm from "../../../Component/AddMemberForm";
import AssociationServices from "../../../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";
import Variable from "../../../../../../Variable";
import { rolesData } from "../../../../../../Services/data";
import { setDate } from "date-fns";

interface Props {
  data: membreAssoModel[];
  handleAction: (memb: membreAssoModel, type: ActionType) => void;
  handleAddMember:(temp:any)=>void;
}
const MembersInCreation = ({ data, handleAction, handleAddMember}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [localData, setLocalData] = useState<membreAssoModel[]>(data);
  const [contact, setContact] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setFullName(user.user.fullName);
  }, []);

  const handleAddMemberLocal = () => {
    const temp = {
      associationId: location.pathname.split("/")[3],
      fullName: fullName,
      phone: contact,
      role: rolesData.find((role1) => role1.id == role)?.label,
    };
    console.log(temp);
    handleAddMember(temp)
    setOpen(false);
    
  };

  const handleDelete = (memb: membreAssoModel) => {
    console.log("supprimer ce membre");
    setLocalData(localData.filter((mem) => mem.id != memb.id));
  };

  useEffect(() => {
    setLocalData(data);
  }, []);

  return (
    <div>
      <Box m={4}>
        <Box
          sx={{
            marginBottom: "1px",
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
            disabled={data.length >= 3}
          >
            <Add />
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
                onClick={() => handleAddMemberLocal()}
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
        <ListMembersInCreation handleAction={handleAction} data={data} />
      </Box>
    </div>
  );
};

export default MembersInCreation;
