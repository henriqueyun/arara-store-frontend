import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
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
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Falha no login!',
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid container flexDirection="column" gap={2} p={4}>
        <Typography variant="h4">Login</Typography>
        <TextField
          label="E-mail"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button variant="contained" onClick={submitLogin} sx={{ my: 1 }}>
          Login
        </Button>
        <Typography>Não tem uma conta?</Typography>
        <Link underline="none" to="/signUp">
          Cadastre-se aqui
        </Link>
      </Grid>
    </Container>
  );
}
