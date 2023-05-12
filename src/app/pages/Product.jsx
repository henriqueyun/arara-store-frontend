import { Container, Grid, Stack, Typography, Button, Divider, IconButton, Chip } from "@mui/material";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {   useParams } from 'react-router-dom';
import { Showcase } from "../components"
import {    useEffect, useState } from "react";
import { client } from "../../client";
import { calculateDiscount, formatCurrency } from "../util";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {   
        
         
        const getProducts = async () => {
            const product = await client.products.findById(id);
            setProduct(product);
        };
        getProducts();
    }, [id])

    return (
        <>           
            <ProductExhibition>
                <ProductInfo product={product}></ProductInfo>
            </ProductExhibition>
            {/* TODO: see how product exhibition bottom showcases should work then remove hardcoded showcases*/}
            <Grid container py={8} justifyContent="center" gap={8}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>Promoções</Typography>
                <Grid container justifyContent="center" gap={2}>
                    <Showcase></Showcase>
                </Grid>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>Produtos Similares</Typography>
                <Grid container justifyContent="center" gap={2}>
                    <Showcase></Showcase>
                </Grid>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>Lançamentos</Typography>
                <Grid container justifyContent="center" gap={2}>
                    <Showcase></Showcase>
                </Grid>
            </Grid>
        </>
    )
}

function ProductExhibition(props) {
    return (
        <Container>
            <Grid container alignItems="center" gap={4} py={8}>
                {props.children}
                <Divider sx={{ width: "100%" }} />
            </Grid>
        </Container>
    )
}

function ProductImages(props) {
    const { imageUrl } = props
    return (
        <Grid display="flex" gap={2} >
            <Grid>
                <img src={imageUrl} alt="Highlighted product" style={{ width: "350px", height: "100%" }} />
            </Grid>
        </Grid >
    )
}

function ProductInfo(props) {
    const { product } = props
    return (
        <>
            <Grid container alignItems="center" >
                <ProductImages imageUrl={product.image} />
                <Grid display="flex" justifyContent="center" sx={{ margin: "0 auto" }}>
                    <Grid display="flex" flexDirection="column" gap={4}>
                        <Title>
                            {product.name}
                        </Title>
                        <Amounts price={product.price} discount={product.discount} />
                        <OptativeDetail detailTitle="COR">
                            {product.color}
                        </OptativeDetail>
                        <OptativeDetail detailTitle="TAMANHO">
                            {product.size}
                        </OptativeDetail>
                        {/* TODO: quantity component */}
                        <Grid>
                            <Typography sx={{ fontWeight: "bold" }}>QUANTIDADE</Typography>
                            <Chip label="TODO" variant="outlined" ></Chip>
                        </Grid>
                        <BuyButtons />
                    </Grid>
                </Grid>
            </Grid >
            <Divider sx={{ width: "100%" }} />
            <LargeDescription />
        </>
    )
}

function Title(props) {
    return (
        <Grid display="flex" gap={1} alignItems="center">
            <Typography variant="h4">{props.children}</Typography>
            <IconButton ><ShareOutlinedIcon></ShareOutlinedIcon></IconButton>
        </Grid>
    )
}

function Amounts(props) {
    const { price, discount } = props
    return (
        <Grid display="flex" gap={1}>
            <Grid>
                {discount > 0 ?
                    <>
                        <Price price={calculateDiscount(price, discount)} noDiscountPrice={price} />
                        <Discount>
                            {discount}
                        </Discount>
                    </>
                    :
                    <NoDiscountPrice>
                        {price}
                    </NoDiscountPrice>
                }
            </Grid>
            <InstallmentsOptions price={calculateDiscount(price, discount)} />
        </Grid >
    )
}

function NoDiscountPrice(props) {
    console.log(props.children)
    return (
        <Grid display="flex" justifyContent="end">
            <Grid display="flex" gap={1} px={1} alignItems="center" sx={{ color: (theme) => theme.palette.common.white, backgroundColor: (theme) => theme.palette.common.black }}>
                <Typography variant="h5">{formatCurrency(parseFloat(props.children))}</Typography>
            </Grid>
        </Grid>
    )
}

function Price(props) {
    const { noDiscountPrice, price } = props
    return (
        <Grid display="flex" justifyContent="end">
            <Grid display="flex" gap={1} px={1} alignItems="center" sx={{ color: (theme) => theme.palette.common.white, backgroundColor: (theme) => theme.palette.common.black }}>
                <Typography><s>{formatCurrency(parseFloat(noDiscountPrice))}</s></Typography>
                <Typography variant="h5">{formatCurrency(parseFloat(price))}</Typography>
            </Grid>
        </Grid>
    )
}

function Discount(props) {
    return (
        props.children ?
            < Grid display="flex" flexDirection="row-reverse" >
                <Grid sx={{ backgroundColor: (theme) => theme.palette.warning.main }} px={1.5}>
                    <Typography sx={{ fontWeight: 'bold' }}>{props.children}% OFF</Typography>
                </Grid>
            </Grid >
            :
            <></>
    )
}

// TODO: replace for real installments option
function InstallmentsOptions(props) {
    const { price } = props
    return (
        <Grid display="flex" alignItems="flex-end">
            <Typography>
                em até<br />
                <Typography><b>2x de {formatCurrency((price / 2))}</b> no cartão de crédito</Typography>
            </Typography>
        </Grid>
    )
}

function OptativeDetail(props) {
    const { detailTitle } = props
    return (
        <Grid>
            <Typography sx={{ fontWeight: 'bold' }}>{detailTitle}</Typography>
            <Stack direction="row" spacing={1}>
                {/* TODO: fix that color setup */}
                <Chip size="large" sx={{ px: 2 }} label={props.children} variant="outlined" />
            </Stack>
        </Grid>
    )
}

function BuyButtons() {
    return (
        <Grid display="flex" gap={1}>
            <Button size="large" variant="outlined" startIcon={<ShoppingCartIcon />}>ADICIONAR AO CARRINHO</Button>
            <Button size="large" variant="contained">COMPRAR AGORA</Button>
        </Grid>
    )
}

function LargeDescription(props) {
    return (
        <Grid textAlign="left">
            <Typography variant="h6">DETALHES DO PRODUTO</Typography><br />
            CAMISETA OVERSIZE PRETA<br /><br />

            Modelagem: Reta<br />
            Gola: Redonda<br />
            Manga: Curta<br />
            Estampa: Logo<br />
            Detalhes: Possui logo frontal.<br /><br />

            Medidas da peça no tamanho G:<br />
            • Ombro: 15cm<br />
            • Ombro a ombro: 52cm<br />
            • Comprimento da manga: 21cm<br />
            • Largura da manga: 36cm<br />
            • Comprimento da peça: 74cm<br />
            • Tórax: 118cm<br />
            Medidas do Modelo: Altura: 1,89m/ Tórax: 103cm/ Manequim: 42.<br /><br />

            CLÁSSICA E ATEMPORAL: As camisetas são itens indispensáveis em um guarda-roupa moderno! Elas são extremamente coringas, combinam com diversas composições e são perfeitas para dar aquele toque urbano e descolado com personalidade! Aposte com peças mais estruturadas para criar um look que vai desde o trabalho ao happy hour!<br />
        </Grid>
    )
}
