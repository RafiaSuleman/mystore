/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { stripe } from '../../../lib/stripe'
import { ProductList } from '@/components/product-list'

const Productpage = async () => {
  const products = await stripe.products.list({
      expand: ["data.default_price"],
    })
  return (
    <div>
      <h1 className='flex justify-center items-center font-extrabold text-2xl'>All Products</h1>
      <ProductList products={products.data}/>
    </div>
  )
}

export default Productpage
