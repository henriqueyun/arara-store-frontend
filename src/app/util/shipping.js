/* eslint-disable no-use-before-define */
import { consultarCep } from 'correios-brasil';

const getAddress = async (cep) => {
  const { logradouro, uf, localidade } = await consultarCep(cep).then(
    (res) => res,
  );
  return { logradouro, uf, localidade };
};

export default getAddress;
