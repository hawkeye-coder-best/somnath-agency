"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { api, Product } from "@/lib/api";

export function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getProducts()
            .then(data => setProducts(data.slice(0, 4))) // Show first 4
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="py-12 text-center text-slate-500">Loading featured products...</div>;
    if (products.length === 0) return null;

    return (
        <section className="bg-slate-50 dark:bg-slate-900 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Featured Products
                    </h2>
                    <Link
                        href="/products"
                        className="hidden text-sm font-medium text-primary hover:text-blue-500 md:block"
                    >
                        Shop all products
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-8 md:hidden">
                    <Link
                        href="/products"
                        className="block text-sm font-medium text-primary hover:text-blue-500"
                    >
                        Shop all products
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
