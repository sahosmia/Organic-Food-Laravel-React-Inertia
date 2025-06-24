import React from 'react';
import { Link } from '@inertiajs/react'; // If you want links to product pages

interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image_url?: string;
}

interface CartDropdownProps {
    cartItems: CartItemType[];
    totalAmount: number;

}

const CartDropdown: React.FC<CartDropdownProps> = ({ cartItems, totalAmount }) => {
    return (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
            ) : (
                <>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Cart</h3>
                    <ul className="max-h-60 overflow-y-auto custom-scrollbar"> {/* Added custom-scrollbar for styling */}
                        {cartItems.map(item => (
                            <li key={item.id} className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
                                {item.image_url && (
                                    <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                                )}
                                <div className="flex-grow">
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                                </div>
                                <span className="text-sm font-semibold text-gray-700">${(item.quantity * item.price).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
                        <span className="font-semibold text-gray-800">Total:</span>
                        <span className="font-bold text-lg text-main">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <Link href={route('checkout.index')} className="block w-full text-center bg-main text-white py-2 rounded-md hover:bg-main-dark transition">
                            Proceed to Checkout
                        </Link>
                        <Link href={route('cart.index')} className="block w-full text-center border border-main text-main py-2 rounded-md hover:bg-main-light transition">
                            View Cart
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartDropdown;
