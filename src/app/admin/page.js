"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AdminPropertyCard from "@/components/admin/AdminPropertyCard";
import PropertyForm from "@/components/admin/PropertyForm";
import { Plus, LogOut, Home, LayoutGrid, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const router = useRouter();

  // Check auth
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/admin/login");
        return;
      }
      setUser(session.user);
      fetchProperties();
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch properties");
      console.error(error);
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  const handleCreate = async (formData) => {
    const { data, error } = await supabase
      .from("properties")
      .insert([formData])
      .select();

    if (error) {
      toast.error("Failed to create property: " + error.message);
      return false;
    }

    toast.success("Property created successfully");
    setShowForm(false);
    fetchProperties();
    return true;
  };

  const handleUpdate = async (id, formData) => {
    const { error } = await supabase
      .from("properties")
      .update(formData)
      .eq("id", id);

    if (error) {
      toast.error("Failed to update property: " + error.message);
      return false;
    }

    toast.success("Property updated successfully");
    setEditProperty(null);
    setShowForm(false);
    fetchProperties();
    return true;
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete property: " + error.message);
      return;
    }

    toast.success("Property deleted successfully");
    fetchProperties();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    router.push("/admin/login");
  };

  const openEditForm = (property) => {
    setEditProperty(property);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditProperty(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-champagne animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 glass-strong border-b border-champagne/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-serif text-xl">
              <span className="text-ivory">Adam</span>
              <span className="text-champagne ml-1">Estate</span>
            </Link>
            <span className="text-champagne/20">|</span>
            <div className="flex items-center gap-2 text-ivory-muted text-sm">
              <LayoutGrid size={14} />
              <span className="font-light">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-ivory-muted hover:text-champagne transition-colors"
              title="View Site"
            >
              <Home size={18} />
            </Link>
            <span className="text-ivory-muted/30 text-xs font-light hidden sm:inline">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-ivory-muted hover:text-red-400 transition-colors text-sm"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-serif text-3xl text-ivory mb-1">
              Properties
            </h1>
            <p className="text-ivory-muted text-sm font-light">
              Manage your luxury property listings
            </p>
          </div>

          <button
            onClick={() => {
              setEditProperty(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 py-3 px-6 bg-champagne hover:bg-champagne-light text-obsidian font-medium text-sm tracking-wider uppercase rounded-lg transition-all duration-300"
          >
            <Plus size={18} />
            Add Property
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Total Properties",
              value: properties.length,
            },
            {
              label: "Available",
              value: properties.filter((p) => p.status === "available").length,
            },
            {
              label: "Sold",
              value: properties.filter((p) => p.status === "sold").length,
            },
            {
              label: "Featured",
              value: properties.filter((p) => p.featured).length,
            },
          ].map((stat) => (
            <div key={stat.label} className="admin-card p-5 text-center">
              <p className="font-serif text-2xl text-champagne mb-1">
                {stat.value}
              </p>
              <p className="text-ivory-muted text-xs tracking-widest uppercase font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-champagne animate-spin" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ivory-muted text-lg font-light mb-4">
              No properties yet
            </p>
            <p className="text-ivory-muted/50 text-sm font-light mb-8">
              Click &quot;Add Property&quot; to create your first listing
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 py-3 px-6 bg-champagne hover:bg-champagne-light text-obsidian font-medium text-sm tracking-wider uppercase rounded-lg transition-all duration-300"
            >
              <Plus size={18} />
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <AdminPropertyCard
                key={property.id}
                property={property}
                onEdit={openEditForm}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editProperty}
          onSubmit={editProperty ? handleUpdate : handleCreate}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
