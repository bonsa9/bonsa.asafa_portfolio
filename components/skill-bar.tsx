"use client"

import { motion } from "framer-motion"
import { TechIcon } from "@/components/tech-icons"

interface SkillBarProps {
    name: string
    level: number
    delay?: number
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <TechIcon name={name} className="w-4 h-4" />
                    <span className="text-sm font-medium">{name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{level}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1, delay }}
                />
            </div>
        </div>
    )
}
