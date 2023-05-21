import axios from 'axios';
import { ProductService, AuthService } from './services';

axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === 'http://localhost:3000/login/'
    ) {
      localStorage.removeItem('token')
      // TODO: mandar para o login aqui
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

const client = {
  products: ProductService(axios),
  auth: AuthService(axios),
};

function setAuth(token) {
  axios.defaults.headers.Authorization = token;
}

export { client, setAuth };
