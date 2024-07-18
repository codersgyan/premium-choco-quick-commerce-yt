import crypto from 'node:crypto';
import { authOptions } from '@/lib/auth/authOptions';
import { db } from '@/lib/db/db';
import { deliveryPersons, inventories, orders, products, users, warehouses } from '@/lib/db/schema';
import { orderSchema } from '@/lib/validators/orderSchema';
import { and, desc, eq, inArray, isNull } from 'drizzle-orm';
import { Currency } from 'lucide-react';
import { getServerSession } from 'next-auth';
import axios from 'axios';

export async function POST(request: Request) {
    // get session
    const session = await getServerSession(authOptions);
    console.log('session', session);

    if (!session) {
        return Response.json({ message: 'Not allowed' }, { status: 401 });
    }

    // validate request body
    const requestData = await request.json();
    let validatedData;

    try {
        validatedData = await orderSchema.parse(requestData);
    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }

    console.log('validated data:', validatedData);

    // Order creation.

    const warehouseResult = await db
        .select({ id: warehouses.id })
        .from(warehouses)
        .where(eq(warehouses.pincode, validatedData.pincode));

    if (!warehouseResult.length) {
        return Response.json({ message: 'No warehouse found' }, { status: 400 });
    }

    const foundProducts = await db
        .select()
        .from(products)
        .where(eq(products.id, validatedData.productId))
        .limit(1);

    if (!foundProducts.length) {
        return Response.json({ message: 'No product found' }, { status: 400 });
    }
    let transactionError: string = '';
    let finalOrder: any = null;

    try {
        finalOrder = await db.transaction(async (tx) => {
            // create order
            const order = await tx
                .insert(orders)

                .values({
                    ...validatedData,
                    // @ts-ignore
                    userId: Number(session.token.id),
                    price: foundProducts[0].price * validatedData.qty,
                    // todo: move all statuses to enum or const
                    status: 'received',
                })
                .returning({ id: orders.id, price: orders.price });

            // check stock

            const availableStock = await tx
                .select()
                .from(inventories)
                .where(
                    and(
                        eq(inventories.warehouseId, warehouseResult[0].id),
                        eq(inventories.productId, validatedData.productId),
                        isNull(inventories.orderId)
                    )
                )
                .limit(validatedData.qty)
                .for('update', { skipLocked: true });

            if (availableStock.length < validatedData.qty) {
                transactionError = `Stock is low, only ${availableStock.length} products available`;
                tx.rollback();
                return;
            }

            // check delivery person availibility
            const availablePersons = await tx
                .select()
                .from(deliveryPersons)
                .where(
                    and(
                        isNull(deliveryPersons.orderId),
                        eq(deliveryPersons.warehouseId, warehouseResult[0].id)
                    )
                )
                .for('update')
                .limit(1);

            if (!availablePersons.length) {
                transactionError = `Delivery person is not available at the moment`;
                tx.rollback();
                return;
            }

            // stock is available and delivery person is available
            // update inventories table and add order_id
            await tx
                .update(inventories)
                .set({ orderId: order[0].id })
                .where(
                    inArray(
                        inventories.id,
                        availableStock.map((stock) => stock.id)
                    )
                );

            // update delivery person
            await tx
                .update(deliveryPersons)
                .set({ orderId: order[0].id })
                .where(eq(deliveryPersons.id, availablePersons[0].id));

            // update order
            await tx.update(orders).set({ status: 'reserved' }).where(eq(orders.id, order[0].id));

            return order[0];
        });
    } catch (err) {
        // log
        // in production -> be careful don't return internal errors to the client.
        return Response.json(
            {
                message: transactionError ? transactionError : 'Error while db transaction',
            },
            { status: 500 }
        );
    }

    // create invoice
    const paymentUrl = 'https://api.cryptomus.com/v1/payment';

    const paymentData = {
        amount: String(finalOrder.price),
        currency: 'USD',
        order_id: String(finalOrder.id),
        url_return: `${process.env.APP_BASE_URL}/payment/return`,
        url_success: `${process.env.APP_BASE_URL}/payment/success`,
        url_callback: `${process.env.APP_BASE_URL}/api/payment/callback`,
    };

    const stringData = btoa(JSON.stringify(paymentData)) + process.env.CRYPTOMUS_API_KEY;
    const sign = crypto.createHash('md5').update(stringData).digest('hex');

    const headers = {
        merchant: process.env.CRYPTOMUS_MERCHANT_ID,
        sign,
    };

    try {
        const response = await axios.post(paymentUrl, paymentData, {
            headers,
        });
        console.log('response', response.data);

        return Response.json({ paymentUrl: response.data.result.url });
    } catch (err) {
        console.log('error while creating an invoice', err);
        // todo: 1. retry if not then we have undo the order.
        return Response.json({
            message: 'Failed to create an invoice',
        });
    }
}

export async function GET() {
    // todo: add authentication and authorization
    // todo: add logging
    // todo: add error handling
    const allOrders = await db
        .select({
            id: orders.id,
            product: products.name,
            productId: products.id,
            userId: users.id,
            user: users.fname,
            type: orders.type,
            price: orders.price,
            image: products.image,
            status: orders.status,
            address: orders.address,
            qty: orders.qty,
            createAt: orders.createdAt,
        })
        .from(orders)
        .leftJoin(products, eq(orders.productId, products.id))
        .leftJoin(users, eq(orders.userId, users.id))
        // join inventories (orderId)
        // join delivery person (orderId)
        // join warehouse (deliveryId)
        // todo: 1. use pagination, 2. Put index
        .orderBy(desc(orders.id));
    return Response.json(allOrders);
}
