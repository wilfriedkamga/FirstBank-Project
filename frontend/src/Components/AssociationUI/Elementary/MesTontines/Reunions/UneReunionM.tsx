import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button, List, ListItem, ListItemText, Divider, Avatar, Tabs, Tab } from '@mui/material';
import { AttachMoney as MoneyIcon, PeopleAlt as PeopleIcon, Star as StarIcon } from '@mui/icons-material';

const DashboardM: React.FC = () => {
  // Données simulées
  const participants = 52;
  const total = 284;
  const absents = 15;
  const tontines = [
    { name: 'Tontine A', type: 'épargne', amount: '1000 €', members: 10 },
    { name: 'Tontine B', type: 'dette', amount: '500 €', members: 8 },
    { name: 'Tontine C', type: 'sociale', amount: '200 €', members: 12 },
    { name: 'Tontine D', type: 'épargne', amount: '1500 €', members: 15 },
    { name: 'Tontine E', type: 'sociale', amount: '300 €', members: 6 },
  ];

  const [meetingState, setMeetingState] = useState<'stopped' | 'started' | 'paused'>('stopped');
  const [timeCounter, setTimeCounter] = useState<number>(0); // Initialise timeCounter à 0
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined); // Initialise timer à undefined

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }

    if (meetingState === 'started') {
      const newTimer = setInterval(() => setTimeCounter(prev => prev + 1), 1000);
      setTimer(newTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [meetingState]);

  const handleStartPauseClick = () => {
    if (meetingState === 'stopped' || meetingState === 'paused') {
      setMeetingState('started');
    } else if (meetingState === 'started') {
      setMeetingState('paused');
    }
  };

  const handleStopClick = () => {
    setMeetingState('stopped');
    setTimeCounter(0);
    if (timer) {
      clearInterval(timer);
    }
  };

  const meetingInfo = {
    location: 'Salle de conférence B',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    date: '2024-07-17',
    host: 'Jean Dupont',
  };

  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Tabs value={tabValue} onChange={handleChangeTab} variant="fullWidth">
        <Tab label="Réunion" />
        <Tab label="Statistiques" />
        <Tab label="Tontines" />
        <Tab label="Divers" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, backgroundColor: '#8B0000', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                TimeCounter
              </Typography>
              <Typography variant="h4">{new Date(timeCounter * 1000).toISOString().substr(11, 8)}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Nombre de participants
              </Typography>
              <Typography variant="h4">{participants}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Nombre total
              </Typography>
              <Typography variant="h4">{total}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Nombre absent
              </Typography>
              <Typography variant="h4">{absents}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tontines
              </Typography>
              <List>
                {tontines.map((tontine, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <Avatar sx={{ bgcolor: '#FFFFFF', color: '#000000' }}>
                        <StarIcon />
                      </Avatar>
                      <ListItemText
                        primary={tontine.name}
                        secondary={
                          <>
                            <Typography variant="body2" component="span" color="text.primary">
                              Type: {tontine.type}, Montant: {tontine.amount}, Membres: {tontine.members}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < tontines.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Divers
              </Typography>
              {/* Ajoutez ici le contenu pour la section Divers */}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardM;
