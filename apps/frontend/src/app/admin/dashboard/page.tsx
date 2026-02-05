"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function Dashboard() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        api.getProducts()
            .then(data => setCount(data.length))
            .catch(console.error);
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Overview</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stats Cards */}
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Products</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                        {count !== null ? count : "--"}
                    </p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Store Status</h3>
                    <p className="mt-2 text-lg font-bold text-green-600">Active</p>
                </div>
            </div>
        </div>
    );
}
