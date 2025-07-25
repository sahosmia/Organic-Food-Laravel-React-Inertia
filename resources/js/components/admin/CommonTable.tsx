import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTableFilters } from '@/hooks/useTableFilters';
import { PaginationType } from '@/types';
import { Link } from '@inertiajs/react';
import React, { ReactNode, useEffect } from 'react';
import { Input } from '@/components/ui/input'

interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface CommonTableProps<T> {
    data: PaginationType<T>;
    columns: Column<T>[];
    create_route: string;
    routeName: string;
}

const CommonTable = <T extends { id: number }>({
    data,
    columns,
    create_route,
    routeName
}: CommonTableProps<T>) => {

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
    } = useTableFilters({
        data: data,
        routeName: routeName,
    });

    useEffect(() => {
        setSelectedItems([]);
    }, [data.data, setSelectedItems]);


    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Button variant="default" size="sm" asChild>
                        <Link href={route(create_route)}>Add New Data</Link>
                    </Button>
                    <Input
                        type="text"
                        placeholder="Search items..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-64 h-8 px-2 text-sm border rounded-md"
                    />
                    <span className="text-sm text-muted-foreground">Total Items: {data.total}</span>
                </div>
                <div className="flex items-center space-x-2">
                </div>


            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[10px]">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === data.data.length && data.data.length > 0}
                                    onChange={handleSelectAllItems}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                            </TableHead>
                            <TableHead className="w-[10px]">No</TableHead>
                            {columns.map((column, index) => (
                                <TableHead key={index} className={column.className}>
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No data found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.data.map((item, i) => (
                                <TableRow key={item.id}>
                                    <TableCell className="w-[10px]">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.length === data.data.length && data.data.length > 0}
                                            onChange={handleSelectAllItems}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </TableCell>
                                    <TableCell className='w-[10px]'>{data.from + i}</TableCell>

                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {typeof column.accessor === 'function'
                                                ? column.accessor(item)
                                                : (item[column.accessor as keyof T] as ReactNode)
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t">
                <div>
                    <div className="mx-4 mb-4 text-sm text-muted-foreground">Selected Items: {selectedItems.length}</div>
                </div>
                <div className="flex items-center justify-end py-4 mx-4 space-x-10">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Show:</span>
                        <Select value={perPage} onValueChange={handlePerPageChange}>
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

                    {/* Pagination */}
                    <div className="flex items-center space-x-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(data.first_page_url)}
                            disabled={data.current_page === 1 || !data.first_page_url}
                        >
                            First
                        </Button>
                        {data.links.map((link, index) =>
                            link.url ? (
                                <Button
                                    key={index}
                                    size="sm"
                                    onClick={() => handlePageChange(link.url)}
                                    className={link.active
                                        ? 'text-white bg-main px-3 py-1 text-sm rounded-md cursor-default'
                                        : 'text-secondary-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1 text-sm rounded-md' // Inactive state
                                    }
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
                            variant='outline'
                            size="sm"
                            onClick={() => handlePageChange(data.last_page_url)}
                            disabled={!data.last_page_url || data.current_page === data.last_page}
                        >
                            Last
                        </Button>


                    </div>

                    {/* Page info */}
                    <div>
                        <span className="ml-4 text-sm text-muted-foreground">
                            Page {data.current_page} of {data.last_page}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonTable;
