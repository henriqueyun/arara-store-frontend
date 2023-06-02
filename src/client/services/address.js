const AddressService = (http) => ({
  add: async (address, userId) => {
    const { data } = await http.post('/address', { ...address, userId });
    return data;
  },
  findAll: async () => {
    const { data } = await http.get('/address');
    return data;
  },
});

export default AddressService;
