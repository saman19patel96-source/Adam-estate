"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";

const floatClasses = [
  "animate-float",
  "animate-float-slow",
  "animate-float-delayed",
];

export default function PropertyCard({ property, index = 0 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Each card gets a slightly different parallax speed
  const parallaxOffset = 30 + (index % 3) * 20;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxOffset, -parallaxOffset]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  // Format price
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    notation: property.price >= 10000000 ? "compact" : "standard",
  }).format(property.price);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={`${floatClasses[index % 3]} group`}
    >
      <div className="card-glow rounded-xl overflow-hidden bg-obsidian-light border border-champagne/5">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.image_url || "/placeholder-property.jpg"}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-light/90 via-transparent to-transparent" />

          {/* Status Badge */}
          {property.status && (
            <div className="absolute top-4 right-4">
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
          )}

          {/* Price Overlay */}
          <div className="absolute bottom-4 left-4">
            <p className="text-champagne font-serif text-2xl font-semibold">
              {formattedPrice}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-xl text-ivory mb-2 group-hover:text-champagne transition-colors duration-300">
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-ivory-muted text-sm mb-4">
            <MapPin size={14} className="text-champagne/60" />
            <span className="font-light">{property.location}</span>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-5 pt-4 border-t border-champagne/10">
            <div className="flex items-center gap-1.5 text-ivory-muted text-sm">
              <Bed size={14} className="text-champagne/50" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 text-ivory-muted text-sm">
              <Bath size={14} className="text-champagne/50" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 text-ivory-muted text-sm">
              <Maximize size={14} className="text-champagne/50" />
              <span>{property.sqft?.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
