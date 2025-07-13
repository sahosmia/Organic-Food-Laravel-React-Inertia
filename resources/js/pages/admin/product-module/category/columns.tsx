
import { CategoryType, Column } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, SquarePen, Trash2 } from "lucide-react";
import { handleDelete } from "@/utils/table";
import { Link } from "@inertiajs/react";

const columns: Column<CategoryType>[] = [
    { header: 'Title', accessor: 'title', className: "w-3/12" },
    { header: 'Slug', accessor: 'slug', className: "w-4/12" },
    { header: 'Created At', accessor: (item) => new Date(item.created_at).toLocaleDateString(), className: "w-2/12" },

    {
        header: 'Actions', accessor: (item) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href={route('admin.product_m.categories.show', item.slug)} className="flex items-center gap-2 w-full">
                            <FileText className="mr-2 h-4 w-4" /> View Category
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={route('admin.product_m.categories.edit', item.slug)} className="flex items-center gap-2 w-full">
                            <SquarePen className="mr-2 h-4 w-4" /> Edit Category
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleDelete(item.slug, 'admin.product_m.categories.destroy')}>
                        <Trash2 className="mr-2 h-4 w-4 text-red-700" />
                        <span className="text-red-700">Delete Category</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ), className: "w-2/12"
    },
];
export { columns };
