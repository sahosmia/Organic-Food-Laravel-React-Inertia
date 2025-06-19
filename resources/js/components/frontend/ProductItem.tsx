import { ProductType } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { Link } from "@inertiajs/react";
import React from "react";

function ProductItem({ product }: { product: ProductType }) {
    console.log(product);

    const hasDiscount = product.discount_type && (product.discount_value ?? 0) > 0;


    return (
        <Link href={route('product.show', { product: product.slug })} >
            <div className="bg-white outline outline-1 outline-slate-400  rounded-xl">
                <h5 className="bg-main text-light text-md capitalize rounded-xl px-5 py-2 m-5 inline-block">
                    {product.category && product.category.title}
                </h5>
                <div className="w-60 m-auto">
                    <img className="inline-block h-full" src={product.image_url} alt="" />
                </div>
                <div className="m-5 mt-0">
                    <h2 className="title-sm mb-2">{product.name}</h2>
                    <hr className="mb-4" />
                    <div className="flex justify-between">
                        <ul className="flex gap-2 font-bold">
                            <li className={
                                product.discount_type && (product.discount_value ?? 0) > 0
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
                        <ul className="flex">
                            <li className="text-yellowca">
                                <i className="fa-solid fa-star"></i>
                            </li>
                            <li className="text-yellowca">
                                <i className="fa-solid fa-star"></i>
                            </li>
                            <li className="text-yellowca">
                                <i className="fa-solid fa-star"></i>
                            </li>
                            <li className="text-yellowca">
                                <i className="fa-solid fa-star"></i>
                            </li>
                            <li className="text-yellowca">
                                <i className="fa-solid fa-star"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Link>

    );
}

export default ProductItem;
