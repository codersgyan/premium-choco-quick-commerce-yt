import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export default function Hero() {
    return (
        <section className="custom-height relative">
            <div className="container z-50 mx-auto my-auto flex h-full flex-col justify-center px-5 text-white md:px-10 xl:px-28 3xl:px-5">
                <h1 className="text-8xl font-bold capitalize leading-[1.2] tracking-tight 3xl:text-8xl 3xl:leading-[1.2]">
                    10 Minute Delivery <br /> At Your Door
                </h1>
                <p className="mt-8 max-w-[600px] text-xl 3xl:text-2xl">
                    Why wait? Our 10-minute delivery service brings your favorite chocolates right
                    to your door, swiftly and reliably. Convenience and indulgence, all in one
                    package.
                </p>
                <Button variant="secondary" className="mt-8 w-fit px-8">
                    Shop Now
                </Button>
            </div>

            <Image
                src="/chocolate.jpg"
                alt="Hero Chololate"
                fill
                // width={0}
                // height={0}
                // sizes="100vw"
                // style={{ width: '100%', height: '100%' }} // optional
                className="-z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-black/50" />
        </section>
    );
}
