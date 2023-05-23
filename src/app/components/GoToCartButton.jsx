import React from 'react';
import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

export default function GoToCartButton(props) {
  return (
    <Button
      href="/cart"
      endIcon={<ShoppingCart />}
      variant="outlined"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      PROSSEGUIR COM PEDIDO
    </Button>
  );
}
