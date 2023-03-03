import axios from 'axios';
import { ProductService } from "./services";

axios.defaults.baseURL = 'http://localhost:3000';

const client = {
    products: ProductService(axios)
}

export default client