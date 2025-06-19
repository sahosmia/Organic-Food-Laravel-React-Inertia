
import { ProductType } from "@/types";
import ProductItem from "./ProductItem";

function Product({ products }: { products: ProductType[] }) {

    console.log("Products:", products);

    return (
        <div className="py-20">
            <div className="container text-center">
                <h4 className="secondary-title pb-2">Category</h4>
                <h2 className="title-lg pb-5">Our Products</h2>
            </div>
            <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                {products.map((product) => (

                    <ProductItem key={product.slug} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Product;
