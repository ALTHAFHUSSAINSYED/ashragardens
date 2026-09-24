import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { STATIC_PRODUCTS } from "@/data/products";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { getProductSmsUrl } from "@/lib/sms";
import ProductDetailActions from "@/components/catalog/ProductDetailActions";
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Sun,
  Droplets,
  Layers,
  Sparkles,
  ShieldCheck,
  Truck,
  MapPin,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return STATIC_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = STATIC_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found | AshraGardens" };

  return {
    title: `${product.name} | AshraGardens Piduguralla`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = STATIC_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const whatsappUrl = getProductWhatsAppUrl(product.name, product.slug);
  const smsUrl = getProductSmsUrl(product.name);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
          </div>

          {/* Product Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Large High-Resolution Image (6 cols) */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-6 left-6">
                {product.availability === "AVAILABLE" && (
                  <span className="bg-emerald-800/90 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full backdrop-blur-md shadow-md">
                    In Stock at Mayabazar Hub
                  </span>
                )}
                {product.availability === "CONTACT_FOR_AVAILABILITY" && (
                  <span className="bg-amber-600/90 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full backdrop-blur-md shadow-md">
                    Contact for Availability
                  </span>
                )}
              </div>
            </div>

            {/* Right: Specifications & Direct Ordering (6 cols) */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800 block">
                  {product.category}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#062419] leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
                  {product.shortDescription}
                </p>
              </div>

              {/* Price Display */}
              <div className="p-6 bg-white rounded-3xl border border-stone-200/90 shadow-sm flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                    Local Nursery Price
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#062419]">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-stone-600 font-medium">
                      {product.unit}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-emerald-800 font-medium space-y-0.5">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-700" />
                    Delivery: Piduguralla ~30 km
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    Mayabazar Nursery Pickup Available
                  </span>
                </div>
              </div>

              {/* Comprehensive Description */}
              <div className="space-y-3 text-sm text-stone-700 leading-relaxed font-normal">
                <h3 className="font-serif text-lg font-bold text-[#062419]">
                  About This Plant / Product
                </h3>
                <p>{product.description}</p>
              </div>

              {/* Plant Care Details (if applicable) */}
              {product.careInfo && (
                <div className="bg-[#f4efe6] rounded-3xl p-6 border border-stone-200 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#062419] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>Botanical Care Guide</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
                    <div className="flex items-start gap-2.5">
                      <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-stone-900 font-semibold">Sunlight:</strong>
                        <span>{product.careInfo.sunlight}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Droplets className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-stone-900 font-semibold">Watering:</strong>
                        <span>{product.careInfo.watering}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 col-span-1 sm:col-span-2">
                      <Layers className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-stone-900 font-semibold">Soil Requirement:</strong>
                        <span>{product.careInfo.soil}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Cart & Ordering Actions */}
              <ProductDetailActions
                product={product}
                smsUrl={smsUrl}
                whatsappUrl={whatsappUrl}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
