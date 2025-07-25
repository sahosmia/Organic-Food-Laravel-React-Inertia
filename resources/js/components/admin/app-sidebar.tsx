import { NavMain } from '@/components/admin/nav-main';
import { NavUser } from '@/components/admin/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItemWithSubmenu } from '@/types';
import { Link } from '@inertiajs/react';
import { Building2, CheckCircle, DollarSign, FolderDot, Gift, Hourglass, Key, LayoutGrid, ListChecks, ListOrdered, Package, PersonStanding, ShieldCheck, SquareCode, Star, Tag, User, Users, Warehouse, XCircle } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItemWithSubmenu[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
        isActive: true
    },
    {
        title: 'Product Management',
        href: '',
        icon: Package,
        submenu: [
            {
                title: "Products",
                href: "/admin/product-module/products",
                icon: Package
            },
            {
                title: "Categories",
                href: "/admin/product-module/categories",
                icon: FolderDot
            },
            // {
            //     title: "Brands",
            //     href: "/admin/product-module/brands",
            //     icon: Building2
            // },

            // {
            //     title: "Reviews",
            //     href: "/admin/product-module/reviews",
            //     icon: Star
            // },
            // {
            //     title: "Stock/Inventory",
            //     href: "/admin/product-module/inventory",
            //     icon: Warehouse
            // }
        ]
    },
    {
        title: 'User Management',
        href: '',
        icon: User,
        submenu: [
            {
                title: "Users",
                href: "/admin/user-module/users",
                icon: Users,
            },
            // {
            //     title: "Roles",
            //     href: "/admin/user-module/roles",
            //     icon: ShieldCheck
            // },
            // {
            //     title: "Permissions",
            //     href: "/admin/user-module/permissions",
            //     icon: Key
            // }
        ]
    },

    {
        title: 'Order Management',
        href: '',
        icon: ListOrdered,
        submenu: [
            // {
            //     title: "Order List",
            //     href: "/admin/order-module/orders",
            //     icon: ListChecks
            // },
            // {
            //     title: "Pending Orders",
            //     href: "/admin/order-module/pending-orders",
            //     icon: Hourglass
            // },
            // {
            //     title: "Completed Orders",
            //     href: "/admin/order-module/completed-orders",
            //     icon: CheckCircle
            // },
            // {
            //     title: "Cancelled Orders",
            //     href: "/admin/order-module/cancelled-orders",
            //     icon: XCircle
            // },
            {
                title: "Coupon Code",
                href: "/admin/order-module/coupons",
                icon: Gift
            },
            // {
            //     title: "Refund Requests",
            //     href: "/admin/order-module/refunds",
            //     icon: DollarSign
            // }
        ]
    }
];



export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
