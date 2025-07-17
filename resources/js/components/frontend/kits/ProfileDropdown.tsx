
import { SharedProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Heart, ListOrdered, LogOut, Settings, User, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);
    const { props } = usePage<SharedProps>();
    const { auth } = props;

    // console.log(auth);

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

    const handleClick = () => {
        setIsDropdownOpen(prev => !prev)

    }
    return (
        <li className="relative" ref={dropdownRef}>
            <div
                className="flex items-center gap-2 rounded-full p-1 border-2 border-slate-200 cursor-pointer"
                onClick={handleClick}

            >
                <div className="w-10 h-10 bg-main rounded-full flex justify-center items-center">
                    <User className="h-6 w-6 text-white" />
                </div>
            </div>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3">
                    <div className="flex flex-col gap-1">
                        {/* Your menu items go here, using route('profile.edit'), route('orders.index'), etc. */}
                        <Link href={route('profile.edit')} className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                            <UserCircle className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
                            <span className="font-medium">My Profile</span>
                        </Link>
                        <Link href={route('orders.index')} className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                            <ListOrdered className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
                            <span className="font-medium">My Orders</span>
                        </Link>
                        <Link href={route('wishlist.index')} className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                            <Heart className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
                            <span className="font-medium">Wishlist</span>
                        </Link>
                        <Link href={route('settings.index')} className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                            <Settings className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
                            <span className="font-medium">Settings</span>
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        <Link href={route('logout')} method="post" as="button" className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left">
                            <LogOut className="h-5 w-5 text-red-500" />
                            <span className="font-medium">Logout</span>
                        </Link>
                    </div>
                </div>
            )}
        </li>
    );
}


