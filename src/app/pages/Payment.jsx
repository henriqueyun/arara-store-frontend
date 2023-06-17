import { Container, Grid } from '@mui/material';
import React from 'react';
import Pix from '../components/Pix';
import Cartao from '../components/Cartao';
import Boleto from '../components/Boleto';

function Payment() {
  const params = new URLSearchParams(window.location.search);
  const method = params.get('method');

  return (
    <Container>
      <Grid container my={8} display="flex">
        {method === 'pix' && <Pix />}
        {method === 'boleto' && <Boleto />}
        {method === 'cartao' && <Cartao />}
      </Grid>
    </Container>
  );
}

export default Payment;
