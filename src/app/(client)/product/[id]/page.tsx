'use client';
import { getSingleProduct, placeOrder } from '@/http/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Header from '../../_components/header';
import { Loader2, Star } from 'lucide-react';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { orderSchema } from '@/lib/validators/orderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

type CustomError = {
    message: string;
};

const SingleProduct = () => {
    const { toast } = useToast();
    const params = useParams();
    const pathname = usePathname();
    const id = params.id;

    const { data: session } = useSession();

    const form = useForm<z.infer<typeof orderSchema>>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            address: '',
            pincode: '',
            qty: 1,
            productId: Number(id),
        },
    });

    const { data: product, isLoading } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => getSingleProduct(id as string),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['order'],
        mutationFn: (data: FormValues) => placeOrder({ ...data, productId: Number(id) }),
        onSuccess: (data) => {
            window.location.href = data.paymentUrl;
        },
        onError: (err: AxiosError) => {
            if (err.response?.data) {
                const customErr = err.response.data as CustomError;
                console.error(customErr.message);
                toast({
                    title: customErr.message,
                    color: 'red',
                });
            } else {
                console.error(err);
                toast({ title: 'Unknown error' });
            }
        },
    });

    type FormValues = z.infer<typeof orderSchema>;
    const onSubmit = (values: FormValues) => {
        // submit the form
        console.log({ values });
        mutate(values);
    };

    const qty = form.watch('qty');

    const price = React.useMemo(() => {
        if (product?.price) {
            return product.price * qty;
        }
        return 0;
    }, [qty, product]);

    return (
        <>
            <Header />
            <section className="custom-height relative bg-[#f5f5f5]">
                <div className="z-50 mx-auto flex h-full max-w-6xl gap-x-10 px-5 py-14 md:py-20">
                    <div>
                        {isLoading ? (
                            <Skeleton className="aspect-square w-[28rem] bg-brown-100" />
                        ) : (
                            <Image
                                src={`/assets/${product?.image}` ?? '/product1.jpg'}
                                alt={product?.name ?? 'image'}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="aspect-square w-[28rem] rounded-md object-cover shadow-2xl"
                            />
                        )}
                    </div>

                    {isLoading ? (
                        <div className="flex flex-1 flex-col gap-y-2">
                            <Skeleton className="h-4 w-16 bg-brown-100" />
                            <Skeleton className="h-10 w-2/3 bg-brown-100" />
                            <div className="flex items-center gap-x-3">
                                <div className="flex items-center gap-x-0.5">
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" />
                                </div>
                                <span className="text-sm">144 Reviews</span>
                            </div>
                            <Skeleton className="mt-2 h-28 w-full bg-brown-100" />
                            <Separator className="my-6 bg-brown-900" />
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-10 w-28 bg-brown-100" />
                                <Skeleton className="h-10 w-60 bg-brown-100" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-1 flex-col gap-y-2">
                            <h2 className="text-sm tracking-widest text-brown-500">BRAND NAME</h2>
                            <h2 className="text-4xl font-semibold text-brown-900">
                                {product?.name}
                            </h2>

                            <div className="flex items-center gap-x-3">
                                <div className="flex items-center gap-x-0.5">
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" />
                                </div>
                                <span className="text-sm">144 Reviews</span>
                            </div>

                            <p className="mt-1">{product?.description}</p>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex gap-x-2 mt-2">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="w-3/6">
                                                        <FormLabel>Address</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                className="border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                                                                placeholder="e.g. Open street, 55"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="pincode"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="w-3/6">
                                                        <FormLabel>Pincode</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                                                                placeholder="e.g. 567987"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="qty"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="w-3/6">
                                                        <FormLabel>Qty</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                                                                placeholder="e.g. 1"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    const value = parseFloat(
                                                                        e.target.value
                                                                    );
                                                                    field.onChange(value);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </div>
                                    <Separator className="my-6 bg-brown-900" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-semibold">${price}</span>
                                        {session ? (
                                            <Button type="submit" disabled={isPending}>
                                                {isPending && (
                                                    <>
                                                        <Loader2 className="mr-2 size-5 animate-spin" />
                                                    </>
                                                )}

                                                <span>Buy Now</span>
                                            </Button>
                                        ) : (
                                            <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
                                                <Button>Buy Now</Button>
                                            </Link>
                                        )}
                                    </div>
                                </form>
                            </Form>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default SingleProduct;
