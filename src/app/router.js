import { createBrowserRouter } from 'react-router-dom';
import {
    Home,
    Products,
    Product,
    Cart
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
    },
    {
        path: "/products/:id",
        Component() {
            return <Product />
        }
    },
    {
        path: "/cart",
        Component() {
            return <Cart />
        }
    }
]);

export { router }