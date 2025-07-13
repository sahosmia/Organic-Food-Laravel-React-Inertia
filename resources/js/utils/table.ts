import { router } from "@inertiajs/react";

const handleDelete = (id: number | string, url: string, index_url?: string) => {
    router.delete(
        route(url, id),
        {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // toast({
                //     title: "Success!",
                //     description: "Item deleted successfully.",
                //     className: "bg-green-500 text-white",
                // });
                // Optionally, you can redirect or update the UI after deletion
                // Go index page or refresh the current page
                console.log('Item deleted successfully:', id);

                if (index_url) {
                    router.get(route(index_url));
                }
            },
            onError: (errors) => {
                console.error('Error deleting item:', errors);
                // toast({
                //     title: "Error!",
                //     description: "Failed to delete item. Please try again.",
                //     variant: "destructive",
                // });
            }
        }
    );
};


const handleBulkDelete = (ids: number[], bulkDestroyRouteName: string, callback?: () => void) => {
    router.delete(
        route(bulkDestroyRouteName, { ids: ids.join(',') }),
        {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // toast({
                //     title: "Success!",
                //     description: "Selected items deleted successfully!",
                //     className: "bg-green-500 text-white",
                // });
                if (callback) {
                    callback();
                }
            },
            onError: (errors) => {
                console.error('Error deleting items:', errors);
                // toast({
                //     title: "Error!",
                //     description: "Failed to delete items. Please try again.",
                //     variant: "destructive",
                // });
            }
        },
    );
};

const handleToggleStatus = (id: number, newStatus: boolean, url: string) => {
    router.put(
        route(url, id),
        { is_active: newStatus },
        {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // toast({
                //     title: "Success!",
                //     description: `User ${newStatus ? 'activated' : 'deactivated'} successfully!`,
                //     className: "bg-green-500 text-white",
                // });
            },
            onError: (errors) => {
                console.error('Error toggling item status:', errors);
                // toast({
                //     title: "Error!",
                //     description: "Failed to update user status. Please try again.",
                //     variant: "destructive",
                // });
            }
        }
    );
}




export { handleBulkDelete, handleDelete, handleToggleStatus };
