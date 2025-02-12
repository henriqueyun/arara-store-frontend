const ShippingService = (http) => ({
  listForCep: async (cep) => {
    const { data } = await http.post(
      `/carts/shipping/${cep}`,
      {},
      { timeout: 20000 },
    );

    return data;
  },
  tracking: async (trackingCode) => {
    const { data } = await http.get(`/orders/tracking/${trackingCode}`);
    return data;
  },
});

export default ShippingService;
