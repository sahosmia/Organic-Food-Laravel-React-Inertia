import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CategoryType, Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';

const columns: Column<CategoryType>[] = [
    {
        header: 'Image',
        accessor: (item) => (
            item.image_url ? (
                <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover w-12 h-12 rounded-md"
                />
            ) : (
                <span className="text-gray-500">No Image</span>
            )
        ),
        className: 'w-1/12',
    },
    { header: 'Title', accessor: 'title', className: 'w-3/12' },
    { header: 'Description', accessor: 'description', className: 'w-1/12' },
    { header: 'Created At', accessor: (item) => new Date(item.created_at).toLocaleDateString(), className: 'w-2/12' },

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
                        <Link href={route('admin.product_m.categories.show', item.slug)} className="flex items-center w-full gap-2">
                            <FileText className="w-4 h-4 mr-2" /> View
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={route('admin.product_m.categories.edit', item.slug)} className="flex items-center w-full gap-2">
                            <SquarePen className="w-4 h-4 mr-2" /> Edit
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleDelete(item.slug, 'admin.product_m.categories.destroy')}>
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
