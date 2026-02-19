"use client";

import { motion } from "framer-motion";

interface ExperienceResumeProps {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  index: number;
}

export default function ExperienceResume({
  company,
  role,
  period,
  achievements,
  index,
}: ExperienceResumeProps) {
  return (
    <motion.div
      className="mb-8 pb-8 border-b border-border last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-1">{company}</h3>
          <p className="text-sm text-text-secondary">{role}</p>
        </div>
        <span className="text-xs text-text-secondary">{period}</span>
      </div>
      <ul className="space-y-1.5 mt-3">
        {achievements.map((achievement, i) => (
          <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
            <span className="text-accent w-1.5 h-1.5 transform rotate-45 bg-current flex-shrink-0"></span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

