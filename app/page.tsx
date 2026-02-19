"use client";

import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import ExperienceResume from "@/components/ExperienceResume";
import EducationCard from "@/components/EducationCard";
import ProjectCard from "@/components/ProjectCard";
import CTFCard from "@/components/CTFCard";
import { profile, experience, education, projects, ctfs } from "@/data/content";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-20 md:pl-32">
        {/* Hero Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.div
            className="text-sm sm:text-base md:text-lg text-accent mb-3 font-semibold break-words"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-text-primary">root@kali</span>:<span className="text-accent">~</span>$ cat about.txt
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-3 gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-text-secondary mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {profile.role}
          </motion.p>

          <motion.p
            className="text-base text-text-primary mb-8 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {profile.bio}
          </motion.p>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-sm sm:text-base md:text-lg text-accent mb-3 font-semibold break-words">
            <span className="text-text-primary">root@kali</span>:<span className="text-accent">~</span>$ ls experience/
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text mb-6">experience</h2>
          <div>
            {experience.map((exp, index) => (
              <ExperienceResume
                key={`${exp.company}-${index}`}
                company={exp.company}
                role={exp.role}
                period={exp.period}
                achievements={exp.achievements}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-sm sm:text-base md:text-lg text-accent mb-3 font-semibold break-words">
            <span className="text-text-primary">root@kali</span>:<span className="text-accent">~</span>$ cat education.txt
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text mb-6">education</h2>
          <div>
            {education.map((edu, index) => (
              <EducationCard
                key={`${edu.institution}-${index}`}
                institution={edu.institution}
                degree={edu.degree}
                period={edu.period}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="text-sm sm:text-base md:text-lg text-accent mb-3 font-semibold break-words">
            <span className="text-text-primary">root@kali</span>:<span className="text-accent">~</span>$ ls projects/
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text mb-6">projects</h2>
          <div className="grid grid-cols-1 sm:gap-4 md:grid-cols-2 md:gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                tech={project.tech}
                github={project.github}
                live={project.live}
                image={project.image}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* CTF Section */}
        <motion.section
          id="ctf"
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-sm sm:text-base md:text-lg text-accent mb-3 font-semibold break-words">
            <span className="text-text-primary">root@kali</span>:<span className="text-accent">~</span>$ cat ctfs.txt
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text mb-6">ctf competitions</h2>
          <div className="space-y-4 sm:space-y-6">
            {ctfs.map((ctf, index) => (
              <CTFCard
                key={`${ctf.event}-${index}`}
                event={ctf.event ?? ""}
                date={ctf.date ?? ""}
                rank={ctf.rank ?? ""}
                challenges={ctf.challenges}
                writeups={ctf.writeups}
                index={index}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

