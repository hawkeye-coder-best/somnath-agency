"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
    const [heroTitle, setHeroTitle] = useState("Complete Electrical Solutions");

    useEffect(() => {
        fetch('http://localhost:3001/config')
            .then(res => res.json())
            .then(data => {
                if (data && data.heroTitle) setHeroTitle(data.heroTitle);
            })
            .catch(() => { });
    }, []);

    return (
        <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 pt-8 pb-16 md:pt-16 md:pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
                    <div className="lg:col-span-6">
                        <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-400/20 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                            Best Prices in Town
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                            {heroTitle.split(' ').slice(0, 1).join(' ')} <span className="text-primary">{heroTitle.split(' ').slice(1).join(' ')}</span>
                            {/* Fallback layout if title is short/long, or just render directly */}
                            {/* <br className="hidden lg:block" />Under One Roof */}
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-lg">
                            Authorized dealers of premium brands. We supply everything from ceiling fans and LED lights to industrial switchgear and wires.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
                            >
                                Browse Products
                            </Link>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-700 transition-colors"
                            >
                                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center gap-x-6">
                            <div className="flex items-center gap-x-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                30+ Years Exp.
                            </div>
                            <div className="flex items-center gap-x-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                Genuine Brands
                            </div>
                            <div className="flex items-center gap-x-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                Bulk Discounts
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-16 lg:col-span-6 lg:mt-0">
                        {/* Abstract decorative background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-yellow-100 dark:from-blue-900/40 dark:to-slate-800 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-2xl"></div>

                        <div className="relative rounded-2xl bg-white/50 p-2 ring-1 ring-slate-900/10 dark:ring-white/10 backdrop-blur-sm lg:rounded-3xl lg:p-4">
                            {/* Placeholder for Hero Image - In real app, this would be a high-quality shop photo or product collage */}
                            <div className="aspect-[4/3] w-full rounded-xl bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
                                    {[
                                        { name: 'Crompton', logo: '/brands/crompton.png' },
                                        { name: 'Orient', logo: '/brands/orient.png' },
                                        { name: 'Polycab', logo: '/brands/polycab.png' },
                                    ].map((brand, index) => (
                                        <div
                                            key={brand.name}
                                            className={`bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center p-4 ${index === 2 ? 'col-span-2' : ''}`}
                                        >
                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="max-w-full max-h-16 object-contain mix-blend-multiply dark:mix-blend-normal opacity-90 hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
