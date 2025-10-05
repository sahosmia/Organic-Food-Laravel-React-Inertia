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
        phone: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        district: "",
        post_code: "",
        payment_method: "cash_on_delivery",
        order_notes: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('checkout.place-order'));
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
                                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    autoComplete="given-name"
                                                    value={data.name}
                                                    onChange={(e) => setData("name", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                                 {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                                Phone number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="text"
                                                    autoComplete="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData("phone", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
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
                                                 {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="address_line_1" className="block text-sm/6 font-medium text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="address_line_1"
                                                    name="address_line_1"
                                                    type="text"
                                                    autoComplete="street-address"
                                                    value={data.address_line_1}
                                                    onChange={(e) => setData("address_line_1", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                                 {errors.address_line_1 && <p className="mt-2 text-sm text-red-600">{errors.address_line_1}</p>}
                                            </div>
                                        </div>
                                         <div className="col-span-full">
                                            <label htmlFor="address_line_2" className="block text-sm/6 font-medium text-gray-900">
                                                Street address line 2 (Optional)
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="address_line_2"
                                                    name="address_line_2"
                                                    type="text"
                                                    autoComplete="street-address"
                                                    value={data.address_line_2}
                                                    onChange={(e) => setData("address_line_2", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
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
                                                 {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
                                            </div>
                                        </div>
                                         <div className="sm:col-span-2">
                                            <label htmlFor="district" className="block text-sm/6 font-medium text-gray-900">
                                                District
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="district"
                                                    name="district"
                                                    type="text"
                                                    value={data.district}
                                                    onChange={(e) => setData("district", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                                  {errors.district && <p className="mt-2 text-sm text-red-600">{errors.district}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="post_code" className="block text-sm/6 font-medium text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="post_code"
                                                    name="post_code"
                                                    type="text"
                                                    autoComplete="postal-code"
                                                    value={data.post_code}
                                                    onChange={(e) => setData("post_code", e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                                  {errors.post_code && <p className="mt-2 text-sm text-red-600">{errors.post_code}</p>}
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="order_notes" className="block text-sm/6 font-medium text-gray-900">
                                                Oder Notes
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="order_notes"
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
                                    <span>${(item.quantity * item.product.discounted_price).toFixed(2)}</span>
                                </div>
                            ))}

                            <hr className="my-4" />
                            <div className="flex items-center gap-x-3">
                                <input
                                    type="radio"
                                    id="cash_on_delivery"
                                    name="payment_method"
                                    value="cash_on_delivery"
                                    checked={data.payment_method === "cash_on_delivery"}
                                    onChange={(e) => setData("payment_method", e.target.value)}
                                    className="..."
                                />
                                <label htmlFor="cash_on_delivery" className="block text-lg font-medium text-gray-900">
                                    Cash on Delivery
                                </label>
                            </div>
                            <hr className="my-4" />

                            <div className="flex justify-between text-md mb-1">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>
                                    ${total.toFixed(2)}
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