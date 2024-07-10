import { z } from 'zod';

export const warehouseSchema = z.object({
    name: z.string({ message: 'Warehouse name should be a string' }),
    pincode: z.string({ message: 'Pincode should be a string' }).length(6),
});
