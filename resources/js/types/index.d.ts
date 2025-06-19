import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
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
    [key: string]: unknown; // This allows for additional properties...
}


// Product::create([
//     'name' => 'Air Conditioner',
//     'slug' => 'air-conditioner',
//     'description' => 'Energy-efficient air conditioner with smart features.',
//     'price' => 799.99,
//     'discount_type' => null,
//     'discount_value' => null,
//     'category_id' => 2, // Assuming category ID 2 exists
//     'image' => 'images/products/air_conditioner.jpg',
//     'is_active' => true,
// ]);
export interface CategoryType {
    id: number;
    title: string;
    slug: string;
    description?: string;
    image_url: string;
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
    another_product_description?: string; // Optional additional description
    additional_information?: string | []; // Optional additional information
}

export interface PaginationLink {
    url: string | null; // Can be null for prev/next when on first/last page
    label: string;      // Page number, 'Next &raquo;', '&laquo; Previous'
    active: boolean;    // True if it's the current page
}

export interface PaginationType<T> {
    current_page: number;
    data: T[]; // This is the array of your actual data (e.g., ProductType[])
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[]; // Array of pagination links
    next_page_url: string | null; // Can be null if on the last page
    path: string;
    per_page: number;
    prev_page_url: string | null; // Can be null if on the first page
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


   