"use client"

import { motion } from "framer-motion"
import { TechIcon } from "./tech-icons"

export function FloatingTechIcons() {
  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Flutter",
    "Node.js",
    "Firebase",
    "React Native",
    "JavaScript",
    "Git",
    "AWS",
  ]

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech}
          variants={floatingVariants}
          animate="animate"
          className="absolute opacity-20 dark:opacity-15"
          style={{
            left: `${5 + index * 12}%`,
            top: `${15 + (index % 4) * 18}%`,
            animationDelay: `${index * 0.7}s`,
            filter: "drop-shadow(0 0 8px rgba(var(--primary), 0.3))",
          }}
        >
          <TechIcon name={tech} className="w-20 h-20" />
        </motion.div>
      ))}
    </div>
  )
}
