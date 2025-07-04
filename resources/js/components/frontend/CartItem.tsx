import { router } from "@inertiajs/react";
import React from "react";

export function CartItem({ item }) {
    console.log("cartItems in Cart component:", item.product.name);


    const handleRemoveItem = () => {
        if (confirm('Are you sure you want to remove this item?')) {
            console.log("Removing item:", item.id);

            router.delete(`/cart/delete/${item.id}`, {
                preserveScroll: true,
            });
        }
    };

    const updateQuantity = (newQty: number) => {
        if (newQty < 1) return;

        router.put(`/cart/update/${item.id}`, {
            quantity: newQty,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <div >
            <div className="grid grid-cols-1  gap-8 ">
                {/* <!-- Cart Items --> */}

                <div className="grid grid-cols-4 border rounded-lg shadow">
                    <div className="col-span-2 flex justify-center p-3">
                        <div className="flex items-center gap-4 w-full">
                            <img
                                src={item.product.image_url || "/default.png"}
                                alt={item.product.name || "Product"}
                                className="w-28 h-28 rounded object-cover"
                            />
                            <div>
                                <h3 className="font-semibold">{item.product.name}</h3>
                                <p className="text-sm text-gray-600">{item.product.category}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-evenly items-center">
                        <div className="text-center">
                            <span className="font-semibold text-gray-800">${item.product.price}</span>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center border px-2 rounded w-fit mx-auto">
                                <button className="px-2 text-lg"
                                    onClick={() => updateQuantity(item.quantity - 1)}>
                                    −</button>
                                <span className="px-3">{item.quantity}</span>
                                <button className="px-2 text-lg"
                                    onClick={() => updateQuantity(item.quantity + 1)}>
                                    +</button>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="font-semibold text-gray-800">
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                        <div className="text-center">
                            <button className="text-red-600 text-2xl hover:text-red-800 "
                                onClick={() => handleRemoveItem()}>
                                × </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
