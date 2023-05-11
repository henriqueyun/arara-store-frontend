import React, { useContext } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Context } from './context/AuthContext';
import {
  Home,
  Products,
  Product,
  Login
} from './pages';

export default function routes () {

  function Component({isPrivate, variant}) {
    const { loading, logged } = useContext(Context);
    if (loading) {
      return <h1>Loading...</h1> 
    }
    if (isPrivate && !logged) {
      // return routes.push('/login')
    }
    console.log("🚀 ~ file: routes.jsx:23 ~ Component ~ variant:", variant)
   return variant
  }

  const routes = [
    {
      path: '/home',
      Component() {
        return <Component variant={<Home />}/>
      }
    },
    {
      path: '/products',
      Component() {
        return <Component variant={<Products />}/>
      }
    },
    {
      path: '/products/:id',
      Component() {
        return <Component isPrivate variant={<Product />} />;
      },
    },
    {
      path: '/login',
      Component() {
        return <Component variant={<Login />} />;
      },
    },
  ]

  return routes
}

