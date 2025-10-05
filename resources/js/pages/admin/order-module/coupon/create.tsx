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
        coupon_code: '',
        discount_type: 'percentage',
        discount_value: '',
        min_order_amount: '',
        usage_limit: '',
        start_date: formatDateTimeForInput(getCurrentDateTime()),
        end_date: '',
        description: '',
        is_active: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setData(name as keyof typeof data, value);
        if (['discount_value', 'min_order_amount', 'usage_limit'].includes(name)) {
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
                console.error("Coupon creation validation errors:", formErrors);
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
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="coupon_code">Coupon Code</Label>
                        <Input
                            id="coupon_code"
                            name="coupon_code"
                            value={data.coupon_code}
                            onChange={handleChange}
                            placeholder="e.g., BLACKFRIDAY20"
                        />
                        <InputError message={errors.coupon_code} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="discount_type">Coupon Type</Label>
                        <Select
                            value={data.discount_type}
                            onValueChange={(value) => {
                                setData('discount_type', value as CouponFormData['discount_type']);
                            }}
                        >
                            <SelectTrigger id="discount_type">
                                <SelectValue placeholder="Select coupon type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percentage">Percentage</SelectItem>
                                <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.discount_type} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="discount_value">Value</Label>
                        <Input
                            id="discount_value"
                            name="discount_value"
                            type="number"
                            value={data.discount_value ?? ''}
                            onChange={handleChange}
                            placeholder={data.discount_type === 'percentage' ? 'e.g., 15 (for 15%)' : 'e.g., 10 (for $10)'}
                        />
                        <InputError message={errors.discount_value} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="min_order_amount">Minimum Amount (Optional)</Label>
                        <Input
                            id="min_order_amount"
                            name="min_order_amount"
                            type="number"
                            value={data.min_order_amount ?? ''}
                            onChange={handleChange}
                            placeholder="e.g., 50 (minimum order value)"
                        />
                        <InputError message={errors.min_order_amount} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="usage_limit">Max Uses</Label>
                        <Input
                            id="usage_limit"
                            name="usage_limit"
                            type="number"
                            value={data.usage_limit ?? ''}
                            onChange={handleChange}
                            placeholder="e.g., 100 (total times coupon can be used)"
                        />
                        <InputError message={errors.usage_limit} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="start_date">Starts At</Label>
                        <Input
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={data.start_date}
                            onChange={handleChange}
                        />
                        <InputError message={errors.start_date} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="end_date">Expires At (Optional)</Label>
                        <Input
                            id="end_date"
                            name="end_date"
                            type="date"
                            value={data.end_date || ''}
                            onChange={handleChange}
                        />
                        <InputError message={errors.end_date} />
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
