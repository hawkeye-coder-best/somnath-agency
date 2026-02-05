"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { Product, api } from "@/lib/api";
import { Filter, SlidersHorizontal } from "lucide-react";

// Mock Data - In a real app this comes from an API
const allProducts: Product[] = [
    {
        id: "1",
        name: "Crompton High-Speed Ceiling Fan (Brown)",
        brand: "Crompton",
        price: "₹1,850",
        image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800",
        category: "Fans",
    },
    {
        id: "2",
        name: "Havells 9W LED Bulb (Cool Day Light) - Pack of 4",
        brand: "Havells",
        price: "₹399",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800",
        category: "Lighting",
    },
    {
        id: "3",
        name: "Anchor Roma Modular Switch Board 4M",
        brand: "Anchor",
        price: "₹120",
        image: "https://images.unsplash.com/photo-1556637640-2c80d3201be8?auto=format&fit=crop&q=80&w=800",
        category: "Switches",
    },
    {
        id: "4",
        name: "Polycab 1.5 sq mm Wire (Red) - 90m",
        brand: "Polycab",
        price: "₹1,450",
        image: "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&q=80&w=800",
        category: "Wires",
    },
    {
        id: "5",
        name: "Orient Electric Exhaust Fan 200mm",
        brand: "Orient",
        price: "₹1,250",
        image: "https://images.unsplash.com/photo-1574689049597-7e6da3dc1373?auto=format&fit=crop&q=80&w=800",
        category: "Fans",
    },
    {
        id: "6",
        name: "Philips 20W LED Batten Light",
        brand: "Philips",
        price: "₹450",
        image: "https://images.unsplash.com/photo-1616259079730-22c60829871f?auto=format&fit=crop&q=80&w=800",
        category: "Lighting",
    },
    {
        id: "7",
        name: "Legrand Myrius 6A Switch (White)",
        brand: "Legrand",
        price: "₹95",
        image: "https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?auto=format&fit=crop&q=80&w=800",
        category: "Switches",
    },
    {
        id: "8",
        name: "Finolex 2.5 sq mm Wire (Blue) - 90m",
        brand: "Finolex",
        price: "₹2,100",
        image: "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80&w=800",
        category: "Wires",
    },
];

const filters = {
    categories: ["Fans", "Lighting", "Switches", "Wires", "Accessories", "MCBs"],
    brands: ["Crompton", "Havells", "Anchor", "Polycab", "Philips", "Orient", "Legrand", "Finolex", "Schneider"],
};

