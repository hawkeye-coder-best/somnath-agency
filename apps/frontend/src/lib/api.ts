const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: string;
    image: string;
    description?: string;
}

export interface StoreConfig {
    id: number;
    name: string;
    phone: string;
    whatsapp: string;
    address: string;
    heroTitle: string;
}

export interface Enquiry {
    id: number;
    name: string;
    phone?: string;
    email?: string;
    message: string;
    status: 'NEW' | 'READ' | 'CONTACTED' | 'ARCHIVED' | 'RESOLVED';
    createdAt: string;
}

export const api = {
    getProducts: async (): Promise<Product[]> => {
        const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },

    createProduct: async (product: Partial<Product>) => {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        return res.json();
    },

    deleteProduct: async (id: string) => {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    },

    updateProduct: async (id: string, product: Partial<Product>) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        return res.json();
    },

    getConfig: async (): Promise<StoreConfig> => {
        const res = await fetch(`${API_URL}/config`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch config');
        return res.json();
    },

    updateConfig: async (config: Partial<StoreConfig>) => {
        const res = await fetch(`${API_URL}/config`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        return res.json();
    },

    createEnquiry: async (enquiry: Partial<Enquiry>) => {
        const res = await fetch(`${API_URL}/enquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enquiry),
        });
        return res.json();
    },

    getEnquiries: async (): Promise<Enquiry[]> => {
        const res = await fetch(`${API_URL}/enquiries`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch enquiries');
        return res.json();
    },

    deleteEnquiry: async (id: number) => {
        await fetch(`${API_URL}/enquiries/${id}`, { method: 'DELETE' });
    },

    updateEnquiryStatus: async (id: number, status: string) => {
        const res = await fetch(`${API_URL}/enquiries/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        return res.json();
    },
};
