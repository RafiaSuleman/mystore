import { ProductDetail } from "@/components/product-detail";
import { stripe } from "../../../../lib/stripe";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: PageProps) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
}
