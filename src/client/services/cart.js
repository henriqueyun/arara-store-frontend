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
  },
  find: async (userId) => {
    const { data } = await http.get(`/carts/${userId}`);
    return data;
  },
  shipping: async (cep) => {
    console.log('🚀 ~ file: cart.js:21 ~ shipping: ~ cep:', cep);
    const { data } = await http.post(`/carts/shipping/${cep}`);
    return data;
  },
});

export default CartService;
