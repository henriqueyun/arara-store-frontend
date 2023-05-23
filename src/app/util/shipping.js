const getAddress = async (cep) => {
  const { logradouro, uf, localidade } = await fetch(
    `https://viacep.com.br/ws/${cep}/json/`,
  ).then((res) => res.json());
  return { logradouro, uf, localidade };
};

export default getAddress;
