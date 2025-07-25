import AppLayout from '@/layouts/app-layout';
import { CategoryType, PaginationType } from '@/types';
import { Head } from '@inertiajs/react';

import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';

export default ({ categories }: { categories: PaginationType<CategoryType> }) => {
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
            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading title="Category List" description="Manage your product categories here." />
                <CommonTable data={categories} columns={columns} create_route="admin.product_m.categories.create" routeName="admin.product_m.categories.index" />
            </div>
        </AppLayout>
    );
};
