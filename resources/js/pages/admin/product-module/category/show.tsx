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
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <Heading title="Category Details" description="Comprehensive view of category information." />

                <Card className='mb-6 rounded-lg shadow-lg overflow-hidden'>
                    <CardHeader className="bg-gradient-to-r from-main to-main/80 text-white p-6 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-3xl font-extrabold tracking-tight">{category.title}</CardTitle>
                            <div className="flex space-x-3">
                                <Link href={route('admin.product_m.categories.edit', category.slug)}>
                                    <Button variant="outline" className="bg-white text-main hover:bg-gray-100 flex items-center gap-1">
                                        <Edit className="h-4 w-4" /> Edit
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => handleDelete(category.slug, 'admin.product_m.categories.destroy')}
                                    variant="destructive"
                                    type='button'
                                    className="flex items-center gap-1"
                                >
                                    <Trash2 className="h-4 w-4" /> Delete
                                </Button>
                            </div>
                        </div>
                        <CardDescription className="text-gray-200 mt-1">
                            A detailed overview of the category: <span className="font-medium text-white">{category.title}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category Image */}
                        <div className="col-span-1 md:col-span-2 flex justify-center items-center p-4 bg-gray-50 rounded-md">
                            {category.image_url ? (
                                <img
                                    src={category.image_url}
                                    alt={category.title}
                                    className="max-w-full md:max-w-md h-auto rounded-lg shadow-md border border-gray-200 object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 w-full bg-gray-100 rounded-lg text-gray-400">
                                    <FileImage className="h-16 w-16 mb-2" />
                                    <p className="text-lg font-medium">No Image Available</p>
                                </div>
                            )}
                        </div>

                        <Separator className="col-span-1 md:col-span-2" />

                        {/* Category Details */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 mb-1">Title:</p>
                                <p className="text-lg font-bold text-gray-900">{category.title}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 mb-1">Slug:</p>
                                <Badge variant="secondary" className="text-base px-3 py-1 bg-blue-100 text-blue-700">
                                    {category.slug}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 mb-1">Description:</p>
                                <p className="text-base text-gray-800 leading-relaxed">
                                    {category.description || 'No detailed description provided for this category.'}
                                </p>
                            </div>
                        </div>

                        <Separator className="col-span-1 md:col-span-2" />

                        {/* Timestamps */}
                        <div className="space-y-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-6 w-6 text-gray-500" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Created At:</p>
                                    <p className="text-base text-gray-800">{new Date(category.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-6 w-6 text-gray-500" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Last Updated:</p>
                                    <p className="text-base text-gray-800">{new Date(category.updated_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-6 border-t border-gray-200 bg-gray-50 p-6 flex justify-end">
                        <Link href={route('admin.product_m.categories.index')}>
                            <Button variant="secondary" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back to Categories
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
};
