const UserService = (http) => ({
  signUp: async (data) => http.post('/users', data),
});

export default UserService;
