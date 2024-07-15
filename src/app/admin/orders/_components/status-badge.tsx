import { capitalizeFirstLetter } from '@/lib/utils';
import React from 'react';

const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'received':
                return 'bg-purple-600';
            case 'reserved':
                return 'bg-amber-600';
            case 'paid':
                return 'bg-green-600';
            case 'completed':
                return 'bg-gray-600';
        }
    };

    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusColor()}`}>
            {capitalizeFirstLetter(status)}
        </span>
    );
};

export default StatusBadge;
