import axios from 'axios';
import { ProductService, UserService } from './services';

axios.defaults.baseURL = 'http://localhost:3000';

const client = {
  products: ProductService(axios),
  users: UserService(axios),
};

function setAuth(token) {
  axios.defaults.headers.Authorization = token;  
}

// TODO: Change to export {client, setAuth}
export {client, setAuth}