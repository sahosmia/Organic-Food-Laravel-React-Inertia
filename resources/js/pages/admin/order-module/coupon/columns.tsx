

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CouponType, Column } from '@/types'; // Import CouponType and Column
import { handleDelete, handleToggleStatus } from '@/utils/table'; // Assuming you have this utility
import { Link } from '@inertiajs/react';
import { CheckCircle, FileText, MoreHorizontal, SquarePen, Trash2, XCircle } from 'lucide-react';

const columns: Column<CouponType>[] = [
    {
        header: 'Code',
        accessor: 'code', // Direct accessor for the code
        className: 'w-2/12',
    },
    {
        header: 'Type',
        accessor: 'type',
        className: 'w-1/12',
    },
    {
        header: 'Value',
        // Custom cell rendering based on coupon type
        accessor: (item) => {
            if (item.type === 'percentage') {
                return `${item.value}%`;
            } else if (item.type === 'fixed_amount') {
                return `$${item.value}`;
            } else if (item.type === 'free_shipping') {
                return 'Free Shipping';
            }
            return 'N/A';
        },
        className: 'w-1/12',
    },
    {
        header: 'Min. Amount',
        accessor: (item) => {
            const minAmount = parseFloat(item.min_amount?.toString() || '0');
            return minAmount > 0 ? `$${minAmount.toFixed(2)}` : 'None';
        },
        className: 'w-1/12',
    },
    {
        header: 'Usage',
        accessor: (item) => {
            if (item.max_uses !== null) {
                return `${item.uses} / ${item.max_uses}`;
            }
            return 'Unlimited';
        },

        className: 'w-1/12',
    },
    {
        header: 'Starts At',
        accessor: (item) => {
            return item.starts_at ? new Date(item.starts_at).toLocaleDateString() : 'Immediate';
        },
        className: 'w-1/12',
    },
    {
        header: 'Expires At',
        accessor: (item) => {
            return item.expires_at ? new Date(item.expires_at).toLocaleDateString() : 'Never';
        },
        className: 'w-1/12',
    },
    {
        header: 'Description',
        accessor: 'description',
        className: 'w-2/12',
    },
    {
        header: 'Status',
        accessor: (item) => (item.is_active ? 'Active' : 'Inactive'),
        className: 'w-1/12',
    },
    {
        header: 'Actions',
        accessor: (item) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href={route('admin.order_m.coupons.show', item.id)} className="flex items-center w-full gap-2">
                            <FileText className="w-4 h-4 mr-2" /> View
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={route('admin.order_m.coupons.edit', item.id)} className="flex items-center w-full gap-2">
                            <SquarePen className="w-4 h-4 mr-2" /> Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(item.id, item.is_active, 'admin.order_m.coupons.toggleStatus')}>
                        {item.is_active ? (
                            <>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" /> Deactivate
                            </>
                        ) : (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Activate
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item.id, 'admin.order_m.coupons.destroy')}>
                        <Trash2 className="w-4 h-4 mr-2 text-red-700" />
                        <span className="text-red-700">Delete </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        className: 'w-1/12',
    },
];

export { columns };
