import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface SharedProps {
    cart?: {
        items: {
            [key: string]: {
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
    [key: string]: unknown;
    auth: {
        user: null;
    };
}
export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}
export interface NavItemWithSubmenu extends NavItem {
    href?: string;
    submenu?: NavItem[] | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}



export interface CategoryType {
    id: number;
    title: string;
    slug: string;
    description?: string;
    image: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface ReviewType {
    approved: boolean;
    approved_at: string | null;
    comment: string;
    id: number;
    product_id: number;
    rating: number;
    user_id: number;
    created_at: string;
}

export interface ProductType {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount_type: string | null;
    discount_value: number | null;
    category_id: number;
    image: string;
    is_active: boolean;
    category?: CategoryType;
    discounted_price?: number;
    image_url: string;
    reviews: ReviewType[],
    another_product_description?: string;
    additional_information?: string | [];
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationType<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}


export interface AuthType {
    user: {
        id: number;
        name: string;
        email: string;
    }[] | null;
}


export interface TeamType {
    id: number;
    name: string;
    image: string;
    designation: string;
    facebook_url: string;
    instagram_url: string;
    image_url: string;

}

export interface PortfolioType {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    thumbnail_url: string;
    description: string;
    project_url: string;
    slug: string;

}
export interface CartType {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    product: ProductType;
    total_price: number
}

export interface UserType {
    id: number;
    name: string;
    email: string;
    created_at: string;
    is_active: boolean;
}
export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}


