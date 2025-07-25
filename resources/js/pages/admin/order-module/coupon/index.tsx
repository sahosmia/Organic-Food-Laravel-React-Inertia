import AppLayout from '@/layouts/app-layout';
import { CouponType, PaginationType } from '@/types'; // Assuming CouponType is defined in your types file
import { Head } from '@inertiajs/react';

import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';

export default ({ coupons }: { coupons: PaginationType<CouponType> }) => {
    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Order Management',
            href: '',
        },
        {
            title: 'Coupons',
            href: '/admin/order-module/coupons',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coupon List" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="Coupon List" description="Manage your discount coupons here." />
                <CommonTable
                    data={coupons}
                    columns={columns}
                    create_route="admin.order_m.coupons.create"
                    routeName="admin.order_m.coupons.index"
                />
            </div>
        </AppLayout>
    );
};
