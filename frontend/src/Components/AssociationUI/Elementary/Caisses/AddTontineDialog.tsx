import * as React from "react";
import {
  Box,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import AlertDialog from "../Notifications/AlertDialog";
import AssociationServices from "../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";

const tontineTypes = [
  { label: "Dette", value: "dette" },
  { label: "Épargne", value: "epargne" },
  { label: "Sociale", value: "sociale" },
];

const validateurs = [
  { label: "Validateur 1", value: "validateur1" },
  { label: "Validateur 2", value: "validateur2" },
  { label: "Validateur 3", value: "validateur3" },
];
type TTontineMembreModel = {
  id: string;
  nomUtilisateur: string;
  role: string;
  nb_occur:number;
  idutiliateur: string;
  creer_par: string;
};

const ConfirmationDialogRaw = (props: any) => {
  const { onClose, open, ...other } = props;
  const [step, setStep] = React.useState<number>(1);
  const [type, setType] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [memberCount, setMemberCount] = React.useState<number>(0);
  const [endDate, setEndDate] = React.useState<string>("");
  const [purpose, setPurpose] = React.useState<string>("");
  const [validator1, setValidator1] = React.useState<string>("");
  const [validator2, setValidator2] = React.useState<string>("");
  const [tontineMembreList, setTontineMembreList]=React.useState<TTontineMembreModel[]>([])
 const location=useLocation()
 React.useEffect (() => {
  MembreAssoInit(location.pathname.split("/")[3]);
}, []);

// Initialisation de la liste des membres de l'association
const MembreAssoInit = (idAsso: string) => {
  AssociationServices.GetMembersByAssociationId(idAsso)
    .then((response) => {
      console.log(response.data);
      setTontineMembreList(response.data);
    })
    .catch((error) => {
      console.log(
        "erreur survenue lors de la recuperation des membres de l'association"
      );
    });
};
const addMember = (data: any) => {
  setTontineMembreList(tontineMembreList.concat(data));
};

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = {
      type,
      name,
      startDate,
      amount,
      memberCount,
      endDate,
      purpose,
      validator1,
      validator2,
    };
    // addAssociation(data);
    // onClose();
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setType("");
    setName("");
    setStartDate("");
    setAmount("");
    setMemberCount(0);
    setEndDate("");
    setPurpose("");
    setValidator1("");
    setValidator2("");
  };

  const renderFormFields = () => {
    return (
      <>
        {type === "dette" && (
          <>
            <TextField
              required
              label="Nom de la tontine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Date de début du cycle de cotisation"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Montant des cotisations"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Nombre de membres"
              type="number"
              value={memberCount}
              onChange={(e) => setMemberCount(Number(e.target.value))}
              fullWidth
              margin="normal"
            />
          </>
        )}
        {type === "epargne" && (
          <>
            <TextField
              required
              label="Nom de la caisse"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Nombre de membres"
              type="number"
              value={memberCount}
              onChange={(e) => setMemberCount(Number(e.target.value))}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Début des cotisations"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Fin des cotisations"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
          </>
        )}
        {type === "sociale" && (
          <>
            <TextField
              required
              label="Nom de la tontine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Raison d'être"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Montant minimum attendu"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Date d'ouverture"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Date de fermeture"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
          </>
        )}
        <FormControl fullWidth margin="normal">
          <label>Validateur 1</label>
          <Select
            value={validator1}
            onChange={(e) => setValidator1(e.target.value as string)}
          >
            {validateurs
              .filter((val) => val.value !== validator2)
              .map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <label>Validateur 2</label>
          <Select
            value={validator2}
            onChange={(e) => setValidator2(e.target.value as string)}
          >
            {validateurs
              .filter((val) => val.value !== validator1)
              .map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </>
    );
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "35%", maxHeight: 600 },
      }}
      maxWidth="md"
      open={open}
      {...other}
    >
      <DialogTitle className="font-bold">
        {step === 1 ? "Choisir le type de tontine" : "Créer une tontine"}
      </DialogTitle>
      <DialogContent dividers>
        {step === 1 ? (
          <FormControl fullWidth margin="normal">
            <label>Type de tontine</label>
            <Select value={type} onChange={handleTypeChange}>
              {tontineTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          renderFormFields()
        )}
      </DialogContent>
      <DialogActions>
        {step === 2 && (
          <Button sx={{ color: "red" }} onClick={handleBack}>
            Retour
          </Button>
        )}
        <Button sx={{ color: "red" }} autoFocus onClick={handleCancel}>
          Annuler
        </Button>
        {step === 1 ? (
          <Button sx={{ color: "red" }} disabled={!type} onClick={handleNext}>
            Suivant
          </Button>
        ) : (
          <Button sx={{ color: "red" }} onClick={handleSubmit}>
            Créer
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default function AddTontineDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClickOpen}
        className="text-xl cursor-pointer absolute sm:bottom-8 sm:right-8 right-8 bottom-[75px] w-[70px] h-[70px] sm:h-[60px] sm:w-[60px] flex justify-center items-center rounded-full bg-red-700 text-white font-bold"
      >
        +
      </div>
      <ConfirmationDialogRaw open={open} onClose={handleClose} />
      <AlertDialog />
    </>
  );
}
