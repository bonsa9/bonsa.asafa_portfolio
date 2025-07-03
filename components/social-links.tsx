"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MessageCircle,
  Instagram,
  Send, // Telegram paper-plane icon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  hoverColor: string
  description: string
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/bonsa9",
    icon: Github,
    color: "text-gray-700 dark:text-gray-300",
    hoverColor:
      "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    description: "View my code and projects",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/bonsa999",
    icon: Linkedin,
    color: "text-blue-600",
    hoverColor: "hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    description: "Connect professionally",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/BonsaAAyana",
    icon: Twitter,
    color: "text-blue-400",
    hoverColor: "hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    description: "Follow my tech journey",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/bonsa.__",
    icon: Instagram,
    color: "text-pink-500",
    hoverColor:
      "hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20",
    description: "Behind-the-scenes content",
  },
  {
    name: "Email",
    href: "mailto:bonsakakuu@gmail.com",
    icon: Mail,
    color: "text-red-500",
    hoverColor: "hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
    description: "Send me an email",
  },
  {
    name: "Telegram",
    href: "https://t.me/aba_biya",
    icon: Send, // Changed to paper-plane icon
    color: "text-[#0088cc]", // Telegram blue
    hoverColor:
      "hover:text-[#1c9dd7] hover:bg-[#e6f7ff] dark:hover:bg-[#004d70]/30",
    description: "Message me on Telegram",
  },
]

interface SocialLinksProps {
  variant?: "default" | "compact" | "minimal"
  showLabels?: boolean
  className?: string
}

export default function SocialLinks({
  variant = "default",
  showLabels = false,
  className = "",
}: SocialLinksProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  }

  const hoverVariants = {
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  if (variant === "minimal") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`flex space-x-2 ${className}`}
      >
        {socialLinks.slice(0, 5).map((social) => (
          <motion.div key={social.name} variants={itemVariants}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    variants={hoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className={`${social.color} ${social.hoverColor}`}
                    >
                      <Link href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-4 w-4" />
                        <span className="sr-only">{social.name}</span>
                      </Link>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (variant === "compact") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`flex flex-wrap gap-3 ${className}`}
      >
        {socialLinks.map((social) => (
          <motion.div key={social.name} variants={itemVariants}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    variants={hoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className={`${social.color} ${social.hoverColor} border-current/20 hover:border-current/40`}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <social.icon className="h-4 w-4" />
                        {showLabels && (
                          <span className="text-xs">{social.name}</span>
                        )}
                      </Link>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}
    >
      {socialLinks.map((social) => (
        <motion.div key={social.name} variants={itemVariants}>
          <motion.div variants={hoverVariants} whileHover="hover" whileTap="tap">
            <Button
              variant="outline"
              asChild
              className={`w-full h-16 flex flex-col items-center justify-center space-y-1 ${social.color} ${social.hoverColor} border-current/20 hover:border-current/40`}
            >
              <Link href={social.href} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{social.name}</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
