const HealthService = (http) => ({
  getHello: async () => {
    const { data } = await http.get('/');
    return data;
  },
});

export default HealthService;
