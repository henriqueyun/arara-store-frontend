import {
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../util';
import { client } from '../../client';
import AddressForm from '../components/AddressForm';
import { userStorage } from '../storage';

function Order() {
  const [order, setOrder] = useState({
    shippingPrice: 0,
    statusPayment: 'waiting payment',
    statusOrder: 'waiting payment',
  });
  const getCart = async () => {
    const response = await client.cart.find(userStorage.getId());
    setOrder((oldState) => {
      return { ...oldState, cart: response };
    });
  };
  useEffect(() => {
    getCart();
  }, []);

  function calculateOrderPrice({ includeShipping = false } = {}) {
    if (!order?.cart?.items?.length) {
      return 0;
    }
    const orderItemsPrice = order?.cart?.items?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const shippingPrice = order.shippingPrice || 0;
    return includeShipping ? orderItemsPrice + shippingPrice : orderItemsPrice;
  }

  const sendOrder = async () => {
    const orderToSend = order;
    delete orderToSend.shippingPrice;
    orderToSend.cartId = orderToSend.cart.id;
    delete orderToSend.cart;
    return client.order.send(order, userStorage.getId());
  };
  return (
    <Container sx={{ p: 0, py: 8, backgroundColor: 'none' }}>
      <Grid container flexDirection="column" gap={5}>
        <Typography variant="h2">
          <b>Finalizar Pedido</b>
        </Typography>
        <Typography variant="h3">
          <b>Quase tudo pronto!</b>
        </Typography>
        <Typography variant="h3">1. Entrega</Typography>
        <Grid>
          <AddressSelect
            onAddressSelect={(selectedAddress) =>
              setOrder((oldState) => {
                return { ...oldState, addressId: selectedAddress };
              })
            }
            onshippingSelect={(shippingPrice) =>
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
        <Grid container flexDirection="column" gap={3}>
          <Typography variant="h3">2. Pedido</Typography>
          {order?.cart?.items?.length
            ? order?.cart.items.map((item) => {
                return <OrderItem key={item.id} item={item} />;
              })
            : ''}
        </Grid>
        <Divider />
        <Grid container flexDirection="column" gap={2}>
          <Typography variant="h3">3. Pagamento</Typography>
          <Typography variant="h4">
            <b>Valor</b>
          </Typography>
          <Grid container flexDirection="column" gap={2}>
            <Typography variant="h5">
              Valor do pedido:{' '}
              {formatCurrency(parseFloat(calculateOrderPrice()))}
            </Typography>
            <Typography variant="h5">
              Valor do frete {formatCurrency(parseFloat(order.shippingPrice))}
            </Typography>
            <Typography variant="h5">
              <b>
                {`Valor total: 
                ${formatCurrency(
                  parseFloat(calculateOrderPrice({ includeShipping: true })),
                )}`}
              </b>
            </Typography>
            <Typography variant="h5">Descontos aplicados: R$ 0,00</Typography>
          </Grid>
          <Typography variant="h4">
            <b>Método de pagamento</b>
          </Typography>
          <Grid>
            <RadioGroup
              row
              onChange={(e) =>
                setOrder((oldState) => {
                  return { ...oldState, payment: e.target.value };
                })
              }
            >
              <FormControlLabel
                control={<Radio />}
                value="pix"
                label={<Typography>Pix</Typography>}
              />
              <FormControlLabel
                value="boleto"
                control={<Radio />}
                label={<Typography>Boleto Bancário</Typography>}
              />
              <FormControlLabel
                value="debito"
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
        </Grid>
        <Button variant="contained" onClick={sendOrder}>
          Finalizar Pedido
        </Button>
      </Grid>
    </Container>
  );
}

function AddressSelect({ onAddressSelect, onshippingSelect }) {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [displayAddressForm, setDisplayAddressForm] = useState('none');
  const isEditingAddress = displayAddressForm !== 'none';

  async function getAddresses() {
    const response = await client.address.findAll();
    setAddresses(() => [...response]);
  }

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <Grid display="false" container flexDirection="column" gap={4}>
      <Grid display="flex" alignItems="center" gap={2}>
        <FormControl
          disabled={isEditingAddress}
          color="secondary"
          sx={{ minWidth: '24ch' }}
        >
          <InputLabel>Endereço</InputLabel>
          <Select
            disabled={isEditingAddress}
            value={selectedAddress}
            onChange={(e) => {
              setSelectedAddress(e.target.value);
              onAddressSelect(e.target.value.id);
            }}
            label="Endereço"
          >
            {addresses.length ? (
              addresses.map((addr) => (
                <MenuItem key={addr.id} value={addr}>
                  {addr.address}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={selectedAddress}>
                <em>Não há opções</em>
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <Button
          disabled={isEditingAddress}
          onClick={() => setDisplayAddressForm('block')}
          variant="outlined"
        >
          Novo Endereço
        </Button>
      </Grid>
      <AddressForm
        onSave={() => {
          setDisplayAddressForm('none');
          getAddresses();
        }}
        onCancel={() => setDisplayAddressForm('none')}
        display={displayAddressForm}
      />
      {selectedAddress ? (
        <Typography>{`${selectedAddress?.address}, ${selectedAddress.number}, ${selectedAddress.cep} - ${selectedAddress.city}, ${selectedAddress.state}`}</Typography>
      ) : (
        ''
      )}
      {selectedAddress && (
        <DeliveryOptions
          cep={selectedAddress.cep}
          onSelect={onshippingSelect}
        />
      )}
    </Grid>
  );
}

function DeliveryOptions({ cep, onSelect }) {
  const [shippings, setShippings] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // TODO: refactor
    onSelect(0);
    const getShippingMethods = async () => {
      if (cep) {
        setLoading(true);
        const response = await client.shipping.listForCep(cep);
        setShippings(response);
        setLoading(false);
      }
    };
    getShippingMethods();
  }, [cep]);

  return (
    <Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        shippings.length && (
          <>
            <Typography variant="h4">VALOR FRETE</Typography>
            <RadioGroup
              defaultValue="female"
              name="radio-buttons-group"
              onChange={(e) => {
                const selectedShipping = shippings.find(
                  (shipng) => shipng.Codigo === e.target.value,
                );
                onSelect(parseFloat(selectedShipping.Valor));
              }}
            >
              {shippings.map((shipping, index) => (
                <FormControlLabel
                  key={shipping.Codigo}
                  value={shipping.Codigo}
                  control={<Radio />}
                  label={
                    <>
                      <Typography display="inline">
                        {`[Correios] Opção ${index + 1}  - Entrega em até ${
                          shipping.PrazoEntrega
                        } dias úteis `}
                      </Typography>
                      <Typography display="inline" color="success.main">
                        {formatCurrency(parseFloat(shipping.Valor))}
                      </Typography>
                    </>
                  }
                />
              ))}
            </RadioGroup>
          </>
        )
      )}
    </Grid>
  );
}

function OrderItem({ item }) {
  return (
    <Grid container alignItems="center" gap={4}>
      <img
        style={{ height: '150px', width: '120px' }}
        src={
          (item?.product?.images && item?.product?.images[0]?.imageUrl) ||
          'https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fG1pc3NpbmclMjBzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
        }
        alt="Product"
      />
      <Grid>
        <Typography variant="h5">{item.product.description}</Typography>
        <Typography>
          {formatCurrency(parseFloat(item.product.price))}
        </Typography>
        <Typography>{item.quantity} unidades</Typography>
      </Grid>
    </Grid>
  );
}

export default Order;
