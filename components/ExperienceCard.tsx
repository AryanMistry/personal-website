"use client";

import { motion } from "framer-motion";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  tech?: string[];
  index: number;
}

export default function ExperienceCard({
  company,
  role,
  period,
  achievements,
  tech = [],
  index,
}: ExperienceCardProps) {
  return (
    <motion.div
      className="relative pl-8 pb-12 border-l-2 border-border hover:border-text-secondary transition-colors duration-150 hoverable group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 8, transition: { duration: 0.15 } }}
    >
      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-background-primary border-2 border-border group-hover:border-text-secondary group-hover:bg-text-secondary transition-colors duration-150" />
      
      <div className="bg-background-secondary border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-text-secondary/5 transition-shadow duration-150">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-1">{company}</h3>
            <p className="text-text-secondary text-base">{role}</p>
          </div>
          <span className="text-text-secondary text-base mt-2 md:mt-0">{period}</span>
        </div>

        <ul className="space-y-2 mb-4">
          {achievements.map((achievement, i) => (
            <li key={i} className="text-text-secondary text-lg flex items-center gap-2">
              <span className="text-text-secondary w-1.5 h-1.5 transform rotate-45 bg-current flex-shrink-0"></span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-background-primary border border-border rounded-md text-xs font-mono text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

