import { useState, useEffect } from "react";
import { Grid, Link, Typography } from "@mui/material";
import ProductItem from "../components/ProductItem";
import { client } from "../../client/";

export default function Showcase() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const products = await client.products.findAll();
            setProducts(products);
        };
        getProducts();

    }, []);

    return (
        <>
            {
                // TODO: adjust when showcase backend is done to not use hardcoded six products
                products.length ? products.slice(0, 6).map(product => {
                    return (
                        <Grid item>
                            <Link color="inherit" underline="none" href={`/products/${product.id}`}>
                                <ProductItem key={product.id} product={product}></ProductItem>
                            </Link>
                        </Grid>
                    );
                }) :
                    <Typography variant="h6">Houve um problema ao buscar os produtos</Typography>
            }
        </>
    );
}
