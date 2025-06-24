import { ProductType } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { Link } from "@inertiajs/react";
import React, { memo } from "react"; // Import memo
import ReviewsStar from "./kits/ReviewsStar";

function ProductItem({ product }: { product: ProductType }) {
    const hasDiscount = product.discount_type && (product.discount_value ?? 0) > 0;

    return (
        <Link href={route('product.show', { product: product.slug })}>
            <div className="bg-white outline outline-1 outline-slate-400 rounded-xl relative p-2">
                <span className="bg-main text-light text-md capitalize rounded-xl px-5 py-2 top-5 left-5 inline-block absolute">
                    {product.category?.title}
                </span>
                <div className="w-full h-96 overflow-hidden flex items-center justify-center">
                    <img
                        className="w-full h-full object-cover"
                        src={product.image_url}
                        alt={product.name}
                    />
                </div>
                <div className="m-5 mt-0">
                    <h2 className="title-sm mb-2">{product.name}</h2>
                    <hr className="mb-4" />
                    <div className="flex justify-between">
                        <ul className="flex gap-2 font-bold">
                            <li className={
                                hasDiscount
                                    ? "line-through text-slate-300"
                                    : "text-main"
                            }>
                                ${formatPrice(product.price)}
                            </li>

                            {hasDiscount && product.discounted_price !== undefined && (
                                <li className="text-main">
                                    ${formatPrice(product.discounted_price)}
                                </li>
                            )}
                        </ul>
                        <ReviewsStar reviews={product.reviews} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default memo(ProductItem);
