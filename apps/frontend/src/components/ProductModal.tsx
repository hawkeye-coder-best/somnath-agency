"use client";

import { Product } from "@/lib/api";
import { X, MessageCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative aspect-square lg:aspect-auto bg-white p-8 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col p-8 sm:p-10">
                        <div className="mb-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                    {product.brand}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                    {product.category}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl mb-2">
                                {product.name}
                            </h2>

                            <p className="text-3xl font-bold text-primary mb-6">
                                {product.price}
                            </p>

                            <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
                                <h4 className="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wide mb-2">Description</h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    {product.description || "No description available for this product."}
                                </p>
                            </div>

                            <ul className="space-y-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    Genuine {product.brand} Product
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    In Stock & Ready to Ship
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    Best Price Guarantee
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a
                                href="/#enquiry-form"
                                onClick={onClose}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Enquire Now
                            </a>
                            <button
                                onClick={onClose}
                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
