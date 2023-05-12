import { createBrowserRouter, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import {
  Home,
  Products,
  Product,
  Login,
} from './pages';
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
]);

function Component({ isPrivate, variant }) {
  const navigate = useNavigate();
  const { loading, logged } = useContext(Context);
  console.log('🚀 ~ file: router.jsx:41 ~ Component ~ loading:', loading);
  if (loading) {
    // TODO: FAZER UM COMPONENTE MAIS BONITO
    return <h1>Loading...</h1>;
  }
  if (isPrivate && !logged) {
    return navigate('/login');
  }
  return variant;
}

export default router;
