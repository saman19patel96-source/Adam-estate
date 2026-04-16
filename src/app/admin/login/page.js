"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Welcome back!");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 gradient-radial-gold opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl">
            <span className="text-ivory">Adam</span>
            <span className="text-champagne ml-1.5">Estate</span>
          </h1>
          <p className="text-ivory-muted text-sm font-light mt-2 tracking-wide">
            Administration Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-strong rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="admin@adamestate.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-muted hover:text-champagne transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-champagne hover:bg-champagne-light text-obsidian font-medium text-sm tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-ivory-muted/30 text-xs mt-8 font-light">
          Protected area. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
