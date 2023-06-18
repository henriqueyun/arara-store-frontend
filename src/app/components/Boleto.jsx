import { Button, Container, Grid, Link, Typography } from '@mui/material';
import React from 'react';

export default function Boleto() {
  return (
    <Container>
      <Grid
        sx={{ height: '800px' }}
        alignItems="center"
        display="flex"
        gap={12}
      >
        <Grid>
          <Typography variant="h2">Finalize seu pagamento</Typography>
          <Typography variant="h4">Baixe seu boleto para finalizar</Typography>
        </Grid>
        <Button
          sx={{ width: '350px', height: '100px' }}
          variant="contained"
          size="large"
        >
          <Link
            color="inherit"
            underline="none"
            target="_blank"
            href="/boletoFake.pdf"
          >
            Baixar Boleto
          </Link>
        </Button>
      </Grid>
    </Container>
  );
}