export default function ProductsPage() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Get category from URL
        const searchParams = new URLSearchParams(window.location.search);
        const categoryParam = searchParams.get('category');

        // Initialize filters from URL if present
        if (categoryParam) {
            // Simple mapping for demo purposes
            const mappedCategory = filters.categories.find(c => c.toLowerCase() === categoryParam.toLowerCase());
            if (mappedCategory) {
                setSelectedCategories([mappedCategory]);
            } else if (categoryParam.toLowerCase() === 'mcb') {
                setSelectedCategories(['MCBs']);
            } else {
                // Try partial match
                const partialMatch = filters.categories.find(c => c.toLowerCase().includes(categoryParam.toLowerCase()));
                if (partialMatch) setSelectedCategories([partialMatch]);
            }
        }

        api.getProducts()
            .then(data => {
                setProducts(data);
                // Initial filtering will happen in the next effect due to state change
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Filter products whenever filters or products list changes
    useEffect(() => {
        let result = products;

        // Filter by Category
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        // Filter by Brand
        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand));
        }

        setFilteredProducts(result);
    }, [products, selectedCategories, selectedBrands]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col">
            <Header />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 w-full pb-24 pt-6">
                <div className="flex items-baseline justify-between border-b border-slate-200 pb-6 dark:border-slate-800">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Products</h1>

                    <div className="flex items-center">
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-slate-400 hover:text-slate-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        >
                            <span className="sr-only">Filters</span>
                            <Filter className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters (Desktop) */}
                        <form className="hidden lg:block">
                            <h3 className="sr-only">Categories</h3>
                            <div className="border-b border-slate-200 py-6 dark:border-slate-800">
                                <h3 className="-my-3 flow-root">
                                    <span className="flex w-full items-center justify-between py-3 text-sm text-slate-400 hover:text-slate-500">
                                        <span className="font-medium text-slate-900 dark:text-white">Category</span>
                                        {selectedCategories.length > 0 && (
                                            <span
                                                className="ml-2 text-xs text-primary cursor-pointer hover:underline"
                                                onClick={() => setSelectedCategories([])}
                                            >
                                                Clear
                                            </span>
                                        )}
                                    </span>
                                </h3>
                                <div className="pt-6" id="filter-section-0">
                                    <div className="space-y-4">
                                        {filters.categories.map((option, sectionIdx) => (
                                            <div key={option} className="flex items-center">
                                                <input
                                                    id={`filter-category-${sectionIdx}`}
                                                    name="category"
                                                    value={option}
                                                    checked={selectedCategories.includes(option)}
                                                    onChange={() => toggleCategory(option)}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700"
                                                />
                                                <label
                                                    htmlFor={`filter-category-${sectionIdx}`}
                                                    className="ml-3 text-sm text-slate-600 dark:text-slate-300"
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-slate-200 py-6 dark:border-slate-800">
                                <h3 className="-my-3 flow-root">
                                    <span className="flex w-full items-center justify-between py-3 text-sm text-slate-400 hover:text-slate-500">
                                        <span className="font-medium text-slate-900 dark:text-white">Brands</span>
                                        {selectedBrands.length > 0 && (
                                            <span
                                                className="ml-2 text-xs text-primary cursor-pointer hover:underline"
                                                onClick={() => setSelectedBrands([])}
                                            >
                                                Clear
                                            </span>
                                        )}
                                    </span>
                                </h3>
                                <div className="pt-6" id="filter-section-1">
                                    <div className="space-y-4">
                                        {filters.brands.map((option, sectionIdx) => (
                                            <div key={option} className="flex items-center">
                                                <input
                                                    id={`filter-brand-${sectionIdx}`}
                                                    name="brand"
                                                    value={option}
                                                    checked={selectedBrands.includes(option)}
                                                    onChange={() => toggleBrand(option)}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700"
                                                />
                                                <label
                                                    htmlFor={`filter-brand-${sectionIdx}`}
                                                    className="ml-3 text-sm text-slate-600 dark:text-slate-300"
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Product Grid */}
                        <div className="lg:col-span-3">
                            {/* Mobile Filter Dialog (Simple Toggle for now) */}
                            {mobileFiltersOpen && (
                                <div className="mb-6 lg:hidden p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <SlidersHorizontal className="h-4 w-4" /> Filters
                                        </span>
                                        <button onClick={() => setMobileFiltersOpen(false)} className="text-sm text-primary">Close</button>
                                    </div>
                                    {/* Simplified mobile filters */}
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2 text-sm text-slate-900 dark:text-white">Category</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {filters.categories.map(c => (
                                                    <button
                                                        key={c}
                                                        onClick={() => toggleCategory(c)}
                                                        className={`px-3 py-1 rounded-full border text-xs transition-colors ${selectedCategories.includes(c)
                                                            ? 'bg-primary text-white border-primary'
                                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary'
                                                            }`}
                                                    >
                                                        {c}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2 text-sm text-slate-900 dark:text-white">Brands</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {filters.brands.map(b => (
                                                    <button
                                                        key={b}
                                                        onClick={() => toggleBrand(b)}
                                                        className={`px-3 py-1 rounded-full border text-xs transition-colors ${selectedBrands.includes(b)
                                                            ? 'bg-primary text-white border-primary'
                                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary'
                                                            }`}
                                                    >
                                                        {b}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                {loading ? (
                                    <div className="col-span-3 text-center py-10">Loading products...</div>
                                ) : filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onClick={() => setSelectedProduct(product)}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center text-slate-500 py-10">No products found.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}
