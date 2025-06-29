import { Link, usePage } from "@inertiajs/react";
import logo from "../../assets/logo.png";
import CartDropdown from "@/components/frontend/kits/CartDropdown";
import { useEffect, useRef, useState } from "react";

interface SharedProps {
    cart?: {
        items: {
            [key: string]: { // key is product_id
                id: number;
                name: string;
                price: number;
                quantity: number;
                image_url?: string;
            };
        };
        totalItems: number;
        totalAmount: number;
    };
    // Add other shared props here (e.g., auth.user, flash messages)
}

function Header() {
    const { props } = usePage<SharedProps>(); // Access shared Inertia props
    const totalCartItems = props.cart?.totalItems || 0;
    const cartItemsArray = Object.values(props.cart?.items || {}); // Convert object to array for mapping
    const cartTotalAmount = props.cart?.totalAmount || 0;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for detecting clicks outside

    // Handler for opening the dropdown
    const handleCartClick = () => {
        setIsDropdownOpen(prev => !prev); // Toggle visibility on click
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-light">
            <nav className="container h-24 flex justify-between items-center gap-1 lg:gap-10">
                {/* logo  */}
                <div className="">
                    <Link href="/">
                        <img className="w-full" src={logo} alt="organick logo" />
                    </Link>
                </div>

                <ul className="hidden lg:flex gap-3 lg:gap-8 items-center font-roboto">
                    <li className="group relative transition-all">
                        <Link
                            className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
                            href="/"
                        >
                            Home
                        </Link>
                    </li>

                    <li className="group relative transition-all">
                        <Link
                            className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
                            href="shops"
                        >
                            Shop
                        </Link>
                    </li>

                    <li className="group relative transition-all">
                        <Link
                            className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
                            href="#"
                        >
                            Page
                            <div className="flex items-center transition-all">
                                <span className="group-hover:hidden text-sm">
                                    <i className="fa-solid fa-angle-down"></i>
                                </span>
                                <span className="hidden group-hover:block text-sm">
                                    <i className="fa-solid fa-angle-up"></i>
                                </span>
                            </div>
                        </Link>

                        <ul className="absolute top-6 left-0 w-56 border bg-main text-light rounded p-2 hidden transition-all duration-1000 group-hover:block">
                            <li className="p-2 border-b last:border-none">
                                <Link href="/portfolios">Protfolio</Link>
                            </li>
                            <li className="p-2 border-b last:border-none">
                                <Link href={route('team.index')}>Team</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="group relative transition-all">
                        <Link
                            className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
                            href="blogs"
                        >
                            Blogs
                        </Link>
                    </li>

                    <li className="flex ">
                        <div className="w-10 h-10 bg-secondary rounded-full flex justify-center items-center">
                            <img
                                src="https://img.icons8.com/ios-glyphs/fafafa/search--v1.png"
                                alt="search--v1"
                                className="w-5 inline-block"
                            />
                        </div>
                    </li>


                    <li className="relative" ref={dropdownRef}>
                        <Link href="/cart">
                            <div
                                className="flex items-center gap-2 rounded-full p-1 border-2 border-slate-200 cursor-pointer"


                            // onClick={handleCartClick}

                            >
                                <div className="w-10 h-10 bg-main rounded-full flex justify-center items-center">
                                    <img
                                        src="https://img.icons8.com/material-outlined/fafafa/shopping-cart--v1.png"
                                        alt="shopping-cart"
                                        className="w-5 inline-block"
                                    />
                                </div>
                                <span className="pr-5 text-main font-semibold">Cart ({totalCartItems})</span>
                            </div>
                        </Link>

                        {/* Cart Dropdown Component */}
                        {isDropdownOpen && (
                            <CartDropdown
                                cartItems={cartItemsArray}
                                totalAmount={cartTotalAmount}
                            />
                        )}
                    </li>
                </ul>


                <div className="flex lg:hidden">
                    <span>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                </div>
            </nav>
        </header>
    );
}

export default Header;
