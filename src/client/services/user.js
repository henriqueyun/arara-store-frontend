/* eslint-disable import/prefer-default-export */
export const UserService = (http) => ({
  login: async (loginData) => {
    return await http.post('/login', loginData);
  },
});
