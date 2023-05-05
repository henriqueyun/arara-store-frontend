export const ProductService = (http) => {
    return {
        findAll: async () => {
            const { data } = await http.get(`/products`);
            return data;
        },
        findById: async (id) => {
            const { data } = await http.get(`/products/${id}`);
            return data;
        },
        hello: () => {
            return 'Hello!';
        }
    }
}