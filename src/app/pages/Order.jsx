import {
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { calculateOrderPrice, formatCurrency } from '../util';
import { client } from '../../client';
import AddressForm from '../components/AddressForm';
import { userStorage } from '../storage';
import { Price } from '../components';

function Order() {
  const [order, setOrder] = useState({
    shippingPrice: 0,
  });

  const [cart, setCart] = useState({});
  const [address, setAddress] = useState({});
  const [addresses, setAddresses] = useState([]);

  const navigate = useNavigate();

  const getCart = async () => {
    const response = await client.cart.find(userStorage.getId());
    setCart(response);
  };

  const getAddresses = async () => {
    const response = await client.address.findByUser(userStorage.getId());
    setAddresses(response);
  };

  useEffect(() => {
    getCart();
    getAddresses();
  }, []);

  useEffect(() => {
    setOrder((oldState) => {
      return { ...oldState, cartId: cart.id };
    });
  }, [cart]);

  useEffect(() => {
    setOrder((oldState) => {
      return { ...oldState, addressId: address?.id };
    });
  }, [address]);

  const validateFields = () => {
    const fields = ['addressId', 'payment', 'shippingPrice'];
    return fields.every((field) => {
      return !!order[field];
    });
  };

  const sendOrder = async () => {
    if (!validateFields()) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Para finalizar preencha os selecione o endereço, método de envio e a forma de pagamento!',
      });

      return;
    }

    const response = await client.order.send(order, userStorage.getId());
    if (response) {
      navigate(`/payment?method=${order.payment}`);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Algo de errado aconteceu!',
      });
    }
  };

  const [displayAddressForm, setDisplayAddressForm] = useState('none');

  return (
    <Container sx={{ p: 0, py: 8, backgroundColor: 'none' }}>
      <Grid container flexDirection="column" gap={5}>
        <OrderHeader />
        <Typography variant="h4">1. ENTREGA</Typography>
        <Typography variant="subtitle1">
          Selecione o endereço para calcular o Frete
        </Typography>
        <Grid container flexDirection="column" gap={4}>
          <AddressSelect
            addresses={addresses}
            onSelect={(selectedAddress) => {
              setAddress(() => ({ ...selectedAddress }));
            }}
            onNewAddress={() => setDisplayAddressForm('block')}
          />
          <AddressForm
            onSave={() => {
              setDisplayAddressForm('none');
              getAddresses();
            }}
            onCancel={() => setDisplayAddressForm('none')}
            display={displayAddressForm}
          />
          <DeliverySelect
            cep={address.cep}
            onSelect={(shippingPrice) =>
              setOrder((oldState) => {
                return {
                  ...oldState,
                  shippingPrice: parseFloat(shippingPrice),
                };
              })
            }
          />
        </Grid>
        <Divider />
        <Typography variant="h4">2. PEDIDO</Typography>
        <Typography variant="subtitle1">
          Confira os itens desse pedido para garantir que não há erros
        </Typography>
        {cart.items ? (
          <OrderItems items={cart.items} />
        ) : (
          <Typography variant="">Não há itens pedidos</Typography>
        )}
        <Divider />
        <Grid container flexDirection="column" gap={2}>
          <Typography variant="h4">3. PAGAMENTO</Typography>
          <Typography variant="subtitle1">
            Não deixe de checar o valor total do pedido junto à entrega
          </Typography>
          <Payment
            orderPrice={formatCurrency(calculateOrderPrice(cart.items))}
            shippingPrice={formatCurrency(parseFloat(order.shippingPrice))}
            totalPrice={formatCurrency(
              parseFloat(calculateOrderPrice(cart.items)) +
                parseFloat(order.shippingPrice),
            )}
            onPaymentChange={(e) =>
              setOrder((oldState) => {
                return { ...oldState, payment: e.target.value };
              })
            }
          />
        </Grid>
        <Button variant="contained" onClick={sendOrder}>
          Finalizar Pedido
        </Button>
      </Grid>
    </Container>
  );
}

function OrderHeader() {
  return (
    <>
      <Typography variant="h4">
        <b>Finalizar Pedido</b>
      </Typography>
      <Typography variant="h4">
        <b>Quase tudo pronto!</b>
      </Typography>
    </>
  );
}

