"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  onClick,
  className = "",
  strength = 0.3,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      setPosition({
        x: (clientX - centerX) * strength,
        y: (clientY - centerY) * strength,
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`magnetic-btn ${className}`}
      {...props}
    >
      <span>{children}</span>
    </motion.button>
  );
}
