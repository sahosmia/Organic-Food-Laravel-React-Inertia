import Heading from '@/components/admin/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { CategoryType } from '@/types';
import { CategoryFormData } from '@/types/form';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

const CategoryEdit = ({ category }: { category: CategoryType }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<CategoryFormData>>({
        title: category.title || '',
        description: category.description ?? '',
        image: null,
        _method: 'PUT',
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('image', e.target.files?.[0] || null);
    };



    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('admin.product_m.categories.update', { category: category.slug }), {
            preserveScroll: true,
            forceFormData: true,
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout>
            <div className="container p-4 mx-auto">
                <Heading title="Category Edit" description="Modify the category details below." />
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            onChange={handleOnChange}
                            value={data.title}
                            placeholder="Enter your category title"
                        />
                        <InputError message={errors.title} />
                    </div>
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            onChange={handleOnChange}
                            value={data.description}
                            placeholder="Enter your category description"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <InputError message={errors.image} />
                    </div>

                    <Button type="submit" disabled={processing} className="mt-4">
                        {processing ? 'Updating...' : 'Update Category'}
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">Saved</p>
                    </Transition>
                </form>
            </div>
        </AppLayout>
    );
};

export default CategoryEdit;
