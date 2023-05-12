export const AuthService = (http) => ({
  signIn: async ({ email, password }) => {
    return await http.post('/login', { email, password });
  },
});
