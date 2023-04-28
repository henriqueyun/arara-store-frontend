import { Container, Grid, Typography } from "@mui/material";
import { ProductsFilter, ProductItem } from "../components"
import { client } from "../../client/";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const products = await client.products.findAll();
            setProducts(products);
        };
        getProducts();
    }, []);

    return (
        <Container maxWidth="xl">
            <Grid container my={8} display="flex">
                <Grid item xs={3}>
                    <ProductsFilter products={products} />
                </Grid>
                {/* make this a component */}
                <Grid item xs={9} display="flex" justifyContent="center" flexWrap="wrap" gap={8}>
                    {
                        products.length ? products.map(product => {
                            return (
                                <Grid item key={product.id}>
                                    <ProductItem product={product}></ProductItem>
                                </Grid>
                            );
                        }) :
                            <Typography variant="h6">Houve um problema ao buscar os produtos</Typography>
                    }
                </Grid>
            </Grid>
        </Container >
    )
}