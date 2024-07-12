'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { getAllDeliveryPersons } from '@/http/api';
import { Product } from '@/types';
import WarehouseSheet from './warehouse-sheet';
import { Loader2 } from 'lucide-react';
import { useNewDeliveryPerson } from '@/store/product/delivery-person-store';

const DeliveryPersonsPage = () => {
    const { onOpen } = useNewDeliveryPerson();

    const {
        data: deliveryPersons,
        isLoading,
        isError,
    } = useQuery<Product[]>({
        queryKey: ['delivery-persons'],
        queryFn: getAllDeliveryPersons,
    });

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Delivery Persons</h3>
                <Button size={'sm'} onClick={onOpen}>
                    Add Delivery Person
                </Button>
                <WarehouseSheet />
            </div>

            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="size-10 animate-spin" />
                </div>
            ) : (
                <DataTable columns={columns} data={deliveryPersons || []} />
            )}
        </>
    );
};

export default DeliveryPersonsPage;
