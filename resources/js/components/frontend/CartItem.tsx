import { CartType } from "@/types";
import { router } from "@inertiajs/react";
import React from "react";

export function CartItem({ item }: { item: CartType }) {
    const handleRemoveItem = () => {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            router.delete(`/cart/delete/${item.id}`, {
                preserveScroll: true,
            });
        }
    };

    const updateQuantity = (newQty: number) => {
        if (newQty < 1) {
            handleRemoveItem();
            return;
        }

        router.put(`/cart/update/${item.id}`, {
            quantity: newQty,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <div className="grid grid-cols-4 items-center border border-gray-200 rounded-lg shadow-sm p-4 mb-4 bg-white transition-shadow duration-200 hover:shadow-md">
            {/* Product Info */}
            <div className="col-span-2 flex items-center gap-4 pr-2">
                <img
                    src={item.product.image_url || "/default-product.png"}
                    alt={item.product.name || "Product image"}
                    className="w-24 h-24 object-cover rounded-md border border-gray-100"
                />
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                        {item.product.name}
                    </h3>
                    {item.product.category && (
                        <p className="text-sm text-gray-500 mt-1">{item.product.category_id}</p>
                    )}
                </div>
            </div>

            {/* Price, Quantity, Total, Remove Controls */}
            <div className="col-span-2 grid grid-cols-4 gap-2 text-center items-center">
                {/* Price */}
                <div className="flex justify-center items-center">
                    <span className="font-semibold text-gray-800 text-lg">${item.total_price.toFixed(2)}</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex justify-center items-center">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden text-gray-700">
                        <button
                            className="p-2 text-lg hover:bg-gray-100 transition-colors duration-150"
                            onClick={() => updateQuantity(item.quantity - 1)}
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>
                        <span className="px-3 py-1 bg-gray-50 border-x border-gray-300 font-medium select-none">
                            {item.quantity}
                        </span>
                        <button
                            className="p-2 text-lg hover:bg-gray-100 transition-colors duration-150"
                            onClick={() => updateQuantity(item.quantity + 1)}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Item Total */}
                <div className="flex justify-center items-center">
                    <span className="font-bold text-gray-900 text-lg">
                        ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                </div>

                {/* Remove Button */}
                <div className="flex justify-center items-center">
                    <button
                        className="text-red-500 hover:text-red-700 text-3xl transition-colors duration-200 p-2"
                        onClick={handleRemoveItem}
                        aria-label={`Remove ${item.product.name} from cart`}
                    >
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
}
