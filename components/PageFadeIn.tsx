"use client";

import { motion } from "framer-motion";

export default function PageFadeIn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // iOS 같은 감속
      }}
    >
      {children}
    </motion.div>
  );
}
