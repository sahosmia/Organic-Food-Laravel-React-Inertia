import Heading from '@/components/heading';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { UserType } from '@/types';
import { handleDelete } from '@/utils/table';
import { Head, Link } from '@inertiajs/react';

export default ({ user }: { user: UserType }) => {


    return (
        <AppLayout>
            <Head title="User Details" />
            <div className="container mx-auto p-4">
                <Heading title="User Details" description="View and manage user information." />

                <Card className="mb-4 rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">User Information</h2>
                        <div className="flex space-x-2">
                            <Link href={route('admin.user_m.users.edit', user.id)} className="rounded bg-main px-4 py-2 text-white hover:bg-main/90" >Edit User</Link>
                            <button onClick={() => handleDelete(user.id, 'admin.user_m.user.destroy')} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" type='button'>Delete User</button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <strong>Name:</strong> {user.name}
                    </div>
                    <div className="mb-4">
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className="mb-4">
                        <strong>Created At:</strong> {new Date(user.created_at).toLocaleDateString()}
                    </div>
                    <div className="mb-4">
                        <strong>
                            Status:
                            {user.is_active ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                    Active
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                                    Inactive
                                </span>
                            )}
                        </strong>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
};
