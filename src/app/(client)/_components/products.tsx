'use client';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Product } from '@/types';

const Products = () => {
    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        staleTime: 10 * 1000,
    });

    return (
        <section className="bg-[#f5f5f5] px-5 py-14 md:py-20">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-center justify-center gap-5">
                    <Separator className="h-0.5 w-20 bg-brown-900" />
                    <h2 className="text-3xl font-bold tracking-tight text-brown-900">Products</h2>
                    <Separator className="h-0.5 w-20 bg-brown-900" />
                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products?.map((product: Product) => {
                        return (
                            <div
                                key={product.id}
                                className="flex flex-col items-start justify-center gap-5">
                                <Image
                                    src={`/assets/${product.image}`}
                                    alt={product.name}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%' }}
                                    className="aspect-square rounded-t-md object-cover shadow-lg hover:cursor-pointer"
                                />

                                <div className="w-full">
                                    <p className="text-lg font-semibold text-brown-900">
                                        {product.name}
                                    </p>
                                    <div className="mt-1 space-x-2">
                                        <span className="font-bold">${product.price}</span>
                                    </div>

                                    <Link href={`/product/${product.id}`}>
                                        <Button
                                            size={'sm'}
                                            className="mt-5 w-full bg-brown-900 hover:bg-brown-800 active:bg-brown-700">
                                            Buy Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Products;
