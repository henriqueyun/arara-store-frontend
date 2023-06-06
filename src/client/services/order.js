const OrderService = (http) => ({
  send: async (order, userId) => {
    const { data } = await http.post('/orders', { ...order, userId });
    return data;
  },
  findAll: async () => {
    const { data } = await http.get('/orders');
    return data;
  },
  findByUser: async (userId) => {
    const { data } = await http.get(`/orders/${userId}`);
    return data;
  },
});

export default OrderService;
