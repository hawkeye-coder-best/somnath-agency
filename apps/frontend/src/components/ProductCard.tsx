"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Product } from "@/lib/api";

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={handleClick}
        >
            <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-4xl bg-slate-100 dark:bg-slate-900 text-slate-300">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerText = '📷';
                        }}
                    />
                </div>
                <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-slate-900 shadow-sm backdrop-blur-sm">
                    {product.brand}
                </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2">
                    {/* If onClick is present, render as span, else Link */}
                    {onClick ? (
                        <span>{product.name}</span>
                    ) : (
                        <Link href={`/products`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    )}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{product.category}</p>
                <div className="mt-4 flex flex-1 items-end justify-between">
                    <p className="text-lg font-bold text-primary">{product.price}</p>
                    <button
                        type="button"
                        className="relative z-10 rounded-full bg-primary/10 p-2 text-primary hover:bg-primary hover:text-white transition-colors"
                        title="Enquire on WhatsApp"
                        aria-label="Enquire on WhatsApp"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Prevent card click
                            window.open(`https://wa.me/919876543210?text=I am interested in ${product.name}`, '_blank');
                        }}
                    >
                        <MessageCircle className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="p-4 pt-0 mt-auto">
                <button
                    className="relative z-10 flex w-full items-center justify-center rounded-md border border-slate-300 bg-transparent py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
