import CartDropdown from '@/components/frontend/kits/CartDropdown';
import ProfileDropdown from '@/components/frontend/kits/ProfileDropdown';
import { SharedProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogIn, Search, ShoppingCart } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import logo from '../../assets/logo.png';

function Header() {
    const { props } = usePage<SharedProps>();
    const { auth, cart } = props;
    const totalCartItems = useMemo(() => cart?.totalItems || 0, [cart]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    // Handler for opening the dropdown
    const handleCartClick = () => {
        setIsDropdownOpen((prev) => !prev);
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
            <nav className="container flex h-24 items-center justify-between gap-1 lg:gap-10">
                {/* logo  */}
                <div className="">
                    <Link href="/">
                        <img className="w-full" src={logo} alt="organick logo" />
                    </Link>
                </div>

                <ul className="hidden items-center gap-3 font-roboto lg:flex lg:gap-8">
                    <li className="group relative transition-all">
                        <Link className="flex gap-1 font-semibold text-main transition-all hover:text-secondary" href="/">
                            Home
                        </Link>
                    </li>

                    <li className="group relative transition-all">
                        <Link className="flex gap-1 font-semibold text-main transition-all hover:text-secondary" href="shops">
                            Shop
                        </Link>
                    </li>

                    <li className="group relative transition-all">
                        <Link className="flex gap-1 font-semibold text-main transition-all hover:text-secondary" href="#">
                            Page
                            <div className="flex items-center transition-all">
                                <span className="text-sm group-hover:hidden">
                                    <i className="fa-solid fa-angle-down"></i>
                                </span>
                                <span className="hidden text-sm group-hover:block">
                                    <i className="fa-solid fa-angle-up"></i>
                                </span>
                            </div>
                        </Link>

                        <ul className="absolute top-6 left-0 hidden w-56 rounded border bg-main p-2 text-light transition-all duration-1000 group-hover:block">
                            <li className="border-b p-2 last:border-none">
                                <Link href="/protfolio">Protfolio</Link>
                            </li>
                            <li className="border-b p-2 last:border-none">
                                <Link href={route('team.index')}>Team</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="group relative transition-all">
                        <Link className="flex gap-1 font-semibold text-main transition-all hover:text-secondary" href="news">
                            News
                        </Link>
                    </li>
                </ul>

                <ul className="flex items-center gap-4">
                    <li className="flex">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                            <Search className="w-5 text-white" />
                        </div>
                    </li>

                    <li className="relative" ref={dropdownRef}>
                        <div className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-slate-300 p-1" onClick={handleCartClick}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-main">
                                <ShoppingCart className="w-5 text-white" />
                            </div>
                            <span className="pr-2 font-semibold text-main">Cart ({totalCartItems})</span>
                        </div>

                        {isDropdownOpen && <CartDropdown cartItems={cart.items} />}
                    </li>

                    {auth.user === null ? (
                        <li>
                            <Link href={route('login')} className="flex gap-1 font-semibold text-main transition-all hover:text-secondary">
                                <LogIn />
                            </Link>
                        </li>
                    ) : (
                        <ProfileDropdown />
                    )}
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
