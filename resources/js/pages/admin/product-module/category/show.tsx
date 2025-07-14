import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { CategoryType } from '@/types';
import { handleDelete } from '@/utils/table';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CalendarDays, Edit, FileImage, Trash2 } from 'lucide-react';

export default ({ category }: { category: CategoryType }) => {
    console.log(category);

    return (
        <AppLayout>
            <Head title={`Category Details: ${category.title}`} />
            <div className="container p-4 mx-auto md:p-6 lg:p-8">
                <Heading title="Category Details" description="Comprehensive view of category information." />

                <Card className="mb-6 overflow-hidden rounded-lg shadow-lg">
                    <CardHeader className="p-6 pb-4 text-white bg-gradient-to-r from-main to-main/80">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-3xl font-extrabold tracking-tight">{category.title}</CardTitle>
                            <div className="flex space-x-3">
                                <Link href={route('admin.product_m.categories.edit', category.slug)}>
                                    <Button variant="outline" className="flex items-center gap-1 bg-white text-main hover:bg-gray-100">
                                        <Edit className="w-4 h-4" /> Edit
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => handleDelete(category.slug, 'admin.product_m.categories.destroy')}
                                    variant="destructive"
                                    type="button"
                                    className="flex items-center gap-1"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </Button>
                            </div>
                        </div>
                        <CardDescription className="mt-1 text-gray-200">
                            A detailed overview of the category: <span className="font-medium text-white">{category.title}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                        {/* Category Image */}
                        <div className="flex items-center justify-center col-span-1 p-4 rounded-md bg-gray-50 md:col-span-2">
                            {category.image_url ? (
                                <img
                                    src={category.image_url}
                                    alt={category.title}
                                    className="object-cover h-auto max-w-full border border-gray-200 rounded-lg shadow-md md:max-w-md"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full h-48 text-gray-400 bg-gray-100 rounded-lg">
                                    <FileImage className="w-16 h-16 mb-2" />
                                    <p className="text-lg font-medium">No Image Available</p>
                                </div>
                            )}
                        </div>

                        <Separator className="col-span-1 md:col-span-2" />

                        {/* Category Details */}
                        <div className="space-y-4">
                            <div>
                                <p className="mb-1 text-sm font-semibold text-gray-600">Title:</p>
                                <p className="text-lg font-bold text-gray-900">{category.title}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-semibold text-gray-600">Slug:</p>
                                <Badge variant="secondary" className="px-3 py-1 text-base text-blue-700 bg-blue-100">
                                    {category.slug}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="mb-1 text-sm font-semibold text-gray-600">Description:</p>
                                <p className="text-base leading-relaxed text-gray-800">
                                    {category.description || 'No detailed description provided for this category.'}
                                </p>
                            </div>
                        </div>

                        <Separator className="col-span-1 md:col-span-2" />

                        {/* Timestamps */}
                        <div className="grid grid-cols-1 gap-4 space-y-4 md:col-span-2 md:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="w-6 h-6 text-gray-500" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Created At:</p>
                                    <p className="text-base text-gray-800">{new Date(category.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <CalendarDays className="w-6 h-6 text-gray-500" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Last Updated:</p>
                                    <p className="text-base text-gray-800">{new Date(category.updated_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end p-6 pt-6 border-t border-gray-200 bg-gray-50">
                        <Link href={route('admin.product_m.categories.index')}>
                            <Button variant="secondary" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" /> Back to Categories
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
};
