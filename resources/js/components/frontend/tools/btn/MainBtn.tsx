import { Link } from '@inertiajs/react';

interface MainBtnProps {
    title?: string;
    href?: string;   // Optional href for navigation and linking
    onClick?: () => void;  // Optional onClick handler for button actions
    className?: string;
    type?: "button" | "submit";
    disabled: boolean;
}

function MainBtn({ title = "Explore Now", href, onClick, className = "", type = "button", disabled = false }: MainBtnProps) {
    const baseClasses = "text-light font-bold bg-main px-7 py-5 rounded-lg flex items-center gap-2";

    if (href) {
        return (
            <Link href={href} className={`${baseClasses} ${className}`}>
                {title}
                <span className="text-main bg-light bg-opacity-20 w-7 h-7 rounded-full text-center flex justify-center items-center">
                    <i className="fa-solid fa-arrow-right"></i>
                </span>
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${baseClasses} ${className}`} type={type} disabled={disabled}>
            {title}
            <span className="text-main bg-light bg-opacity-20 w-7 h-7 rounded-full text-center flex justify-center items-center">
                <i className="fa-solid fa-arrow-right"></i>
            </span>
        </button>
    );
}

export default MainBtn;
