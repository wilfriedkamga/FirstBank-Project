import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button, List, ListItemText, Divider, Avatar, ListItemButton } from '@mui/material';
import { AttachMoney as MoneyIcon, PeopleAlt as PeopleIcon, Star as StarIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate depuis react-router-dom
import { useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Données simulées
  const participants = 52;
  const total = 284;
  const absents = 15;
  const tontines = [
    {id:"123", name: 'Tontine A', type: 'épargne', amount: '1000 €', members: 10 },
    {id:"124", name: 'Tontine B', type: 'dette', amount: '500 €', members: 8 },
    {id:"125", name: 'Tontine C', type: 'sociale', amount: '200 €', members: 12 },
    {id:"126", name: 'Tontine D', type: 'épargne', amount: '1500 €', members: 15 },
    {id:"127", name: 'Tontine E', type: 'sociale', amount: '300 €', members: 6 },
  ];

  const [meetingState, setMeetingState] = useState<'stopped' | 'started' | 'paused'>('stopped');
  const [timeCounter, setTimeCounter] = useState<number>(0); // Initialise timeCounter à 0
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined); // Initialise timer à undefined
  const location=useLocation()
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

  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const navigateToContributions = (tontineName: string) => {
    navigate(`/contributions/${tontineName}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button variant="contained" color="primary" onClick={handleStartPauseClick}>
          {meetingState === 'stopped' ? 'Débuter la réunion' : meetingState === 'started' ? 'Mettre en pause' : 'Continuer la réunion'}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleStopClick} disabled={meetingState === 'stopped'}>
          Arrêter la réunion
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, backgroundColor: '#8B0000', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              TimeCounter
            </Typography>
            <Typography variant="h4">{new Date(timeCounter * 1000).toISOString().substr(11, 8)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Nombre de participants
            </Typography>
            <Typography variant="h4">{participants}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Nombre total
            </Typography>
            <Typography variant="h4">{total}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Nombre absent
            </Typography>
            <Typography variant="h4">{absents}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Latest News
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Lieu de la réunion
            </Typography>
            <Typography variant="body2" gutterBottom>
              {meetingInfo.location}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Heure de début
            </Typography>
            <Typography variant="body2" gutterBottom>
              {meetingInfo.startTime}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Heure de fin
            </Typography>
            <Typography variant="body2" gutterBottom>
              {meetingInfo.endTime}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Date
            </Typography>
            <Typography variant="body2" gutterBottom>
              {meetingInfo.date}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Hôte de la réunion
            </Typography>
            <Typography variant="body2" gutterBottom>
              {meetingInfo.host}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tontines
            </Typography>
            <List>

              {tontines.map((tontine, index) => (
                <React.Fragment key={index}>
                  <Link  to={location.pathname+"/"+"cotisation/"+tontine.id}>
                    <ListItemText
                      className='bg-gray-500 border p-2 rounded-lg border-1 hover:bg-gray-700'
                      primary={tontine.name}
                      secondary={
                        <>
                          <Typography variant="body2" component="span" color="text.primary">
                            Type: {tontine.type}, Montant: {tontine.amount}, Membres: {tontine.members}
                          </Typography>
                        </>
                      }
                    />
                  </Link>
                  {index < tontines.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;