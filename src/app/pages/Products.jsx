import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProductsFilter, ProductsGrid } from '../components';
import { client } from '../../client';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  function applyFilters(filters) {
    setFilteredProducts(products.filter((p) => {
      const fields = Object.keys(filters);
      const passFilters = fields.every((f) => {
        const productField = typeof p[f] === 'number' ? JSON.stringify(p[f]) : p[f];
        return filters[f].includes(productField);
      });
      return passFilters;
    }));
  }

  useEffect(() => {
    const getProducts = async () => {
      const data = await client.products.findAll();
      setProducts(data);
      setFilteredProducts(data);
    };
    getProducts();
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container my={8} display="flex">
        <Grid item xs={3}>
          <ProductsFilter handleFilter={applyFilters} products={products} />
        </Grid>
        <ProductsGrid products={filteredProducts} />
      </Grid>
    </Container>
  );
}
