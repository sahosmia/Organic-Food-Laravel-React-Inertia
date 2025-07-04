import React from 'react';
import FrontLayout from '@/layouts/front-layout';
import { Head, router } from '@inertiajs/react';
import { CartType, PaginationType } from '@/types';
import banner from "@/assets/banner/banner-portfolio.png";
import PageBanner from "@/components/frontend/tools/PageBanner";
import { CartItem } from '@/components/frontend/CartItem';
import { Item } from '@radix-ui/react-dropdown-menu';
import { Link } from 'lucide-react';

function Cart({ cartItems }: { cartItems: PaginationType<CartType> }) {


    const cartTotal = cartItems?.reduce((total, item) => {
        return total + item.quantity * item.product.price;
    }, 0);

    console.log("Cart Items:", cartItems);
    return (
        <FrontLayout>
            <Head title="Cart" />
            <PageBanner bg={banner} title="Your Cart" />


            <div className='container mx-auto px-4 py-8'>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* <!-- Cart Items --> */}
                    <div className="lg:col-span-2 ">

                        <div className="grid grid-cols-4 mb-6 shadow rounded-lg bg-amber-50 ">
                            <div className="col-span-2 flex justify-center p-3 font-bold">Product</div>
                            <div className="col-span-2 flex justify-evenly items-center">
                                <div className="text-center font-bold">Price</div>
                                <div className="text-center font-bold">Qty</div>
                                <div className="text-center font-bold">Total</div>
                                <div className="text-center font-bold">Remove</div>
                            </div>
                        </div>

                        {/* // Display cart items */}
                        <div className='grid grid-cols-1 gap-8'>
                            {cartItems?.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <CartItem key={index} item={item} />
                                ))
                            ) : (
                                <p>No items in cart.</p>
                            )}
                        </div>


                    </div>


                    {/* <!-- Order Summary --> */}
                    <div class="border p-6 rounded-lg shadow">
                        <h2 class="text-xl font-bold border-b pb-4 mb-4">ORDER SUMMARY</h2>

                        <div class="flex justify-between mb-2">
                            <span class="text-gray-700">Subtotal</span>
                            <span class="font-semibold">${cartTotal?.toFixed(2)}</span>
                        </div>


                        <div class="mb-4">
                            <label class="block text-sm text-gray-700 mb-1">Coupon Code</label>
                            <input
                                type="text"
                                placeholder="Enter Coupon Code"
                                class="w-full border rounded px-3 py-2 text-sm"
                            />
                            <p class="text-xs text-gray-500 mt-1">
                                Coupon code will be applied on the checkout page
                            </p>
                        </div>

                        <div class="flex justify-between font-bold text-lg border-t pt-4 mb-6">
                            <span>TOTAL:</span>
                            <span>${cartTotal?.toFixed(2)}</span>
                        </div>

                        <p class="text-xs text-gray-500 mb-4">
                            Tax included and shipping calculated at checkout
                        </p>



                        <button class="w-full bg-black text-white py-2 rounded hover:bg-gray-800 mb-2"
                            onClick={() => router.visit('/checkout')}>

                            PROCEED TO CHECKOUT
                        </button>

                        <button
                            className="w-full border border-black text-black py-2 rounded hover:bg-gray-100"
                            onClick={() => router.visit('/shops')}
                        >
                            CONTINUE SHOPPING
                        </button>
                    </div>
                </div>

            </div>

        </FrontLayout >
    );
}

export default Cart;
