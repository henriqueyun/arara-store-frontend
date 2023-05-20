import {
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Showcase } from '../components';
import { client } from '../../client';
import { calculateDiscount, formatCurrency } from '../util';
import QuantityChanger from '../components/QuantityChanger';
import BuyOptionsModal from '../components/BuyOptionsModal';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getProducts = async () => {
      const response = await client.products.findById(id);
      setProduct(response);
    };
    getProducts();
  }, []);

  return (
    <>
      <ProductExhibition>
        <ProductInfo product={product} />
      </ProductExhibition>
      {/* TODO:
      see how product exhibition bottom showcases should work then remove hardcoded showcases */}
      <Grid container py={8} justifyContent="center" gap={8}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Promoções
        </Typography>
        <Grid container justifyContent="center" gap={2}>
          <Showcase />
        </Grid>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Produtos Similares
        </Typography>
        <Grid container justifyContent="center" gap={2}>
          <Showcase />
        </Grid>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Lançamentos
        </Typography>
        <Grid container justifyContent="center" gap={2}>
          <Showcase />
        </Grid>
      </Grid>
    </>
  );
}

function ProductExhibition({ children }) {
  return (
    <Container>
      <Grid container alignItems="center" gap={4} py={8}>
        {children}
        <Divider sx={{ width: '100%' }} />
      </Grid>
    </Container>
  );
}

