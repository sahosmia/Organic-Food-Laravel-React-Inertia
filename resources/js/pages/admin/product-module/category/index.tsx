import AppLayout from '@/layouts/app-layout';
import { CategoryType, PaginationType, } from '@/types';
import { Head } from '@inertiajs/react';

import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/heading';
import { useTableFilters } from '@/hooks/useTableFilters';
import { useEffect } from 'react';
import { columns } from './columns';

export default ({ categories }: { categories: PaginationType<CategoryType> }) => {
    // const {
    //     perPage,
    //     search,
    //     perPageOptions,
    //     selectedItems,
    //     setSelectedItems,
    //     handleSearchChange,
    //     handlePageChange,
    //     handlePerPageChange,
    //     handleSelectAllItems,
    //     handleSelectItem,
    // } = useTableFilters({
    //     data: categories,
    //     routeName: 'admin.product_m.categories.index',
    // });

    // useEffect(() => {
    //     setSelectedItems([]);
    // }, [categories.data, setSelectedItems]);

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Product Management',
            href: '',
        },
        {
            title: 'Categories',
            href: '/admin/product-module/categories',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category List" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="User List" description="Manage your users here." />
                <CommonTable
                    // perPage={perPage}
                    // perPageOptions={perPageOptions}
                    // handlePerPageChange={handlePerPageChange}
                    // handlePageChange={handlePageChange}
                    data={categories}
                    columns={columns}
                    // selectedItems={selectedItems}
                    // handleSelectAllItems={handleSelectAllItems}
                    // handleSelectItem={handleSelectItem}
                    // search={search}
                    // handleSearchChange={handleSearchChange}
                    create_route="admin.product_m.categories.create"
                />
            </div>
        </AppLayout>
    );
};
