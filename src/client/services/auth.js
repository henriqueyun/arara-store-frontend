const AuthService = (http) => ({
  signIn: async ({ email, password }) =>
    http.post('/login', { email, password }),
  signUp: async (data) => http.post('/users', data),
  findOne: async (id) => {
    const { data } = await http.get(`/users/${id}`);
    return data;
  },
});

export default AuthService;