function ProductImages({ imageUrl }) {
  return (
    <Grid display="flex" gap={2}>
      <Grid>
        <img
          src={
            imageUrl ||
            'https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fG1pc3NpbmclMjBzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          }
          alt="Highlighted product"
          style={{ width: '350px', height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Grid container alignItems="center">
        <ProductImages
          imageUrl={product?.images && product?.images[0]?.imageUrl}
        />
        <Grid display="flex" justifyContent="center" sx={{ margin: '0 auto' }}>
          <Grid display="flex" flexDirection="column" gap={4}>
            <Title>{product.name}</Title>
            <Amounts price={product.price} discount={product.discount} />
            <OptativeDetail detailTitle="COR">{product.color}</OptativeDetail>
            <OptativeDetail detailTitle="TAMANHO">
              {product.size}
            </OptativeDetail>
            <Grid>
              <Typography sx={{ fontWeight: 'bold' }}>QUANTIDADE</Typography>
              {/* TODO: discuss field rules, which max. value makes sense (if we should have a max. value etc.) */}
              <QuantityChanger
                value={quantity}
                onIncrease={() =>
                  setQuantity((oldQty) => (oldQty < 25 ? oldQty + 1 : 25))
                }
                onDecrease={() =>
                  setQuantity((oldQty) => (oldQty > 1 ? oldQty - 1 : 1))
                }
                onChange={(event) => {
                  const qty = parseInt(event.target.value, 10);
                  // eslint-disable-next-line no-restricted-globals
                  if (isNaN(qty)) {
                    setQuantity(1);
                    return;
                  }
                  if (qty < 1) {
                    setQuantity(1);
                    return;
                  }
                  if (qty > 25) {
                    setQuantity(25);
                    return;
                  }
                  setQuantity(qty);
                }}
              />
            </Grid>
            <BuyButtons productId={product.id} quantity={quantity} />
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ width: '100%' }} />
      <LargeDescription />
    </>
  );
}

function Title({ children }) {
  return (
    <Grid display="flex" gap={1} alignItems="center">
      <Typography variant="h4">{children}</Typography>
      <IconButton>
        <ShareOutlinedIcon />
      </IconButton>
    </Grid>
  );
}

function Amounts({ price, discount }) {
  return (
    <Grid display="flex" gap={1}>
      <Grid>
        {discount > 0 ? (
          <>
            <Price
              price={calculateDiscount(price, discount)}
              noDiscountPrice={price}
            />
            <Discount>{discount}</Discount>
          </>
        ) : (
          <NoDiscountPrice>{price}</NoDiscountPrice>
        )}
      </Grid>
      <InstallmentsOptions price={calculateDiscount(price, discount)} />
    </Grid>
  );
}

function NoDiscountPrice({ children }) {
  return (
    <Grid display="flex" justifyContent="end">
      <Grid
        display="flex"
        gap={1}
        px={1}
        alignItems="center"
        sx={{
          color: (theme) => theme.palette.common.white,
          backgroundColor: (theme) => theme.palette.common.black,
        }}
      >
        <Typography variant="h5">
          {formatCurrency(parseFloat(children))}
        </Typography>
      </Grid>
    </Grid>
  );
}

function Price({ noDiscountPrice, price }) {
  return (
    <Grid display="flex" justifyContent="end">
      <Grid
        display="flex"
        gap={1}
        px={1}
        alignItems="center"
        sx={{
          color: (theme) => theme.palette.common.white,
          backgroundColor: (theme) => theme.palette.common.black,
        }}
      >
        <Typography>
          <s>{formatCurrency(parseFloat(noDiscountPrice))}</s>
        </Typography>
        <Typography variant="h5">
          {formatCurrency(parseFloat(price))}
        </Typography>
      </Grid>
    </Grid>
  );
}

function Discount({ children }) {
  return children ? (
    <Grid display="flex" flexDirection="row-reverse">
      <Grid
        sx={{ backgroundColor: (theme) => theme.palette.warning.main }}
        px={1.5}
      >
        <Typography sx={{ fontWeight: 'bold' }}>{children}% OFF</Typography>
      </Grid>
    </Grid>
  ) : null;
}

// TODO: replace for real installments option
function InstallmentsOptions({ price }) {
  return (
    <Grid display="flex" alignItems="flex-end">
      <Typography>
        em até
        <br />
        <Typography>
          <b>
            {`
            2x de
            ${formatCurrency(price / 2)} `}
          </b>
          no cartão de crédito
        </Typography>
      </Typography>
    </Grid>
  );
}

function OptativeDetail({ children, detailTitle }) {
  return (
    <Grid>
      <Typography sx={{ fontWeight: 'bold' }}>{detailTitle}</Typography>
      <Stack direction="row" spacing={1}>
        {/* TODO: fix that color setup */}
        <Chip size="large" sx={{ px: 2 }} label={children} variant="outlined" />
      </Stack>
    </Grid>
  );
}

function BuyButtons({ productId, quantity }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const addToCart = async () => {
    return client.cart.items.add(productId, quantity);
  };

  const showBuyOptions = () => {
    setOpen(true);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <Grid display="flex" gap={1}>
      <BuyOptionsModal open={open} handleClose={() => setOpen(false)} />
      <Button
        onClick={async () => {
          if (await addToCart()) {
            showBuyOptions();
          }
        }}
        size="large"
        variant="outlined"
        startIcon={<ShoppingCartIcon />}
      >
        ADICIONAR AO CARRINHO
      </Button>
      <Button
        onClick={async () => {
          if (await addToCart()) {
            goToCart();
          }
        }}
        size="large"
        variant="contained"
      >
        COMPRAR AGORA
      </Button>
    </Grid>
  );
}

function LargeDescription() {
  return (
    <Grid textAlign="left">
      <Typography variant="h6">DETALHES DO PRODUTO</Typography>
      <br />
      CAMISETA OVERSIZE PRETA
      <br />
      <br />
      Modelagem: Reta
      <br />
      Gola: Redonda
      <br />
      Manga: Curta
      <br />
      Estampa: Logo
      <br />
      Detalhes: Possui logo frontal.
      <br />
      <br />
      Medidas da peça no tamanho G:
      <br />
      • Ombro: 15cm
      <br />
      • Ombro a ombro: 52cm
      <br />
      • Comprimento da manga: 21cm
      <br />
      • Largura da manga: 36cm
      <br />
      • Comprimento da peça: 74cm
      <br />
      • Tórax: 118cm
      <br />
      Medidas do Modelo: Altura: 1,89m/ Tórax: 103cm/ Manequim: 42.
      <br />
      <br />
      CLÁSSICA E ATEMPORAL:
      <br />
      As camisetas são itens indispensáveis em um guarda-roupa moderno! <br />
      Elas são extremamente coringas, <br />
      combinam com diversas composições <br />e são perfeitas para dar aquele
      toque urbano e descolado com personalidade! <br />
      Aposte com peças mais estruturadas para criar um look que vai desde o
      trabalho ao happy hour!
      <br />
    </Grid>
  );
}
