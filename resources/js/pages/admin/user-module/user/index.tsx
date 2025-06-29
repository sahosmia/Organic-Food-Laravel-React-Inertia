import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationType, UserType } from '@/types';
import { FileText, MoreHorizontal, ShieldBan, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
export default ({ users, filters }: { users: PaginationType<UserType>, filters: }) => {
    // add  state for pagination per page
    const [perPage, setPerPage] = useState(users.per_page ? String(users.per_page) : '2');
    // search
    const [search, setSearch] = useState('');
    const perPageOptions = ['2', '3', '4', '5', '6'];

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'User Management',
            href: '',
        },
        {
            title: 'Users',
            href: '/admin/user-module/users',
        },
    ];

    console.log('Users:', users);

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(
                url + `&per_page=` + perPage,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        router.get(
            route('admin.user_m.users.index'),
            {
                search: e.target.value,
                per_page: perPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handlePerPageChange = (value: string) => {
        setPerPage(value);
        router.get(
            route('admin.user_m.users.index'),
            {

                per_page: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-semibold">User List</h1>
                <p className="text-muted-foreground">This is the user list page.</p>


                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Button variant="default" size="sm" asChild>
                            <Link href={route('admin.user_m.users.create')}>Create User</Link>
                        </Button>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={handleSearchChange}
                            className="h-8 w-64 rounded-md border px-2 text-sm"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Total Users: {users.total}</span>
                        <span className="text-sm text-muted-foreground">Current Page: {users.current_page}</span>
                    </div>


                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/12">No</TableHead>
                                <TableHead className="w-3/12">Name</TableHead>
                                <TableHead className="w-4/12">Email</TableHead>
                                <TableHead className="w-2/12">Created At</TableHead>
                                <TableHead className="w-2/12">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user, i) => (
                                <TableRow key={user.id}>
                                    <TableCell>{users.from + i}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        {/* Actions can be added here */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">

                                                <DropdownMenuItem>
                                                    <Link href={route('admin.user_m.users.show', `${user.id}`)} className="flex items-center gap-2">
                                                        {' '}
                                                        <FileText /> View User
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <SquarePen /> Edit User
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <ShieldBan /> Active User
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {' '}
                                                    <Trash2 className="text-red-700 hover:text-red-500" />{' '}
                                                    <span className="text-red-700 hover:text-red-500"> Delete User</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>{' '}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="mx-4 flex items-center justify-end space-x-12 py-4">

                    <div className='flex items-center space-x-2'>
                        <span className="text-sm text-muted-foreground">Show:</span>
                        <Select defaultValue={perPage} onValueChange={handlePerPageChange}>
                            <SelectTrigger className="w-16">
                                <SelectValue placeholder="Select a item" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {perPageOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* pagination  */}
                    <div className="flex space-x-1 items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(users.first_page_url)}
                            disabled={users.current_page === 1 || !users.first_page_url}
                        >
                            First
                        </Button>
                        {users.links.map((link, index) =>
                            link.url ? (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handlePageChange(link.url)}
                                    disabled={link.active}
                                >
                                    {link.label.replace(/&laquo; | &raquo;/g, '').trim()}
                                </Button>
                            ) : (
                                <span key={index} className="px-2 py-1 text-sm text-gray-500">
                                    {link.label.replace(/&laquo; | &raquo;/g, '').trim()}
                                </span>
                            ),
                        )}
                        <Button
                            variant={users.last_page_url ? 'outline' : 'default'}
                            size="sm"
                            onClick={() => handlePageChange(users.last_page_url)}
                            disabled={!users.last_page_url || users.current_page === users.last_page}
                        >
                            Last
                        </Button>
                    </div>

                    {/* Page info */}
                    <div>
                        <span className="ml-4 text-sm text-muted-foreground">
                            Page {users.current_page} of {users.last_page}
                        </span>
                    </div>
                </div>

                {/* <DataTable columns={columns} data={users.data} paginateLinks={users.links} /> */}
            </div>
        </AppLayout>
    );
};
