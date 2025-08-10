import { globalFetch } from "@/shared/utils/globalFetch";
import ProductsList from "@/widgets/products-list/ui/products-list";

const page = async () => {
  const productsResponse = await globalFetch("/api/products");
  const products = await productsResponse.json();

  return (
    <div className="min-h-dvh flex justify-center items-center">
      <div className="flex items-center gap-10">
        <ProductsList products={products}  />
      </div>
    </div>
  );
};

export default page;
