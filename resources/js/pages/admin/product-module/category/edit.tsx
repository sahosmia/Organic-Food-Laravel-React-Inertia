import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { CategoryType } from '@/types';
import { CategoryFormData } from '@/types/form';
import { useForm } from '@inertiajs/react';
import React from 'react';

const CategoryEdit = ({ category }: { category: CategoryType }) => {
    const { data, setData, put, errors, processing } = useForm<CategoryFormData>({
        title: category.title,
        description: category.description ?? '',
        image: null,
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('admin.product_m.categories.update', { category: category.slug }), {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success, e.g., redirect or show a success message
            },
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
                        <Label htmlFor="name">Title</Label>
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
                            onChange={handleTextareaChange}
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
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        />
                        <InputError message={errors.image} />
                    </div>

                    <Button type="submit" disabled={processing} className="mt-4">
                        Update Category
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default CategoryEdit;
