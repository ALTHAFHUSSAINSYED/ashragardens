"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AshraLogo from "@/components/ui/AshraLogo";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      if (supabase) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          router.push("/admin/inventory");
        }
      } else {
        const demoAuth = localStorage.getItem("ashragardens_admin_demo");
        if (demoAuth === "true") {
          router.push("/admin/inventory");
        }
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      if (supabase && isSupabaseConfigured) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setErrorMsg(error.message);
        } else {
          router.push("/admin/inventory");
        }
      } else {
        // Demo Auth Fallback (Allows immediate local inspection before Supabase keys are pasted)
        if (email.toLowerCase().includes("admin") || email === "ashragardens@gmail.com") {
          localStorage.setItem("ashragardens_admin_demo", "true");
          localStorage.setItem("ashragardens_admin_email", email);
          router.push("/admin/inventory");
        } else {
          // Allow any login in demo mode for frictionless developer verification
          localStorage.setItem("ashragardens_admin_demo", "true");
          localStorage.setItem("ashragardens_admin_email", email);
          router.push("/admin/inventory");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    setEmail("admin@ashragardens.com");
    setPassword("AshraAdmin@2026");
    localStorage.setItem("ashragardens_admin_demo", "true");
    localStorage.setItem("ashragardens_admin_email", "admin@ashragardens.com");
    router.push("/admin/inventory");
  };

  return (
    <div className="min-h-screen bg-[#04140e] text-[#faf8f5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 space-y-6 text-center">
        <Link href="/" className="inline-block transition-transform hover:scale-105">
          <AshraLogo variant="light" size="lg" className="justify-center" />
        </Link>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#fbf8f2]">
            Staff &amp; Inventory Portal
          </h2>
          <p className="mt-1 text-xs text-stone-400 font-light">
            Secure administrative access for nursery inventory and pricing control
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-[#061f16]/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-emerald-800/60 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-stone-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Database Engine:
            </span>
            <span className={isSupabaseConfigured ? "text-emerald-400 font-bold" : "text-amber-300 font-bold"}>
              {isSupabaseConfigured ? "Supabase PostgreSQL Live" : "Interactive Demo Mode"}
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-1.5">
                Staff Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-emerald-400/70" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ashragardens.com"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-[#03130d] border border-emerald-700/50 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-emerald-400/70" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-[#03130d] border border-emerald-700/50 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-md text-sm font-bold uppercase tracking-wider text-[#041c13] bg-[#52b788] hover:bg-[#40916c] focus:outline-none transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Inventory"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Instant Demo Login for Testing */}
          <div className="pt-4 border-t border-emerald-900/60 text-center">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="text-xs text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Click Demo Access (Admin Preview)</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-emerald-300 transition-colors"
            >
              &larr; Back to AshraGardens Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
