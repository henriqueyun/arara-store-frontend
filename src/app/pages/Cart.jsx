import React, { useEffect, useState } from 'react';
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
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Clear } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import KeepBuyingButton from '../components/KeepBuyingButton';
import { formatCurrency } from '../util';

import { client } from '../../client';

export default function Cart() {
  return (
    <Container>
      <Grid container py={8}>
        <NavAction>
          <KeepBuyingButton />
        </NavAction>
        <CartTable />
        <CartOrderOptions />
      </Grid>
    </Container>
  );
}

function CartTableRow({ cartItem, onUpdate }) {
  const removeCartItem = async () => {
    await client.cart.items.remove(cartItem.id);
    await onUpdate();
  };
  const [removeButtonVisibilty, setRemoveButtonVisibilty] = useState('hidden');
  return (
    <TableRow
      onMouseEnter={() =>
        setTimeout(() => setRemoveButtonVisibilty('visible'), 25)
      }
      onMouseLeave={() =>
        setTimeout(() => setRemoveButtonVisibilty('hidden'), 25)
      }
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        sx={{ backgroundColor: (theme) => theme.palette.common.white }}
        scope="row"
      >
        <Grid display="flex" alignItems="center" gap={2}>
          <RemoveCartItemButton
            onClick={removeCartItem}
            visibility={removeButtonVisibilty}
          />
          <Link href={`/products/${cartItem.product.id}`}>
            <img
              style={{ width: '130px', height: '170px' }}
              src={
                (cartItem?.product?.images &&
                  cartItem?.product?.images[0]?.imageUrl) ||
                'https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fG1pc3NpbmclMjBzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
              }
              alt={cartItem.product.description}
            />
          </Link>
        </Grid>
      </TableCell>
      <TableCell
        component="a"
        href={`/products/${cartItem.product.id}`}
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          textDecoration: 'none',
        }}
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
            {/* TODO: change here to QuantityChanger and implement actual changing with it */}
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

function RemoveCartItemButton({ onClick, visibility }) {
  return (
    <IconButton onClick={onClick} sx={{ visibility }}>
      <Clear />
    </IconButton>
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

function CartTable() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (!cartItems) {
      setCartItems([]);
    }
  }, [cartItems]);

  const listItems = async () => {
    const response = await client.cart.items.list();
    setCartItems(response);
  };

  useEffect(() => {
    listItems();
  }, []);
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
            <CartTableBody cartItems={cartItems} onUpdate={listItems} />
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

function CartTableBody({ cartItems, onUpdate }) {
  return (
    <TableBody>
      {cartItems.length &&
        cartItems.map((cartItem) => (
          <CartTableRow cartItem={cartItem} onUpdate={onUpdate} />
        ))}
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
