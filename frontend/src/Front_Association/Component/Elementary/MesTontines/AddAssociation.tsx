import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {
  Alert,
  DialogContentText,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import axios from "axios";

import AssoNotificationDialog from "./AssoNotificationDialog";

import PhoneInputRole from "./PhoneInputRole";
import AssociationServices from "../../../../Services/AssociationServices";
import Variable from "../../../../Variable";
import SelectItem from "../Component/SelectItem";
import Authentications from "../../../../Services/Authentications";
import NotificationService from "../../../../Services/NotificationService";
import { days, frequencies, rolesData } from "../../../../Services/data";
import { RoleAssoModel } from "../../../../Services/Types";
import SelectItem2 from "../Component/SelectItem2";
import { MembreAssociationModel } from "../../../../Services/Types/MembreAssociationModel";
import DualSelect from "../Component/DualSelect";
import { AssociationModel } from "../../../../Services/Types/AssociationModels";
type childComponents = {
  options: string[];
};

type childProps = {
  setData: (data: any) => void;
  printError: (title: string, message: string) => void;
};

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
  addAssociation: (data: AssociationModel) => void;
  printError: (title: string, message: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const {
    onClose,
    value: valueProp,
    open,
    addAssociation,
    printError,
    ...other
  } = props;

  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  const [end, setEnd] = React.useState<boolean>(false);
  const [notifTitle, setNotifTitle] = React.useState<string>("");
  const [notifMessage, setNotifMessage] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [contact1, setContact1] = React.useState<string>("");
  const [contact2, setContact2] = React.useState<string>("");
  const [contact3, setContact3] = React.useState<string>("");
  const [errorRole1, setErrorRole1] = React.useState<boolean>(true);
  const [role1, setRole1] = React.useState<string>("");
  const [errorRole2, setErrorRole2] = React.useState<boolean>(true);
  const [role2, setRole2] = React.useState<string>("");
  const [role3, setRole3] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [nameTontine, setNameTontine] = React.useState<string>("");
  const [errorRole3, setErrorRole3] = React.useState<boolean>(true);
  const [defaultRoles, setDefaultRoles] =
    React.useState<RoleAssoModel[]>(rolesData);
  const [rolesAvailable, setRolesAvailable] =
    React.useState<RoleAssoModel[]>(rolesData);

  const [defaultFrequencies, setDefaultFrequencies] = React.useState<any[]>([]);
  const [day, setDay] = React.useState("");
  const [name, setName] = React.useState("");
  const [nameIsValid, setNameIsValid] = React.useState<boolean>(false);
  const [frequence, setFrequence] = React.useState("");
  const [activate, setActivate] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [inviter1IsLoading, setInviter1IsLoading] =
    React.useState<boolean>(false);
  const [inviter2IsLoading, setInviter2IsLoading] =
    React.useState<boolean>(false);
  const [noContact2, setNoContact2] = React.useState<boolean>(false);
  const [noContact3, setNoContact3] = React.useState<boolean>(false);
  const [PagesVisibility, setPagesVisibility] = React.useState({
    page1: true,
    page2: false,
    page3: false,
    page4: false,
  });

  const [startDate, setStartDate] = React.useState<string>("");
  const [amount, setAmount] = React.useState<number>();
  const [memberCount, setMemberCount] = React.useState<number>();
  const [endDate, setEndDate] = React.useState<string>("");
  const [purpose, setPurpose] = React.useState<string>("");
  const [validator1, setValidator1] = React.useState<string>("");
  const [validator2, setValidator2] = React.useState<string>("");
  const [tontineMembreList, setTontineMembreList] = React.useState<
    MembreAssociationModel[]
  >([]);
  const [errors, setErrors] = React.useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

  // Les variables pour garder le contexte
  const [phone1, setPhone1] = React.useState("");
  const [phone2, setPhone2] = React.useState("");

  const tontineTypes = [
    { label: "Dette", value: "dette" },
    { label: "Épargne", value: "epargne" },
    { label: "Sociale", value: "sociale" },
  ];

  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([
    "",
    "",
    "",
  ]);

  const today = new Date().toISOString().split("T")[0]; // Date d'aujourd'hui au format YYYY-MM-DD

  const validateDates = () => {
    const newErrors: { startDate?: string; endDate?: string } = {};

    if (startDate < today) {
      newErrors.startDate =
        "La date de début ne peut pas être antérieure à aujourd'hui.";
    }

    if (startDate && endDate && endDate <= startDate) {
      newErrors.endDate =
        "La date de fin doit être postérieure à la date de début.";
    }

    setErrors(newErrors);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    validateDates();
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    validateDates();
  };

  const handleRoleSelect = (index: number, role: RoleAssoModel) => {
    const newSelectedRoles = [...selectedRoles];
    newSelectedRoles[index] = role.id;
    setSelectedRoles(newSelectedRoles);
    if (index == 0) {
      setRole1(role.label);
    }
    if (index == 1) {
      setRole2(role.label);
    }
    if (index == 2) {
      setRole3(role.label);
    }
  };

  const getAvailableRoles = (index: number) => {
    return rolesAvailable.filter(
      (role) =>
        !selectedRoles.includes(role.id) || selectedRoles[index] === role.id
    );
  };

  const nb_chiffre_tel = Variable.nb_chiffres_telephone;

  React.useEffect(() => {
    setTontineMembreList([
      { id: "1", name: " ", phone: contact1, role: role1 },
      { id: "2", name: " ", phone: contact2, role: role2 },
      { id: "3", name: " ", phone: contact3, role: role3 },
    ]);
  }, [contact1, contact2, contact3]);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
    if (role1.length != 0) {
      setErrorRole1(false);
    }
    if (role2.length != 0) {
      setErrorRole2(false);
    }
    if (role3.length != 0) {
      setErrorRole3(false);
    }
    if (
      contact2.length >= nb_chiffre_tel &&
      contact3.length >= nb_chiffre_tel &&
      !errorRole1 &&
      !errorRole2 &&
      !errorRole3 &&
      !noContact2 &&
      !noContact3
    ) {
      setActivate(true);
    }
    if (contact2.length < nb_chiffre_tel || contact3.length < 10) {
      setActivate(false);
      setErrorRole2(false);
      setErrorRole3(false);
    }
  });

  React.useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setContact1(user.user.phone);
    setDefaultRoles(rolesData);
    setRolesAvailable(rolesData);
    setDefaultFrequencies(frequencies);
  }, []);

  React.useEffect(() => {
    const checkPhoneValidity = async () => {
      if (contact2.length >= 12) {
        const existancePhone2 = await verifyPhone(contact2);
        if (!existancePhone2) {
          setNoContact2(true);
        } else {
          setNoContact2(false);
        }
      }
      if (contact3.length >= 12) {
        const existancePhone3 = await verifyPhone(contact3);
        if (!existancePhone3) {
          setNoContact3(true);
        } else {
          setNoContact3(false);
        }
      }
    };

    checkPhoneValidity();
  }, [contact3, contact2]);

  React.useEffect(() => {
    const checkNameValidity = async () => {
      const statusVerifAssoName = await verifyAssociationName(name, contact1);
      if (!statusVerifAssoName) {
        setNameIsValid(true);
      } else {
        setNameIsValid(false);
      }
    };

    checkNameValidity();
  }, [name]);

  // Recupération des roles qui sont dans l'application

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  async function verifyPhone(phone: string): Promise<boolean> {
    try {
      const response = await Authentications.verifyUserHasAccount(phone);
      console.log(response.status === 200);
      return response.status === 200;
    } catch (error) {
      console.error("Error verifying phone:", error);
      return false;
    }
  }

  async function verifyAssociationName(
    assoName: string,
    phone: string
  ): Promise<boolean> {
    if (assoName.length !== 0 && phone.length !== 0) {
      try {
        const response =
          await AssociationServices.VerifryAssociationNameBeforeCreation(
            assoName,
            phone
          );
        return response.data;
      } catch (error) {
        console.error("Error verifying name:", error);
        return false;
      }
    }
    return false;
  }

  const sendInvitaion = (destPhone: string, emetPhone: string) => {
    const formData = {
      destPhone: destPhone,
      emetPhone: emetPhone,
    };

    NotificationService.sendInvitation(formData)
      .then((response) => {
        setNotifTitle("Sucess");
        setNotifMessage("L'envoi de l'invitation a réussie");
        setDialogOpen(true);
        console.log(
          "Sucess de l'envoi de l'invitation a monsieur : " + destPhone
        );
      })
      .catch((error) => {
        setNotifTitle("Échec");
        setNotifMessage("Erreure lors de l'envoi de la notification");
        setDialogOpen(true);
      });
  };

  const handleOk = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    if (role1.length == 0 || role2.length == 0 || role3.length == 0) {
      if (role1.length != 0) {
        setErrorRole1(true);
      }
      if (role2.length != 0) {
        setErrorRole2(true);
      }
      if (role3.length != 0) {
        setErrorRole3(true);
      }
    } else {
      setErrorRole1(false);
      setErrorRole2(false);
      setErrorRole3(false);

      if (
        contact1 == contact2 ||
        contact1 == contact3 ||
        contact3 == contact2
      ) {
        setIsLoading(false);
        setNotifTitle("Échec");
        setNotifMessage(
          "Les trois administrateurs doivent être différents ( " +
            contact1 +
            ",  " +
            contact2 +
            ",  " +
            contact3 +
            " )"
        );
        setDialogOpen(true);
      } else {
        const existancePhone2 = await verifyPhone(contact2);
        const existancePhone3 = await verifyPhone(contact3);

        if (existancePhone2 && existancePhone3) {
          setPagesVisibility({ ...PagesVisibility, page2: false, page3: true });
        } else {
          setIsLoading(false);
        }
      }
    }
  };

  const handleOk2 = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      associationName: name,
      meetingFrequency: frequence,
      meetingDay: day,
      phoneAdmin1: contact1,
      phoneAdmin2: contact2,
      phoneAdmin3: contact3,
      roleAdmin1: role1,
      roleAdmin2: role2,
      roleAdmin3: role3,
      tontineName: nameTontine,
      type: type,
      amount: amount,
      phoneValidator1: validator1,
      phoneValidator2: validator2,
    };
    AssociationServices.CreateAssociation(data)
      .then((response) => {
        console.log("Association created successfully" + response.data);
        setNotifTitle("Sucess");
        setNotifMessage("La création de l'association a été initiée avec succèss. Des invitations ont été envoyé aux différents administrateurs, et seul leur validation terminera ce processus.");
        setDialogOpen(true);
        const data2: AssociationModel = {
          id: response.data.id,
          creationDate: [2024, 6, 25],
          frequenceReunion: response.data.frequenceReunion,
          jourReunion: response.data.jourReunion,
          name: response.data.name,
          nbMembre: response.data.nbMembres,
          nbTontine: response.data.nbTontines,
        };
        console.log(data2);
        addAssociation(data2);
        onClose();
        setIsLoading(false);
        setPagesVisibility({ ...PagesVisibility, page1: true, page4: false });
      })
      .catch((error) => {
        setNotifTitle("Erreur");
        setNotifMessage(
          "L'érreur suivante est survenue lors de cette operation" +
            error.message
        );
        console.log(error);
        setDialogOpen(true);
        setIsLoading(false);
      });
  };

  const handleInvitationContact2 = () => {
    sendInvitaion(contact2, contact1);
    setInviter1IsLoading(false);
  };
  const handleInvitationContact3 = () => {
    sendInvitaion(contact3, contact1);
    setInviter2IsLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const goToPage2 = async () => {
    if (frequence == null || frequence == "") {
    } else {
      setEnd(true);
      setPagesVisibility({ ...PagesVisibility, page1: false, page2: true });
    }
  };
  const goToPage3 = async () => {
    console.log(name + "" + contact1);
    const statusVerifAssoName = await verifyAssociationName(name, contact1);
    console.log("Statut de la vérification " + statusVerifAssoName);

    if (!statusVerifAssoName) {
      setNameIsValid(true);
    } else {
      if (frequence == null || frequence == "") {
      } else {
        setEnd(true);
        setPagesVisibility({ ...PagesVisibility, page1: false, page2: true });
      }
    }
  };
  const goToPage4 = async () => {
    console.log(name + "" + contact1);
    const statusVerifAssoName = await verifyAssociationName(name, contact1);
    console.log("Statut de la vérification " + statusVerifAssoName);

    if (!statusVerifAssoName) {
      setNameIsValid(true);
    } else {
      if (frequence == null || frequence == "") {
      } else {
        setEnd(true);
        setPagesVisibility({ ...PagesVisibility, page1: false, page2: true });
      }
    }
  };

  return (
    <Dialog
      fullScreen
      maxWidth="lg"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <AssoNotificationDialog
        title={notifTitle}
        message={notifMessage}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      {PagesVisibility.page1 && (
        <>
          <DialogTitle className="font-bold">
            <label className="font-bold" htmlFor="">
              Créer une association
            </label>
          </DialogTitle>
          <DialogContent dividers className="flex flex-col gap-2">
            <div className="flex flex-col gap-">
              <label className="font-bold mt-2 mb-2" htmlFor="">
                Nom de l'association <label className="text-red-600">*</label>
              </label>
              <TextField
                required
                id="outlined-required"
                label=""
                value={name}
                placeholder="Nom de l'association"
                className="w-full"
                onChange={(e) => setName(e.target.value)}
              />
              {name.length <= 5 ? (
                <p className="text-red-600 text-sm">
                  Le nom doit avoir au moins 5 caractères
                </p>
              ) : null}
              {nameIsValid && name.length > 5 ? (
                <p className="text-red-600 text-sm">
                  Vous avez déjà crée une association avec le même nom
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-4">
              <label className="font-bold mt-2" htmlFor="">
                Jour des réunions
              </label>
              <SelectItem defaultValue={day} onSelect={setDay} options={days} />
            </div>
            <div className="flex flex-col gap-4">
              <label className="block mt-2 font-bold text-sm  ">
                Fréquence des réunions.
              </label>
              <SelectItem
                defaultValue={frequence}
                onSelect={setFrequence}
                options={defaultFrequencies}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "red" }} autoFocus onClick={handleCancel}>
              Annuler
            </Button>
            <Button
              disabled={name.length <= 5 || nameIsValid}
              sx={{ color: "red" }}
              onClick={() => goToPage2()}
            >
              Suivant
            </Button>
          </DialogActions>
        </>
      )}
      {PagesVisibility.page2 && (
        <>
          <DialogTitle>
            <label className="font-bold" htmlFor="">
              Créer une association
            </label>
          </DialogTitle>

          <DialogContent dividers className="flex flex-col gap-2">
            <div className="text-xs text-center text-gray-400 ">
              (Les champs avec l'<label className="text-red-600">*</label> sont
              obligatoire.)
            </div>

            <label className="font-bold" htmlFor="">
              Administrateur 1
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone
            </label>
            <PhoneInputRole
              disabled={true}
              defaultValue={contact1}
              setPhone={setContact1}
            />

            <label className="font-bold" htmlFor="">
              Role{" "}
              <label hidden={role1.length !== 0} className="text-red-600">
                *
              </label>
            </label>
            <SelectItem2
              value={selectedRoles[0]}
              options={getAvailableRoles(0)}
              onSelect={(role) => handleRoleSelect(0, role)}
            />

            <label className="font-bold mt-5" htmlFor="">
              Administrateur 2
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone{" "}
              <label hidden={contact2.length !== 0} className="text-red-600">
                *
              </label>
            </label>
            <PhoneInputRole defaultValue={contact2} setPhone={setContact2} />
            {noContact2 && contact2.length >= nb_chiffre_tel && (
              <label className="text-xs text-red-500">
                Aucun compte avec ce numero.{" "}
                {!inviter1IsLoading ? (
                  <button
                    onClick={() => {
                      setInviter1IsLoading(true);
                      handleInvitationContact2();
                    }}
                    className="bg-red-600 text-white p-1 hover:bg-red-800 rounded-lg"
                  >
                    inviter
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="bg-red-900 text-white p-1  rounded-lg"
                  >
                    ...inv
                  </button>
                )}
              </label>
            )}

            <label className="font-bold" htmlFor="">
              Role{" "}
              <label hidden={role2.length !== 0} className="text-red-600">
                *
              </label>
            </label>
            <SelectItem2
              value={selectedRoles[1]}
              options={getAvailableRoles(1)}
              onSelect={(role) => handleRoleSelect(1, role)}
            />

            <label className="font-bold mt-5" htmlFor="">
              Administrateur 3
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone{" "}
              <label hidden={contact3.length !== 0} className="text-red-600">
                *
              </label>
            </label>
            <PhoneInputRole defaultValue={contact3} setPhone={setContact3} />
            {noContact3 && contact3.length >= nb_chiffre_tel && (
              <label className="text-xs text-red-500">
                Aucun compte avec ce numero.{" "}
                {!inviter2IsLoading ? (
                  <button
                    onClick={() => {
                      setInviter2IsLoading(true);
                      handleInvitationContact3();
                    }}
                    className="bg-red-600 text-white p-1 hover:bg-red-800 rounded-lg"
                  >
                    inviter
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="bg-red-900 text-white p-1  rounded-lg"
                  >
                    ...inv
                  </button>
                )}
              </label>
            )}

            <label className="font-bold" htmlFor="">
              Role{" "}
              <label hidden={role3.length !== 0} className="text-red-600">
                *
              </label>
            </label>
            {/* <SelectItem2 value={role3} options={filteredOptions3} onSelect={setRole3} /> */}
            <SelectItem2
              options={getAvailableRoles(2)}
              value={selectedRoles[2]}
              onSelect={(role) => handleRoleSelect(2, role)}
            />
            {errorRole3 && (
              <p className="text-red-600 text-xs">Ce champ est obligatoire </p>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "red" }}
              autoFocus
              onClick={() => {
                setEnd(false);
                setPhone1(contact2);
                setPhone2(contact3);
                setPagesVisibility({
                  ...PagesVisibility,
                  page1: true,
                  page2: false,
                });
              }}
            >
              Retour
            </Button>

            <Button
              disabled={!activate}
              sx={{ color: "red" }}
              onClick={
                (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  setPagesVisibility({
                    ...PagesVisibility,
                    page2: false,
                    page3: true,
                  })
                //handleOk(e)
              }
            >
              Suivant
            </Button>
          </DialogActions>
        </>
      )}

      {PagesVisibility.page3 && (
        <>
          <DialogTitle>
            <label className="font-bold" htmlFor="">
              Créer une association - Ajout d'une tontine
            </label>
          </DialogTitle>

          <DialogContent dividers className="flex flex-col gap-2">
            <DialogContentText>
              Dans le soucis de se rassurer que notre plateforme est utilisée à
              toute bonne fin, il est obligé lorsque vous créez une association
              de créer par la même une tontine. Veuillez donc renseigner les
              informations sur la tontine que vous souhaitez créee en même temps
              que votre association.
            </DialogContentText>
            <FormControl fullWidth margin="normal">
              <div className="mb-2">
                Type de tontine <label className="text-red-600">*</label>{" "}
              </div>
              <Select value={type} onChange={handleTypeChange}>
                {tontineTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "red" }}
              autoFocus
              onClick={() => {
                setEnd(false);
                setPhone1(contact2);
                setPhone2(contact3);
                setPagesVisibility({
                  ...PagesVisibility,
                  page2: true,
                  page3: false,
                });
              }}
            >
              Retour
            </Button>

            <Button
              disabled={type.length == 0}
              sx={{ color: "red" }}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                setPagesVisibility({
                  ...PagesVisibility,
                  page3: false,
                  page4: true,
                })
              }
            >
              Suivant
            </Button>
          </DialogActions>
        </>
      )}

      {PagesVisibility.page4 && (
        <>
          <DialogTitle>
            <label className="font-bold" htmlFor="">
              Créer une association - Ajout d'une tontine
            </label>
          </DialogTitle>
          <DialogContent dividers className="flex flex-col gap-2">
            <label className="font-bold mt-" htmlFor="">
              Nom de la tontine
            </label>
            <TextField
              placeholder="association 1"
              required
              value={nameTontine}
              onChange={(e) => setNameTontine(e.target.value)}
              fullWidth
              FormHelperTextProps={{
                style: { color: "red" }, // Changer la couleur du texte d'aide
              }}
              helperText={
                nameTontine.length < 5
                  ? "Le nom doit avoir au moins 5 caractères"
                  : ""
              }
            />
            {type === "dette" && (
              <>
                <label className="font-bold mt-" htmlFor="">
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
                  onChange={(e) => setAmount(Number(e.target.value))}
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
                  onChange={(e) => setAmount(Number(e.target.value))}
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
                  onChange={handleStartDateChange}
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
                  onChange={handleEndDateChange}
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
                  onChange={(e) => setAmount(Number(e.target.value))}
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
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "red" }}
              autoFocus
              onClick={() => {
                setEnd(false);
                setPhone1(contact2);
                setPhone2(contact3);
                setPagesVisibility({
                  ...PagesVisibility,
                  page3: true,
                  page4: false,
                });
              }}
            >
              Retour
            </Button>

            <Button
              disabled={
                nameTontine.length < 5 ||
                validator1.length == 0 ||
                validator2.length == 0
              }
              sx={{ color: "red" }}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleOk2(e)
              }
            >
              Créer
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default function AddAssociationDialog({
  setData,
  printError,
}: childProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");
  const [notifTitle, setNotifTitle] = React.useState<string>("");
  const [notifMessage, setNotifMessage] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <div
        onClick={handleClickListItem}
        className="text-xl cursor-pointer absolute z-[1000]  sm:bottom-8 sm:right-8 right-8 bottom-[75px]  w-[70px] h-[70px] sm:h-[60px] sm:w-[60px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold"
      >
        +
      </div>

      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        addAssociation={setData}
        printError={printError}
      />
    </>
  );
}
