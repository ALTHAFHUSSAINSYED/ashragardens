import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCatalogView from "@/components/catalog/ProductCatalogView";

export const metadata = {
  title: "Pots, Supplies & Garden Catalog | AshraGardens Piduguralla",
  description:
    "Browse glazed ceramic pots, heavy plant stands, red soils, vermicompost, gardening tools, and seeds available at AshraGardens in Mayabazar, Piduguralla.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />
      <main className="flex-1">
        <ProductCatalogView initialCategory="all" pageTitle="Pots, Planters &amp; Garden Supplies" />
      </main>
      <Footer />
    </div>
  );
}
