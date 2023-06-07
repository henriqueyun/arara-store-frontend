/* eslint-disable no-unused-vars */
import {
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Price, ProductsFilter, ProductsGrid } from '../components';

import { client } from '../../client';
import {
  calculateDiscount,
  calculateOrderPrice,
  formatCurrency,
} from '../util';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      const response = await client.order.findOne(id);
      setOrder(response);
    };
    getOrder();
  }, []);

  return (
    <Container sx={{ p: 0, py: 6, backgroundColor: 'none' }}>
      <Grid container flexDirection="column" gap={4}>
        <PaymentInfos order={order} />
        <Divider />
        <ShippingInfos order={order} />
        <Divider />
        <ItemsInfos order={order} />
      </Grid>
    </Container>
  );
}

function PaymentInfos({ order }) {
  return (
    <Container>
      <Grid container flexDirection="column" gap={2}>
        <Typography variant="h3">Pedido #{order.id}</Typography>
        <Divider />
        <Typography variant="h4">Pagamento</Typography>
        <Typography>
          Data da Compra: {moment(order?.createdAt).format('DD/MM/YYYY')}
        </Typography>
        <Typography>
          Total dos produtos:{' '}
          {formatCurrency(calculateOrderPrice(order?.cart || []))}
        </Typography>
        <Typography>
          Valor do frete:
          <Typography
            sx={{
              fontWeight: 'bold',
            }}
          >
            {order?.shippingPrice}
          </Typography>
        </Typography>
        <Typography>
          Valor total:{' '}
          {formatCurrency(
            parseFloat(calculateOrderPrice(order?.cart || [])) +
              parseFloat(order.shippingPrice),
          )}
        </Typography>
      </Grid>
    </Container>
  );
}

function ShippingInfos({ order }) {
  return (
    <Container>
      <Grid container flexDirection="column" gap={2}>
        <Typography variant="h4">Entrega</Typography>
        <Grid container flexDirection="row" gap={2}>
          <Typography>{order?.address?.cep}</Typography>
          <Typography>{order?.address?.address}</Typography>
          <Typography>{order?.address?.number}</Typography>
          <Typography>{order?.address?.complement}</Typography>
          <Typography>{order?.address?.city}</Typography>
        </Grid>
        <Typography>Entrega: Sedex</Typography>
        <Typography>
          Data de envio: {moment(order?.updatedAt).format('DD/MM/YYYY')}
        </Typography>
      </Grid>
    </Container>
  );
}

function ItemsInfos({ order }) {
  return (
    <Container>
      <Typography variant="h4">Items do Pedido</Typography>
      <TableContainer>
        <Table
          orientation="vertical"
          sx={{ minWidth: 650 }}
          aria-label="Pedidos"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                }}
                align="left"
              >
                Nome
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                }}
                align="left"
              >
                Quantidade
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                }}
                align="left"
              >
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order?.cart?.items?.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  fontWeight: 'bold',
                }}
              >
                <TableCell align="left">{item.product.name}</TableCell>
                <TableCell align="left">{item.quantity}</TableCell>
                <TableCell align="left">
                  {' '}
                  {formatCurrency(
                    parseFloat(item.product.price) * item.quantity,
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="left">Valor total do pedido:</TableCell>
              <TableCell align="left" />
              <TableCell
                sx={{
                  fontWeight: 'bold',
                }}
                align="left"
              >
                {formatCurrency(
                  parseFloat(calculateOrderPrice(order?.cart || [])),
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
