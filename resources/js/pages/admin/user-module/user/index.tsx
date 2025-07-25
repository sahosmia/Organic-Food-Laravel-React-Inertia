import AppLayout from '@/layouts/app-layout';
import { PaginationType, UserType } from '@/types';
import { Head } from '@inertiajs/react';

import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { useTableFilters } from '@/hooks/useTableFilters';
import { useEffect } from 'react';
import { columns } from './columns';

export default ({ users }: { users: PaginationType<UserType> }) => {
    const {
        perPage,
        search,
        perPageOptions,
        selectedItems,
        setSelectedItems,
        handleSearchChange,
        handlePageChange,
        handlePerPageChange,
        handleSelectAllItems,
        handleSelectItem,
    } = useTableFilters({
        data: users,
        routeName: 'admin.user_m.users.index',
    });

    useEffect(() => {
        setSelectedItems([]);
    }, [users.data, setSelectedItems]);

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="User List" description="Manage your users here." />
                <CommonTable
                    perPage={perPage}
                    perPageOptions={perPageOptions}
                    handlePerPageChange={handlePerPageChange}
                    handlePageChange={handlePageChange}
                    data={users}
                    columns={columns}
                    selectedItems={selectedItems}
                    handleSelectAllItems={handleSelectAllItems}
                    handleSelectItem={handleSelectItem}
                    search={search}
                    handleSearchChange={handleSearchChange}
                    create_route="admin.user_m.users.create"
                />
            </div>
        </AppLayout>
    );
};
