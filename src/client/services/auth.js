const AuthService = (http) => ({
  signIn: async ({ email, password }) => {
    try {
      const data = await http.post('/login', { email, password }).then((res) => {
        console.log(res);
      });
      console.log('🚀 ~ file: auth.js:5 ~ signIn: ~ data:', data);
    } catch (err) {
      console.log('🚀 ~ file: auth.js:6 ~ signIn: ~ err:', err);
    }
  },
});

export default AuthService;
