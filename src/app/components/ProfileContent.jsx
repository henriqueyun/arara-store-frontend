import { Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { client } from '../../client';
import { userStorage } from '../storage';

export default function ProfileContent() {
  const [user, setUser] = useState({
    email: '',
    fullName: '',
    cpf: '',
    birth: '',
    createdAt: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const response = await client.auth.findOne(userStorage.getId());
      setUser(response);
    };
    getUser();
  }, []);

  return (
    <Container maxWidth="xs">
      <Grid container flexDirection="column" gap={4} p={4}>
        <Typography variant="h5">Informações da Conta</Typography>
        <TextField
          disabled
          label="E-mail"
          name="email"
          variant="outlined"
          value={user?.email}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000',
            },
          }}
        />

        <TextField
          disabled
          label="Nome Completo"
          name="fullName"
          variant="outlined"
          value={user?.fullName}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000',
            },
          }}
        />

        <TextField
          disabled
          label="CPF"
          name="cpf"
          variant="outlined"
          value={user?.cpf}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000',
            },
          }}
        />

        <TextField
          disabled
          label="Nascimento"
          name="birth"
          variant="outlined"
          value={moment(user?.birth).format('DD/MM/YYYY')}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000',
            },
          }}
        />

        <TextField
          disabled
          label="Membro desde"
          name="createdAt"
          variant="outlined"
          value={moment(user?.createdAt).format('DD/MM/YYYY')}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000',
            },
          }}
        />
      </Grid>
    </Container>
  );
}
