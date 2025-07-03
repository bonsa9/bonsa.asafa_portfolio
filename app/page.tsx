"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, Smartphone, Globe, MapPin } from "lucide-react"
import { AnimatedTechGrid } from "@/components/tech-icons"
import { FloatingTechIcons } from "@/components/floating-icons"
import ContactSection from "@/components/contact-section"
import SocialLinks from "@/components/social-links"

interface GitHubProfile {
  name: string
  login: string
  avatar_url: string
  bio: string
  location: string
  email: string
  html_url: string
  public_repos: number
  followers: number
  following: number
}

export default function Home() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/github/profile")
      if (response.ok) {
        const data = await response.json()
        console.log("GitHub profile data:", data) // Debug log
        setProfile(data)
      } else {
        console.error("Failed to fetch profile:", response.status)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const skills = [
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

  const featuredProjects = [
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  const displayName = profile?.name || profile?.login || "Developer"
  const displayBio = profile?.bio || "Crafting Seamless Mobile & Web Experiences"

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative text-center py-20 overflow-hidden">
        <FloatingTechIcons />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <Image
              src={profile?.avatar_url || "/placeholder.svg?height=150&width=150"}
              alt={displayName}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-6 border-4 border-primary/20"
              onError={(e) => {
                console.error("Failed to load profile image")
                e.currentTarget.src = "/placeholder.svg?height=150&width=150"
              }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-primary">{displayName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">{displayBio}</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-muted-foreground mb-8">
            {profile?.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {profile.location}
              </div>
            )}
            {profile?.public_repos && (
              <div className="flex items-center">
                <Code className="h-4 w-4 mr-2" />
                {profile.public_repos} repositories
              </div>
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I specialize in building high-quality mobile and web applications using modern technologies. From React
            Native to Next.js, I bring ideas to life with clean code and intuitive design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg">
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
          <SocialLinks variant="minimal" className="justify-center" />
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Mobile Development</h3>
                <p className="text-muted-foreground">
                  Building native and cross-platform mobile apps with React Native and Flutter
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Web Development</h3>
                <p className="text-muted-foreground">
                  Creating modern web applications with Next.js, React, and TypeScript
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Full-Stack Solutions</h3>
                <p className="text-muted-foreground">End-to-end development from backend APIs to frontend interfaces</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Technologies I Work With</h2>
          <AnimatedTechGrid technologies={skills} />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">Some of my recent work</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={project.image || "/fitnes.svg"}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}
