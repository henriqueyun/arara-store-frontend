import { CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Showcase } from '../components';
import { client } from '../../client';

export default function Home() {
  const [isAPIOnline, setIsAPIOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    async function getData() {
      try {
        setIsLoading(true);
        await client.health.getHello();
        setIsAPIOnline(true);
      } catch (err) {
        setIsAPIOnline(false);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <Grid container flexDirection="column">
      <Grid container p={4} justifyContent="center">
        <Grid container justifyContent="center">
          {isLoading ? (
            <CircularProgress />
          ) : (
            !isAPIOnline && (
              <Typography
                variant="p"
                p={4}
                borderRadius={3}
                border="2px solid rgb(226, 161, 161)"
              >
                A API da Ararastore está offline no momento, aguarde alguns
                instantes para que o serviço seja iniciado. Caso o problema
                persista, entre em contato em henriqueyun@gmail.com.
              </Typography>
            )
          )}
        </Grid>
        <Grid container justifyContent="center">
          <Typography variant="h1" pb={4}>
            Seja bem-vindo à Ararastore
          </Typography>
        </Grid>
        <Grid item>
          <img
            src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Uma fotografia de uma muda de roupas"
          />
        </Grid>
      </Grid>
      <Grid container item spacing={6} p={8} justifyContent="center">
        <Grid container justifyContent="center">
          <Typography variant="h1">Ararastore</Typography>
        </Grid>
        <Showcase />
      </Grid>
    </Grid>
  );
}
