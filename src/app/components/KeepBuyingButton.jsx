import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';

export default function KeepBuyingButton({ href = '/products', ...props }) {
  return (
    <Button
      href={href}
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      CONTINUAR COMPRANDO
    </Button>
  );
}
