'use client';
import { getSingleProduct } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Header from '../../_components/header';
import { Star } from 'lucide-react';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const SingleProduct = () => {
    const params = useParams();
    const id = params.id;

    const { data: product, isLoading } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => getSingleProduct(id as string),
    });
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
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default SingleProduct;
