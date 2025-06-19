import { PaginationType, ProductType } from "@/types";
import PageBanner from "@/components/frontend/tools/PageBanner";
import bannerImage from "@/assets/banner/banner-shop.png";
import ProductItem from "@/components/frontend/ProductItem";

function Shop({ products }: { products: PaginationType<ProductType> }) {
    console.log(products);
    return (
        <div>
            <PageBanner bg={bannerImage} title="Shop Now" />
            <div className="py-20">
                {products.data && products.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {products.data.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl font-bold text-gray-500">
                        No products found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;
