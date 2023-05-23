import axios from 'axios';
import {
  ProductService,
  AuthService,
  CartService,
  ShippingService,
} from './services';

axios.defaults.baseURL = 'http://localhost:3000';

const client = {
  products: ProductService(axios),
  auth: AuthService(axios),
  cart: CartService(axios),
  shipping: ShippingService(axios),
};

function setAuth(token) {
  axios.defaults.headers.Authorization = token;
}

export { client, setAuth };
