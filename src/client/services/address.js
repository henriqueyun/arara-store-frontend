const AddressService = (http) => ({
  add: async (address, userId) => {
    const { data } = await http.post('/address', { ...address, userId });
    return data;
  },
  findAll: async () => {
    const { data } = await http.get('/address');
    return data;
  },
  findByUser: async (userId) => {
    const { data } = await http.get(`/address/${userId}`);
    return data;
  },
  remove: async (id) => http.delete(`/address/${id}`),
  update: async (address, id) => http.patch(`/address/${id}`, address),
});

export default AddressService;
