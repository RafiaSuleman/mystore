'use client';
import Stripe from 'stripe';
import { Card, CardTitle } from './ui/card';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative w-full  h-96 overflow-hidden mx-auto shadow-lg rounded-xl">
      {currentProduct.images?.[0] && (
        <div className="relative w-full h-full">
          <Image
            alt={currentProduct.name}
            src={currentProduct.images[0]}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-4 w-full">
            <CardTitle className="text-xl">{currentProduct.name}</CardTitle>
            {price?.unit_amount && (
              <p className="text-lg font-semibold">
                ${' '}
                {(price.unit_amount / 100).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
