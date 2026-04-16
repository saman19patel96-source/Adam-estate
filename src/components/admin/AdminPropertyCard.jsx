"use client";

import { useState } from "react";
import { Pencil, Trash2, MapPin, Bed, Bath, Maximize } from "lucide-react";

export default function AdminPropertyCard({ property, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    notation: property.price >= 10000000 ? "compact" : "standard",
  }).format(property.price);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(property.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
      // Auto-dismiss confirmation after 3 seconds
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className="admin-card overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=60"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-light/80 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`status-badge ${
              property.status === "available"
                ? "status-available"
                : "status-sold"
            }`}
          >
            {property.status === "available" ? "Available" : "Sold"}
          </span>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-3 right-3">
            <span className="status-badge bg-champagne/20 text-champagne border border-champagne/30">
              Featured
            </span>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p className="text-champagne font-serif text-xl font-semibold">
            {formattedPrice}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg text-ivory mb-1 truncate">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-ivory-muted text-sm mb-3">
          <MapPin size={12} className="text-champagne/50" />
          <span className="font-light truncate">{property.location}</span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-4 text-ivory-muted text-xs mb-4 pb-4 border-b border-champagne/10">
          <div className="flex items-center gap-1">
            <Bed size={12} className="text-champagne/40" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={12} className="text-champagne/40" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={12} className="text-champagne/40" />
            <span>{property.sqft?.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(property)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-ivory-muted hover:text-champagne border border-champagne/10 hover:border-champagne/30 rounded-lg transition-all duration-300"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg transition-all duration-300 ${
              confirmDelete
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "text-ivory-muted hover:text-red-400 border border-champagne/10 hover:border-red-500/30"
            }`}
          >
            <Trash2 size={14} />
            {confirmDelete ? "Confirm?" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
