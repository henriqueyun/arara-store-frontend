const AuthService = (http) => ({
  signIn: async ({ email, password }) => http.post('/login', { email, password }),
});

export default AuthService;
