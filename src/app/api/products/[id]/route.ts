import { db } from '@/lib/db/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        const product = await db
            .select()
            .from(products)
            .where(eq(products.id, Number(id)))
            .limit(1);

        if (!product.length) {
            return Response.json({ message: 'Product not found.' }, { status: 400 });
        }

        return Response.json(product[0]);
    } catch (err) {
        return Response.json({ message: 'Failed to fetch a product' }, { status: 500 });
    }
}
