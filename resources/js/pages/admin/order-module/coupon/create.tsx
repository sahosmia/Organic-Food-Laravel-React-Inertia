import React from 'react';
import Heading from '@/components/admin/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CouponFormData } from '@/types/form';
import { getCurrentDateTime } from '@/utils/time';


const formatDateTimeForInput = (isoString: string | null): string => {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.warn("Invalid date string provided to formatDateTimeForInput:", isoString);
            return '';
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (e) {
        console.error("Error formatting date:", isoString, e);
        return '';
    }
};

const CouponCreate = () => {
    const { data, setData, post, errors, processing } = useForm<CouponFormData>({
        code: '',
        type: 'percentage',
        value: '',
        min_amount: '',
        max_uses: '',
        starts_at: formatDateTimeForInput(getCurrentDateTime()),
        expires_at: '',
        description: '',
        is_active: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setData(name as keyof typeof data, value);
        if (['value', 'min_amount', 'max_uses'].includes(name)) {
            setData(name as keyof typeof data, value === '' ? '' : Number(e.target.value));
        } else {
            setData(name as keyof typeof data, value);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.order_m.coupons.store'), {
            preserveScroll: true,
            onError: (formErrors) => {
                console.error("Coupon update validation errors:", formErrors);
            },
        });
    };

    const breadcrumbs = [
        { title: 'Dashboard', href: route('admin.dashboard') },
        { title: 'Order Management', href: '#' },
        { title: 'Coupons', href: route('admin.order_m.coupons.index') },
        { title: 'Create', href: route('admin.order_m.coupons.create') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Coupon" />
            <div className="container p-4 mx-auto">
                <Heading title="Coupon Create" description="Set up a new discount coupon." />
                <form className="space-y-6" onSubmit={onSubmit}>
                    {/* Code */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="code">Coupon Code</Label>
                        <Input
                            id="code"
                            name="code"
                            value={data.code}
                            onChange={handleChange}
                            placeholder="e.g., BLACKFRIDAY20"

                        />
                        <InputError message={errors.code} />
                    </div>

                    {/* Type */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="type">Coupon Type</Label>
                        <Select value={data.type} onValueChange={(value) => {
                            setData('type', value as CouponFormData['type']);
                            if (value === 'free_shipping') setData('value', '');
                        }}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select coupon type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percentage">Percentage</SelectItem>
                                <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                                <SelectItem value="free_shipping">Free Shipping</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.type} />
                    </div>

                    {/* Value */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="value">Value</Label>
                        <Input
                            id="value"
                            name="value"
                            type="number"
                            value={data.value ?? ''}
                            onChange={handleChange}
                            disabled={data.type === 'free_shipping'}
                            placeholder={data.type === 'percentage' ? 'e.g., 15 (for 15%)' : 'e.g., 10 (for $10)'}
                        />
                        <InputError message={errors.value} />
                    </div>

                    {/* Min Amount */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="min_amount">Minimum Amount (Optional)</Label>
                        <Input
                            id="min_amount"
                            name="min_amount"
                            type="number"
                            value={data.min_amount ?? ''}
                            onChange={handleChange}
                            placeholder="e.g., 50 (minimum order value)"

                        />
                        <InputError message={errors.min_amount} />
                    </div>

                    {/* Max Uses */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="max_uses">Max Uses</Label>
                        <Input
                            id="max_uses"
                            name="max_uses"
                            type="number"
                            value={data.max_uses ?? ''}
                            onChange={handleChange}
                            placeholder="e.g., 100 (total times coupon can be used)"

                        />
                        <InputError message={errors.max_uses} />
                    </div>

                    {/* Starts At */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="starts_at">Starts At</Label>
                        <Input
                            id="starts_at"
                            name="starts_at"
                            type="date"
                            value={data.starts_at}
                            onChange={handleChange}
                        />
                        <InputError message={errors.starts_at} />
                    </div>

                    {/* Expires At */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="expires_at">Expires At (Optional)</Label>
                        <Input
                            id="expires_at"
                            name="expires_at"
                            type="date"
                            value={data.expires_at || ''}
                            onChange={handleChange}
                        />
                        <InputError message={errors.expires_at} />
                    </div>

                    {/* Description */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Add a brief internal description for the coupon"

                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Is Active */}
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="is_active"
                            name="is_active"
                            checked={data.is_active}
                            onCheckedChange={(checked) => setData('is_active', checked)}
                        />
                        <Label htmlFor="is_active">Is Active</Label>
                        <InputError message={errors.is_active} />
                    </div>

                    <Button type="submit" disabled={processing}>Create Coupon</Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default CouponCreate;
