export const ProductService = (http) => {
    return {
        findAll: async () => {
            const { data } = await http.get(`/products/10`);
            console.log('data', typeof data, data);
            return data;
        },
        hello: () => {
            return 'Hello!';
        }
    }
}