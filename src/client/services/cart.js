const CartService = (http) => ({
  items: {
    add: async (id, quantity) => {
      const { data } = await http.post('/items', {
        cartId: 1,
        productId: id,
        quantity,
      });
      return data;
    },
    remove: async (id) => {
      const { data } = await http.delete(`/items/${id}`);
      return data;
    },
    list: async () => {
      const { data } = await http.get('/items');
      return data;
    },
  },
});

export default CartService;
