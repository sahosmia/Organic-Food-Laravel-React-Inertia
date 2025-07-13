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


            <div className="container mx-auto px-4 py-10">
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
                        <div className='   grid grid-cols-4  border  rounded-lg shadow'>
                            <div className='col-span-2 flex justify-center p-3'>
                                <div className="flex items-center gap-4 w-full">
                                    <img src={cartItems?.data?.[0]?.product?.image ?? 'https://via.placeholder.com/112'} alt="product" className="w-28 h-28 rounded object-cover" />
                                    <div>
                                        <h3 className="font-semibold">Secure the Bag Heavy Weight Embroidered Hoodie - Bone</h3>
                                        <p className="text-sm text-gray-600">BONE / M</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' col-span-2 flex justify-evenly  items-center '>

                                <div className='text-center'><span className="font-semibold text-gray-800 text-center md:text-left">$23.99</span></div>
                                <div className='text-center'>
                                    <div className="flex items-center border px-2 rounded w-fit mx-auto">
                                        <button className="px-2 text-lg">−</button>
                                        <span className="px-3">4</span>
                                        <button className="px-2 text-lg">+</button>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <span className="font-semibold text-center md:text-right text-gray-800 w-20">$95.96</span>
                                </div>
                                <div className='text-center'><button className="text-red-600 hover:text-red-800 text-lg">×</button></div>
                            </div>

                            {/* // Display cart items */}
                            <div className='grid grid-cols-1 gap-8'>
                                {cartItems?.data?.length > 0 ? (
                                    cartItems.data.map((item, index) => (
                                        <CartItem key={index} item={item} />
                                    ))
                                ) : (
                                    <p>No items in cart.</p>
                                )}
                            </div>


                        </div>


                        {/* <!-- Order Summary --> */}
                        <div className="border p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold border-b pb-4 mb-4">ORDER SUMMARY</h2>

                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="font-semibold">${cartTotal?.toFixed(2)}</span>
                            </div>


                            <div className="mb-4">
                                <label className="block text-sm text-gray-700 mb-1">Coupon Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter Coupon Code"
                                    className="w-full border rounded px-3 py-2 text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Coupon code will be applied on the checkout page
                                </p>
                            </div>

                            <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
                                <span>TOTAL:</span>
                                <span>${cartTotal?.toFixed(2)}</span>
                            </div>

                            <p className="text-xs text-gray-500 mb-4">
                                Tax included and shipping calculated at checkout
                            </p>



                            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 mb-2"
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
            </div>

        </FrontLayout >
    );
}

export default Cart;
