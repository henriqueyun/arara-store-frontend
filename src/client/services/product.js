const ProductService = (http) => ({
  findAll: async () => {
    const { data } = await http.get('/products');
    return data;
  },
  findById: async (id) => {
    const { data } = await http.get(`/products/${id}`);
    return data;
  },
  hello: () => 'Hello!',
});

export default ProductService;
