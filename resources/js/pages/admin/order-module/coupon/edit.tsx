import React from 'react';
import Heading from '@/components/admin/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { CouponFormData } from '@/types/form';
import { Head, useForm } from '@inertiajs/react';
import { CouponType } from '@/types';
import { formatDateTimeForInput } from '@/utils/time';



const CouponEdit = ({ coupon }: { coupon: CouponType }) => {
    const { data, setData, patch, errors, processing } = useForm<CouponFormData>({
        coupon_code: coupon.coupon_code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value ?? '',
        min_order_amount: coupon.min_order_amount ?? '',
        usage_limit: coupon.usage_limit === null ? '' : coupon.usage_limit,
        start_date: formatDateTimeForInput(coupon.start_date),
        end_date: formatDateTimeForInput(coupon.end_date),
        description: coupon.description ?? '',
        is_active: coupon.is_active,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        if (['discount_value', 'min_order_amount', 'usage_limit'].includes(name)) {
            setData(name as keyof CouponFormData, value === '' ? '' : Number(value));
        } else {
            setData(name as keyof CouponFormData, value);
        }
    };

    const handleTypeChange = (value: 'percentage' | 'fixed_amount'): void => {
        setData('discount_type', value);
    };

    const handleIsActiveChange = (checked: boolean): void => {
        setData('is_active', checked);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        patch(route('admin.order_m.coupons.update', coupon.id), {
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
        { title: 'Edit', href: route('admin.order_m.coupons.edit', coupon.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Coupon: ${coupon.coupon_code}`} />

            <div className="container p-4 mx-auto">
                <Heading
                    title={`Edit Coupon: ${coupon.coupon_code}`}
                    description="Modify the details of this discount coupon."
                />

                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="coupon_code">Coupon Code</Label>
                        <Input
                            id="coupon_code"
                            name="coupon_code"
                            onChange={handleInputChange}
                            value={data.coupon_code}
                            placeholder="e.g., BLACKFRIDAY20"
                            required
                        />
                        <InputError message={errors.coupon_code} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="discount_type">Coupon Type</Label>
                        <Select onValueChange={handleTypeChange} value={data.discount_type}>
                            <SelectTrigger id="discount_type" name="discount_type">
                                <SelectValue placeholder="Select coupon type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percentage">Percentage Discount</SelectItem>
                                <SelectItem value="fixed_amount">Fixed Amount Discount</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.discount_type} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="discount_value">Discount Value</Label>
                        <Input
                            id="discount_value"
                            type="number"
                            name="discount_value"
                            onChange={handleInputChange}
                            value={data.discount_value ?? ''}
                            placeholder={data.discount_type === 'percentage' ? 'e.g., 15 (for 15%)' : 'e.g., 10 (for $10)'}
                            min="0"
                            step="0.01"
                            required
                        />
                        <InputError message={errors.discount_value} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="min_order_amount">Minimum Order Amount (Optional)</Label>
                        <Input
                            id="min_order_amount"
                            type="number"
                            name="min_order_amount"
                            onChange={handleInputChange}
                            value={data.min_order_amount ?? ''}
                            placeholder="e.g., 50 (minimum order value)"
                            min="0"
                            step="0.01"
                        />
                        <InputError message={errors.min_order_amount} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="usage_limit">Maximum Uses (0 for Unlimited)</Label>
                        <Input
                            id="usage_limit"
                            type="number"
                            name="usage_limit"
                            onChange={handleInputChange}
                            value={data.usage_limit ?? ''}
                            placeholder="e.g., 100 (total times coupon can be used)"
                            min="0"
                        />
                        <InputError message={errors.usage_limit} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="start_date">Starts At</Label>
                        <Input
                            id="start_date"
                            type="datetime-local"
                            name="start_date"
                            onChange={handleInputChange}
                            value={data.start_date}
                            required
                        />
                        <InputError message={errors.start_date} />
                    </div>

                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="end_date">Expires At (Optional)</Label>
                        <Input
                            id="end_date"
                            type="datetime-local"
                            name="end_date"
                            onChange={handleInputChange}
                            value={data.end_date || ''}
                            min={data.start_date}
                        />
                        <InputError message={errors.end_date} />
                    </div>

                    {/* Description */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            onChange={handleInputChange}
                            value={data.description}
                            placeholder="Add a brief internal description for the coupon"
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Is Active Switch */}
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="is_active"
                            name="is_active"
                            checked={data.is_active}
                            onCheckedChange={handleIsActiveChange}
                        />
                        <Label htmlFor="is_active">Is Active</Label>
                        <InputError message={errors.is_active} />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={processing} className="mt-4">
                        {processing ? 'Updating...' : 'Update Coupon'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default CouponEdit;
