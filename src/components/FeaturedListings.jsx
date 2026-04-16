"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PropertyCard from "./PropertyCard";

// Fallback sample data when Supabase is not configured
const sampleProperties = [
  {
    id: "1",
    title: "The Celestial Penthouse",
    price: 250000000,
    location: "Worli, Mumbai",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 8500,
    status: "available",
    image_url:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    featured: true,
  },
  {
    id: "2",
    title: "Azure Oceanfront Villa",
    price: 180000000,
    location: "Juhu, Mumbai",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 6200,
    status: "available",
    image_url:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    title: "Imperial Heritage Manor",
    price: 420000000,
    location: "Malabar Hill, Mumbai",
    bedrooms: 7,
    bathrooms: 8,
    sqft: 12000,
    status: "available",
    image_url:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    featured: true,
  },
  {
    id: "4",
    title: "Skyline Duplex Residence",
    price: 95000000,
    location: "Bandra West, Mumbai",
    bedrooms: 3,
    bathrooms: 4,
    sqft: 4500,
    status: "sold",
    image_url:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    featured: true,
  },
  {
    id: "5",
    title: "The Sapphire Terrace",
    price: 310000000,
    location: "Lower Parel, Mumbai",
    bedrooms: 6,
    bathrooms: 7,
    sqft: 9800,
    status: "available",
    image_url:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    featured: true,
  },
  {
    id: "6",
    title: "Emerald Bay Estate",
    price: 560000000,
    location: "Alibaug, Mumbai",
    bedrooms: 8,
    bathrooms: 10,
    sqft: 15000,
    status: "available",
    image_url:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    featured: true,
  },
];

export default function FeaturedListings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="featured" className="relative py-32 px-6 lg:px-8" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 gradient-radial-gold pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block text-champagne text-xs tracking-[0.4em] uppercase font-light mb-4"
          >
            Curated Selection
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-6"
          >
            Featured <span className="italic text-champagne">Residences</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="section-divider mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-ivory-muted font-light max-w-xl mx-auto leading-relaxed"
          >
            Each property in our collection has been meticulously selected for
            its exceptional quality, prime location, and timeless design.
          </motion.p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <PropertyCard property={property} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
