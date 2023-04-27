export const ProductService = (http) => {
    return {
        findAll: async () => {
            const { data } = await http.get(`/products`);
            return data;
        },
        hello: () => {
            return 'Hello!';
        }
    }
}