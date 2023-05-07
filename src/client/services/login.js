export const LoginService = (http) => {
    return {
        login: async (loginData) => {
            const { data } = await http.post(`/login`, loginData);
            console.log("🚀 ~ file: login.js:6 ~ login: ~ data:", data)
            return data;
        },        
    }
}