'use client'
import React from 'react'
import { useCartStore } from '../../../store/cart-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChectoutAction } from './checkout-action';

const Checkout = () => {
  const {items,removeItem,addItem} = useCartStore();
  const total = items.reduce((acc,item)=>acc + item.price * item.quantity , 0)
  if(total === 0 ||  items.length === 0){
    return(
      <div>
        {" "}
        <h1>Your Cart is Empty.</h1>
      </div>

    )
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form  className="max-w-md mx-auto">
        {/* this input contain items cart its value contain so when we access the form data in chectout-action.ts we have access to the item */}
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button formAction={ChectoutAction} type="submit" variant="default" className="w-full">
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}

export default Checkout
