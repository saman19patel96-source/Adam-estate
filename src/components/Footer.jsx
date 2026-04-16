"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="footer" ref={ref} className="relative pt-24 pb-8 px-6 lg:px-8">
      {/* Top divider */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="font-serif text-3xl mb-4">
              <span className="text-ivory">Adam</span>
              <span className="text-champagne ml-1.5">Estate</span>
            </h3>
            <p className="text-ivory-muted font-light text-sm leading-relaxed max-w-xs">
              Crafting extraordinary living experiences for distinguished
              clientele since 2004. Where luxury finds its address.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-champagne text-xs tracking-[0.3em] uppercase mb-6 font-light">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-ivory-muted hover:text-champagne transition-colors group"
              >
                <Phone size={14} strokeWidth={1.5} className="text-champagne/50 group-hover:text-champagne" />
                <span className="text-sm font-light">+91 98765 43210</span>
              </a>
              <a
                href="mailto:hello@adamestate.com"
                className="flex items-center gap-3 text-ivory-muted hover:text-champagne transition-colors group"
              >
                <Mail size={14} strokeWidth={1.5} className="text-champagne/50 group-hover:text-champagne" />
                <span className="text-sm font-light">hello@adamestate.com</span>
              </a>
              <div className="flex items-start gap-3 text-ivory-muted">
                <MapPin size={14} strokeWidth={1.5} className="text-champagne/50 mt-0.5" />
                <span className="text-sm font-light">
                  One World Tower, Floor 42,
                  <br />
                  Lower Parel, Mumbai 400013
                </span>
              </div>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-champagne text-xs tracking-[0.3em] uppercase mb-6 font-light">
              Follow Us
            </h4>
            <div className="space-y-4">
              {["Instagram", "LinkedIn", "Twitter"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="flex items-center gap-3 text-ivory-muted hover:text-champagne transition-colors group"
                >
                  <span className="text-sm font-light">{platform}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-8 border-t border-champagne/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-ivory-muted/50 text-xs font-light tracking-wide">
            © {new Date().getFullYear()} Adam Estate. All rights reserved.
          </p>
          <p className="text-ivory-muted/30 text-xs font-light tracking-wide">
            Crafted with precision
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
