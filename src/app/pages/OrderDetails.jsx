import {
  Container,
  Divider,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { client } from '../../client';
import { calculateOrderPrice, formatCurrency } from '../util';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      const response = await client.order?.findOne(id);
      if (response) {
        setOrder(response);
      }
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
        <TrackingList order={order} />
      </Grid>
    </Container>
  );
}

function PaymentInfos({ order }) {
  return (
    <Container>
      <Grid container flexDirection="column" gap={2}>
        <Typography variant="h3">Pedido #{order?.id}</Typography>
        <Divider />
        <Typography variant="h4">Pagamento</Typography>
        <Typography>
          Data da Compra: <b>{moment(order?.createdAt).format('DD/MM/YYYY')}</b>
        </Typography>
        <Typography>
          Total dos produtos:{' '}
          <b>{formatCurrency(calculateOrderPrice(order?.cart || []))} </b>
        </Typography>
        <Typography>
          Valor do frete:{' '}
          <b>{formatCurrency(parseFloat(order?.shippingPrice))}</b>
        </Typography>
        <Typography>
          Valor total:{' '}
          <b>
            {formatCurrency(
              parseFloat(calculateOrderPrice(order?.cart || [])) +
                parseFloat(order?.shippingPrice),
            )}
          </b>
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
        <Typography>{`${order?.address?.cep} - ${order?.address?.address}, ${order?.address?.number} - ${order?.address?.complement} - ${order?.address?.city}`}</Typography>
        <Typography>
          Entrega: <b>Sedex</b>
        </Typography>
        <Typography>
          Data de envio: <b>{moment(order?.updatedAt).format('DD/MM/YYYY')}</b>
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
              <TableCell align="left">
                <b> Nome</b>
              </TableCell>
              <TableCell align="left">
                <b> Quantidade</b>
              </TableCell>
              <TableCell align="left">
                <b>Total</b>
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
                <TableCell align="left">
                  <Link
                    sx={{ color: '#00FF' }}
                    underline="none"
                    href={`/products/${item.product.id}`}
                  >
                    {item.product.name}
                  </Link>
                </TableCell>
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
              <TableCell align="left">
                {' '}
                <b>Valor total do pedido: </b>
              </TableCell>
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

function TrackingList({ order }) {
  const [tracking, setTracking] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTracking = async () => {
      setLoading(true);
      const response = await client.shipping.tracking(order?.trackingCode);
      setTracking(response);
      setLoading(false);
    };
    if (Object.keys(order).length) {
      getTracking();
    }
  }, [order]);

  return (
    <Grid container flexDirection="column" gap={4}>
      <Typography variant="h4">Rastreio do Pedido</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        tracking.length &&
        tracking[0]?.eventos?.map((event) => (
          <Grid
            key={`${event.codigo}-${event.dtHrCriado}`}
            container
            flexDirection="column"
            gap={1}
          >
            <Typography>
              <b>{event.descricao}</b>
            </Typography>
            <Typography>
              {moment(event.dtHrCriado).format('DD/MM/YYYY HH:MM')}
            </Typography>
            <Typography>{`${event.unidade.tipo} - ${event.unidade.endereco.cidade}, ${event.unidade.endereco.uf}`}</Typography>
            <Divider />
          </Grid>
        ))
      )}
    </Grid>
  );
}
