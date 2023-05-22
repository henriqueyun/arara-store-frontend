import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext } from 'react';
import { Context } from '../context/AuthContext';

export default function Menubar() {
  const { logged, signOut } = useContext(Context);

  const handleSingOut = async () => {
    if (await signOut()) {
      window.location.reload(true);
    } else {
      // eslint-disable-next-line no-alert
      alert('Falha ao sair');
    }
  };

  return (
    <Grid
      container
      p={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.background.default,
      }}
    >
      <Link color="inherit" underline="none" href="/" variant="h3">
        Ararastore
      </Link>
      <TextField
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Grid sx={{ display: 'flex' }}>
        <Button href="/products">
          <Typography color="background.default">Home</Typography>
        </Button>
        <Button href="/products">
          <Typography color="background.default">Muié</Typography>
        </Button>
      </Grid>
      <Grid sx={{ display: 'flex' }}>
        {logged ? (
          <Button onClick={handleSingOut}>
            <Typography color="background.default">Sair</Typography>
          </Button>
        ) : (
          <Button href="/login">
            <Typography color="background.default">Entrar</Typography>
          </Button>
        )}
        <Button href="/cart">
          <Typography color="background.default">Carrinho</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
