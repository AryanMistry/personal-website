"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface CTFCardProps {
  event: string;
  date: string;
  rank: string;
  challenges: string[];
  writeups: string[] | null;
  index: number;
}

export default function CTFCard({
  event,
  date,
  rank,
  challenges,
  writeups,
  index,
}: CTFCardProps) {
  return (
    <motion.div
      className="bg-background-secondary border border-border rounded-lg p-6 hover:border-text-secondary transition-colors duration-150 hoverable group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 4, borderLeftWidth: "4px", borderLeftColor: "#6b7280", transition: { duration: 0.15 } }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">{event}</h3>
          <p className="text-text-secondary text-sm">{date}</p>
        </div>
        <motion.div
          className="text-lg font-semibold text-text-secondary mt-2 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {rank}
        </motion.div>
      </div>

      <div className="mb-4">
        <p className="text-text-secondary text-sm mb-2">Notable Challenges:</p>
        <div className="flex flex-wrap gap-2">
          {challenges.map((challenge) => (
            <span
              key={challenge}
              className="px-3 py-1 bg-background-primary border border-border rounded-md text-xs text-text-secondary"
            >
              {challenge}
            </span>
          ))}
        </div>
      </div>

      {writeups && writeups.length > 0 && (
        <div className="flex items-center gap-2">
          <ExternalLink size={14} className="text-text-secondary" />
          <a
            href={writeups[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 underline-animate relative inline-block"
          >
            View Writeups
          </a>
        </div>
      )}
    </motion.div>
  );
}

