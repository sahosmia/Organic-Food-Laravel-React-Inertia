import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserType } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FileText, MoreHorizontal, ShieldBan, SquarePen, Trash2 } from 'lucide-react';


export const columns: ColumnDef<UserType>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem> */}
                        <DropdownMenuItem>
                            <Link href={route('admin.user_m.users.show', `${row.original.id}`)} className="flex items-center gap-2"> <FileText /> View User</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem><SquarePen /> Edit User</DropdownMenuItem>
                        <DropdownMenuItem><ShieldBan /> Active User</DropdownMenuItem>
                        <DropdownMenuItem >  <Trash2 className='text-red-700 hover:text-red-500' /> <span className='text-red-700 hover:text-red-500'> Delete User</span></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

];




