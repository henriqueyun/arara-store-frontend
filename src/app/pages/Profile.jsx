/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Container, Grid, Typography } from '@mui/material/';
import ProfileContent from '../components/ProfileContent';
import AddressContent from '../components/AddressContent';
import OrderContent from '../components/OrderContent';

export default function Profile() {
  const [pageContent, setPageContent] = React.useState('');
  const handleContent = (content) => {
    setPageContent(content);
  };

  return (
    <Container>
      <Grid container my={8} display="flex">
        <Box sx={{ display: 'flex', mt: 10 }}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => handleContent('profile')}>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleContent('order')}>
                <ListItemText primary="Pedidos" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleContent('address')}>
                <ListItemText primary="Endereços" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box component="main">
          {pageContent === 'profile' && <ProfileContent />}
          {pageContent === 'address' && <AddressContent />}
          {pageContent === 'order' && <OrderContent />}
        </Box>
      </Grid>
    </Container>
  );
}
