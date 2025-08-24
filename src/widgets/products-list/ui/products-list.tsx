"use client";
import ProductCard from "@/entities/product/ui/product-card";
import { globalFetch } from "@/shared/utils/globalFetch";
import {
  PaymentCreateResponse,
  ProductListResponse,
} from "dodopayments/resources.mjs";
import { useRouter } from "next/navigation";

const ProductsList = ({ products }: { products: ProductListResponse[] }) => {
  const router = useRouter();
  const handlePayClick = async (product: ProductListResponse) => {
    const payResponse = await globalFetch(
      product.is_recurring
        ? "/api/checkout/subscription"
        : "/api/checkout/one-time",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.product_id,
          email: "assylan@gmail.com",
        }),
      }
    );
    const payBody = (await payResponse.json()) as PaymentCreateResponse;
    if (payBody.payment_link) {
      router.push(payBody.payment_link);
    } else {
      console.error("No payment link:", payBody);
    }
  };
  return (
    <div>
      {products.map((item) => (
        <ProductCard
          key={item.product_id}
          title={item.name}
          description={item.description}
          price={item.price}
          currency={item.currency}
          onPayClick={() => handlePayClick(item)}
        />
      ))}
    </div>
  );
};

export default ProductsList;
