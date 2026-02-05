"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings, LogOut, MessageSquare } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navigation = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Products", href: "/admin/dashboard/products", icon: Package },
        { name: "Enquiries", href: "/admin/dashboard/enquiries", icon: MessageSquare },
        { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md dark:bg-slate-800">
                <div className="flex h-16 items-center justify-center border-b dark:border-slate-700">
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">Admin Panel</h1>
                </div>
                <nav className="p-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary text-white"
                                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 mt-auto"
                    >
                        <LogOut className="h-5 w-5" />
                        Exit / Go Home
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                {children}
            </div>
        </div>
    );
}
