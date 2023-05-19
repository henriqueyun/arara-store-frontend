const ProductService = (http) => ({
  findAll: async () => {
    const { data } = await http.get('/products');
    return data;
  },
  findById: async (id) => {
    try {
      const { data } = await http.get(`/products/${id}`);
      return data;
    } catch ({ response }) {
      if (response.data.statusCode === 401) localStorage.removeItem('token');
      return 
    }
  },
  hello: () => 'Hello!',
});

export default ProductService;
