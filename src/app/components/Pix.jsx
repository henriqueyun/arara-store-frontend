import QRCode from 'react-qr-code';
import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

export default function Pix() {
  return (
    <Container>
      <Grid sx={{ height: '800px' }} alignItems="center" display="flex" gap={2}>
        <Grid>
          <Typography variant="h1">Finalize seu pagamento</Typography>
          <Typography variant="h4">
            Leia o QR Code no seu aplicativo do banco
          </Typography>
        </Grid>
        <QRCode
          size={50}
          style={{ height: 'auto', maxWidth: '25%', width: '25%' }}
          value="Compra Efetuada"
          viewBox="0 0 50 50"
        />
      </Grid>
    </Container>
  );
}
