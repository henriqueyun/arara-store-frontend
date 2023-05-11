/* eslint-disable import/prefer-default-export */
export const UserService = (http) => ({
  login: async (loginData) => {
    console.log('🚀 ~ file: login.js:3 ~ login: ~ loginData:', loginData);
    const  { access_token }  = await http.post('/login', loginData);
    console.log('🚀 ~ file: login.js:6 ~ login: ~ data:', access_token);
    return access_token;
  },
});
