import { api } from './client';

export const getAllProducts = async () => {
    const response = await api.get('/products');
    return await response.data;
};
