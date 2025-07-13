export interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    is_active: boolean;
    [key: string]: string | boolean;

}


export interface CategoryFormData {
    title: string;
    description?: string;
    image?: File | null;
    [key: string]: string | File | null;

}
