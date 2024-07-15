import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { changeOrderStatus } from '@/http/api';
import { OrderStatusData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const StatusChanger = ({ orderId, currentStatus }: { orderId: number; currentStatus: string }) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { mutate } = useMutation({
        mutationKey: ['order-status'],
        mutationFn: (data: OrderStatusData) => {
            return changeOrderStatus(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast({ title: 'Order status updated successfully' });
        },
        // todo:
        // handle errors onError
    });

    return (
        <Select
            defaultValue={currentStatus}
            onValueChange={(value) => {
                mutate({ status: value, orderId });
            }}>
            <SelectTrigger>
                <SelectValue placeholder={currentStatus}></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default StatusChanger;
