import { api } from './client';

export const getAllProducts = async () => {
    const response = await api.get('/products');
    return await response.data;
};

export const createProduct = async (data: FormData) => {
    const response = await api.post('/products', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
