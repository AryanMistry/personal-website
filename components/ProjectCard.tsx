"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  image?: string | null;
  index: number;
}

export default function ProjectCard({
  name,
  description,
  tech,
  github,
  live,
  image,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      className="bg-background-secondary border border-border rounded-lg overflow-hidden hover:border-text-secondary transition-colors duration-150 hoverable group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(107, 114, 128, 0.1)", transition: { duration: 0.15 } }}
    >
      <div className="h-48 bg-gradient-to-br from-background-elevated to-background-secondary flex items-center justify-center overflow-hidden relative">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-background-primary border border-border flex items-center justify-center">
            <span className="text-2xl text-text-secondary">{name[0]}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">{name}</h3>
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-background-primary border border-border rounded-md text-xs text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-150 text-sm underline-animate relative"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              <span>Code</span>
            </motion.a>
          )}
          {live && (
            <motion.a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-150 text-sm underline-animate relative"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              <span>Live</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

