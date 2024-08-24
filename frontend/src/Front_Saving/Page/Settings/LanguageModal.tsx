import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import {
  supportedLanguages,
  unsupportedLanguages,
} from "../../../Services/data";
import { useTranslation } from "react-i18next";
import i18n from "../../../Services/Types/Internationalisation/I18n";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LanguageDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState("fr");
  const [currentLanguage, setCurrentdLanguage] = React.useState("fr");
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, []);

  const handleClose = () => {
    setSelectedLanguage(currentLanguage);
    setOpen(false);
    setConfirmDialogOpen(false);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSave = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmChange = () => {
    // Implement your save logic here
    i18n.changeLanguage(selectedLanguage);
    setOpen(false);
    setConfirmDialogOpen(false);
  };

  const handleCancelChange = () => {
    setConfirmDialogOpen(false);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <button onClick={handleClickOpen} className="flex">
        <p className="font-normal p-5 group-hover:text-[#BB0A01] gap-3 text-gray-700 flex font-title">
          <GlobeAltIcon className="h-8 w-8" />
          <span className="ml-6 mt-1">
            Langue de l'application{" "}
            {selectedLanguage &&
              `(${
                supportedLanguages.find((lang) => lang.code === currentLanguage)
                  ?.name
              })`}
          </span>
        </p>
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "fixed", backgroundColor: "#bb0000" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Langue de l'application{" "}
              {selectedLanguage &&
                `(${
                  supportedLanguages.find(
                    (lang) => lang.code === currentLanguage
                  )?.name
                })`}
            </Typography>
            <Button
              disabled={selectedLanguage == currentLanguage}
              autoFocus
              color="inherit"
              onClick={handleSave}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{ paddingTop: isSmallScreen ? "64px" : "88px" }}>
          <RadioGroup value={selectedLanguage} onChange={handleLanguageChange}>
            {supportedLanguages.map((lang) => (
              <ListItemButton key={lang.code}>
                <FormControlLabel
                  value={lang.code}
                  control={<Radio color="error" />}
                  label={lang.name}
                />
              </ListItemButton>
            ))}
            <Divider />
            {unsupportedLanguages.map((lang) => (
              <ListItemButton key={lang.code} disabled>
                <FormControlLabel
                  value={lang.code}
                  control={<Radio />}
                  label={lang.name}
                />
              </ListItemButton>
            ))}
          </RadioGroup>
        </List>
      </Dialog>
      <Dialog
        open={confirmDialogOpen}
        onClose={handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Change Application Language
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to change the application language to{" "}
            {
              supportedLanguages.find((lang) => lang.code === selectedLanguage)
                ?.name
            }
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelChange}>Cancel</Button>
          <Button
            onClick={() => {
              handleConfirmChange();

              setCurrentdLanguage(selectedLanguage);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
