import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductItem from '../components/ProductItem';
import { client } from '../../client/';

export default function Home() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            const products = await client.products.findAll();
            setProducts(products);
        }
        getProducts()
    }, [])
    return (
        <Grid container flexDirection="column">
            <Grid container p={4} justifyContent="center">
                <Grid item>
                    <img src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Uma fotografia de uma muda de roupas" />
                </Grid>
            </Grid>
            <Grid container item spacing={6} p={8} justifyContent="center">
                <Grid container justifyContent="center">
                    <Typography variant="h1">Ararastore</Typography>
                </Grid>
                ({
                    products.map(product => (
                        <Grid item><ProductItem key={product.id} product={product}></ProductItem></Grid>
                    ))
                })
            </Grid>
        </Grid>
    )
}