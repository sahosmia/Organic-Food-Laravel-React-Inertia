import bannerImage from "@/assets/banner/banner-portfolio.png";
import React from "react";
import PageBanner from "@/components/frontend/tools/PageBanner";
import FrontLayout from "@/layouts/front-layout";
import { Head, useForm } from "@inertiajs/react";
import { CartType } from "@/types";

function Checkout({ cartItems, total }: { cartItems: CartType[], total: number }) {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone_number: "",
        address: "",
        city: "",
        postal_code: "",
        order_notes: "",
        delivery_charge: 0, // default: 0 (inside Dhaka)
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/place-order");
    };



    return (
        <FrontLayout>
            <Head title="Checkout" />
            <PageBanner
                title="Checkout"
                bg={bannerImage}
            />
            <div className="container mx-auto px-4 py-8">

                <div className="grid grid-cols-1   md:grid-cols-2 gap-8">
                    <div className="p-4">
                        <h1 className="text-3xl  mb-4 font-bold">Shipping Details</h1>
                        <hr className="borer-4 border-indigo-500 " />

                        <form id="checkout-form" onSubmit={handleSubmit}>
                            <div className="space-y-12">

                                <div className="border-b border-gray-900/10 pb-12">


                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="first-name"
                                                    name="first_name"
                                                    type="text"
                                                    autoComplete="given-name"
                                                    value={data.name}
                                                    onChange={(e) => setData("name", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                            {errors.name && (
                                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>



                                        <div className="sm:col-span-3">
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                                Phone number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone-number"
                                                    name="phone_number"
                                                    type="number"
                                                    autoComplete="number"
                                                    value={data.phone_number}
                                                    onChange={(e) => setData("phone_number", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={data.email}
                                                    onChange={(e) => setData("email", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="address"
                                                    name="address"
                                                    type="text"
                                                    autoComplete="street-address"
                                                    value={data.address}
                                                    onChange={(e) => setData("address", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3 ">
                                            <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    autoComplete="address-level2"
                                                    value={data.city}
                                                    onChange={(e) => setData("city", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3 ">
                                            <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="postal-code"
                                                    name="postal_code"
                                                    type="text"
                                                    autoComplete="postal-code"
                                                    value={data.postal_code}
                                                    onChange={(e) => setData("postal_code", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="order-notes" className="block text-sm/6 font-medium text-gray-900">
                                                Oder Notes
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="oder-notes"
                                                    name="order_notes"
                                                    rows={3}
                                                    value={data.order_notes}
                                                    onChange={(e) => setData("order_notes", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    defaultValue={''}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div> */}
                        </form>

                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h1 className="text-3xl mb-4 font-bold">Payment Details</h1>
                        <hr className="borer-4 border-secondary " />

                        <div className=" p-6">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            {cartItems.map((item, i) => (
                                <div key={i} className="flex justify-between mb-2">

                                    <span>{item.product.name} × {item.quantity}</span>
                                    <span>${(item.quantity * item.product.price).toFixed(2)}</span>
                                </div>
                            ))}

                            <hr className="my-4" />
                            <div className="flex items-center gap-x-3">
                                <input
                                    type="radio"
                                    id="inside"
                                    name="delivery"
                                    value={0}
                                    checked={data.delivery_charge == 0}
                                    onChange={() => setData("delivery_charge", 0)}
                                    className="..."
                                />
                                <label htmlFor="inside" className="block text-lg font-medium text-gray-900">
                                    Inside Dhaka — Free Delivery
                                </label>
                            </div>

                            <div className="flex items-center gap-x-3 mt-2">
                                <input
                                    type="radio"
                                    id="outside"
                                    name="delivery"
                                    value={100}
                                    checked={data.delivery_charge == 100}
                                    onChange={() => setData("delivery_charge", 100)}
                                    className="..."
                                />
                                <label htmlFor="outside" className="block text-lg font-medium text-gray-900">
                                    Outside Dhaka — 100 Taka Delivery Charge
                                </label>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between text-md mb-1">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-md mb-1">
                                <span>Delivery</span>
                                <span>{data.delivery_charge === 0 ? "Free" : `৳${data.delivery_charge}`}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>
                                    ৳{(total + Number(data.delivery_charge)).toFixed(2)}
                                </span>
                            </div>


                        </div>
                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={processing}
                            className="mt-4 w-full bg-indigo-600 text-white py-2 text-lg font-bold rounded hover:bg-indigo-700 transition"
                        >
                            Place Order
                        </button>

                    </div>
                </div>

            </div>
        </FrontLayout>
    );
}

export default Checkout;
