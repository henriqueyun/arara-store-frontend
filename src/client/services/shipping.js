const ShippingService = (http) => ({
  listForCep: async (cep) => {
    const { data } = await http.post(`/carts/shipping/${cep}`);
    return data;
  },
});

export default ShippingService;
