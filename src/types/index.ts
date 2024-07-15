export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

export interface Warehouse {
    id: number;
    name: string;
    pincode: string;
}

export interface DeliveryPerson {
    id: number;
    name: string;
    phone: string;
    warehouseId: number;
}

export interface Inventory {
    id: number;
    sku: string;
    warehouse: string;
    product: string;
}

export interface InventoryData {
    sku: string;
    warehouseId: number;
    productId: number;
}

export interface OrderData {
    productId: number;
    qty: number;
    pincode: string;
    address: string;
}

export interface Order {
    id: number;
    product: string;
    user: string;
    type: string;
    address: string;
    status: string;
    price: number;
    qty: number;
}

export interface OrderStatusData {
    orderId: number;
    status: string;
}

export interface MyOrder {
    id: number;
    image: string;
    price: number;
    product: string;
    address: string;
    productDescription: string;
    status: string;
    type: string;
    createdAt: string;
}
