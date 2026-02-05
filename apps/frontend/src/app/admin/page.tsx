"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [passcode, setPasscode] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode === "admin123") { // Simple passcode for demo
            document.cookie = "admin_session=true; path=/";
            router.push("/admin/dashboard");
        } else {
            alert("Invalid Passcode");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-slate-800">
                <h1 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Passcode
                        </label>
                        <input
                            type="password"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:border-slate-600 dark:bg-slate-700 hover:border-blue-400 transition-colors"
                            placeholder="Enter admin passcode"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary py-2 text-white hover:bg-blue-600 transition-transform active:scale-95"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
