const ProductService = (http) => ({
  findAll: async () => {
    const { data } = await http.get('/products');
    return data;
  },
  findById: async (id) => {
    const { data } = await http.get(`/products/${id}`);
    return data;
  },
  findShowCase: async () => {
    const { data } = await http.get('/products/showCase');
    return data;
  },
});

export default ProductService;
