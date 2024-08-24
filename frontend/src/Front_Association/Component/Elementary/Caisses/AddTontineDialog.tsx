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
  InputAdornment,
} from "@mui/material";
import AlertDialog from "../Notifications/AlertDialog";
import AssociationServices from "../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";
import DualSelect from "../Component/DualSelect";
import { MembreAssociationModel } from "../../../../Services/Types/MembreAssociationModel";

const tontineTypes = [
  { label: "Dette", value: "dette" },
  { label: "Épargne", value: "epargne" },
  { label: "Sociale", value: "sociale" },
];

const validateurs2 = ["wilfried", "Junior", "kamga", "junior"];

const validateurs: MembreAssociationModel[] = [
  { id: "123", name: "Validateur 1", phone: "237 650641633", role: "createur" },
  { id: "1234", name: "Validateur 2", phone: "237 650505055", role: "membre" },
  {
    id: "12345",
    name: "Validateur 3",
    phone: "237 650646464",
    role: "adhérent",
  },
];
type TTontineMembreModel = {
  id: string;
  nomUtilisateur: string;
  role: string;
  nb_occur: number;
  idutiliateur: string;
  creer_par: string;
};

const ConfirmationDialogRaw = (props: any) => {
  const { onClose, open, ...other } = props;
  const [step, setStep] = React.useState<number>(1);
  const [type, setType] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [associationId, setAssociationId] = React.useState<string>("");
  const [nameTontine, setNameTontine] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [memberCount, setMemberCount] = React.useState<number>(0);
  const [endDate, setEndDate] = React.useState<string>("");
  const [purpose, setPurpose] = React.useState<string>("");
  const [validator1, setValidator1] = React.useState<string>("");
  const [validator2, setValidator2] = React.useState<string>("");
  const [tontineMembreList, setTontineMembreList] = React.useState<
    MembreAssociationModel[]
  >([]);
  const location = useLocation();
  React.useEffect(() => {
    MembreAssoInit(location.pathname.split("/")[3]);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  // Initialisation de la liste des membres de l'association
  const MembreAssoInit = (idAsso: string) => {
    AssociationServices.GetMembersByAssociationId(idAsso)
      .then((response) => {
        console.log(response.data);
        setTontineMembreList(
          MembreAssociationModel.constructData(response.data)
        );
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
      nom: nameTontine,
      type: type,
      description: description,
      date_ouverture: startDate,
      date_fermeture: endDate,
      montant: amount,
      creationDate: Date.now.toString,
      associationId: location.pathname.split("/")[3],
      phoneValidateur1: validator1,
      phoneValidateur2: setValidator2,
    };

    AssociationServices.Createtontine(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {});

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setStep(1);
    setType("");
    setNameTontine("");
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
        <label className="font-bold mb-4">
          Nom de la tontine <label className="text-red-600">*</label>
        </label>
        <TextField
          required
          id="outlined-required"
          label=""
          value={nameTontine}
          defaultValue={nameTontine}
          placeholder="Nom de l'association"
          className="w-full mt-4"
          onChange={(e) => setNameTontine(e.target.value)}
        />
        {type === "dette" && (
          <>
            <label className="font-bold mt-4" htmlFor="">
              Date de début du cycle de cotisation
            </label>
            <TextField
              required
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              inputProps={{ min: today }}
            />

            <label className="font-bold mt-" htmlFor="">
              Montant des cotisations
            </label>

            <TextField
              required
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              placeholder="1000 000 000 000 000"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">FCFA</InputAdornment>
                ),
              }}
              inputProps={{
                min: 1000, // Valeurs minimales autorisées
              }}
            />
          </>
        )}
        {type === "epargne" && (
          <>
            <label className="font-bold mt-" htmlFor="">
              Montant cible par membre
            </label>
            <TextField
              required
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              placeholder="1000 000 000 000 000"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">FCFA</InputAdornment>
                ),
              }}
              inputProps={{
                min: 1000, // Valeurs minimales autorisées
              }}
            />
            <label className="font-bold mt-" htmlFor="">
              Début des cotisations
            </label>
            <TextField
              required
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              inputProps={{ min: today }}
            />
            <label className="font-bold mt-" htmlFor="">
              Fin des cotisations
            </label>

            <TextField
              disabled={startDate.length == 0}
              required
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              inputProps={{ min: startDate }}
            />
          </>
        )}
        {type === "sociale" && (
          <>
            <label className="font-bold mt-" htmlFor="">
              Raison d'être
            </label>
            <TextField
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              fullWidth
              multiline
            />
            <label className="font-bold mt-" htmlFor="">
              Montant minimum attendu
            </label>
            <TextField
              required
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              placeholder="1000 000 000 000 000"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">FCFA</InputAdornment>
                ),
              }}
              inputProps={{
                min: 1000, // Valeurs minimales autorisées
              }}
            />

            <label className="font-bold mt-" htmlFor="">
              Date d'ouverture
            </label>
            <TextField
              required
              label=""
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              inputProps={{ min: today }}
            />
            <label className="font-bold mt-" htmlFor="">
              Date de fermeture
            </label>
            <TextField
              required
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              inputProps={{ min: today }}
            />
          </>
        )}
        <DualSelect
          label1="Validateur 1"
          label2="Validateur 2"
          options={tontineMembreList}
          setValue1={setValidator1}
          setValue2={setValidator2}
        />
      </>
    );
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "40%", maxHeight: 600 },
      }}
      maxWidth="md"
      open={open}
      {...other}
    >
      <DialogTitle className="font-bold">
        {step === 1 ? "Choisir le type de tontine" : "Créer une tontine"}
      </DialogTitle>
      <DialogContent  dividers>
        {step === 1 ? (
          <FormControl fullWidth margin="normal">
            <label className="mb-3 font-bold">Type de tontine</label>
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
