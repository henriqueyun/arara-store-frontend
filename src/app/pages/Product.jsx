// TODO: remove linter disabling
/* eslint-disable no-unused-vars */
import { Container, Grid, Stack, Typography, Button, Divider, IconButton } from "@mui/material";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useParams } from "react-router-dom";
import { Showcase } from "../components"

export default function Product() {
    let { id } = useParams();

    return (
        <>
            <ProductExhibition>
                <ProductInfo></ProductInfo>
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
    const { product } = props
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
    return (
        <Grid display="flex" gap={2} >
            <Stack spacing={2}>
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80" alt="A woman using a yellow sweatshirt outfit" style={{ width: "60px", height: "100%" }} />
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80" alt="A woman using a yellow sweatshirt outfit" style={{ width: "60px", height: "100%" }} />
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80" alt="A woman using a yellow sweatshirt outfit" style={{ width: "60px", height: "100%" }} />
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80" alt="A woman using a yellow sweatshirt outfit" style={{ width: "60px", height: "100%" }} />
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80" alt="A woman using a yellow sweatshirt outfit" style={{ width: "60px", height: "100%" }} />
            </Stack>
            <Grid sx={{ backgroundColor: "pink" }}>
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80" alt="A woman using a yellow sweatshirt outfit" style={{ width: "350px", height: "100%" }} />
            </Grid>
        </Grid >
    )
}

function ProductInfo(props) {
    return (
        <>
            <Grid container alignItems="center" >
                <ProductImages />
                <Grid display="flex" justifyContent="center" sx={{ margin: "0 auto" }}>
                    <Grid display="flex" flexDirection="column" gap={4}>
                        <Title />
                        <Amounts />
                        <OptativeDetail detailTitle="COR" />
                        <OptativeDetail detailTitle="TAMANHO" />
                        <OptativeDetail detailTitle="QUANTIDADE" />
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
    const { title } = props
    return (
        <Grid display="flex" gap={1} alignItems="center">
            <Typography variant="h4">Camiseta Doidera Máxima</Typography>
            <IconButton color="secondary"><ShareOutlinedIcon></ShareOutlinedIcon></IconButton>
        </Grid>
    )
}

function Amounts(props) {
    const { price, discount } = props
    return (
        <Grid display="flex" gap={1}>
            <Grid>
                <Price />
                <Discount />
            </Grid>
            <InstallmentsOptions />
        </Grid >
    )
}

function Price(props) {
    return (
        <Grid display="flex" justifyContent="end">
            <Grid display="flex" gap={1} px={1} alignItems="center" sx={{ color: (theme) => theme.palette.common.white, backgroundColor: (theme) => theme.palette.common.black }}>
                <Typography><s>R$ 200,00</s></Typography>
                <Typography variant="h5">R$ 159,90</Typography>
            </Grid>
        </Grid>
    )
}

function Discount(props) {
    return (
        <Grid display="flex" flexDirection="row-reverse" >
            <Grid sx={{ backgroundColor: (theme) => theme.palette.warning.main }} px={1.5}>
                <Typography sx={{ fontWeight: 'bold' }}>20% OFF</Typography>
            </Grid>
        </Grid >
    )
}

function InstallmentsOptions(props) {
    return (
        <Grid display="flex" alignItems="flex-end">
            <Typography>
                em até<br />
                <Typography><b>2x de R$ 80,00</b> no cartão de crédito</Typography>
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
                <Button color="secondary" sx={{ px: 4, fontWeight: 'bold', color: (theme) => theme.palette.common.black, borderColor: (theme) => theme.palette.common.black }} variant="outlined">PRETO</Button>
                <Button color="secondary" sx={{ px: 4, fontWeight: 'bold', color: (theme) => theme.palette.common.black, borderColor: (theme) => theme.palette.common.black }} variant="outlined">AZUL</Button>
                <Button color="secondary" sx={{ px: 4, fontWeight: 'bold', color: (theme) => theme.palette.common.black, borderColor: (theme) => theme.palette.common.black }} variant="outlined">AMARELO</Button>
                <Button color="secondary" sx={{ px: 4, fontWeight: 'bold', color: (theme) => theme.palette.common.black, borderColor: (theme) => theme.palette.common.black }} variant="outlined">VERMELHA</Button>
                <Button color="secondary" sx={{ px: 4, fontWeight: 'bold', color: (theme) => theme.palette.common.black, borderColor: (theme) => theme.palette.common.black }} variant="outlined">VERDE</Button>
            </Stack>
        </Grid>
    )
}

function BuyButtons() {
    return (
        <Grid display="flex" gap={1}>
            <Button size="large" color="secondary" variant="outlined" startIcon={<ShoppingCartIcon />}>ADICIONAR AO CARRINHO</Button>
            <Button size="large" color="secondary" variant="contained">COMPRAR AGORA</Button>
        </Grid>
    )
}

function LargeDescription(props) {
    const { description } = props
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