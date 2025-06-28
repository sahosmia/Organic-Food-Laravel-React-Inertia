
import PageBanner from '@/components/frontend/tools/PageBanner';
import FrontLayout from '@/layouts/front-layout';
import banner from "@/assets/banner/banner-portfolio.png";
import productImg from "@/assets/product/one.png";
import React from 'react';
import { Head } from '@inertiajs/react';

function Cart() {
    return (
        <FrontLayout>
            <Head title='Cart' />
            <PageBanner bg={banner} title="Cart" />


            <div class="container mx-auto px-4 py-10">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* <!-- Cart Items --> */}
                    <div class="lg:col-span-2 ">

                        <div className='  grid grid-cols-4  mb-6 shadow rounded-lg bg-amber-50'>
                            <div className='col-span-2  flex justify-center p-3 font-bold'>Product</div>
                            <div className=' col-span-2 flex justify-evenly  items-center '>

                                <div className='text-center font-bold'>Price</div>
                                <div className='text-center font-bold'>Qty</div>
                                <div className='text-center font-bold'>Total</div>
                                <div className='text-center font-bold'>Remove</div>
                            </div>

                        </div>
                        <div className='   grid grid-cols-4  border  rounded-lg shadow'>
                            <div className='col-span-2 flex justify-center p-3'>
                                <div class="flex items-center gap-4 w-full">
                                    <img src={productImg} alt="product" class="w-28 h-28 rounded object-cover" />
                                    <div>
                                        <h3 class="font-semibold">Secure the Bag Heavy Weight Embroidered Hoodie - Bone</h3>
                                        <p class="text-sm text-gray-600">BONE / M</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' col-span-2 flex justify-evenly  items-center '>

                                <div className='text-center'><span class="font-semibold text-gray-800 text-center md:text-left">$23.99</span></div>
                                <div className='text-center'>
                                    <div class="flex items-center border px-2 rounded w-fit mx-auto">
                                        <button class="px-2 text-lg">−</button>
                                        <span class="px-3">4</span>
                                        <button class="px-2 text-lg">+</button>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <span class="font-semibold text-center md:text-right text-gray-800 w-20">$95.96</span>
                                </div>
                                <div className='text-center'><button class="text-red-600 hover:text-red-800 text-lg">×</button></div>
                            </div>

                        </div>


                    </div>

                    {/* <!-- Order Summary --> */}
                    <div class="border p-6 rounded-lg shadow">
                        <h2 class="text-xl font-bold border-b pb-4 mb-4">ORDER SUMMARY</h2>

                        <div class="flex justify-between mb-2">
                            <span class="text-gray-700">Subtotal</span>
                            <span class="font-semibold">$95.96</span>
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
                            <span>$95.96</span>
                        </div>

                        <p class="text-xs text-gray-500 mb-4">
                            Tax included and shipping calculated at checkout
                        </p>

                        <button class="w-full bg-black text-white py-2 rounded hover:bg-gray-800 mb-2">
                            PROCEED TO CHECKOUT
                        </button>
                        <button class="w-full border border-black text-black py-2 rounded hover:bg-gray-100">
                            CONTINUE SHOPPING
                        </button>
                    </div>
                </div>
            </div>

        </FrontLayout>
    );
};

export default Cart;
