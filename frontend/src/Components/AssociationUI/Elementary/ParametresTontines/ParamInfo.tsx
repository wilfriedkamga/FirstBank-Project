import React, { useState, ChangeEvent } from 'react';
import Footer from '../Footer/Footer';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
  Box,
  Typography
} from '@mui/material';
import {
  Lock as LockClosed,
  LockOpen,
  Check,
  Description,
  Event,
  CalendarToday,
  Repeat,
  Today,
  Edit
} from '@mui/icons-material';

const ParamInfo = () => {
  const [associationName, setAssociationName] = useState<string>('Nom de l\'association');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('Description de l\'association');
  const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
  const [meetingDay, setMeetingDay] = useState<string>('Lundi');
  const [isEditingMeetingDay, setIsEditingMeetingDay] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<string>('Hebdomadaire');
  const [isEditingFrequency, setIsEditingFrequency] = useState<boolean>(false);
  const [unit, setUnit] = useState<string>('Jour');
  const [isEditingUnit, setIsEditingUnit] = useState<boolean>(false);
  const [number, setNumber] = useState<string>('1');
  const [isEditingNumber, setIsEditingNumber] = useState<boolean>(false);
  const [nextMeetingDate, setNextMeetingDate] = useState<string>('2023-01-01');
  const [isEditingNextMeetingDate, setIsEditingNextMeetingDate] = useState<boolean>(false);
  const [calendarMode, setCalendarMode] = useState<string>('Manuelle');
  const [isEditingCalendarMode, setIsEditingCalendarMode] = useState<boolean>(false);
  const [savingEnabled, setSavingEnabled] = useState<boolean>(false);

  const handleSave = () => {
    setIsEditingName(false);
    setIsEditingDescription(false);
    setIsEditingMeetingDay(false);
    setIsEditingFrequency(false);
    setIsEditingUnit(false);
    setIsEditingNumber(false);
    setIsEditingNextMeetingDate(false);
    setIsEditingCalendarMode(false);
    setSavingEnabled(false);
    // Here you would typically also update the backend with the new values
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setSavingEnabled(true);
  };

  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: SelectChangeEvent<string>) => {
    setter(e.target.value);
    setSavingEnabled(true);
  };

  return (
    <div className="w-full bg-white h-full min-h-[100vh] flex flex-col items-center py-8">
      <div className="flex flex-col bg-white w-full max-w-full space-y-6 p-8 shadow-lg rounded-lg" style={{ backgroundColor: '#f9f9f9' }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Paramètres de l'Association
        </Typography>
        
        {/* Nom de l'association */}
        <FormControl fullWidth margin="normal">
          <label>Nom de l'association</label>
          <TextField 
            value={associationName} 
            onChange={handleInputChange(setAssociationName)}
            disabled={!isEditingName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Edit />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => setIsEditingName(!isEditingName)}>
                  {isEditingName ? <LockOpen /> : <LockClosed />}
                </IconButton>
              ),
              style: { borderRadius: '4px', backgroundColor: 'white' }
            }}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="dense"
          />
        </FormControl>

        {/* Description de l'association */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <label>Description de l'association</label>
          <TextField 
            multiline
            rows={4}
            variant="outlined"
            value={description} 
            onChange={handleInputChange(setDescription)}
            disabled={!isEditingDescription}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => setIsEditingDescription(!isEditingDescription)}>
                  {isEditingDescription ? <LockOpen /> : <LockClosed />}
                </IconButton>
              ),
              style: { borderRadius: '4px', backgroundColor: 'white' }
            }}
            InputLabelProps={{ shrink: true }}
            margin="dense"
          />
        </FormControl>

        {/* Jour des réunions par défaut */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <label>Jour des réunions par défaut</label>
          <Select
            value={meetingDay}
            onChange={handleSelectChange(setMeetingDay)}
            disabled={!isEditingMeetingDay}
            style={{ borderRadius: '4px', backgroundColor: 'white' }}
            startAdornment={
              <InputAdornment position="start">
                <Event />
              </InputAdornment>
            }
            endAdornment={
              <IconButton onClick={() => setIsEditingMeetingDay(!isEditingMeetingDay)}>
                {isEditingMeetingDay ? <LockOpen /> : <LockClosed />}
              </IconButton>
            }
            margin="dense"
          >
            <MenuItem value="Lundi">Lundi</MenuItem>
            <MenuItem value="Mardi">Mardi</MenuItem>
            <MenuItem value="Mercredi">Mercredi</MenuItem>
            <MenuItem value="Jeudi">Jeudi</MenuItem>
            <MenuItem value="Vendredi">Vendredi</MenuItem>
            <MenuItem value="Samedi">Samedi</MenuItem>
            <MenuItem value="Dimanche">Dimanche</MenuItem>
          </Select>
        </FormControl>

        {/* Fréquence des réunions */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <label>Fréquence des réunions</label>
          <Select
            value={frequency}
            onChange={handleSelectChange(setFrequency)}
            disabled={!isEditingFrequency}
            style={{ borderRadius: '4px', backgroundColor: 'white' }}
            startAdornment={
              <InputAdornment position="start">
                <Repeat />
              </InputAdornment>
            }
            endAdornment={
              <IconButton onClick={() => setIsEditingFrequency(!isEditingFrequency)}>
                {isEditingFrequency ? <LockOpen /> : <LockClosed />}
              </IconButton>
            }
            margin="dense"
          >
            <MenuItem value="Hebdomadaire">Hebdomadaire</MenuItem>
            <MenuItem value="Mensuelle">Mensuelle</MenuItem>
            <MenuItem value="Bimensuelle">Bimensuelle</MenuItem>
            <MenuItem value="Trimestrielle">Trimestrielle</MenuItem>
            <MenuItem value="Autres">Autres</MenuItem>
          </Select>
        </FormControl>

        {/* Options pour 'Autres' fréquence */}
        {frequency === 'Autres' && (
          <>
            <FormControl fullWidth variant="outlined" margin="normal">
              <label>Unité</label>
              <Select
                value={unit}
                onChange={handleSelectChange(setUnit)}
                disabled={!isEditingUnit}
                style={{ borderRadius: '4px', backgroundColor: 'white' }}
                startAdornment={
                  <InputAdornment position="start">
                    <Today />
                  </InputAdornment>
                }
                endAdornment={
                  <IconButton onClick={() => setIsEditingUnit(!isEditingUnit)}>
                    {isEditingUnit ? <LockOpen /> : <LockClosed />}
                  </IconButton>
                }
                margin="dense"
              >
                <MenuItem value="Jour">Jour</MenuItem>
                <MenuItem value="Semaine">Semaine</MenuItem>
                <MenuItem value="Mois">Mois</MenuItem>
                <MenuItem value="Année">Année</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <label>Nombre</label>
              <TextField
                type="number"
                variant="outlined"
                value={number}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNumber(e.target.value);
                  setSavingEnabled(true);
                }}
                disabled={!isEditingNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton onClick={() => setIsEditingNumber(!isEditingNumber)}>
                      {isEditingNumber ? <LockOpen /> : <LockClosed />}
                    </IconButton>
                  ),
                  style: { borderRadius: '4px', backgroundColor: 'white' }
                }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              />
            </FormControl>
          </>
        )}

        {/* Date de la prochaine réunion */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <label>Date de la prochaine réunion</label>
          <TextField
            type="date"
            variant="outlined"
            value={nextMeetingDate}
            onChange={handleInputChange(setNextMeetingDate)}
            disabled={!isEditingNextMeetingDate}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Today />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => setIsEditingNextMeetingDate(!isEditingNextMeetingDate)}>
                  {isEditingNextMeetingDate ? <LockOpen /> : <LockClosed />}
                </IconButton>
              ),
              style: { borderRadius: '4px', backgroundColor: 'white' }
            }}
            margin="dense"
          />
        </FormControl>

        {/* Mode du calendrier */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <label>Mode du calendrier</label>
          <Select
            value={calendarMode}
            onChange={handleSelectChange(setCalendarMode)}
            disabled={!isEditingCalendarMode}
            style={{ borderRadius: '4px', backgroundColor: 'white' }}
            startAdornment={
              <InputAdornment position="start">
                <Event />
              </InputAdornment>
            }
            endAdornment={
              <IconButton onClick={() => setIsEditingCalendarMode(!isEditingCalendarMode)}>
                {isEditingCalendarMode ? <LockOpen /> : <LockClosed />}
              </IconButton>
            }
            margin="dense"
          >
            <MenuItem value="Manuelle">Manuelle</MenuItem>
            <MenuItem value="Automatique">Automatique</MenuItem>
          </Select>
        </FormControl>

        {/* Bouton de sauvegarde */}
        {savingEnabled && (
          <Box textAlign="center" marginTop={4}>
            <Button 
              onClick={handleSave} 
              variant="contained" 
              color="primary" 
              style={{ backgroundColor: '#ffc107', color: 'black', borderRadius: '4px', padding: '12px 24px' }}
            >
              Sauvegarder
            </Button>
          </Box>
        )}

      </div>
      <div className="w-full h-fit z-20">
        <Footer />
      </div>
    </div>
  );
};

export default ParamInfo;