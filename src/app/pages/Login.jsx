import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Typography, TextField, Button,
} from '@mui/material';
import { Context } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(Context);
  const navigate = useNavigate();

  const submitLogin = async () => {
    // TODO: refactor to use navigate inside useAuth
    if (await signIn(email, password)) {
      navigate('/');
    } else {
      alert('Falha no login');
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid container flexDirection="column" gap={2} p={4}>
        <Typography variant="h4">Login</Typography>
        <TextField label="username" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
        <TextField label="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} type="password" />
        <Button variant="contained" onClick={submitLogin} sx={{ my: 1 }}>Login</Button>
      </Grid>
    </Container>
  );
}
