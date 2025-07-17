import banner from '@/assets/banner/banner-portfolio.png';
import { CartItem } from '@/components/frontend/CartItem';
import PageBanner from '@/components/frontend/tools/PageBanner';
import FrontLayout from '@/layouts/front-layout';
import { CartType } from '@/types';
import api from '@/utils/axios';
import { cartSubtotal } from '@/utils/formatters';
import { Head, router } from '@inertiajs/react';
import { AxiosError } from 'axios';

import React, { useState } from 'react';




function Cart({ cartItems }: { cartItems: CartType[], }) {

    const [isFreeShipping, setIsFreeShipping] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const [couponSuccess, setCouponSuccess] = useState<string | null>(null)


    const defaultShippingCost = 5.00;
    const shippingCost = isFreeShipping ? 0 : defaultShippingCost;

    const finalTotal = (cartSubtotal(cartItems) - couponDiscount + shippingCost);

    // Function to handle coupon application for freeship, discount, fixed_amount logic if else
    const applyCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setCouponError(null)
        setCouponSuccess(null)

        if (couponCode.trim() === '') {
            setCouponError('Please enter a coupon code.');
            setIsFreeShipping(false);
            setCouponDiscount(0);
            setLoading(false);
            return;
        }

        try {
            const res = await api.post('/apply-coupon', { code: couponCode })
            const resData = res.data;
            if (res.data.coupon === null) {
                setCouponError(resData.coupon_result.message)
                setLoading(false)
                setIsFreeShipping(resData.coupon_result.is_free_shipping);
                setCouponDiscount(resData.coupon_result.discount_amount);
                return;
            }
            setLoading(false);
            setIsFreeShipping(resData.coupon_result.is_free_shipping);
            setCouponDiscount(resData.coupon_result.discount_amount)
            setCouponSuccess(res.data.message || 'Coupon Applied!')
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;

            if (error.response && error.response.status === 422) {
                setCouponError(error.response.data?.message || 'Invalid coupon!');
            } else {
                setCouponError('Server error occurred');
            }
        } finally {
            setLoading(false)
        }
    }




    return (
        <FrontLayout>
            <Head title="Cart" />
            <PageBanner bg={banner} title="Your Cart" />

            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2">
                        {/* Cart Header Row */}
                        <div className="mb-6 grid grid-cols-4 rounded-lg bg-amber-50 shadow">
                            <div className="col-span-2 flex justify-center p-3 font-bold text-main">Product</div>
                            <div className="col-span-2 grid grid-cols-4 text-center font-bold text-main">
                                <div className="flex items-center justify-center">Price</div>
                                <div className="flex items-center justify-center">Qty</div>
                                <div className="flex items-center justify-center">Total</div>
                                <div className="flex items-center justify-center">Remove</div>
                            </div>
                        </div>

                        {/* Dynamic Cart Items List */}
                        <div className="grid grid-cols-1 gap-8">
                            {cartItems && cartItems.length > 0 ? (
                                cartItems.map((item) => <CartItem key={item.id} item={item} />)
                            ) : (
                                <p className="py-10 text-center text-gray-600">No items in cart.</p>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="rounded-lg border bg-white p-6 shadow-md">
                        <h2 className="mb-4 border-b pb-4 text-2xl font-bold text-main">ORDER SUMMARY</h2>

                        {/* Whitout coupon, shiping  */}
                        <div className="mb-2 flex justify-between">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-semibold text-gray-800">${cartSubtotal(cartItems).toFixed(2)}</span>
                        </div>


                        {/* Coupon Code Input & Apply */}
                        <div className="mb-4">
                            <label htmlFor="couponCode" className="block text-sm text-gray-700 mb-1">Coupon Code</label>
                            <form onSubmit={applyCoupon}>
                                <div className="flex gap-2">
                                    <input
                                        id="couponCode"
                                        type="text"
                                        placeholder="Enter Coupon Code"
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-main focus:border-main"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-main transition-colors duration-200 text-sm font-semibold"
                                    >
                                        {loading ? 'Applying...' : 'Apply'}
                                    </button>

                                </div>
                            </form>
                            {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                            {couponDiscount > 0 && !couponError && (
                                <p className="text-green-600 text-xs mt-1">Coupon applied!</p>
                            )}
                            {couponSuccess && <p className="text-green-500 text-xs mt-1">{couponSuccess}</p>}

                        </div>


                        {/* Coupon Discount Display */}
                        {couponDiscount > 0 && (
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700">Coupon Discount</span>
                                <span className="font-semibold text-green-600">-${couponDiscount}</span>
                            </div>
                        )}



                        {/* Shipping Cost Display */}
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Shipping</span>
                            <span className="font-semibold text-gray-800">
                                {isFreeShipping ? <span className="text-green-600">Free</span> : `$${shippingCost.toFixed(2)}`}
                            </span>
                        </div>


                        <div className="flex justify-between font-bold text-xl border-t pt-4 mb-6 text-main">
                            <span>TOTAL:</span>
                            <span>${finalTotal.toFixed(2)}</span>
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
