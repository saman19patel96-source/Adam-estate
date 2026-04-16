"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Award, Globe, Shield, Star } from "lucide-react";

const stats = [
  { icon: Award, value: "₹12,000 Cr+", label: "Portfolio Value" },
  { icon: Globe, value: "150+", label: "Exclusive Properties" },
  { icon: Shield, value: "20+", label: "Years of Legacy" },
  { icon: Star, value: "99%", label: "Client Satisfaction" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
    >
      {/* Decorative floating element */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -right-32 top-1/4 w-96 h-96 border border-champagne/5 rounded-full animate-float-slow pointer-events-none"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute -left-16 bottom-1/4 w-64 h-64 border border-champagne/5 rounded-full animate-float-delayed pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="inline-block text-champagne text-xs tracking-[0.4em] uppercase font-light mb-4"
            >
              Our Philosophy
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-ivory mb-8 leading-tight"
            >
              Where Vision Meets{" "}
              <span className="italic text-champagne">Prestige</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="section-divider mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-ivory-muted font-light leading-relaxed mb-6"
            >
              Adam Estate is not merely a real estate agency — we are architects
              of lifestyle. For over two decades, we have been the trusted
              custodians of Mumbai&apos;s most prestigious addresses, connecting
              visionary individuals with residences that transcend the ordinary.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-ivory-muted font-light leading-relaxed"
            >
              Every property in our collection is handpicked for its
              architectural significance, unmatched location, and potential to
              become a generational legacy. We don&apos;t just sell homes —
              we craft legacies.
            </motion.p>
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`glass rounded-xl p-6 text-center ${
                  index % 3 === 0
                    ? "animate-float"
                    : index % 3 === 1
                    ? "animate-float-slow"
                    : "animate-float-delayed"
                }`}
              >
                <stat.icon
                  size={24}
                  className="text-champagne mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <p className="font-serif text-2xl md:text-3xl text-ivory mb-1">
                  {stat.value}
                </p>
                <p className="text-ivory-muted text-xs tracking-widest uppercase font-light">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
