import { CircularProgress, Grid, Typography } from '@mui/material';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { Home, Products, Product, Login, Cart } from './pages';
import { Context } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    Component() {
      return <Component variant={<Home />} />;
    },
  },
  {
    path: '/products',
    Component() {
      return <Component variant={<Products />} />;
    },
  },
  {
    path: '/products/:id',
    Component() {
      return <Component variant={<Product />} />;
    },
  },
  {
    path: '/login',
    Component() {
      return <Component variant={<Login />} />;
    },
  },
  {
    path: '/cart',
    Component() {
      return <Component isPrivate variant={<Cart />} />;
    },
  },
]);

function Component({ isPrivate, variant }) {
  const navigate = useNavigate();
  const { loading, logged } = useContext(Context);
  if (loading) {
    // TODO: melhorar componente
    return (
      <Grid container my={20} justifyContent="center">
        <CircularProgress color="inherit" />
        <Typography variant="h1">Loading...</Typography>
      </Grid>
    );
  }
  if (isPrivate && !logged) {
    return navigate('/login');
  }
  return variant;
}

export default router;