function OrderItems({ items }) {
  return (
    <Grid container flexDirection="column" gap={3}>
      {items?.length > 0 &&
        items.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
    </Grid>
  );
}

function AddressSelect({ onSelect, onNewAddress, addresses, disabled }) {
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    onSelect(selectedAddress);
  }, [selectedAddress]);

  return (
    <Grid display="false" container flexDirection="column" gap={4}>
      <Grid display="flex" alignItems="center" gap={2}>
        <FormControl
          disabled={disabled}
          color="secondary"
          sx={{ minWidth: '24ch' }}
        >
          <InputLabel>Endereço</InputLabel>
          <Select
            disabled={disabled}
            value={selectedAddress}
            onChange={(e) => {
              setSelectedAddress(e.target.value);
            }}
            label="Endereço"
          >
            {addresses.length ? (
              addresses.map((addr) => (
                <MenuItem key={addr.id} value={addr}>
                  {addr.description ? addr.description : addr.address}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={selectedAddress}>
                <em>Não há opções</em>
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <Button disabled={disabled} onClick={onNewAddress} variant="outlined">
          Novo Endereço
        </Button>

        {!!selectedAddress.length && (
          <Typography>{`${selectedAddress?.address}, ${selectedAddress.number}, ${selectedAddress.cep} - ${selectedAddress.city}, ${selectedAddress.state}`}</Typography>
        )}
      </Grid>
    </Grid>
  );
}

function DeliverySelect({ cep, onSelect }) {
  const [shippings, setShippings] = useState([]);
  const [loading, setLoading] = useState(false);

  const clearSelection = () => onSelect(0);

  useEffect(() => {
    clearSelection();
    const getShippingMethods = async () => {
      if (cep) {
        setLoading(true);
        try {
          const response = await client.shipping.listForCep(cep);
          setShippings(response);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao buscar estimativa de entrega!',
          });
        } finally {
          setLoading(false);
        }
      }
    };
    getShippingMethods();
  }, [cep]);

  return (
    <Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        !!shippings.length && (
          <Grid>
            <Typography variant="h5">Valor Frete</Typography>
            <RadioGroup
              defaultValue="female"
              onChange={(e) => {
                const selectedShipping = shippings.find(
                  (shipng) => shipng.Codigo === e.target.value,
                );
                onSelect(parseFloat(selectedShipping.Valor));
              }}
            >
              {shippings.map((shipping, index) => (
                <DeliveryRadioButton
                  key={shipping.Codigo}
                  value={shipping.Codigo}
                  shippingMethod={shipping}
                  number={index}
                />
              ))}
            </RadioGroup>
          </Grid>
        )
      )}
    </Grid>
  );
}

function DeliveryRadioButton({ shippingMethod, value, number }) {
  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={
        <>
          <Typography display="inline">
            {`[Correios] Opção ${number + 1}  - Entrega em até ${
              shippingMethod.PrazoEntrega
            } dias úteis `}
          </Typography>
          <Typography display="inline" color="success.main">
            {formatCurrency(parseFloat(shippingMethod.Valor))}
          </Typography>
        </>
      }
    />
  );
}

function OrderItem({ item }) {
  return (
    <Link
      underline="none"
      color="inherit"
      href={`/products/${item.product.id}`}
    >
      <Grid container alignItems="center" gap={4}>
        <img
          style={{ height: '150px', width: '120px' }}
          src={
            (item.product?.images && item.product.images[0]?.imageUrl) ||
            'https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fG1pc3NpbmclMjBzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          }
          alt="Product"
        />
        <Grid>
          <Typography variant="h6">{item.product.description}</Typography>
          <Price
            price={parseFloat(item.product.price)}
            discount={item.product.discount}
          />
          <Typography>{item.quantity} unidades</Typography>
        </Grid>
      </Grid>
    </Link>
  );
}

function Payment({ orderPrice, shippingPrice, totalPrice, onPaymentChange }) {
  return (
    <>
      <PaymentInfo
        orderPrice={orderPrice}
        shippingPrice={shippingPrice}
        totalPrice={totalPrice}
      />
      <PaymentOptions onChange={onPaymentChange} />
    </>
  );
}

function PaymentInfo({ orderPrice, shippingPrice, totalPrice }) {
  return (
    <>
      <Typography variant="h5">
        <b>Valor</b>
      </Typography>
      <Grid container flexDirection="column" gap={2}>
        <Typography variant="h6">Valor do pedido: {orderPrice}</Typography>
        <Typography variant="h6">Valor do frete {shippingPrice}</Typography>
        <Typography variant="h6">
          <b>Valor total: {totalPrice}</b>
        </Typography>
        <Typography variant="h6">Descontos aplicados: R$ 0,00</Typography>
      </Grid>
    </>
  );
}

function PaymentOptions({ onChange }) {
  return (
    <>
      <Typography variant="h5">
        <b>Método de pagamento</b>
      </Typography>
      <Grid>
        <RadioGroup row onChange={onChange}>
          <FormControlLabel
            control={<Radio />}
            value="Pix"
            label={<Typography>Pix</Typography>}
          />
          <FormControlLabel
            value="Boleto"
            control={<Radio />}
            label={<Typography>Boleto Bancário</Typography>}
          />
          <FormControlLabel
            value="Cartão"
            control={<Radio />}
            label={
              <>
                {/* TODO: installments options could come through API */}
                <Typography>Cartão de Débito em até 2x</Typography>
              </>
            }
          />
        </RadioGroup>
      </Grid>
    </>
  );
}
export default Order;
