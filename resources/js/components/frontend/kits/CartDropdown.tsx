import { CartType } from '@/types';
import { cartSubtotal, formatPrice } from '@/utils/formatters';
import { Link } from '@inertiajs/react';
import React, { useMemo } from 'react';


interface CartItemDropdownProps {
    item: CartType;
}

function CartItemDropdown({ item }: CartItemDropdownProps) {
    const { quantity, product } = item;
    const { name, image_url, discounted_price } = product;
    return (
        <li className="flex items-center border-b border-gray-100 py-2 last:border-b-0">
            {image_url && <img src={image_url} alt={name} className="mr-3 h-12 w-12 rounded-md object-cover" />}
            <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">
                    {quantity} x ${formatPrice(discounted_price)}
                </p>
            </div>
            <span className="text-sm font-semibold text-gray-700">${formatPrice(discounted_price * quantity)}</span>
        </li>
    );
}

const CartDropdown = ({ cartItems }: { cartItems: [] | CartType[] }) => {
    const totalCartPrice = useMemo(() => {
        return formatPrice(cartSubtotal(cartItems));
    }, [cartItems]);

    return (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            {cartItems.length === 0 ? (
                <p className="py-4 text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <h3 className="mb-3 text-lg font-semibold text-gray-800">Your Cart</h3>
                    <ul className="custom-scrollbar max-h-60 overflow-y-auto">
                        {cartItems.map((item) => (
                            <CartItemDropdown key={item.id} item={item} />
                        ))}
                    </ul>
                    <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                        <span className="font-semibold text-gray-800">Total:</span>
                        <span className="text-lg font-bold text-main">${totalCartPrice}</span>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <Link
                            href={route('checkout.index')}
                            className="hover:bg-main-dark block w-full rounded-md bg-main py-2 text-center text-white transition"
                        >
                            {' '}
                            Proceed to Checkout{' '}
                        </Link>
                        <Link
                            href={route('cart.index')}
                            className="hover:bg-main-light block w-full rounded-md border border-main py-2 text-center text-main transition"
                        >
                            {' '}
                            View Cart{' '}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartDropdown;
