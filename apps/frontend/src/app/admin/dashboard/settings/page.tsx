"use client";

import { useState, useEffect } from "react";
import { api, StoreConfig } from "@/lib/api";
import { Save, Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [config, setConfig] = useState<Partial<StoreConfig>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        try {
            const data = await api.getConfig();
            setConfig(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.updateConfig(config);
            alert("Settings saved successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: keyof StoreConfig, value: string) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Store Settings</h2>
                <p className="text-slate-600 dark:text-slate-400">Manage contact information and store details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Store Name</label>
                        <input
                            type="text"
                            value={config.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                        <input
                            type="text"
                            value={config.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                        />
                        <p className="text-xs text-slate-500 mt-1">Displayed in the header and contact section.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={(config as any).email || ''}
                            onChange={(e) => handleChange('email' as any, e.target.value)}
                            className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Address</label>
                        <textarea
                            rows={3}
                            value={config.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">WhatsApp Number</label>
                        <input
                            type="text"
                            value={config.whatsapp || ''}
                            onChange={(e) => handleChange('whatsapp', e.target.value)}
                            className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                        />
                        <p className="text-xs text-slate-500 mt-1">Used for the WhatsApp button link.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hero Title</label>
                        <input
                            type="text"
                            value={config.heroTitle || ''}
                            onChange={(e) => handleChange('heroTitle', e.target.value)}
                            className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-blue-600 disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" /> Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
