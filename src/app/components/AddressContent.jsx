import {
  Container,
  Divider,
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
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Swal from 'sweetalert2';
import { client } from '../../client';
import { userStorage } from '../storage';
import AddressForm from './AddressForm';

export default function AddressContent() {
  const [addresses, setAddresses] = useState([]);
  const [updateAddress, setUpdateAddress] = useState([]);

  const getAddresses = async () => {
    const response = await client.address.findByUser(userStorage.getId());
    setAddresses(response);
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const handleUpdate = async (address) => {
    setUpdateAddress(address);
  };

  const handleDelete = async (id) => {
    await client.address.remove(id);
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Endereço excluído',
      didClose: () => {
        getAddresses();
      },
    });
  };

  return (
    <Container>
      <Grid>
        <AddressForm
          onSave={() => {
            getAddresses();
          }}
          updateAddress={updateAddress}
        />
        <Divider sx={{ py: 4 }} />
        <TableContainer sx={{ py: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">CEP</TableCell>
                <TableCell align="left">Logradouro</TableCell>
                <TableCell align="left">Cidade</TableCell>
                <TableCell align="left">Estado</TableCell>
                <TableCell align="left">Numero</TableCell>
                <TableCell align="left">Complemento</TableCell>
                <TableCell align="left" />
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.length &&
                addresses.map((address) => (
                  <TableRow
                    key={address.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{address.description}</TableCell>
                    <TableCell align="left">{address.cep}</TableCell>
                    <TableCell align="left">{address.address}</TableCell>
                    <TableCell align="left">{address.city}</TableCell>
                    <TableCell align="left">{address.state}</TableCell>
                    <TableCell align="left">{address.number}</TableCell>
                    <TableCell align="left">{address.complement}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleUpdate(address)}>
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(address.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
}
