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
  Grid,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Clear } from '@mui/icons-material';
import { KeepBuyingButton, Price, QuantityChanger } from '../components';
import { calculateDiscount, formatCurrency } from '../util';
import { client } from '../../client';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [canBuy, setCanBuy] = useState(false);

  useEffect(() => {
    if (!cartItems) {
      setCartItems([]);
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length) {
      setCanBuy(true);
      return;
    }
    setCanBuy(false);
  }, [cartItems]);

  const listItems = async () => {
    const { id } = JSON.parse(localStorage.getItem('loggedUser'));
    const cart = await client.cart.find(id);
    setCartItems(cart.items);
  };

  useEffect(() => {
    listItems();
  }, []);
  return (
    <Container>
      <Grid container py={8}>
        <NavAction>
          <KeepBuyingButton />
        </NavAction>
        <CartTable cartItems={cartItems} onChange={listItems} />
        <CartOrderOptions disabled={!canBuy} />
      </Grid>
    </Container>
  );
}

function CartTableRow({ cartItem, onUpdate }) {
  const [qtyChangeDisabled, setQtyChangeDisabled] = useState(false);
  const removeCartItem = async () => {
    setQtyChangeDisabled(true);
    await client.cart.items.remove(cartItem.id);
    onUpdate();
    setQtyChangeDisabled(false);
  };

  const increaseQuantity = async () => {
    if (cartItem.quantity < 25) {
      setQtyChangeDisabled(true);
      await client.cart.items.update(cartItem.id, {
        quantity: cartItem.quantity + 1,
      });
      onUpdate();
      setQtyChangeDisabled(false);
    }
  };

  const decreaseQuantity = async () => {
    if (cartItem.quantity > 1) {
      setQtyChangeDisabled(true);
      await client.cart.items.update(cartItem.id, {
        quantity: cartItem.quantity - 1,
      });
      onUpdate();
      setQtyChangeDisabled(false);
    }
  };

  const changeQuantity = async (event) => {
    setQtyChangeDisabled(true);
    const newQuantity = parseInt(event.target.value, 10);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(newQuantity)) {
      setQtyChangeDisabled(false);
      return;
    }
    if (newQuantity < 1) {
      setQtyChangeDisabled(false);
      return;
    }
    if (newQuantity > 25) {
      setQtyChangeDisabled(false);
      return;
    }
    await client.cart.items.update(cartItem.id, {
      quantity: newQuantity,
    });
    onUpdate();
    setQtyChangeDisabled(false);
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
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          textDecoration: 'none',
        }}
        align="left"
      >
        <Link
          color="inherit"
          underline="none"
          href={`/products/${cartItem.product.id}`}
        >
          <Typography>{cartItem.product.description}</Typography>
          <Price
            price={cartItem.product.price}
            discount={cartItem.product.discount}
          />
        </Link>
      </TableCell>
      <TableCell
        sx={{ backgroundColor: (theme) => theme.palette.common.white }}
        align="right"
      >
        <QuantityChanger
          value={cartItem.quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onChange={changeQuantity}
          disabled={qtyChangeDisabled}
        />
      </TableCell>
      <TableCell
        sx={{ backgroundColor: (theme) => theme.palette.common.white }}
        align="right"
      >
        <Typography>
          {formatCurrency(
            calculateDiscount(
              parseFloat(cartItem.product.price),
              parseFloat(cartItem.product.discount),
            ) * cartItem.quantity,
          )}
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

function CartTable({ cartItems, onChange }) {
  const calculateCartPrice = () => {
    return cartItems.reduce((acc, cartItem) => {
      return (
        acc +
        calculateDiscount(
          parseFloat(cartItem.product.price),
          parseFloat(cartItem.product.discount),
        ) *
          cartItem.quantity
      );
    }, 0);
  };

  const pickRandomMsg = () => {
    const msgs = [
      'Se você não comprar nada o desconto é de 100% ✂️🏷️',
      'Foi mal, não aceitamos vale-refeição ☕🍞',
      'Sua mulher tem dois cupons? Sinto muito, ainda não aceitamos cupons 🛒😭',
    ];

    const randomIndex = Math.round(Math.random() * (msgs.length - 1));
    return `${randomIndex} ${msgs[randomIndex]}`;
  };

  return (
    <>
      <CartTableAction>
        {cartItems.length ? (
          <Button
            onClick={() => alert(pickRandomMsg())}
            startIcon={<PercentIcon />}
            variant="outlined"
          >
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
            <CartTableBody cartItems={cartItems} onUpdate={onChange} />
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
          <CartTableRow
            key={cartItem.id}
            cartItem={cartItem}
            onUpdate={onUpdate}
          />
        ))}
    </TableBody>
  );
}

function CartOrderOptions({ disabled }) {
  return (
    <>
      <Grid container py={4} flexDirection="column">
        <Divider />
      </Grid>
      <NavAction
        gridProps={{
          container: true,
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Button
          href="/order"
          endIcon={<ArrowForwardOutlinedIcon />}
          variant="contained"
          disabled={disabled}
        >
          COMPRAR AGORA
        </Button>
      </NavAction>
    </>
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
