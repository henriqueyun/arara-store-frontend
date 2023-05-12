const UserService = (http) => ({
  login: async (loginData) => http.post('/login', loginData),
});

export default UserService;
