const UserService = (http) => ({
  singUp: async (data) => http.post('/users', data),
});

export default UserService;
