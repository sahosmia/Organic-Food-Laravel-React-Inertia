import Heading from '@/components/admin/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { CategoryFormData } from '@/types/form';
import { Head, useForm } from '@inertiajs/react';


const CategoryCreate = () => {
    const { data, setData, post, errors, processing } = useForm<CategoryFormData>({
        title: '',
        description: '',
        image: null,
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);

    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('image', e.target.files?.[0] || null);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.product_m.categories.store'), {
            preserveScroll: true,

            onError: (errors) => {
                console.error(errors);
            },
        });
    };
    return (
        <AppLayout>
            <Head title="Create Category" />
            <div className="container p-4 mx-auto">
                <Heading title="Category Create" description="Fill in the details below to create a new category." />

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
                            onChange={handleFileChange} />
                        <InputError message={errors.image} />
                    </div>

                    <Button type="submit" disabled={processing} className="mt-4">
                        Create Category
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default CategoryCreate;
