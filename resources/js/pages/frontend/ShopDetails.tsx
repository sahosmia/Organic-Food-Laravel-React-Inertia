import React, { FormEvent, useState } from "react";
import PageBanner from "@/components/frontend/tools/PageBanner";
import { AuthType, ProductType, ReviewType } from "@/types";
import { formatPrice } from "@/utils/formatters";
import FrontLayout from "@/layouts/front-layout";
import ProductItem from "@/components/frontend/ProductItem";
import bg from "@/assets/banner/banner-shop-single.jpg";
import MainBtn from "@/components/frontend/tools/btn/MainBtn"; // Assumes MainBtn handles isLoading internally
import { Head, useForm } from '@inertiajs/react';
import ReviewsStar from "@/components/frontend/kits/ReviewsStar";
import { calculateAverageRating } from "@/utils/reviewsSetup";

function ShopSingle({ product, relatedProducts, auth }: { product: ProductType, relatedProducts: ProductType[], auth: AuthType }) {
    const [quantity, setQuantity] = useState<number>(1);
    const { user } = auth;
    const averageRating = calculateAverageRating(product.reviews);
    const numberOfReviews = product.reviews?.length || 0;

    const {
        setData: setAddToCartData,
        post: addToCartPost,
        processing: addToCartProcessing,
        reset: resetAddToCartForm
    } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const {
        data: reviewData,
        setData: setReviewData,
        post: reviewPost,
        processing: reviewProcessing,
        errors: reviewErrors,
        reset: reviewReset
    } = useForm({
        product_id: product.id,
        rating: 0,
        comment: ""
    });

    const hasDiscount = product.discount_type && (product.discount_value ?? 0) > 0;
    const [activeTab, setActiveTab] = useState('product_description');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const handleAddToCart = () => {
        if (!user) {
            alert("Please login to add products to the cart.");
            return;
        }

        addToCartPost(route('cart.add'), {
            onSuccess: () => {
                alert("Product added to cart successfully");
                resetAddToCartForm();
            },
            onError: (errors) => {
                console.error("Error adding product to cart:", errors);
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
    };

    const handleReviewSubmit = (e: FormEvent) => {
        e.preventDefault();
        reviewPost(route('reviews.store'), {
            onSuccess: () => {
                alert('Review submitted successfully!');
                reviewReset();
                // Consider refetching product data or updating reviews state
                // Inertia.reload({ only: ['product'] }); // If you want to see the new review immediately
            },
            onError: (errors) => {
                console.error('Review submission failed:', errors);
            }
        });
    };

    const reviewsToDisplay: ReviewType[] = product?.reviews || [];
    const defaultUserAvatar = 'https://via.placeholder.com/40'; // Default avatar URL

    return (
        <FrontLayout>
            <Head title="Product Details"></Head>
            <div>
                <PageBanner bg={bg} title="Shop Single" />
                <div className="container py-10 flex flex-col md:flex-row items-center">
                    <div className="flex-1 ">
                        <h5 className="bg-main text-light text-md capitalize rounded-xl px-5 py-2 m-5 inline-block">
                            {product.category?.title}
                        </h5>
                        <img
                            className="w-auto block m-auto"
                            src={product.image_url}
                            alt={product.name}
                        />
                    </div>
                    <div className="flex-1 ">
                        <div className="mx-20">
                            <h2 className="title-lg mb-2">{product.name}</h2>
                            <div className="flex gap-2 items-center">
                                <ReviewsStar reviews={product.reviews} />
                                <span className="font-semibold text-gray-800">
                                    {averageRating.toFixed(1)}
                                </span>
                                {numberOfReviews > 0 ? (
                                    <span className="text-sm text-gray-600">({numberOfReviews} reviews)</span>
                                ) : (
                                    <span className="text-sm text-gray-500">No reviews yet</span>
                                )}
                            </div>

                            <ul className="flex gap-2 font-bold mb-10 items-end">
                                <li className={
                                    hasDiscount
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
                                    onChange={handleQuantityChange}
                                />
                                <MainBtn
                                    title="Add To Cart"
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={addToCartProcessing} 
                                />
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
                            Reviews
                        </button>
                    </div>

                    <div className="w-full lg:w-4/5 m-auto min-h-40">
                        {activeTab === 'product_description' && (
                            <div className="text-left">
                                <h3 className="title-md mb-5">Product Description</h3>
                                <p>{product.another_product_description}</p>
                            </div>
                        )}
                        {activeTab === 'additional_information' && (
                            <div className="text-left">
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
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="title-md mb-5 text-left">Customer Reviews ({numberOfReviews})</h3>

                                {/* Review List Section */}
                                <div className="mb-10">
                                    {numberOfReviews === 0 ? (
                                        <p className="text-gray-500">No reviews yet for this product.</p>
                                    ) : (
                                        <div className="space-y-6">
                                            {reviewsToDisplay
                                                .filter(review => review.approved)
                                                .map((review) => (
                                                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-start">
                                                        {/* User Avatar */}
                                                        <div className="mr-4">
                                                            <img
                                                                src={review.user?.image || defaultUserAvatar}
                                                                alt={`${review.user?.name || `User ${review.user_id}`} avatar`}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                        </div>

                                                        {/* Review Content */}
                                                        <div>
                                                            <div className="flex items-center mb-3">
                                                                {/* Rating Stars */}
                                                                <ul className="flex text-yellow-500 text-xl mr-3" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                                                                    {Array.from({ length: review.rating }, (_, i) => (
                                                                        <li key={`review-star-filled-${review.id}-${i}`}>
                                                                            <i className="fa-solid fa-star"></i>
                                                                        </li>
                                                                    ))}
                                                                    {Array.from({ length: 5 - review.rating }, (_, i) => (
                                                                        <li key={`review-star-empty-${review.id}-${i}`} className="text-gray-300">
                                                                            <i className="fa-solid fa-star"></i>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                                {/* User Name/ID */}
                                                                <span className="font-semibold text-gray-800">
                                                                    {review.user?.name || `User #${review.user_id}`}
                                                                </span>
                                                                {/* Review Date */}
                                                                <span className="text-sm text-gray-500 ml-auto">
                                                                    {review.created_at ? new Date(review.created_at).toLocaleDateString('en-US') : 'Date N/A'}
                                                                </span>
                                                            </div>
                                                            {/* Review Comment */}
                                                            {review.comment && (
                                                                <p className="text-gray-700 leading-relaxed">
                                                                    "{review.comment}"
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                {/* Add Your Review Form */}
                                <h3 className="title-md mb-5 text-left">Add Your Review</h3>
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Your Rating <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex text-yellow-500 text-2xl">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <i
                                                    key={i}
                                                    className={`fa-star cursor-pointer ${i < reviewData.rating ? 'fa-solid' : 'fa-regular'}`}
                                                    onClick={() => setReviewData('rating', (i + 1))}
                                                ></i>
                                            ))}
                                        </div>
                                        {reviewErrors.rating && (
                                            <div className="text-red-500 text-xs mt-1">{reviewErrors.rating}</div>
                                        )}
                                        {reviewData.rating === 0 && !reviewErrors.rating && (
                                            <p className="text-sm text-gray-500 mt-1">Click a star to rate</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                                            Your Comment
                                        </label>
                                        <textarea
                                            id="comment"
                                            rows={4}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                            placeholder="Share your thoughts about this product..."
                                            value={reviewData.comment}
                                            onChange={(e) => setReviewData('comment', e.target.value)}
                                        ></textarea>
                                        {reviewErrors.comment && (
                                            <div className="text-red-500 text-xs mt-1">{reviewErrors.comment}</div>
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="bg-main hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                                            disabled={reviewProcessing}
                                        >
                                            {reviewProcessing ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </div>
                                </form>
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
