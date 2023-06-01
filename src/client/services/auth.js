const AuthService = (http) => ({
  signIn: async ({ email, password }) =>
    http.post('/login', { email, password }),
  signUp: async (data) => http.post('/users', data),
});

export default AuthService;
