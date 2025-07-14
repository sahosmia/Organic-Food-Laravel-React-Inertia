import React from 'react';
import FrontLayout from '@/layouts/front-layout';
import { Head, router } from '@inertiajs/react';
import { CartType } from '@/types';
import banner from "@/assets/banner/banner-portfolio.png";
import PageBanner from "@/components/frontend/tools/PageBanner";
import { CartItem } from '@/components/frontend/CartItem';

function Cart({ cartItems }: { cartItems: CartType[] }) {
    const cartTotal = cartItems?.reduce((total, item) => {
        return total + item.quantity * item.product.price;
    }, 0) || 0;

    return (
        <FrontLayout>
            <Head title="Cart" />
            <PageBanner bg={banner} title="Your Cart" />

            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items Section */}
                    <div className="lg:col-span-2">
                        {/* Cart Header Row */}
                        <div className="grid grid-cols-4 mb-6 shadow rounded-lg bg-amber-50">
                            <div className="col-span-2 flex justify-center p-3 font-bold text-main">Product</div>
                            <div className="col-span-2 grid grid-cols-4 text-center font-bold text-main">
                                <div className="flex justify-center items-center">Price</div>
                                <div className="flex justify-center items-center">Qty</div>
                                <div className="flex justify-center items-center">Total</div>
                                <div className="flex justify-center items-center">Remove</div>
                            </div>
                        </div>

                        {/* Dynamic Cart Items List */}
                        <div className='grid grid-cols-1 gap-8'>
                            {cartItems && cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))
                            ) : (
                                <p className="text-center text-gray-600 py-10">No items in cart.</p>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="border p-6 rounded-lg shadow-md bg-white">
                        <h2 className="text-2xl font-bold border-b pb-4 mb-4 text-main">ORDER SUMMARY</h2>

                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-semibold text-gray-800">${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="couponCode" className="block text-sm text-gray-700 mb-1">Coupon Code</label>
                            <input
                                id="couponCode"
                                type="text"
                                placeholder="Enter Coupon Code"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Coupon code will be applied on the checkout page
                            </p>
                        </div>

                        <div className="flex justify-between font-bold text-xl border-t pt-4 mb-6 text-main">
                            <span>TOTAL:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <p className="text-xs text-gray-500 mb-4">
                            Tax included and shipping calculated at checkout
                        </p>

                        <button
                            className="w-full bg-main text-white py-3 rounded-md hover:bg-secondary transition-colors duration-200 mb-3 font-semibold"
                            onClick={() => router.visit('/checkout')}
                        >
                            PROCEED TO CHECKOUT
                        </button>

                        <button
                            className="w-full border border-main text-main py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 font-semibold"
                            onClick={() => router.visit('/shops')}
                        >
                            CONTINUE SHOPPING
                        </button>
                    </div>

                </div>
            </div>
        </FrontLayout>
    );
}

export default Cart;
