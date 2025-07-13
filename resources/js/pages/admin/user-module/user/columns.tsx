
import { Column, UserType } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, SquarePen, XCircle, CheckCircle, Trash2 } from "lucide-react";
import { handleDelete, handleToggleStatus } from "@/utils/table";
import { Link } from "@inertiajs/react";

const columns: Column<UserType>[] = [
    { header: 'Name', accessor: 'name', className: "w-3/12" },
    { header: 'Email', accessor: 'email', className: "w-4/12" },
    { header: 'Created At', accessor: (item) => new Date(item.created_at).toLocaleDateString(), className: "w-2/12" },
    {
        header: 'Status', accessor: (item) => (
            item.is_active ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Active</span>
            ) : (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">Inactive</span>
            )
        ), className: "w-2/12"
    },
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
                        <Link href={route('admin.user_m.users.show', item.id)} className="flex items-center gap-2 w-full">
                            <FileText className="mr-2 h-4 w-4" /> View User
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={route('admin.user_m.users.edit', item.id)} className="flex items-center gap-2 w-full">
                            <SquarePen className="mr-2 h-4 w-4" /> Edit User
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(item.id, item.is_active, 'admin.user_m.users.toggleStatus')}>
                        {item.is_active ? (
                            <>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" /> Deactivate User
                            </>
                        ) : (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Activate User
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item.id, 'admin.user_m.users.destroy')}>
                        <Trash2 className="mr-2 h-4 w-4 text-red-700" />
                        <span className="text-red-700">Delete User</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ), className: "w-2/12"
    },
];
export { columns };
