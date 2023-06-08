import {
  Container,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { client } from '../../client';
import { userStorage } from '../storage';
import { calculateOrderPrice, formatCurrency } from '../util';

export default function OrderContent() {
  const [orders, setOrders] = useState([]);
  const paymentStatusColor = {
    'Aguardando pagamento': '#CCCC00',
    'Aguardando aprovação': '#3333CC',
    'Pagamento Efetuado': '#00CC00',
  };

  useEffect(() => {
    const getOrders = async () => {
      const response = await client.order.findByUser(userStorage.getId());

      setOrders(response);
    };
    getOrders();
  }, []);

  return (
    <Container>
      <Grid container flexDirection="column" gap={4} p={4}>
        <TableContainer sx={{ py: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Código do Pedido</TableCell>
                <TableCell align="center">Status do Pedido</TableCell>
                <TableCell align="center">Status de Pagamento</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Data da Compra</TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length ? (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      fontWeight: 'bold',
                    }}
                  >
                    <TableCell align="center">{order.id}</TableCell>
                    <TableCell align="center">{order.statusOrder}</TableCell>
                    <TableCell
                      bold
                      sx={{
                        color: paymentStatusColor[order.statusPayment],
                      }}
                      align="center"
                    >
                      {order.statusPayment}
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(
                        parseFloat(calculateOrderPrice(order.cart)) +
                          parseFloat(order.shippingPrice),
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {moment(order?.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton href={`/orderDetails/${order.id}`}>
                        <FormatListBulletedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
}
