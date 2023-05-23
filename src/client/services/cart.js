const CartService = (http) => ({
  items: {
    add: async (id, quantity, cartId) => {
      const { data } = await http.post('/items', {
        cartId,
        productId: id,
        quantity,
      });
      return data;
    },
    remove: async (id) => {
      const { data } = await http.delete(`/items/${id}`);
      return data;
    },
    update: async (id, item) => {
      const { data } = await http.patch(`/items/${id}`, item);
      return data;
    },
  },
  find: async (userId) => {
    const { data } = await http.get(`/carts/${userId}`);
    return data;
  },
});

export default CartService;
