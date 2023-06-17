import { Button, Grid, Stack, TextField } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';

export default function Cartao() {
  const handleSubmit = () => {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Compra efetuado com sucesso!',
    });
  };

  return (
    <Grid container gap={2} flexDirection="column">
      <Stack direction="row" spacing={6}>
        <TextField required label="Numero do Cartão" variant="outlined" />
      </Stack>
      <Stack direction="row" spacing={6}>
        <TextField required label="Vencimento" variant="outlined" />
        <TextField
          required
          label="Código de Segurança (cvv)"
          variant="outlined"
        />
      </Stack>
      <Stack direction="row" spacing={6}>
        <TextField required label="Nome" variant="outlined" />
        <TextField required label="CPF" variant="outlined" />
      </Stack>
      <Grid display="flex" gap={2}>
        <Button onClick={() => handleSubmit()} variant="contained">
          Finalizar Compra
        </Button>
      </Grid>
    </Grid>
  );
}
