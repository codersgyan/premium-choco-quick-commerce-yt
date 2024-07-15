import { authOptions } from '@/lib/auth/authOptions';
import { db } from '@/lib/db/db';
import { orders } from '@/lib/db/schema';
import { orderStatusSchema } from '@/lib/validators/orderStatusSchema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

export async function PATCH(request: Request) {
    // todo: verify if user is admin

    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ message: 'Not allowed' }, { status: 401 });
    }
    // todo: check user access.
    // @ts-ignore
    if (session.token.role !== 'admin') {
        return Response.json({ message: 'Not allowed' }, { status: 403 });
    }

    const requestData = await request.json();
    let validatedData;

    try {
        validatedData = orderStatusSchema.parse(requestData);
    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }

    try {
        await db
            .update(orders)
            .set({ status: validatedData.status })
            .where(eq(orders.id, validatedData.orderId));

        return Response.json({ message: validatedData.status }, { status: 200 });
    } catch (err) {
        return Response.json({ message: 'Failed to update the order' }, { status: 500 });
    }
}
