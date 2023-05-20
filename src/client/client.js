import axios from 'axios';
import { ProductService, AuthService, CartService } from './services';

axios.defaults.baseURL = 'http://localhost:3000';

const client = {
  products: ProductService(axios),
  auth: AuthService(axios),
  cart: CartService(axios),
};

function setAuth(token) {
  axios.defaults.headers.Authorization = token;
}

export { client, setAuth };
