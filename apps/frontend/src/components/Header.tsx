"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Phone, MessageCircle, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Brands", href: "/#brands" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({ phone: "+91 98765 43210", whatsapp: "+91 98765 43210" });

    useEffect(() => {
        fetch('http://localhost:3001/config')
            .then(res => res.json())
            .then(data => {
                if (data && data.phone) setConfig(data);
            })
            .catch(() => { }); // Fallback to default on error
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            {/* Top Bar - Contact Info */}
            <div className="bg-primary px-4 py-1 text-xs font-medium text-white sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl justify-between items-center">
                    <p>Trusted Electrical Store Since 1990</p>
                    <div className="flex items-center gap-4">
                        <a href={`tel:${config?.phone?.replace(/\s/g, '') || ''}`} className="flex items-center gap-1 hover:text-secondary transition-colors">
                            <Phone className="h-3 w-3" />
                            <span>{config?.phone || 'Call Us'}</span>
                        </a>
                        <a href={`https://wa.me/${config?.whatsapp?.replace(/\D/g, '') || ''}`} className="flex items-center gap-1 hover:text-secondary transition-colors">
                            <MessageCircle className="h-3 w-3" />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>

            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white font-bold">
                                S
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Somnath<span className="text-primary">Agency</span>
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white"
                                placeholder="Search fans, lights, switches..."
                            />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {navigation.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 shadow-sm transition-colors"
                        >
                            Enquire Now
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open menu</span>
                            {isOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="pb-4 md:hidden">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="space-y-1">
                            {navigation.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4">
                                <Link
                                    href="/#contact"
                                    className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Enquire Now
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
