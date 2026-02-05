import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const navigation = {
    main: [
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
    ],
    social: [
        {
            name: "Twitter",
            href: "#",
            icon: Twitter,
        },
        {
            name: "GitHub",
            href: "#",
            icon: Github,
        },
        {
            name: "LinkedIn",
            href: "#",
            icon: Linkedin,
        },
    ],
};

export function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-800">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Somnath<span className="text-primary">Agency</span>
                        </span>
                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                            Your trusted partner for all electrical needs. Authentic products, wholesale prices, and expert advice since 1990.
                        </p>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/products" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400">Products</Link></li>
                            <li><Link href="/#brands" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400">Brands</Link></li>
                            <li><Link href="/#about" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400">About Us</Link></li>
                            <li><Link href="/#contact" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Categories</h3>
                        <ul className="space-y-3">
                            <li><Link href="/products?category=fans" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400">Fans</Link></li>
                            <li><Link href="/products?category=lighting" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400">LED Lights</Link></li>
                            <li><Link href="/products?category=switches" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400">Switches</Link></li>
                            <li><Link href="/products?category=wires" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400">Wires & Cables</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Visit Us</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            123, Main Market Road,<br />
                            Near City Center, Mumbai
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {navigation.social.map((item) => (
                                <Link key={item.name} href={item.href} className="text-slate-400 hover:text-primary">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-5 w-5" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        {/* Social links can go here */}
                    </div>
                    <p className="mt-8 text-base text-slate-400 md:mt-0 md:order-1">
                        &copy; {new Date().getFullYear()} Somnath Agency. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
