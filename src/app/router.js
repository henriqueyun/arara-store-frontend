import { createBrowserRouter } from 'react-router-dom';
import {
    Home,
    Products
} from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        Component() {
            return <Home />
        }
    },
    {
        path: "/products",
        Component() {
            return <Products />
        }
    }
]);

export { router }