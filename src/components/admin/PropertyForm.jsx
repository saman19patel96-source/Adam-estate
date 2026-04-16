"use client";

import { useState, useEffect, useRef } from "react";
import { X, Save, Loader2 } from "lucide-react";

const initialFormState = {
  title: "",
  price: "",
  location: "",
  bedrooms: "",
  bathrooms: "",
  sqft: "",
  status: "available",
  image_url: "",
  featured: false,
  description: "",
};

export default function PropertyForm({ property, onSubmit, onClose }) {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);

  // Pre-fill when editing
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        price: property.price?.toString() || "",
        location: property.location || "",
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        sqft: property.sqft?.toString() || "",
        status: property.status || "available",
        image_url: property.image_url || "",
        featured: property.featured || false,
        description: property.description || "",
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
      price: parseInt(formData.price, 10),
      location: formData.location,
      bedrooms: parseInt(formData.bedrooms, 10),
      bathrooms: parseInt(formData.bathrooms, 10),
      sqft: parseInt(formData.sqft, 10),
      status: formData.status,
      image_url: formData.image_url || null,
      featured: formData.featured,
      description: formData.description || null,
    };

    let success;
    if (property) {
      success = await onSubmit(property.id, payload);
    } else {
      success = await onSubmit(payload);
    }

    setLoading(false);
    if (success) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 border-b border-champagne/10 bg-slate/90 backdrop-blur-sm rounded-t-2xl">
          <div>
            <h2 className="font-serif text-2xl text-ivory">
              {property ? "Edit Property" : "Add New Property"}
            </h2>
            <p className="text-ivory-muted text-sm font-light mt-1">
              {property
                ? "Update the listing details"
                : "Create a new luxury listing"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-ivory-muted hover:text-ivory transition-colors p-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
              Property Title *
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="admin-input"
              placeholder="The Celestial Penthouse"
              required
            />
          </div>

          {/* Price + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
                Price (₹) *
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="admin-input"
                placeholder="250000000"
                required
              />
            </div>
            <div>
              <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
                Location *
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="admin-input"
                placeholder="Worli, Mumbai"
                required
              />
            </div>
          </div>

          {/* Bedrooms, Bathrooms, SqFt */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
                Bedrooms *
              </label>
              <input
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                className="admin-input"
                placeholder="5"
                required
              />
            </div>
            <div>
              <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
                Bathrooms *
              </label>
              <input
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                className="admin-input"
                placeholder="6"
                required
              />
            </div>
            <div>
              <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
                Sq. Footage *
              </label>
              <input
                name="sqft"
                type="number"
                value={formData.sqft}
                onChange={handleChange}
                className="admin-input"
                placeholder="8500"
                required
              />
            </div>
          </div>

          {/* Status + Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="admin-input appearance-none cursor-pointer"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 rounded-full bg-obsidian border border-champagne/20 peer-checked:bg-champagne/30 peer-checked:border-champagne/50 transition-all duration-300" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-ivory-muted peer-checked:bg-champagne peer-checked:translate-x-5 transition-all duration-300" />
                </div>
                <span className="text-ivory-muted text-sm font-light group-hover:text-ivory transition-colors">
                  Featured listing
                </span>
              </label>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
              Image URL
            </label>
            <input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="admin-input"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-ivory-muted text-xs tracking-widest uppercase mb-2 font-light">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="admin-input min-h-[100px] resize-y"
              placeholder="An exquisite residence featuring panoramic views..."
              rows={4}
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-4 border-t border-champagne/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-ivory-muted hover:text-ivory border border-champagne/10 hover:border-champagne/20 rounded-lg text-sm font-light transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-champagne hover:bg-champagne-light text-obsidian font-medium text-sm tracking-wider uppercase rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Save size={16} />
                  {property ? "Update" : "Create"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
