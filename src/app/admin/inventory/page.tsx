"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AshraLogo from "@/components/ui/AshraLogo";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { STATIC_PRODUCTS, Product } from "@/data/products";
import {
  Package,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Edit2,
  Trash2,
  LogOut,
  ExternalLink,
  Save,
  X,
  Database,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";

interface EditableProduct extends Product {
  stockQuantity: number;
}

export default function AdminInventoryPage() {
  const router = useRouter();
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>("admin@ashragardens.com");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<EditableProduct | null>(null);

  // Form State for Adding / Editing
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    slug: string;
    category: string;
    price: number;
    unit: string;
    stockQuantity: number;
    availability: "AVAILABLE" | "OUT_OF_STOCK" | "CONTACT_FOR_AVAILABILITY";
    shortDescription: string;
    description: string;
    image: string;
    tags: string;
  }>({
    id: "",
    name: "",
    slug: "",
    category: "Flowering Plants",
    price: 150,
    unit: "per pot",
    stockQuantity: 25,
    availability: "AVAILABLE",
    shortDescription: "",
    description: "",
    image: "/images/products/kashmiri-rose.jpg",
    tags: "Nursery, Plants",
  });

  // Check auth and load products
  useEffect(() => {
    const init = async () => {
      if (supabase && isSupabaseConfigured) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/admin/login");
          return;
        }
        if (session.user.email) setAdminEmail(session.user.email);
        await loadSupabaseProducts();
      } else {
        const demoAuth = localStorage.getItem("ashragardens_admin_demo");
        if (demoAuth !== "true") {
          router.push("/admin/login");
          return;
        }
        const email = localStorage.getItem("ashragardens_admin_email");
        if (email) setAdminEmail(email);

        // Load local/initial products
        const saved = localStorage.getItem("ashragardens_inventory_store");
        if (saved) {
          try {
            setProducts(JSON.parse(saved));
          } catch {
            setProducts(
              STATIC_PRODUCTS.map((p) => ({ ...p, stockQuantity: 30 }))
            );
          }
        } else {
          setProducts(STATIC_PRODUCTS.map((p) => ({ ...p, stockQuantity: 30 })));
        }
        setLoading(false);
      }
    };

    init();
  }, [router]);

  const loadSupabaseProducts = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        // fallback to static
        setProducts(STATIC_PRODUCTS.map((p) => ({ ...p, stockQuantity: 30 })));
      } else if (data && data.length > 0) {
        const mapped: EditableProduct[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          category: item.category,
          price: Number(item.price),
          unit: item.unit,
          stockQuantity: item.stock_quantity ?? 25,
          availability: item.availability,
          shortDescription: item.short_description || "",
          description: item.description || "",
          image: item.image,
          featured: item.featured || false,
          tags: item.tags || [],
        }));
        setProducts(mapped);
      } else {
        // Table is empty, seed with initial catalogue
        setProducts(STATIC_PRODUCTS.map((p) => ({ ...p, stockQuantity: 30 })));
      }
    } catch (err) {
      console.error(err);
      setProducts(STATIC_PRODUCTS.map((p) => ({ ...p, stockQuantity: 30 })));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("ashragardens_admin_demo");
    localStorage.removeItem("ashragardens_admin_email");
    router.push("/admin/login");
  };

  // Quick Stock Adjustment
  const handleUpdateStockQuantity = async (id: string, delta: number) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const newQty = Math.max(0, p.stockQuantity + delta);
        const newAvail: "AVAILABLE" | "OUT_OF_STOCK" | "CONTACT_FOR_AVAILABILITY" =
          newQty === 0
            ? "OUT_OF_STOCK"
            : newQty <= 5
            ? "CONTACT_FOR_AVAILABILITY"
            : "AVAILABLE";
        return { ...p, stockQuantity: newQty, availability: newAvail };
      }
      return p;
    });

    setProducts(updated);
    saveProductChanges(
      id,
      updated.find((p) => p.id === id)!
    );
  };

  // Quick Availability Status Toggle
  const handleUpdateAvailability = async (
    id: string,
    newStatus: "AVAILABLE" | "OUT_OF_STOCK" | "CONTACT_FOR_AVAILABILITY"
  ) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, availability: newStatus };
      }
      return p;
    });

    setProducts(updated);
    saveProductChanges(
      id,
      updated.find((p) => p.id === id)!
    );
  };

  // Quick Price Edit
  const handleUpdatePrice = async (id: string, newPriceStr: string) => {
    const num = parseFloat(newPriceStr);
    if (isNaN(num) || num < 0) return;

    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, price: num };
      }
      return p;
    });

    setProducts(updated);
    saveProductChanges(
      id,
      updated.find((p) => p.id === id)!
    );
  };

  // Persist Product Changes
  const saveProductChanges = async (id: string, item: EditableProduct) => {
    setSavingId(id);
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase
          .from("products")
          .update({
            stock_quantity: item.stockQuantity,
            availability: item.availability,
            price: item.price,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);
      } catch (err) {
        console.error("Failed to update in Supabase", err);
      }
    } else {
      // Local fallback
      localStorage.setItem("ashragardens_inventory_store", JSON.stringify(products));
    }
    setTimeout(() => setSavingId(null), 600);
  };

  // Open Edit Modal
  const openEditModal = (p: EditableProduct) => {
    setEditingProduct(p);
    setFormData({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price ?? 0,
      unit: p.unit,
      stockQuantity: p.stockQuantity ?? 25,
      availability: p.availability,
      shortDescription: p.shortDescription,
      description: p.description,
      image: p.image,
      tags: p.tags.join(", "),
    });
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingProduct(null);
    const generatedId = `prod-${Date.now().toString().slice(-4)}`;
    setFormData({
      id: generatedId,
      name: "",
      slug: "",
      category: "Flowering Plants",
      price: 150,
      unit: "per pot",
      stockQuantity: 25,
      availability: "AVAILABLE",
      shortDescription: "",
      description: "",
      image: "/images/products/kashmiri-rose.jpg",
      tags: "Plant, Nursery",
    });
    setIsAddModalOpen(true);
  };

  // Save Modal Form (Add or Edit)
  const handleSaveModalForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const slug =
      formData.slug ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newProduct: EditableProduct = {
      id: formData.id,
      name: formData.name,
      slug: slug,
      category: formData.category as any,
      price: Number(formData.price),
      unit: formData.unit,
      stockQuantity: Number(formData.stockQuantity),
      availability: formData.availability,
      shortDescription: formData.shortDescription,
      description: formData.description,
      image: formData.image,
      featured: false,
      tags: tagArray,
    };

    if (editingProduct) {
      // Edit existing
      const updated = products.map((p) =>
        p.id === editingProduct.id ? newProduct : p
      );
      setProducts(updated);

      if (supabase && isSupabaseConfigured) {
        await supabase
          .from("products")
          .update({
            name: newProduct.name,
            slug: newProduct.slug,
            category: newProduct.category,
            price: newProduct.price,
            unit: newProduct.unit,
            stock_quantity: newProduct.stockQuantity,
            availability: newProduct.availability,
            short_description: newProduct.shortDescription,
            description: newProduct.description,
            image: newProduct.image,
            tags: newProduct.tags,
            updated_at: new Date().toISOString(),
          })
          .eq("id", newProduct.id);
      } else {
        localStorage.setItem(
          "ashragardens_inventory_store",
          JSON.stringify(updated)
        );
      }
      setEditingProduct(null);
    } else {
      // Add new
      const updated = [newProduct, ...products];
      setProducts(updated);

      if (supabase && isSupabaseConfigured) {
        await supabase.from("products").insert([
          {
            id: newProduct.id,
            name: newProduct.name,
            slug: newProduct.slug,
            category: newProduct.category,
            price: newProduct.price,
            unit: newProduct.unit,
            stock_quantity: newProduct.stockQuantity,
            availability: newProduct.availability,
            short_description: newProduct.shortDescription,
            description: newProduct.description,
            image: newProduct.image,
            tags: newProduct.tags,
            featured: false,
          },
        ]);
      } else {
        localStorage.setItem(
          "ashragardens_inventory_store",
          JSON.stringify(updated)
        );
      }
      setIsAddModalOpen(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      return;
    }

    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);

    if (supabase && isSupabaseConfigured) {
      await supabase.from("products").delete().eq("id", id);
    } else {
      localStorage.setItem("ashragardens_inventory_store", JSON.stringify(updated));
    }
  };

  // Filtered list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === "ALL" || p.category === categoryFilter;

    const matchesStatus =
      statusFilter === "ALL" || p.availability === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate metrics
  const totalCount = products.length;
  const inStockCount = products.filter((p) => p.availability === "AVAILABLE").length;
  const contactCount = products.filter(
    (p) => p.availability === "CONTACT_FOR_AVAILABILITY"
  ).length;
  const outOfStockCount = products.filter(
    (p) => p.availability === "OUT_OF_STOCK"
  ).length;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#14261f] flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-[#051c14] text-white border-b border-emerald-900 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="transition-transform hover:scale-105">
              <AshraLogo variant="light" size="sm" />
            </Link>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-[11px] font-bold uppercase tracking-wider text-emerald-200 border border-emerald-600/40">
              Inventory &amp; Operations Portal
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-stone-300 font-medium">{adminEmail}</span>
              <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-wider">
                {isSupabaseConfigured ? "Supabase Live Connected" : "Local Preview Engine"}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Supabase Engine Status Notice */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isSupabaseConfigured ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Database Architecture
              </p>
              <h2 className="text-sm font-bold text-[#062419]">
                {isSupabaseConfigured
                  ? "Supabase PostgreSQL Database Connected (public.products)"
                  : "Interactive Preview Mode (Ready for Supabase credentials)"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isSupabaseConfigured) loadSupabaseProducts();
                else window.location.reload();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Stock</span>
            </button>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#062419] hover:bg-[#0c3827] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add New Plant / Product</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Total Catalog Items
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-extrabold text-[#062419]">
                {totalCount}
              </span>
              <Package className="w-5 h-5 text-stone-400" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              In Stock &amp; Available
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-extrabold text-emerald-900">
                {inStockCount}
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-100 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Low / Inquire Only
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-extrabold text-amber-900">
                {contactCount}
              </span>
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-100 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
              Out of Stock
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-extrabold text-rose-900">
                {outOfStockCount}
              </span>
              <XCircle className="w-5 h-5 text-rose-700" />
            </div>
          </div>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by plant name, category, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="ALL">All Categories</option>
              <option value="Flowering Plants">Flowering Plants</option>
              <option value="Fruit Plants">Fruit Plants</option>
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Pots & Planters">Pots &amp; Planters</option>
              <option value="Soil & Fertilizers">Soil &amp; Fertilizers</option>
              <option value="Seeds">Seeds</option>
              <option value="Gardening Tools">Gardening Tools</option>
              <option value="Plant Care">Plant Care</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="ALL">All Availability</option>
              <option value="AVAILABLE">Available Only</option>
              <option value="CONTACT_FOR_AVAILABILITY">Contact Only</option>
              <option value="OUT_OF_STOCK">Out of Stock Only</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price &amp; Unit</th>
                  <th className="py-4 px-4">Stock Counter</th>
                  <th className="py-4 px-4">Status Selector</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-stone-400">
                      Loading inventory records...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-stone-400">
                      No matching products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const isSaving = savingId === p.id;
                    return (
                      <tr
                        key={p.id}
                        className={`hover:bg-stone-50/70 transition-colors ${
                          isSaving ? "bg-emerald-50/40" : ""
                        }`}
                      >
                        {/* Thumbnail & Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-[#062419] text-sm">
                                {p.name}
                              </p>
                              <span className="text-[11px] text-stone-400 font-mono">
                                /{p.slug}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-medium text-[11px]">
                            {p.category}
                          </span>
                        </td>

                        {/* Price & Unit (Editable on blur) */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 font-bold text-stone-900">
                              <span>₹</span>
                              <input
                                type="number"
                                defaultValue={p.price}
                                onBlur={(e) =>
                                  handleUpdatePrice(p.id, e.target.value)
                                }
                                className="w-16 px-1.5 py-0.5 rounded border border-stone-200 text-xs font-bold text-[#062419] focus:outline-none focus:ring-1 focus:ring-emerald-700"
                              />
                            </div>
                            <span className="text-[10px] text-stone-400 block font-light">
                              {p.unit}
                            </span>
                          </div>
                        </td>

                        {/* Live Stock Counter */}
                        <td className="py-4 px-4">
                          <div className="inline-flex items-center border border-stone-200 rounded-xl bg-white shadow-sm overflow-hidden">
                            <button
                              onClick={() => handleUpdateStockQuantity(p.id, -1)}
                              className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-bold transition-colors"
                              title="Decrease stock by 1"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-mono font-bold text-xs text-[#062419] min-w-[2.5rem] text-center">
                              {p.stockQuantity}
                            </span>
                            <button
                              onClick={() => handleUpdateStockQuantity(p.id, 1)}
                              className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-bold transition-colors"
                              title="Increase stock by 1"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Availability Dropdown with Direct Status Color */}
                        <td className="py-4 px-4">
                          <select
                            value={p.availability}
                            onChange={(e) =>
                              handleUpdateAvailability(
                                p.id,
                                e.target.value as any
                              )
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-bold focus:outline-none cursor-pointer border ${
                              p.availability === "AVAILABLE"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : p.availability === "OUT_OF_STOCK"
                                ? "bg-rose-100 text-rose-800 border-rose-300"
                                : "bg-amber-100 text-amber-800 border-amber-300"
                            }`}
                          >
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="CONTACT_FOR_AVAILABILITY">
                              CONTACT FOR STOCK
                            </option>
                            <option value="OUT_OF_STOCK">OUT OF STOCK</option>
                          </select>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                            title="Edit Product Details"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif text-xl font-bold text-[#062419]">
                {editingProduct ? "Edit Product Details" : "Add New Botanical Product"}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Kashmiri Royal Rose Plant"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  >
                    <option value="Flowering Plants">Flowering Plants</option>
                    <option value="Fruit Plants">Fruit Plants</option>
                    <option value="Indoor Plants">Indoor Plants</option>
                    <option value="Pots & Planters">Pots &amp; Planters</option>
                    <option value="Soil & Fertilizers">Soil &amp; Fertilizers</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Gardening Tools">Gardening Tools</option>
                    <option value="Plant Care">Plant Care</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    placeholder="e.g. per plant, 5 kg bag"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Initial Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockQuantity: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Stock Availability State *
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData({ ...formData, availability: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  >
                    <option value="AVAILABLE">AVAILABLE (In Stock)</option>
                    <option value="CONTACT_FOR_AVAILABILITY">
                      CONTACT FOR AVAILABILITY
                    </option>
                    <option value="OUT_OF_STOCK">OUT OF STOCK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="/images/products/kashmiri-rose.jpg"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                  placeholder="One sentence summary for product cards"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Comprehensive botanical specifications, sunlight requirements, and potting guidelines"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="Rose, Perennial, Outdoor"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#062419] hover:bg-[#0c3827] text-white font-bold uppercase tracking-wider shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
