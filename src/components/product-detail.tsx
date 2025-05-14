'use client'
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "../../store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
    // in cart-store.tsx i write every thing related to cart .. now in this file i use this
    const { items, addItem, removeItem } = useCartStore();

    const cartItem = items.find((item)=>item.id === product.id);
    const quantity = cartItem? cartItem.quantity:0;
  const price = product.default_price as Stripe.Price;

  const onAddItem = ()=>{
    addItem({
        id : product.id,
        name: product.name,
        price : price.unit_amount as number,
        imageUrl: product.images ? product.images[0]:null,
        quantity: 1,
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <div className="flex flex-col md:flex-row items-center gap-8 py-8">
        {/* Product Image */}
        {product.images && product.images[0] && (
          <div className="relative w-72 h-96">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        )}

        {/* Product Details */}
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          {product.description && (
            <p className="text-gray-600 mb-4">{product.description}</p>
          )}
          {price?.unit_amount && (
            <p className="text-xl font-semibold text-gray-900 mb-4">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => removeItem(product.id)}>-</Button>
            <span className="w-6 text-center">{quantity}</span>
            <Button variant="outline" onClick={onAddItem}>+</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
