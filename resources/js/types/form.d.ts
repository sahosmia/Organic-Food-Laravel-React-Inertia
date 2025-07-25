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
    code: string;
    type: 'percentage' | 'fixed_amount' | 'free_shipping';
    value: number | '' | null;
    min_amount: number | '' | null;
    max_uses: number | '' | null;
    starts_at: string;
    expires_at: string | null;
    description: string;
    is_active: boolean;
    // [key: string]: string | number | boolean | null | undefined;
}
