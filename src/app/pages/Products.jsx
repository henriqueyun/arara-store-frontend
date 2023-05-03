import { Container, Grid, Typography } from "@mui/material";
import { ProductsFilter, ProductItem } from "../components"
import { client } from "../../client/";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    function applyFilters(filters) {
        setFilteredProducts(products.filter(p => {
            const fields = Object.keys(filters)
            const passFilters = fields.every(f => {
                const productField = typeof p[f] === "number" ? JSON.stringify(p[f]) : p[f];
                return filters[f].includes(productField)
            })
            return passFilters
        }))
    }

    useEffect(() => {
        const getProducts = async () => {
            const products = await client.products.findAll();
            setProducts(products);
            setFilteredProducts(products);
        };
        getProducts();
    }, []);

    return (
        <Container maxWidth="xl">
            <Grid container my={8} display="flex">
                <Grid item xs={3}>
                    <ProductsFilter handleFilter={applyFilters} products={products} />
                </Grid>
                {/* TODO: make component */}
                <Grid item xs={9} display="flex" justifyContent="center" flexWrap="wrap" gap={8}>
                    {
                        filteredProducts.length ? filteredProducts.map(product => {
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