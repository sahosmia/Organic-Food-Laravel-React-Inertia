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
}
