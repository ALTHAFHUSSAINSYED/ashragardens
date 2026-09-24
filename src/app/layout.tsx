import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import ContinuousBotanicalFloating from "@/components/animations/ContinuousBotanicalFloating";
import WateringGrowthLoader from "@/components/animations/WateringGrowthLoader";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashragardens.com"),
  title: "AshraGardens | Nursery, Plants, Pots, Garden Supplies & Services — Piduguralla",
  description:
    "AshraGardens offers fresh flower & fruit plants, plant pots, metal stands, nursery accessories, organic soils, fertilizers, and landscaping services. Local delivery within 30 km radius of Piduguralla, Palnadu District, AP.",
  keywords: [
    "AshraGardens",
    "Piduguralla plant nursery",
    "plants delivery Piduguralla",
    "plant pots stands Palnadu",
    "vermicompost red soil Piduguralla",
    "gardening services Piduguralla",
    "terrace garden setup AP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#faf8f5] text-[#14261f] min-h-screen relative selection:bg-[#52b788] selection:text-[#061d15]">
        <CartProvider>
          {/* Flagship Watering & Plant Growth Animation Loader (Plays on Initial Load & Every Reload/Restart) */}
          <WateringGrowthLoader minDurationMs={3600} />

          {/* Ambient Continuous Floating Leaves, Petals & Sunlight Particles */}
          <ContinuousBotanicalFloating />

          {/* Cart Slide-Over Drawer */}
          <CartDrawer />

          {/* Main Application Content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
