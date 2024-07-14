import { db } from '@/lib/db/db';
import { deliveryPersons, inventories, orders } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import crypto from 'node:crypto';

export async function POST(request: Request) {
    const data = await request.json();

    const clonedData = { ...data };

    if (data.is_final === true && data.status === 'paid') {
        const originalSign = clonedData.sign;
        delete clonedData.sign;

        const stringData = btoa(JSON.stringify(clonedData)) + process.env.CRYPTOMUS_API_KEY;
        const sign = crypto.createHash('md5').update(stringData).digest('hex');

        if (originalSign !== sign) {
            return Response.json({ message: 'Not allowed' }, { status: 403 });
        }

        try {
            await db
                .update(orders)
                .set({ status: 'paid' })
                .where(eq(orders.id, clonedData.order_id));
        } catch (err) {
            return Response.json({ message: 'Failed to update an order' }, { status: 500 });
        }

        return Response.json({ message: 'OK' }, { status: 200 });
    } else if (data.is_final === true && data.status === 'fail') {
        // todo: check webhook sign
        // todo: use db transaction

        // delivery person
        await db
            .update(deliveryPersons)
            .set({ orderId: sql`NULL` })
            .where(eq(deliveryPersons.orderId, parseInt(clonedData.order_id)));

        // Inventory
        await db
            .update(inventories)
            .set({ orderId: sql`NULL` })
            .where(eq(inventories.orderId, parseInt(clonedData.order_id)));

        // delete an order
        await db.delete(orders).where(eq(orders.id, parseInt(clonedData.order_id)));

        return Response.json({ message: 'OK' }, { status: 200 });
    } else {
        console.log('Ignoring the event.');
        return Response.json({});
    }
}
