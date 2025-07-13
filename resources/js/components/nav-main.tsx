import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { NavItemWithSubmenu } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItemWithSubmenu[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    item.submenu && item.submenu.length > 0 ? (
                        <Collapsible
                            defaultOpen={item.submenu.some(subitem => subitem.href && page.url.startsWith(subitem.href))}
                            className="group/collapsible"
                            key={item.title}

                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        isActive={
                                            (item.href && page.url === item.href) ||
                                            (item.submenu && item.submenu.some(subitem => subitem.href && page.url.startsWith(subitem.href)))
                                        }
                                        tooltip={{ children: item.title }}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-[[data-state=open]]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>

                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.submenu.map((subitem) => (
                                        <SidebarMenuSubItem key={subitem.title}>
                                            <SidebarMenuSubButton asChild isActive={!!subitem.href && page.url.startsWith(subitem.href)}>
                                                {subitem.href && (
                                                    <Link href={subitem.href} prefetch>
                                                        {subitem.icon && <subitem.icon />}
                                                        <span>{subitem.title}</span>
                                                    </Link>
                                                )}
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            {item.href ? (
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.url === item.href}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            ) : (

                                <SidebarMenuButton
                                    isActive={page.url === item.href}
                                    tooltip={{ children: item.title }}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    )
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}


