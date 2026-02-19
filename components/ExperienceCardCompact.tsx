"use client";

import { motion } from "framer-motion";

interface ExperienceCardCompactProps {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  index: number;
}

export default function ExperienceCardCompact({
  company,
  role,
  period,
  achievements,
  index,
}: ExperienceCardCompactProps) {
  return (
    <motion.div
      className="bg-background-secondary border border-border rounded-lg p-4 hover:border-accent transition-colors duration-150 hoverable"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
        <div>
          <h3 className="text-sm font-bold text-accent mb-0.5">{company}</h3>
          <p className="text-xs text-text-primary">{role}</p>
        </div>
        <span className="text-xs text-text-secondary font-mono">{period}</span>
      </div>
      <ul className="space-y-1">
        {achievements.slice(0, 2).map((achievement, i) => (
          <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
            <span className="text-accent mt-1">▸</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

