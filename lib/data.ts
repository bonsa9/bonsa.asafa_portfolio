import { Award } from "lucide-react"

export const SKILLS = [
    "React Native",
    "Flutter",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Django",
    "Java",
    "Firebase",
]

export const FEATURED_PROJECTS = [
    {
        title: "E-Commerce Mobile App",
        description: "A full-featured e-commerce mobile app built with React Native",
        tech: ["React Native", "Firebase", "Stripe"],
        image: "/ecomerce.svg?height=200&width=300",
    },
    {
        title: "SaaS Dashboard",
        description: "Modern web dashboard with analytics and user management",
        tech: ["Next.js", "TypeScript", "Tailwind"],
        image: "/dashboard.svg?height=200&width=300",
    },
    {
        title: "Fitness Tracking App",
        description: "Cross-platform fitness app with workout tracking and social features",
        tech: ["Flutter", "Firebase", "REST API"],
        image: "/fitnes.svg?height=200&width=300",
    },
]

export const DETAILED_SKILLS = {
    mobile: [
        { name: "react native", level: 95 },
        { name: "flutter", level: 85 },
    ],
    web: [
        { name: "next.js", level: 95 },
        { name: "react", level: 90 },
        { name: "typescript", level: 95 },
        { name: "node.js", level: 90 },
        { name: "Django", level: 90 },
        { name: "Nest.js", level: 85 },
    ],
    tools: [
        { name: "git", level: 90 },
        { name: "docker", level: 75 },
        { name: "firebase", level: 85 },
    ],
}

export const TIMELINE = [
    {
        year: "2025",
        title: "Software Engineering Graduate",
        company: "Adama Science and Technology University",
        description:
            "Graduated with a degree in Software Engineering, specializing in mobile and web development technologies",
    },
    {
        year: "2024",
        title: "Web Developer Intern",
        company: "NGT Technology Group",
        description: "Developing  ERP system for NGT(Member of Devekopers)",
    },
    {
        year: "2023",
        title: "Junior FullStack Developer",
        company: "NGT Technology",
        description: "Built end-to-end web applications using Next.js and Node.js",
    },
    {
        year: "2021",
        title: "Started University",
        company: "Adama Science and Technology University",
        description: "Began studying Software Engineering with focus on modern development practices",
    },
]

