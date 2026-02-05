"use client";

import { useState, useEffect } from "react";
import { api, Product } from "@/lib/api";
import { Plus, Trash, X, Pencil } from "lucide-react";

export default function ProductsManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({
        category: "Fans",
        image: "https://via.placeholder.com/300",
    });

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            const data = await api.getProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        try {
            await api.deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
        } catch (err) {
            alert("Failed to delete");
        }
    }

    function openAddModal() {
        setEditingProduct(null);
        setFormData({ category: "Fans", image: "https://via.placeholder.com/300" });
        setIsModalOpen(true);
    }

    function openEditModal(product: Product) {
        setEditingProduct(product);
        setFormData(product);
        setIsModalOpen(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingProduct && editingProduct.id) {
                // Update existing
                const { id, ...updateData } = formData; // Strip ID to prevent PK update issues
                const updated = await api.updateProduct(editingProduct.id, updateData);
                setProducts(products.map(p => p.id === updated.id ? updated : p));
            } else {
                // Create new
                const created = await api.createProduct(formData);
                setProducts([...products, created]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Failed to save product");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Products</h2>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                    <Plus className="h-4 w-4" /> Add Product
                </button>
            </div>

            {/* Product Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{product.name}</div>
                                    <div className="text-sm text-slate-500">{product.brand}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{product.category}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{product.price}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-900 mr-3">
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-slate-500">No products found. Add one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5 text-slate-500" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                <input required className="w-full rounded border p-2 dark:bg-slate-700 dark:border-slate-600" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Brand</label>
                                    <input required className="w-full rounded border p-2 dark:bg-slate-700 dark:border-slate-600" value={formData.brand || ""} onChange={e => setFormData({ ...formData, brand: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price</label>
                                    <input required className="w-full rounded border p-2 dark:bg-slate-700 dark:border-slate-600" value={formData.price || ""} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="e.g. ₹9.99" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <select className="w-full rounded border p-2 dark:bg-slate-700 dark:border-slate-600" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option>Fans</option>
                                        <option>Lighting</option>
                                        <option>Switches</option>
                                        <option>Wires</option>
                                        <option>Accessories</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Image URL</label>
                                    <input required className="w-full rounded border p-2 dark:bg-slate-700 dark:border-slate-600" value={formData.image || ""} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea className="w-full rounded border p-2 dark:bg-slate-700 dark:border-slate-600" rows={3} value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded bg-primary py-2 text-white font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Save Product')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
