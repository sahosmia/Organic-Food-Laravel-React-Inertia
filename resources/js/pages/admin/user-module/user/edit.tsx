import Heading from '@/components/heading'
import AppLayout from '@/layouts/app-layout'
import React from 'react'
import { useForm } from '@inertiajs/react'
import { UserFormData } from '@/types/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { Checkbox } from '@/components/ui/checkbox'
import { UserType } from '@/types'

const UserEdit = ({ user }: { user: UserType }) => {
    console.log('user in edit', user);

    const { data, setData, put, errors, processing } = useForm<UserFormData>({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: '',
        is_active: Number(user.is_active) === 1 ? true : false,
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('admin.user_m.users.update', { user: user.id }), {
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
            <div className="container mx-auto p-4">

                <Heading title="User Edit" description="Modify the user details below." />
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className='grid gap-2 w-1/2'>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id='name'
                            type="text"
                            name="name"
                            onChange={handleOnChange}
                            value={data.name}
                            placeholder="Enter your name"
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className='grid gap-2 w-1/2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id='email'
                            type="email"
                            name="email"
                            onChange={handleOnChange}
                            value={data.email}
                            placeholder="Enter your email"
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className='grid gap-2 w-1/2'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id='password'
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            value={data.password}
                            placeholder="Enter your password"
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className='grid gap-2 w-1/2'>
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id='password_confirmation'
                            type="password"
                            name="password_confirmation"
                            onChange={handleOnChange}
                            value={data.password_confirmation}
                            placeholder="Confirm your password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                    <div className='flex items-center gap-2 w-1/2'>
                        <Checkbox
                            id='is_active'
                            name="is_active"
                            checked={data.is_active}
                            onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                        />
                        <Label htmlFor="is_active"> User is active </Label>
                    </div>


                    <Button type="submit" disabled={processing} className="mt-4">
                        Update User
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}

export default UserEdit
