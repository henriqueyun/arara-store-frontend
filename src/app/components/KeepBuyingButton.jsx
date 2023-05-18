import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';

export default function KeepBuyingButton() {
  return (
    <Button href="/products" startIcon={<ArrowBackIcon />} variant="outlined">
      CONTINUAR COMPRANDO
    </Button>
  );
}
