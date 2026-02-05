"use client";

import { useState, useEffect } from "react";
import { api, Enquiry } from "@/lib/api";
import { Mail, Phone, Calendar, Clock, Check, Trash2, CheckCircle2 } from "lucide-react";

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEnquiries();
    }, []);

    const loadEnquiries = async () => {
        try {
            const data = await api.getEnquiries();
            setEnquiries(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;
        try {
            await api.deleteEnquiry(id);
            setEnquiries(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete enquiry.");
        }
    };

    const handleMarkResolved = async (id: number) => {
        try {
            // Optimistic update
            setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: 'RESOLVED' } : e));
            await api.updateEnquiryStatus(id, 'RESOLVED');
        } catch (err) {
            console.error(err);
            loadEnquiries(); // Revert on failure
            alert("Failed to update status.");
        }
    };

    if (loading) return <div>Loading enquiries...</div>;

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Enquiries</h2>
                <p className="text-slate-600 dark:text-slate-400">View and manage customer messages.</p>
            </div>

            <div className="space-y-4">
                {enquiries.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
                        <Mail className="mx-auto h-12 w-12 text-slate-400" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">No enquiries</h3>
                        <p className="mt-1 text-sm text-slate-500">New messages from the contact form will appear here.</p>
                    </div>
                ) : (
                    enquiries.map((enquiry) => (
                        <div
                            key={enquiry.id}
                            className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-6 transition-all hover:shadow-md ${enquiry.status === 'RESOLVED'
                                    ? 'border-green-200 dark:border-green-900/30 opacity-75'
                                    : 'border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{enquiry.name}</h3>
                                        {enquiry.status === 'RESOLVED' && (
                                            <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                                                <CheckCircle2 className="h-3 w-3" /> Resolved
                                            </span>
                                        )}
                                        {enquiry.status === 'NEW' && (
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-4 w-4" />
                                            {enquiry.phone || 'No phone'}
                                        </div>
                                        {enquiry.email && (
                                            <div className="flex items-center gap-1">
                                                <Mail className="h-4 w-4" />
                                                {enquiry.email}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : 'N/A'}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleTimeString() : 'N/A'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {enquiry.status !== 'RESOLVED' && (
                                        <button
                                            onClick={() => handleMarkResolved(enquiry.id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 text-sm font-medium transition-colors"
                                            title="Mark as Resolved"
                                        >
                                            <Check className="h-4 w-4" />
                                            Solve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(enquiry.id)}
                                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        title="Delete Enquiry"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded p-4 text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">
                                {enquiry.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
