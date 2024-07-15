import { authOptions } from '@/lib/auth/authOptions';
import { db } from '@/lib/db/db';
import { warehouses } from '@/lib/db/schema';
import { warehouseSchema } from '@/lib/validators/warehouseSchema';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
    // todo: check auth
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
        validatedData = await warehouseSchema.parse(requestData);
    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }

    try {
        await db.insert(warehouses).values(validatedData);

        return Response.json({ message: 'OK' }, { status: 201 });
    } catch (err) {
        return Response.json({ message: 'Failed to store the warehouse' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allWarehouses = await db.select().from(warehouses);
        return Response.json(allWarehouses);
    } catch (err) {
        return Response.json({ message: 'Failed to fetch all warehouses' }, { status: 500 });
    }
}
