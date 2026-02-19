"use client";

import { motion } from "framer-motion";
import CTFCard from "@/components/CTFCard";
import { ctfs } from "@/data/content";

export default function CTFPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm text-accent mb-2">$ cat ctfs.txt</div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 gradient-text">ctf competitions</h1>
        </motion.div>

        <div className="space-y-6">
          {ctfs.map((ctf, index) => (
            <CTFCard
              key={`${ctf.event}-${index}`}
              event={ctf.event}
              date={ctf.date}
              rank={ctf.rank}
              challenges={ctf.challenges}
              writeups={ctf.writeups}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

