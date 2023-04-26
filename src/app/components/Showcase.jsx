import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
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
                products.length ? products.map(product => {
                    return (
                        <Grid item>
                            <ProductItem key={product.id} product={product}></ProductItem>
                        </Grid>
                    );
                }) :
                    <Typography variant="h6">Houve um problema ao buscar os produtos</Typography>
            }
        </>
    );
}
