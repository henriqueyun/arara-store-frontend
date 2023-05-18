import React, { useState, useEffect } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import ProductItem from './ProductItem';
import { client } from '../../client';

export default function Showcase() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await client.products.findAll();
      setProducts(response);
    };
    getProducts();
  }, []);

  return (
    <Grid container display="flex" justifyContent="center" my={4} gap={4}>
      {
        // TODO: adjust when showcase backend is done to not use hardcoded six products
        products.length ? (
          products.slice(0, 6).map((product) => (
            <Grid key={product.id} item>
              <Link
                color="inherit"
                underline="none"
                href={`/products/${product.id}`}
              >
                <ProductItem key={product.id} product={product} />
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
