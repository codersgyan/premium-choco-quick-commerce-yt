import { authOptions } from '@/lib/auth/authOptions';
import { db } from '@/lib/db/db';
import { orders, products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ message: 'Not allowed' }, { status: 401 });
    }

    // Number(session.token.id),

    try {
        const myOrders = await db
            .select({
                id: orders.id,
                product: products.name,
                type: orders.type,
                price: orders.price,
                image: products.image,
                productDescription: products.description,
                status: orders.status,
                address: orders.address,
                createdAt: orders.createdAt,
            })
            .from(orders)
            .leftJoin(products, eq(orders.productId, products.id))
            // todo: add types on session
            // @ts-ignore
            .where(eq(orders.userId, Number(session.token.id)));

        return Response.json(myOrders);
    } catch (err) {
        return Response.json({ message: 'Failed to get my orders' }, { status: 500 });
    }
}
