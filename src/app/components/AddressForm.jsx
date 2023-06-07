import { Box, Button, Grid, Stack, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { client } from '../../client';
import { userStorage } from '../storage';
import { getAddressInfoByCep } from '../util';

function AddressForm({ onSave, onCancel, display }) {
  const clearState = {
    cep: '',
    state: '',
    city: '',
    address: '',
    number: '',
    complement: '',
    country: 'Brazil',
  };
  const [fullAddress, setFullAddress] = useState(clearState);

  const search = async () => {
    const formattedCep = String(fullAddress.cep).replace(/[^a-zA-Z0-9 ]/g, '');
    if (formattedCep.length !== 8) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'O CEP precisa ter 8 dígitos',
      });
    } else {
      const { state, city, address } = await getAddressInfoByCep(formattedCep);
      setFullAddress((oldState) => {
        return { ...oldState, state, city, address };
      });
    }
  };

  function mandatoryFieldsAreValidated() {
    const fieldsToValidate = [
      'cep',
      'state',
      'city',
      'address',
      'number',
      'description',
    ];
    function isValid(field) {
      const value = fullAddress[field];
      return value || value.length;
    }
    return fieldsToValidate.every(isValid);
  }

  const saveAddress = async () => {
    if (!mandatoryFieldsAreValidated()) {
      // eslint-disable-next-line no-alert
      alert(
        'Para salvar preencha os campos obrigatórios: CEP, cidade, estado, endereço (logradouro) e número',
      );
      return;
    }
    await client.address.add({ ...fullAddress }, userStorage.getId());
    await onSave();
    setFullAddress(clearState);
  };

  return (
    <Grid display={display}>
      <Grid container gap={2} flexDirection="column">
        <Stack direction="row" spacing={6}>
          <TextField
            value={fullAddress.cep}
            onChange={(e) =>
              setFullAddress((oldState) => {
                return { ...oldState, cep: e.target.value };
              })
            }
            label="CEP"
            variant="outlined"
          />
          <Tooltip title="Preencha o CEP">
            <Box display="flex" justifyContent="center">
              <Button onClick={search} variant="outlined">
                BUSCAR
              </Button>
            </Box>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={6}>
          <TextField
            onChange={(e) =>
              setFullAddress((oldState) => {
                return { ...oldState, description: e.target.value };
              })
            }
            value={fullAddress.description}
            label="Descrição (ex.: casa, trabalho etc.)"
            variant="outlined"
          />
          <Tooltip title="Esse campo só pode ser editado ao preencher o CEP e realizar a busca">
            <TextField
              value={fullAddress.city}
              label="Cidade"
              variant="outlined"
            />
          </Tooltip>
          <Tooltip
            value={fullAddress.state}
            title="Esse campo só pode ser editado ao preencher o CEP e realizar a busca"
          >
            <TextField label="Estado" variant="outlined" />
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={6}>
          <Tooltip
            value={fullAddress.address}
            title="Esse campo só pode ser editado ao preencher o CEP e realizar a busca"
          >
            <TextField label="Endereço" variant="outlined" />
          </Tooltip>
          <TextField
            value={fullAddress.number}
            onChange={(e) => {
              setFullAddress((oldState) => {
                return { ...oldState, number: parseFloat(e.target.value) };
              });
            }}
            label="Número"
            variant="outlined"
          />
          <TextField
            value={fullAddress.complement}
            onChange={(e) => {
              setFullAddress((oldState) => {
                return { ...oldState, complement: e.target.value };
              });
            }}
            label="Complemento"
            variant="outlined"
          />
        </Stack>
        <Grid display="flex" gap={2}>
          <Button variant="contained" onClick={saveAddress}>
            Salvar Endereço
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddressForm;
