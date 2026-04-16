"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const headlineVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.15,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      id="hero"
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster=""
        >
          <source src="/mumbai.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Radial Gold Accent */}
      <div className="absolute inset-0 gradient-radial-gold opacity-50" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ y: textY }}
      >
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <span className="inline-block text-champagne text-xs tracking-[0.4em] uppercase font-light border border-champagne/20 px-6 py-2">
            Hyper-Luxury Real Estate
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          custom={1}
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory leading-[0.95] mb-6 max-w-5xl"
        >
          Residences Beyond{" "}
          <span className="italic text-champagne">Imagination</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="font-sans text-ivory-muted text-base md:text-lg font-light max-w-2xl leading-relaxed mb-10 tracking-wide"
        >
          We curate the most extraordinary properties across the globe for
          distinguished clientele who accept nothing less than perfection.
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
        >
          <MagneticButton
            onClick={() => {
              document
                .getElementById("featured")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Collection
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-ivory-muted text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ChevronDown
          size={16}
          className="text-champagne animate-scroll-indicator"
        />
      </motion.div>
    </section>
  );
}
