import { router } from "@inertiajs/react";

interface UseResourceActionsResult {
    handleDelete: (id: number, url: string) => void;
    handleBulkDelete: (ids: number[], bulkDestroyRouteName: string, callback?: () => void) => void;
    handleToggleStatus: (id: number, currentStatus: boolean, url: string) => void;
}

export const useResourceActions = (): UseResourceActionsResult => {

    const handleDelete = (id: number, url: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            router.delete(
                route(url, id),
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        alert('Item deleted successfully!');
                    },
                    onError: (errors) => {
                        console.error('Error deleting item:', errors);
                        alert('Failed to delete item. Please try again.');
                    }
                }
            );
        }
    };

    const handleBulkDelete = (ids: number[], bulkDestroyRouteName: string, callback?: () => void) => {
        if (ids.length === 0) {
            alert('Please select at least one item to delete.');
            return;
        }

        if (confirm(`Are you sure you want to delete ${ids.length} selected items?`)) {
            router.delete(
                route(bulkDestroyRouteName, { ids: ids.join(',') }),
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        alert('Selected items deleted successfully!');
                        if (callback) {
                            callback();
                        }
                    },
                    onError: (errors) => {
                        console.error('Error deleting items:', errors);
                        alert('Failed to delete items. Please try again.');
                    }
                },
            );
        }
    };

    const handleToggleStatus = (id: number, currentStatus: boolean, url: string) => {
        const newStatus = !currentStatus;
        if (confirm(`Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} this user?`)) {
            router.put(
                route(url, id), // Create a new route for this
                { is_active: newStatus },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        alert(`User ${newStatus ? 'activated' : 'deactivated'} successfully!`);
                    },
                    onError: (errors) => {
                        console.error('Error toggling user status:', errors);
                        alert('Failed to update user status. Please try again.');
                    }
                }
            );
        }
    };

    return { handleToggleStatus, handleDelete, handleBulkDelete };
}
