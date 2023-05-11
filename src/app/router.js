import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Products,
  Product,
  Login
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    Component() {
      return <Home />;
    },
  },
  {
    path: '/products',
    Component() {
      return <Products />;
    },
  },
  {
    path: '/products/:id',
    Component() {
      return <Product />;
    },
  },
  {
    path: '/login',
    Component() {
      return <Login />;
    },
  },
]);

export { router };
