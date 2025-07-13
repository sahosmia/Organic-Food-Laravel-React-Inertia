import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItemWithSubmenu } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Package, PersonStanding, ShieldCheck, User, Users } from 'lucide-react';
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
        href: '/admin/products',
        icon: Package,
        // icon will change depend on Item
        submenu: [
            {
                title: "Products",
                href: "/admin/product-module/products",
                icon: Package

            },
            {
                title: "Categories",
                href: "/admin/product-module/categories",
                icon: Package

            },
            {
                title: "Brands",
                href: "/admin/product-module/brands",
                icon: Package

            },

        ]


    },
    {
        title: 'User Management',
        href: '/admin/product2',
        icon: User,
        submenu: [
            {
                title: "Users",
                href: "/admin/user-module/users",
                icon: Users,

            },
            {
                title: "Roles",
                href: "/admin/user-module/users",
                icon: ShieldCheck


            },
            {
                title: "Permissions",
                href: "/admin/user-module/users",
                icon: PersonStanding

            }
        ]
    },
    {
        title: 'Test 2',
        href: '/admin/product2',
        icon: Package,
        submenu: [
            {
                title: "test 21",
                href: "/admin/product3",
                icon: Package

            }
        ]
    },
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
