import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function SpecialProducts() {
    const products = [
        { src: '/product1.jpg', alt: 'product1', name: 'Cadbury Dairy Milk' },
        { src: '/product2.jpg', alt: 'product2', name: 'Mars Bars' },
        { src: '/product3.jpg', alt: 'product3', name: 'Lindt Excellence Bar' },
        { src: '/product2.jpg', alt: 'product2', name: 'Mars Bars' },
    ];

    return (
        <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="flex items-center justify-center gap-5">
                <Separator className="h-0.5 w-20 bg-brown-900" />
                <h2 className="text-3xl font-bold tracking-tight text-brown-900">
                    Special Products
                </h2>
                <Separator className="h-0.5 w-20 bg-brown-900" />
            </div>
            <div className="mt-20 grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                    <div key={index} className="flex flex-col items-center justify-center gap-3">
                        <Image
                            src={product.src}
                            alt={product.alt}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '220px', height: '220px' }}
                            className="rounded-full border-8"
                        />
                        <p className="font-semibold text-brown-900">{product.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
