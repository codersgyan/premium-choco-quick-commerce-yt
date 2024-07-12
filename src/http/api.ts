import { Warehouse } from '@/types';
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

export const getAllWarehouses = async () => {
    const response = await api.get('/warehouses');
    return await response.data;
};

export const createWarehouse = async (data: Warehouse) => {
    const response = await api.post('/warehouses', data);
    return response.data;
};
