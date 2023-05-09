/* eslint-disable import/prefer-default-export */
export const UserService = (http) => ({
  login: async (loginData) => {
    console.log('🚀 ~ file: login.js:3 ~ login: ~ loginData:', loginData);
    const { data } = await http.post('/login', loginData);
    console.log('🚀 ~ file: login.js:6 ~ login: ~ data:', data);
    return data;
  },
});
