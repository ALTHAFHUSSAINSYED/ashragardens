import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCatalogView from "@/components/catalog/ProductCatalogView";

export const metadata = {
  title: "Living Plants & Saplings | AshraGardens Piduguralla",
  description:
    "Explore our range of flowering plants, fruit grafts, roses, jasmine, and foliage saplings hardened for Piduguralla and Palnadu conditions.",
};

export default function PlantsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />
      <main className="flex-1">
        <ProductCatalogView initialCategory="Plants" pageTitle="Living Plants &amp; Saplings" />
      </main>
      <Footer />
    </div>
  );
}
