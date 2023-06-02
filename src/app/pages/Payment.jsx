import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';

function Payment() {
  return (
    <Container>
      <Grid
        sx={{ height: '800px' }}
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h3">
          A tela de pagamento não está pronta 😖 🤒 😿
        </Typography>
        <Button variant="contained" href="/">
          Voltar ao inicio
        </Button>
      </Grid>
    </Container>
  );
}

export default Payment;
