import { Grid, Typography, Link } from "@mui/material";
import ProductItem from "./ProductItem";

export default function ProductsGrid(props) {
    const { products } = props
    return (
        <Grid item xs={9} display="flex" justifyContent="center" flexWrap="wrap" gap={8}>
            {
                products.length ? products.map(product => {
                    return (
                        <Grid item key={product.id}>
                            <Link color="inherit" underline="none" href={`/products/${product.id}`}>
                                <ProductItem product={product}></ProductItem>
                            </Link>
                        </Grid>
                    );
                }) :
                    <Typography variant="h6">Houve um problema ao buscar os produtos</Typography>
            }
        </Grid>
    )
}