"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Award, Briefcase, GraduationCap } from "lucide-react"

interface TimelineItem {
    year: string
    title: string
    company: string
    description: string
}

interface EnhancedTimelineProps {
    items: TimelineItem[]
}

export function EnhancedTimeline({ items }: EnhancedTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll progress for the connecting line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <div ref={containerRef} className="relative max-w-4xl mx-auto py-12">
            {/* Central Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-muted transform md:-translate-x-1/2 z-0" />

            {/* Animated Line Overlay */}
            <motion.div
                className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-primary origin-top transform md:-translate-x-1/2 z-0"
                style={{ scaleY }}
            />

            {items.map((item, index) => {
                const isEven = index % 2 === 0
                return (
                    <TimelineCard
                        key={index}
                        item={item}
                        index={index}
                        isEven={isEven}
                    />
                )
            })}
        </div>
    )
}

function TimelineCard({ item, index, isEven }: { item: TimelineItem, index: number, isEven: boolean }) {
    // Determine icon based on content keywords
    const getIcon = () => {
        const lowerTitle = item.title.toLowerCase()
        if (lowerTitle.includes("graduate") || lowerTitle.includes("university")) return <GraduationCap className="h-5 w-5" />
        return <Briefcase className="h-5 w-5" />
    }

    return (
        <div className={`relative flex items-center justify-between mb-8 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            {/* Spacer for Desktop Layout */}
            <div className="hidden md:block w-5/12" />

            {/* Central Icon */}
            <div className="absolute left-[2px] md:left-1/2 transform md:-translate-x-1/2 z-10 w-10 h-10 rounded-full bg-background border-4 border-primary flex items-center justify-center text-primary shadow-lg">
                {getIcon()}
            </div>

            {/* Content Card */}
            <motion.div
                className="ml-12 md:ml-0 w-full md:w-5/12 bg-card border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                        {item.year}
                    </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                    {/* Simple dot */}
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    {item.company}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                    {item.description}
                </p>
            </motion.div>
        </div>
    )
}
