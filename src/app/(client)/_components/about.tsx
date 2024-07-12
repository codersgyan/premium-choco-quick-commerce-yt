import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function About() {
    return (
        <section className="max-w-6xl mx-auto px-5 md:py-20 py-14">
            <div className="px-10 py-14 rounded-t-[3rem] bg-gradient-to-b from-gray-200 to-transparent max-w-4xl mx-auto flex justify-center items-center flex-col">
                <div className="flex justify-center items-center gap-5">
                    <Separator className="w-20 bg-brown-900 h-0.5" />
                    <h2 className="text-brown-900 text-3xl font-bold tracking-tight">
                        Special Products
                    </h2>
                    <Separator className="w-20 bg-brown-900 h-0.5" />
                </div>
                <p className="text-center mt-10 w-10/12">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, veritatis vero
                    dolorem accusantium ea voluptatum libero accusamus doloremque debitis,
                    voluptatibus ad incidunt dolore, iste sunt. Cumque repellat est dignissimos.
                    Voluptatem eaque veniam deserunt quo. Molestiae at maxime nobis rerum eligendi.
                </p>
                <Button className="mt-10 bg-brown-900 hover:bg-brown-800 active:bg-brown-700 px-8">
                    Shop Now
                </Button>
            </div>
        </section>
    );
}
