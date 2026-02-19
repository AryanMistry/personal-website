"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/content";

export default function SocialLinks() {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(profile.socials).map(([key, url]) => {
        if (!url) return null;

        return (
          <motion.a
            key={key}
            href={key === "email" ? `mailto:${url}` : url}
            target={key === "email" ? undefined : "_blank"}
            rel={key === "email" ? undefined : "noopener noreferrer"}
            className="text-xs text-text-secondary hover:text-text-primary hoverable transition-colors duration-150 underline-animate relative inline-block"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={key}
          >
            [ {key} ]
          </motion.a>
        );
      })}
    </div>
  );
}

