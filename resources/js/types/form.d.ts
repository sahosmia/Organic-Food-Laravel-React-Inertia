export interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    is_active: boolean;
    [key: string]: string | boolean;

}


export type CategoryFormData = {
    title: string;
    description?: string;
    image?: File | null;
    _method?: string;
    // [key: string]: string | File | null;
}


export type CouponFormData = {
    coupon_code: string;
    discount_type: 'percentage' | 'fixed_amount';
    discount_value: number | '' | null;
    min_order_amount: number | '' | null;
    usage_limit: number | '' | null;
    start_date: string;
    end_date: string | null;
    description: string;
    is_active: boolean;
}
