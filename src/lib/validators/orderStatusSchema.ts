import { z } from 'zod';

export const orderStatusSchema = z.object({
    orderId: z.number({ message: 'Order Id should be a number' }),
    // todo: check if order status is in allowed status strings, ("received, paid, reserved, completed")
    status: z.string({ message: 'Status should be a string' }),
});
