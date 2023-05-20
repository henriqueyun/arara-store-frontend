import React, { useEffect } from 'react';
import {
  Button,
  Container,
  TableContainer,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  Typography,
  TableBody,
  Chip,
  Grid,
  TextField,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import KeepBuyingButton from '../components/KeepBuyingButton';
import { formatCurrency } from '../util';

import { client } from '../../client';

export default function Cart() {
  const [cartItems, setCartItems] = React.useState([]);
  useEffect(() => {
    if (!cartItems) {
      setCartItems([]);
    }
  }, [cartItems]);

  useEffect(() => {
    const listItems = async () => {
      const response = await client.cart.items.list();
      setCartItems(response);
    };
    listItems();
  }, []);
  return (
    <Container>
      <Grid container py={8}>
        <NavAction>
          <KeepBuyingButton />
        </NavAction>
        <CartTable cartItems={cartItems} />
        <CartOrderOptions />
      </Grid>
    </Container>
  );
}

function CartTableRow({ cartItem }) {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell
        sx={{ backgroundColor: (theme) => theme.palette.common.white }}
        component="th"
        scope="row"
      >
        <img
          style={{ width: '130px', height: '170px' }}
          src="https://images.unsplash.com/photo-1586478069437-e324bcfbe9fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjZ8MzM1NjU3Nnx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Flowered shirt guy"
        />
      </TableCell>
      <TableCell
        sx={{ backgroundColor: (theme) => theme.palette.common.white }}
        align="left"
      >
        <Typography>{cartItem.product.description}</Typography>
        <Typography>
          {formatCurrency(parseFloat(cartItem.product.price))}
        </Typography>
      </TableCell>
      <TableCell
        sx={{ backgroundColor: (theme) => theme.palette.common.white }}
        align="right"
      >
        <Typography>
          <Grid>
            <Typography sx={{ fontWeight: 'bold' }}>QUANTIDADE</Typography>
            <Chip label={cartItem.quantity} variant="outlined" />
          </Grid>
        </Typography>
      </TableCell>
      <TableCell
        sx={{ backgroundColor: (theme) => theme.palette.common.white }}
        align="right"
      >
        <Typography>
          {formatCurrency(cartItem.product.price * cartItem.quantity)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

function CartTableAction({ children }) {
  return (
    <>
      <Grid container py={4} flexDirection="column">
        <Divider />
      </Grid>
      <Grid container pb={2} display="flex" justifyContent="space-between">
        <Grid display="flex" alignItems="center">
          <ShoppingCartIcon
            sx={{
              fontSize: (theme) => theme.typography.h3.fontSize,
              display: 'inline-block',
            }}
          />
          <Typography
            sx={{ display: 'inline', verticalAlign: 'top' }}
            variant="h4"
          >
            Carrinho
          </Typography>
        </Grid>
        {children}
      </Grid>
    </>
  );
}

function CartTable({ cartItems }) {
  const calculateCartPrice = () => {
    return cartItems.reduce((acc, cartItem) => {
      return acc + parseFloat(cartItem.product.price) * cartItem.quantity;
    }, 0);
  };
  return (
    <>
      <CartTableAction>
        {cartItems.length ? (
          <Button startIcon={<PercentIcon />} variant="outlined">
            APLICAR CUPOM DE DESCONTO
          </Button>
        ) : (
          ''
        )}
      </CartTableAction>
      {cartItems.length ? (
        <TableContainer component={Paper}>
          <Table>
            <CartTableHead />
            <CartTableBody cartItems={cartItems} />
          </Table>
          <CartTableFooter cartPrice={calculateCartPrice()} />
        </TableContainer>
      ) : (
        <Typography variant="h5">Não há items no carrinho</Typography>
      )}
    </>
  );
}

function CartTableFooter({ cartPrice }) {
  return (
    <Grid
      sx={{
        color: (theme) => theme.palette.background.default,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
      p={2}
      container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h4">SUBTOTAL</Typography>
      <Typography variant="h4">{formatCurrency(cartPrice)}</Typography>
    </Grid>
  );
}

function CartTableHead() {
  return (
    <TableHead sx={{ color: (theme) => theme.palette.background.paper }}>
      <TableRow>
        <TableCell colSpan={2} align="center">
          <Typography color="background.default" sx={{ fontWeight: 'bold' }}>
            Produto
          </Typography>
        </TableCell>
        <TableCell colSpan={1} align="right">
          <Typography color="background.default" sx={{ fontWeight: 'bold' }}>
            Quantidade
          </Typography>
        </TableCell>
        <TableCell colSpan={1} align="right">
          <Typography color="background.default" sx={{ fontWeight: 'bold' }}>
            Valor
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function CartTableBody(props) {
  const { cartItems } = props;
  return (
    <TableBody>
      {cartItems.length &&
        cartItems.map((cartItem) => <CartTableRow cartItem={cartItem} />)}
    </TableBody>
  );
}

function CartOrderOptions() {
  return (
    <>
      <NavAction gridProps={{ pt: 6 }}>
        <KeepBuyingButton />
      </NavAction>
      <DeliveryInfo />
      <Grid container py={4} flexDirection="column">
        <Divider />
      </Grid>
      <NavAction
        gridProps={{
          container: true,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <KeepBuyingButton />
        <Button endIcon={<ArrowForwardOutlinedIcon />} variant="contained">
          COMPRAR AGORA
        </Button>
      </NavAction>
    </>
  );
}

function DeliveryInfo() {
  return (
    <Grid container pt={6} gap={8} flexDirection="column">
      <DeliveryAddressInfo />
      <DeliveryValueInfo />
    </Grid>
  );
}

function DeliveryAddressInfo() {
  return (
    <Grid>
      <Typography variant="h4">FRETE</Typography>
      <Grid container gap={2} flexDirection="column">
        <Stack direction="row" spacing={6}>
          <TextField label="CEP" variant="outlined" />
          <Button variant="outlined">BUSCAR</Button>
        </Stack>
        <Stack direction="row" spacing={6}>
          <TextField label="Cidade" variant="outlined" />
          <TextField label="Estado" variant="outlined" />
        </Stack>
        <Stack direction="row" spacing={6}>
          <TextField label="Endereço" variant="outlined" />
          <TextField label="Número" variant="outlined" />
        </Stack>
      </Grid>
    </Grid>
  );
}

function DeliveryValueInfo() {
  return (
    <Grid>
      <Typography variant="h4">VALOR FRETE</Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="entrega"
          control={<Radio />}
          label={
            <>
              <Typography display="inline">
                Zezé Delivery - Entrega entre 01/01/2050 e Nunca -{' '}
              </Typography>
              <Typography display="inline" color="warning.main">
                R$ 1,000,00
              </Typography>
            </>
          }
        />
        <FormControlLabel
          value="entrega"
          control={<Radio />}
          label={
            <>
              <Typography display="inline">
                Edimilson Entregas - Entrega até 09/12/2022 -{' '}
              </Typography>
              <Typography display="inline" color="success.main">
                GRATUITO
              </Typography>
            </>
          }
        />
        <FormControlLabel
          value="entrega"
          control={<Radio />}
          label={
            <>
              <Typography display="inline">
                Raimundinha Envios - Entrega até 11/12/2022 -{' '}
              </Typography>
              <Typography display="inline" color="warning.main">
                R$ 91,34
              </Typography>
            </>
          }
        />
      </RadioGroup>
    </Grid>
  );
}

function NavAction(props) {
  return (
    <Grid
      container
      display="flex"
      justifyContent="space-between"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props?.gridProps}
    >
      {props?.children || ''}
    </Grid>
  );
}
