import { useState, useEffect, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { PaginationType } from '@/types';

interface UseTableFiltersProps<T> {
    data: PaginationType<T>,
    routeName: string;
}

export const useTableFilters = <T extends { id: number }>({ data, routeName }: UseTableFiltersProps<T>) => {
    const [perPage, setPerPage] = useState(data.per_page ? String(data.per_page) : '10');
    const [search, setSearch] = useState("");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const perPageOptions = ['5', '10', '20', '50'];

    const applyFilters = useCallback((newFilters: { search?: string; per_page?: string; page?: number }) => {
        router.get(
            route(routeName),
            {
                search: newFilters.search !== undefined ? newFilters.search : search,
                per_page: newFilters.per_page !== undefined ? newFilters.per_page : perPage,
                page: newFilters.page,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }, [perPage, search, routeName]);


    useEffect(() => {

        const timeout = setTimeout(() => {
            applyFilters({ search });
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, applyFilters]);





    const handlePageChange = (url: string | null) => {
        if (url) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const page = urlParams.get('page');
            applyFilters({ page: page ? parseInt(page) : undefined });
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        applyFilters({ search: e.target.value });
    };

    const handlePerPageChange = (value: string) => {
        setPerPage(value);
        applyFilters({ per_page: value, page: 1 });
    };

    const handleSelectItem = (userId: number) => {
        setSelectedItems((prevSelected) => (prevSelected.includes(userId) ? prevSelected.filter((id) => id !== userId) : [...prevSelected, userId]));
    };

    const handleSelectAllItems = () => {
        if (selectedItems.length === data.data.length && data.data.length > 0) {
            setSelectedItems([]);
        } else {
            setSelectedItems(data.data.map((item) => item.id));
        }
    };



    return {
        perPage,
        setPerPage,
        perPageOptions,
        search,
        setSearch,
        applyFilters,
        selectedItems,
        setSelectedItems,
        handlePageChange,
        handleSearchChange,
        handlePerPageChange,
        handleSelectItem,
        handleSelectAllItems,
    };
};
