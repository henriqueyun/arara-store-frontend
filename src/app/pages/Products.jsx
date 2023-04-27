import { Container, Grid, Typography } from "@mui/material";
import { Showcase, ProductsFilter, ProductItem } from "../components"
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
        <Container maxWidth="xl" sx={{ backgroundColor: "firebrick" }}>
            <Grid container xs={12} my={8} display="flex" sx={{ backgroundColor: "salmon" }}>
                <Grid item xs={3} sx={{ backgroundColor: "lightyellow" }}>
                    <ProductsFilter />
                </Grid>
                <Grid item xs={9} display="flex" justifyContent="center" flexWrap="wrap" gap={8} sx={{ backgroundColor: "lightpink" }}>
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
                </Grid>
            </Grid>
        </Container >
    )
}