import React, { useState, useEffect } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import ProductItem from './ProductItem';
import { client } from '../../client';

export default function Showcase() {
  const [showCases, setShowCases] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await client.products.findShowCase();
      setShowCases(response);
    };
    getProducts();
  }, []);

  return (
    <Grid container display="flex" justifyContent="center" my={4} gap={4}>
      {
        // TODO: adjust when showcase backend is done to not use hardcoded six products
        showCases.length ? (
          showCases.map((showCase) => (
            <Grid key={showCase.product.id} item>
              <Link
                color="inherit"
                underline="none"
                href={`/products/${showCase.product.id}`}
              >
                <ProductItem
                  key={showCase.product.id}
                  product={showCase.product}
                />
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">
            Houve um problema ao buscar os produtos
          </Typography>
        )
      }
    </Grid>
  );
}
