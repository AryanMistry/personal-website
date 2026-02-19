"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-background-secondary mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex justify-center">
        <motion.button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary hoverable transition-colors duration-150"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <span className="text-sm">Back to top</span>
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  );
}

