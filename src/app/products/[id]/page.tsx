import { ProductDetail } from "@/components/product-detail";
import { stripe } from "../../../../lib/stripe";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params; // Await the promise to get the id
  // to fetch data
  const product =await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product = {plainProduct}/>;
}