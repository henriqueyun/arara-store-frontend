import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { cpf } from 'cpf-cnpj-validator';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { client } from '../../client';

export default function SignUp() {
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(true);
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    cpf: '',
    birth: new Date(),
  });

  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    cpf: '',
    birth: '',
  });

  const validateInput = async (e) => {
    const { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'email':
          if (!value) {
            stateObj[name] = 'Insira seu email.';
          }
          break;

        case 'password':
          if (!value) {
            stateObj[name] = 'Insira sua senha.';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj.confirmPassword = 'A confirmação não e igual a senha.';
          } else {
            stateObj.confirmPassword = input.confirmPassword
              ? ''
              : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Insira a confirmação de senha.';
          } else if (input.password && value !== input.password) {
            stateObj[name] = 'A confirmação não e igual a senha.';
          }
          break;

        case 'fullName':
          if (!value) {
            stateObj[name] = 'Insira seu nome.';
          }
          break;
        case 'cpf':
          if (!value) {
            stateObj[name] = 'Insira seu CPF.';
          } else if (!cpf.isValid(value)) {
            stateObj[name] = 'CPF Invalido.';
          }
          break;

        default:
          break;
      }

      const isEmpty = Object.values(stateObj).every(
        (x) => x === null || x === '',
      );

      if (isEmpty) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
      return stateObj;
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const onDateChange = (value) => {
    setInput((prev) => ({
      ...prev,
      birth: value,
    }));
    if (!value) {
      setError((prev) => ({
        ...prev,
        birth: 'Insira sua data de nascimento',
      }));
      setDisableButton(true);
    } else {
      setError((prev) => ({
        ...prev,
        birth: '',
      }));
      setDisableButton(false);
    }
  };

  const submitSignUp = async () => {
    delete input.confirmPassword;

    try {
      await client.user.signUp(input);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Cadastro Efetuado',
        didClose: () => {
          navigate('/login');
        },
      });
    } catch (err) {
      if (err.response.data.statusCode === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: err.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Ocorreu um erro tente novamente mais tarde',
        });
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid container flexDirection="column" gap={2} p={4}>
        <Typography variant="h4">Cadastro</Typography>

        <TextField
          label="E-mail"
          name="email"
          variant="outlined"
          onChange={onInputChange}
        />
        {error.email && <Typography>{error.email}</Typography>}

        <TextField
          label="Senha"
          name="password"
          variant="outlined"
          onChange={onInputChange}
          type="password"
        />
        {error.password && <Typography>{error.password}</Typography>}

        <TextField
          label="Confirmar senha"
          name="confirmPassword"
          variant="outlined"
          onChange={onInputChange}
          type="password"
        />
        {error.confirmPassword && (
          <Typography>{error.confirmPassword}</Typography>
        )}

        <TextField
          label="Nome Completo"
          name="fullName"
          variant="outlined"
          onChange={onInputChange}
        />
        {error.fullName && <Typography>{error.fullName}</Typography>}

        <TextField
          label="CPF"
          name="cpf"
          variant="outlined"
          value={cpf.format(input.cpf)}
          onChange={onInputChange}
        />
        {error.cpf && <Typography>{error.cpf}</Typography>}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateField']}>
            <DateField
              label="Data de nascimento"
              name="birth"
              format="DD/MM/YYYY"
              onChange={onDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
        {error.birth && <Typography>{error.birth}</Typography>}

        <Button
          disabled={disableButton}
          variant="contained"
          onClick={submitSignUp}
          sx={{ my: 1 }}
        >
          Cadastrar
        </Button>
      </Grid>
    </Container>
  );
}
