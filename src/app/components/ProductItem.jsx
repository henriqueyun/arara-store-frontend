import { Typography } from '@mui/material';
import React from 'react';
import { calculateDiscount, formatCurrency } from '../util';

export default function ProductItem({ product }) {
  return (
    <div>
      <img
        src={
          product.images[0]?.imageUrl ||
          'https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fG1pc3NpbmclMjBzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
        }
        alt="Um homem estiloso olhando para a camêra de costas para uma parede preta"
        style={{ width: '300px', height: '450px' }}
      />
      <Typography variant="h6">{product.name}</Typography>
      <Price price={product.price} discount={product.discount} />
    </div>
  );
}

export function Price(props) {
  const { price, discount } = props;
  return (
    <div>
      {discount > 0 ? (
        <>
          <Typography variant="caption">
            <s>{formatCurrency(parseFloat(price))}</s>
          </Typography>
          <Typography variant="h6">
            {formatCurrency(calculateDiscount(price, discount))}
          </Typography>
        </>
      ) : (
        <Typography variant="h6">
          {formatCurrency(parseFloat(price))}
        </Typography>
      )}
    </div>
  );
}
