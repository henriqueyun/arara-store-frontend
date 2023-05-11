import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Products,
  Product,
  Login
} from './pages';
import routes from './routes';
console.log("🚀 ~ file: router.js:9 ~ routes:", routes)

const router = createBrowserRouter(routes);

export { router };
