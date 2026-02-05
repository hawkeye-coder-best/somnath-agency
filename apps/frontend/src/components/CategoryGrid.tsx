"use client";

import Link from "next/link";
import { Fan, Lightbulb, Power, Cable, Zap, Battery } from "lucide-react";

const categories = [
    {
        name: "Ceiling & Exhaust Fans",
        href: "/products?category=fans",
        icon: Fan,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
        name: "LED Lights & Bulbs",
        href: "/products?category=lighting",
        icon: Lightbulb,
        color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    {
        name: "Switches & Sockets",
        href: "/products?category=switches",
        icon: Power,
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
        name: "Wires & Cables",
        href: "/products?category=wires",
        icon: Cable,
        color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    },
    {
        name: "MCBs & Switchgear",
        href: "/products?category=mcb",
        icon: Zap,
        color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
        name: "Electrical Accessories",
        href: "/products?category=accessories",
        icon: Battery,
        color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    },
];

export function CategoryGrid() {
    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-12 text-center">
                    Browse by Category
                </h2>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="group flex flex-col items-center p-6 rounded-2xl bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700 hover:shadow-lg hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div
                                className={`flex h-16 w-16 items-center justify-center rounded-full mb-4 ${category.color} transition-transform group-hover:scale-110`}
                            >
                                <category.icon className="h-8 w-8" />
                            </div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-center group-hover:text-primary transition-colors">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
