import { globalFetch } from "@/shared/utils/globalFetch";
import ProductsList from "@/widgets/products-list/ui/products-list";
import { ProductListResponse } from "dodopayments/resources.mjs";

const page = async () => {
  const [oneTimeResponse, subscriptionResponse] = await Promise.all([
    globalFetch("/api/products"),
    globalFetch("/api/products?recurring=true"),
  ]);
  const [oneTime, subscriptions] = await Promise.all([
    oneTimeResponse.json() as Promise<ProductListResponse[]>,
    subscriptionResponse.json() as Promise<ProductListResponse[]>,
  ]);

  return (
    <div className="min-h-dvh space-y-4">
      <div className="flex flex-col justify-center items-center">
        <h1>One time products</h1>
        <ProductsList products={oneTime} />
      </div>
       <div className="flex flex-col justify-center items-center">
        <h1>Subscription products</h1>
        <ProductsList products={subscriptions} />
      </div>
    </div>
  );
};

export default page;
