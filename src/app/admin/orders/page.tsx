'use client';

import { getAllOrders } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { DataTable } from '../_components/data-table';
import { columns } from './_components/columns';

const OrdersPage = () => {
    const {
        data: orders,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
    });

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Orders</h3>
            </div>

            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="size-10 animate-spin" />
                </div>
            ) : (
                <DataTable columns={columns} data={orders || []} />
            )}
        </>
    );
};

export default OrdersPage;
