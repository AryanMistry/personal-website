"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/content";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm text-accent mb-2">$ ls projects/</div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 gradient-text">projects</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              description={project.description}
              tech={project.tech}
              github={project.github}
              live={project.live}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

