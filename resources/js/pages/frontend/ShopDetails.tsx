import React, { useState } from "react";
import PageBanner from "@/components/frontend/tools/PageBanner";
// import { useLocation } from "react-router";
import { AuthType, ProductType } from "@/types";
import { formatPrice } from "@/utils/formatters";
import FrontLayout from "@/layouts/front-layout";
import ProductItem from "@/components/frontend/ProductItem";
import bg from "@/assets/banner/banner-shop-single.jpg";
import MainBtn from "@/components/frontend/tools/btn/MainBtn";
import { Head, useForm } from '@inertiajs/react';


function ShopSingle({ product, relatedProducts, auth }: { product: ProductType, relatedProducts: ProductType[], auth: AuthType }) {

    const [quantity, setQuantity] = useState<number>(1);
    console.log(auth);
    const { user } = auth;


    const {
        setData: setAddToCartData,
        post: addToCartPost,
        processing: addToCartProcessing,
        errors: addToCartErrors,
        reset
    } = useForm({
        product_id: product.id,
        quantity: 1,
    });


    const hasDiscount = product.discount_type && (product.discount_value ?? 0) > 0;

    const [activeTab, setActiveTab] = useState('product_description');

    const handleTabClick = (index: string) => {
        setActiveTab(index);
    };

    const handleAddToCart = () => {

        // if user is null, show an alert to login
        if (!user) {
            alert("Please login to add products to the cart.");
            return;
        }

        console.log("Add to cart clicked for product:", product.id, "Quantity:", quantity);


        addToCartPost(route('cart.add'), {
            onSuccess: () => {
                alert("Product added to cart successfully");
                reset(); // Reset the form data after successful addition
            },
            onError: (errors) => {
                alert("Error adding product to cart:", errors);
                // Handle errors here, e.g., show a notification or alert
            }
        });

    };


    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);

        if (isNaN(value) || value < 1) {
            value = 1;
        }
        setQuantity(value);
        setAddToCartData('quantity', value);
        // setBuyNowData('quantity', value);   // useForm এর quantity আপডেট করুন
    };

    return (
        <FrontLayout>
            <Head title="Product Details"></Head>
            <div>
                <PageBanner bg={bg} title="Shop Single" />
                <div className="container py-10 flex flex-col md:flex-row items-center">
                    <div className="flex-1 ">
                        <h5 className="bg-main text-light text-md capitalize rounded-xl px-5 py-2 m-5 inline-block">
                            {product.category && product.category.title}
                        </h5>
                        <img
                            className="w-auto block m-auto"
                            src={product.image_url}
                            alt=""
                        />
                    </div>
                    <div className="flex-1 ">
                        <div className="mx-20">
                            <h2 className="title-lg mb-2">{product.name}</h2>
                            <ul className="flex mb-2">
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

                            <ul className="flex gap-2 font-bold mb-10 items-end">
                                <li className={
                                    product.discount_type && (product.discount_value ?? 0) > 0
                                        ? "line-through text-slate-300"
                                        : "text-main text-3xl"
                                }>
                                    ${formatPrice(product.price)}

                                </li>
                                {hasDiscount && product.discounted_price !== undefined && (
                                    <li className="text-main text-3xl">
                                        ${formatPrice(product.discounted_price)}
                                    </li>
                                )}
                            </ul>

                            <p className="mb-10">
                                Simply dummy text of the printing and typesetting industry. Lorem
                                had ceased to been the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley.
                            </p>
                            <div className="flex gap-5 items-center" >
                                <label className="title-sm font-bold text-main">Quantity :</label>
                                <input
                                    type="number"
                                    className="outline outline-2 outline-main text-center rounded-lg w-28 h-7 font-bold py-8 title-sm text-main"
                                    min="1"
                                    max="10"
                                    value={quantity}
                                    onChange={handleQuantityChange} />
                                <MainBtn title="Add To Cart" type="button" onClick={handleAddToCart} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-10">
                    <div className="flex justify-center gap-5 mb-10">

                        <button
                            className={`font-bold px-7 py-5 rounded-lg ${activeTab === 'product_description'
                                ? "bg-main text-light"
                                : "bg-slate-200 text-main"
                                }`}
                            onClick={() => handleTabClick('product_description')}
                        >
                            Product Description
                        </button>
                        <button
                            className={`font-bold px-7 py-5 rounded-lg ${activeTab === 'additional_information'
                                ? "bg-main text-light"
                                : "bg-slate-200 text-main"
                                }`}
                            onClick={() => handleTabClick('additional_information')}
                        >
                            Additional Information
                        </button>
                        <button
                            className={`font-bold px-7 py-5 rounded-lg ${activeTab === 'review'
                                ? "bg-main text-light"
                                : "bg-slate-200 text-main"
                                }`}
                            onClick={() => handleTabClick('review')}
                        >
                            Review

                            {/* how to make it point show and work here
                            => it will show the review of the product
                            => it will show the review of the product in the review tab

                            backend
                            => it will check if the product has any review
                            => if yes, it will return the review of the product
                            => if no, it will return a message saying no review found
                            => it will return the review of the product in the review tab
                             
                            */}
                        </button>
                    </div>

                    <div className="w-full lg:w-4/5 text-center m-auto min-h-40">
                        {/* swith consition  */}
                        {activeTab === 'product_description' && (
                            <div className="text-left">
                                <h3 className="title-md mb-5">Product Description</h3>
                                <p>{product.another_product_description}</p>
                            </div>
                        )}
                        {activeTab === 'additional_information' && (
                            <div className="text-left">
                                {/* now make it point show  */}
                                <h3 className="title-md mb-5">Additional Information</h3>
                                {product.additional_information && Array.isArray(product.additional_information) && product.additional_information.length > 0 && (
                                    <ul className="list-disc pl-5">
                                        {product.additional_information.map((info, index) => (
                                            <li key={index} className="mb-2">{info}</li>
                                        ))}
                                    </ul>
                                )}

                            </div>
                        )}
                        {activeTab === 'review' && (
                            <div className="text-left">
                                <h3 className="title-md mb-5">Review</h3>
                                <p>{product.review}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="py-20">
                    {relatedProducts && relatedProducts.length > 0 ? (
                        <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductItem key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-xl font-bold text-gray-500">
                            No related products found.
                        </div>
                    )}

                </div>
            </div>
        </FrontLayout >

    );
}

export default ShopSingle;
