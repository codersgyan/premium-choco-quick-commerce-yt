import { db } from '@/lib/db/db';
import { inventories, products, warehouses } from '@/lib/db/schema';
import { inventorySchema } from '@/lib/validators/inventorySchema';
import { desc, eq } from 'drizzle-orm';

export async function POST(request: Request) {
    const requestData = await request.json();

    let validatedData;

    try {
        validatedData = await inventorySchema.parse(requestData);
    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }

    try {
        await db.insert(inventories).values(validatedData);

        return Response.json({ message: 'OK' }, { status: 201 });
    } catch (err) {
        return Response.json(
            { message: 'Failed to store the inventory into the database' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const allInventories = await db
            .select({
                id: inventories.id,
                sku: inventories.sku,
                warehouse: warehouses.name,
                product: products.name,
            })
            .from(inventories)
            .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
            .leftJoin(products, eq(inventories.productId, products.id))
            .orderBy(desc(inventories.id));

        return Response.json(allInventories);
    } catch (err) {
        return Response.json({ message: 'Failed to fetch inventories' }, { status: 500 });
    }
}
