import { CircularProgress, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import { Context } from './context/AuthContext';
import {
  Home,
  Products,
  Product,
  Login,
  Cart,
  Order,
  Payment,
  SignUp,
} from './pages';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';

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
    path: '/signUp',
    Component() {
      return <Component variant={<SignUp />} />;
    },
  },
  {
    path: '/profile',
    Component() {
      return <Component isPrivate variant={<Profile />} />;
    },
  },
  {
    path: '/orderDetails/:id',
    Component() {
      return <Component isPrivate variant={<OrderDetails />} />;
    },
  },
  {
    path: '/cart',
    Component() {
      return <Component isPrivate variant={<Cart />} />;
    },
  },
  {
    path: '/order',
    Component() {
      return <Component isPrivate variant={<Order />} />;
    },
  },
  {
    path: '/payment',
    Component() {
      return <Component isPrivate variant={<Payment />} />;
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
