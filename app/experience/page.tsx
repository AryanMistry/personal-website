"use client";

import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import { experience } from "@/data/content";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm text-accent mb-2">$ cat experience.txt</div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 gradient-text">experience</h1>
        </motion.div>

        <div className="relative">
          {experience.map((exp, index) => (
            <ExperienceCard
              key={`${exp.company}-${index}`}
              company={exp.company}
              role={exp.role}
              period={exp.period}
              achievements={exp.achievements}
              tech={[]}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

