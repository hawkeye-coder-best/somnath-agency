"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { api, StoreConfig } from "@/lib/api";

export function ContactSection() {
    const [config, setConfig] = useState<StoreConfig | null>(null);
    const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        api.getConfig().then(setConfig).catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.createEnquiry({
                name: formState.name,
                phone: formState.phone,
                message: formState.message,
            });
            setIsSuccess(true);
            setFormState({ name: '', phone: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            console.error(err);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative scroll-mt-20 bg-white dark:bg-slate-900 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Contact Us
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                            Visit our store or get in touch for quotes and bulk orders.
                        </p>

                        <dl className="mt-8 space-y-6">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <dt className="sr-only">Address</dt>
                                    <dd className="text-base text-slate-600 dark:text-slate-300">
                                        <span className="font-semibold text-slate-900 dark:text-white">{config?.name || 'Somnath Agency'}</span>
                                        <br />
                                        {config?.address || '123, Main Market Road, Mumbai'}
                                    </dd>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <dt className="sr-only">Phone</dt>
                                    <dd className="text-base text-slate-600 dark:text-slate-300">
                                        {config?.phone || '+91 98765 43210'}
                                    </dd>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <dt className="sr-only">Email</dt>
                                    <dd className="text-base text-slate-600 dark:text-slate-300">
                                        {config ? (config as any).email : 'sales@somnathagency.com'}
                                    </dd>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <dt className="sr-only">Hours</dt>
                                    <dd className="text-base text-slate-600 dark:text-slate-300">
                                        Mon - Sat: 10:00 AM - 8:30 PM
                                        <br />
                                        Sunday: Closed
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>

                    {/* Contact Form */}
                    <div id="enquiry-form" className="scroll-mt-24 rounded-2xl bg-slate-50 p-8 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                            Send an Enquiry
                        </h3>
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in">
                                <div className="bg-green-100 p-3 rounded-full mb-4 dark:bg-green-900/30">
                                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Message Sent!</h4>
                                <p className="text-slate-600 dark:text-slate-300 mt-2">
                                    Thank you for contacting us. We will get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-6 text-sm font-medium text-primary hover:text-blue-700"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:ring-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="tel"
                                            required
                                            value={formState.phone}
                                            onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:ring-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                                        Message / Product Requirements
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            rows={4}
                                            required
                                            value={formState.message}
                                            onChange={e => setFormState({ ...formState, message: e.target.value })}
                                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-900 dark:ring-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
