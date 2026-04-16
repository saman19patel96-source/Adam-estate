"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Properties", href: "#featured" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#footer" },
];

function MagneticNavItem({ children, href }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setPosition({
      x: (clientX - centerX) * 0.2,
      y: (clientY - centerY) * 0.2,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative text-ivory-muted hover:text-champagne transition-colors duration-300 text-sm tracking-widest uppercase font-light"
    >
      {children}
    </motion.a>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-obsidian/70 border-b border-champagne/10"
        style={{ opacity: bgOpacity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative group">
            <span className="font-serif text-2xl text-ivory tracking-wider">
              Adam
            </span>
            <span className="font-serif text-2xl text-champagne ml-1 tracking-wider">
              Estate
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-champagne transition-all duration-500 group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <MagneticNavItem key={link.label} href={link.href}>
                {link.label}
              </MagneticNavItem>
            ))}
            <Link
              href="/admin"
              className="ml-4 magnetic-btn !py-2 !px-6 !text-xs no-underline"
            >
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-ivory hover:text-champagne transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileOpen ? "auto" : 0,
          opacity: isMobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden glass-strong"
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="block text-ivory-muted hover:text-champagne transition-colors text-sm tracking-widest uppercase"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin"
            onClick={() => setIsMobileOpen(false)}
            className="block text-champagne text-sm tracking-widest uppercase pt-4 border-t border-champagne/10"
          >
            Dashboard
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
