"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

export default function FeaturedListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchFeaturedProperties() {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("featured", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProperties(data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProperties();
  }, []);

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
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-champagne animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length > 0 ? (
              properties.map((property, index) => (
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
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-ivory-muted font-light">
                  No featured properties found. Add some in the Admin panel!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
