"use client";

import { motion } from "framer-motion";

interface EducationCardProps {
  institution: string;
  degree: string;
  period: string;
  index: number;
}

export default function EducationCard({
  institution,
  degree,
  period,
  index,
}: EducationCardProps) {
  return (
    <motion.div
      className="mb-6 pb-6 border-b border-border last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 gap-2">
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-1">{institution}</h3>
          <p className="text-sm text-text-secondary">{degree}</p>
        </div>
        <span className="text-xs text-text-secondary mt-1 md:mt-0">{period} </span>
      </div>
    </motion.div>
  );
}

