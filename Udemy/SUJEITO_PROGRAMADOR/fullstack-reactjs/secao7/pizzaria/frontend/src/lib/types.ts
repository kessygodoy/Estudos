export interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    createdAt: string;
}

export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    createdAt: string;
    token: string;
}

export interface CategoryType {
    id: string;
    name: string;
    createdAt: string;
}

export interface ProductType {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
    category: {
        id: string;
        name: string;
    };
    disabled: boolean;
    createdAt: string;
    updatedAt: string;
}