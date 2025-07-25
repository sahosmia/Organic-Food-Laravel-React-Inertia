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
        code: coupon.code,
        type: coupon.type,
        value: coupon.value ?? '',
        min_amount: coupon.min_amount ?? '',
        max_uses: coupon.max_uses === null ? '' : coupon.max_uses,
        starts_at: formatDateTimeForInput(coupon.starts_at),
        expires_at: formatDateTimeForInput(coupon.expires_at),
        description: coupon.description ?? '',
        is_active: coupon.is_active,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        if (['value', 'min_amount', 'max_uses'].includes(name)) {
            setData(name as keyof CouponFormData, value === '' ? '' : Number(value));
        } else {
            setData(name as keyof CouponFormData, value);
        }
    };

    // Handler for the Select component (Coupon Type)
    const handleTypeChange = (value: 'percentage' | 'fixed_amount' | 'free_shipping'): void => {
        setData('type', value);
        if (value === 'free_shipping') {
            setData('value', '');
        }
    };

    // Handler for the Switch component (Is Active)
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

    // Breadcrumbs for the edit page
    const breadcrumbs = [
        { title: 'Dashboard', href: route('admin.dashboard') },
        { title: 'Order Management', href: '#' },
        { title: 'Coupons', href: route('admin.order_m.coupons.index') },
        { title: 'Edit', href: route('admin.order_m.coupons.edit', coupon.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Coupon: ${coupon.code}`} />

            <div className="container p-4 mx-auto">
                <Heading
                    title={`Edit Coupon: ${coupon.code}`}
                    description="Modify the details of this discount coupon."
                />

                <form className="space-y-6" onSubmit={onSubmit}>
                    {/* Coupon Code */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="code">Coupon Code</Label>
                        <Input
                            id="code"
                            name="code"
                            onChange={handleInputChange}
                            value={data.code}
                            placeholder="e.g., BLACKFRIDAY20"
                            required
                        />
                        <InputError message={errors.code} />
                    </div>

                    {/* Coupon Type */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="type">Coupon Type</Label>
                        <Select onValueChange={handleTypeChange} value={data.type}>
                            <SelectTrigger id="type" name="type">
                                <SelectValue placeholder="Select coupon type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percentage">Percentage Discount</SelectItem>
                                <SelectItem value="fixed_amount">Fixed Amount Discount</SelectItem>
                                <SelectItem value="free_shipping">Free Shipping</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.type} />
                    </div>

                    {/* Discount Value */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="value">Discount Value</Label>
                        <Input
                            id="value"
                            type="number"
                            name="value"
                            onChange={handleInputChange}
                            value={data.value ?? ''} // Convert null to '' for display
                            placeholder={data.type === 'percentage' ? 'e.g., 15 (for 15%)' : 'e.g., 10 (for $10)'}
                            min="0"
                            step="0.01"
                            disabled={data.type === 'free_shipping'}
                            required={data.type !== 'free_shipping'}
                        />
                        <InputError message={errors.value} />
                    </div>

                    {/* Minimum Order Amount */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="min_amount">Minimum Order Amount (Optional)</Label>
                        <Input
                            id="min_amount"
                            type="number"
                            name="min_amount"
                            onChange={handleInputChange}
                            value={data.min_amount ?? ''} 
                            placeholder="e.g., 50 (minimum order value)"
                            min="0"
                            step="0.01"
                        />
                        <InputError message={errors.min_amount} />
                    </div>

                    {/* Maximum Uses */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="max_uses">Maximum Uses (0 for Unlimited)</Label>
                        <Input
                            id="max_uses"
                            type="number"
                            name="max_uses"
                            onChange={handleInputChange}
                            value={data.max_uses ?? ''} // Convert null to '' for display
                            placeholder="e.g., 100 (total times coupon can be used)"
                            min="0"
                        />
                        <InputError message={errors.max_uses} />
                    </div>

                    {/* Starts At */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="starts_at">Starts At</Label>
                        <Input
                            id="starts_at"
                            type="datetime-local"
                            name="starts_at"
                            onChange={handleInputChange}
                            value={data.starts_at}
                            required
                        />
                        <InputError message={errors.starts_at} />
                    </div>

                    {/* Expires At */}
                    <div className="grid w-1/2 gap-2">
                        <Label htmlFor="expires_at">Expires At (Optional)</Label>
                        <Input
                            id="expires_at"
                            type="datetime-local"
                            name="expires_at"
                            onChange={handleInputChange}
                            value={data.expires_at || ''} // Handle null value by showing empty string
                            min={data.starts_at} // Ensure expiry is not before start date
                        />
                        <InputError message={errors.expires_at} />
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
