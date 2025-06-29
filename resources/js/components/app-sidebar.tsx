import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItem, type NavItemWithSubmenu } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Package, PersonStanding, ShieldCheck, User, UserPlus, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItemWithSubmenu[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Test 1',
        href: '/admin/products',
        icon: Package,
    },
    {
        title: 'User Management',
        href: '/admin/product2',
        icon: User,
        submenu: [
            {
                title: "Users",
                href: "/admin/user-module/users",
                icon: Users

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

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
