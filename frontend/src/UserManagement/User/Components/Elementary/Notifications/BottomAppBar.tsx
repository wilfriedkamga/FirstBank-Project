import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

const messages = [
  {
    id: 1,
    primary: 'Association des Bandjoun',
    secondary: "Un noveau membre vient d'être ajouter à cette association",
    person: '/static/images/avatar/5.jpg',
  },

  {
    id: 2,
    primary: 'Association des Bandjoun',
    secondary: "Un noveau membre vient d'être ajouter à cette association",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 3,
    primary: 'Association des Bandjoun',
    secondary: "Un noveau membre vient d'être ajouter à cette association",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 4,
    primary: 'Association des Bandjoun',
    secondary: "Un noveau membre vient d'être ajouter à cette association",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 5,
    primary: 'Association des Bandjoun',
    secondary: "Un noveau membre vient d'être ajouter à cette association",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 6,
    primary: 'Association des Bandjoun',
    secondary: "Un noveau membre vient d'être ajouter à cette association",
    person: '/static/images/avatar/5.jpg',
  },
  
];

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <List sx={{ mb: 2 }}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Today
                </ListSubheader>
              )}
              {id === 3 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Yesterday
                </ListSubheader>
              )}
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      </AppBar>
    </React.Fragment>
  );
}
