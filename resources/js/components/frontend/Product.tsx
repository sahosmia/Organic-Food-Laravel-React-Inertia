import React from "react";
import ProductAll from "./ProductAll";

import { ProductType } from "@/types";

function Product({ products }: { products: ProductType[] }) {
    // const products = [
    //     {
    //         title: "Calabrese Brocoli",
    //         oldPrice: 20.0,
    //         currentPrice: 13.0,
    //         category: "vegetable",
    //         src: "resources/js/assets/product/one.png",
    //     },
    //     {
    //         title: "Calabrese Brocoli",
    //         oldPrice: 20.0,
    //         currentPrice: 13.0,
    //         category: "vegetable",
    //         src: "/img/product/two.png",
    //     },
    //     {
    //         title: "Calabrese Brocoli",
    //         oldPrice: 20.0,
    //         currentPrice: 13.0,
    //         category: "vegetable",
    //         src: "/img/product/three.png",
    //     },
    //     {
    //         title: "Calabrese Brocoli",
    //         oldPrice: 20.0,
    //         currentPrice: 13.0,
    //         category: "vegetable",
    //         src: "/img/product/four.png",
    //     },
    //     {
    //         title: "Calabrese Brocoli",
    //         oldPrice: 20.0,
    //         currentPrice: 13.0,
    //         category: "vegetable",
    //         src: "/img/product/five.png",
    //     },
    //     {
    //         title: "Calabrese Brocoli",
    //         oldPrice: 20.0,
    //         currentPrice: 13.0,
    //         category: "vegetable",
    //         src: "/img/product/six.png",
    //     },
    // ];
    console.log("Products:", products.data);

    return (
        <div className="py-20">
            <div className="container text-center">
                <h4 className="secondary-title pb-2">Category</h4>
                <h2 className="title-lg pb-5">Our Products</h2>
            </div>
            <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                {products.map((product) => (

                    <ProductAll key={product.slug} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Product;
