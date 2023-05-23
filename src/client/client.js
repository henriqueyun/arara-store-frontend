import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProductService, AuthService } from './services';

function setAxiosConfig() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const navigate = useNavigate();
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
}

setAxiosConfig();

const client = {
  products: ProductService(axios),
  auth: AuthService(axios),
};

function setAuth(token) {
  axios.defaults.headers.Authorization = token;
}

export { client, setAuth };
