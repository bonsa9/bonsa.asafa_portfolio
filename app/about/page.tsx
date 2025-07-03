"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Calendar, Award, Github, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { TechIcon } from "@/components/tech-icons"

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
  created_at: string
  company: string
  blog: string
}

export default function AboutPage() {
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
        console.log("About page - GitHub profile:", data) // Debug log
        setProfile(data)
      } else {
        console.error("About page - Failed to fetch profile:", response.status)
      }
    } catch (error) {
      console.error("About page - Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const skills = {
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

  const timeline = [
    {
      year: "2025",
      title: "Software Engineering Graduate",
      company: "Adama Science and Technology University",
      description:
        "Graduated with a degree in Software Engineering, specializing in mobile and web development technologies",
      icon: <Award className="h-4 w-4" />,
    },
    {
      year: "2024",
      title: "Web Developer Intern",
      company: "NGT Technology Group",
      description: "Developing  ERP system for NGT(Member of Devekopers)",
      icon: <Award className="h-4 w-4" />,
    },
    {
      year: "2023",
      title:"Junior FullStack Developer",
      company: "NGT Technology",
      description: "Built end-to-end web applications using Next.js and Node.js",
      icon: <Award className="h-4 w-4" />,
    },
    {
      year: "2021",
      title: "Started University",
      company: "Adama Science and Technology University",
      description: "Began studying Software Engineering with focus on modern development practices",
      icon: <Award className="h-4 w-4" />,
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
  const joinDate = profile?.created_at ? new Date(profile.created_at).getFullYear() : new Date().getFullYear()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Image
            src={profile?.avatar_url || "/placeholder.svg?height=200&width=200"}
            alt={displayName}
            width={200}
            height={200}
            className="rounded-full mx-auto mb-6 border-4 border-primary/20"
            onError={(e) => {
              console.error("About page - Failed to load profile image")
              e.currentTarget.src = "/placeholder.svg?height=200&width=200"
            }}
          />
          <h1 className="text-4xl font-bold mb-4">About {displayName}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            {profile?.bio ||
              "I'm a passionate software developer with experience creating innovative mobile and web applications. I love turning complex problems into simple, beautiful, and intuitive solutions."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-muted-foreground mb-6">
            {profile?.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {profile.location}
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              GitHub member since {joinDate}
            </div>
            {profile?.company && (
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                {profile.company}
              </div>
            )}
          </div>

          {/* GitHub Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile?.public_repos || 0}</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile?.followers || 0}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile?.following || 0}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/resume.pdf" target="_blank">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/bonsa9" target="_blank">
                <Github className="h-4 w-4 mr-2" />
                View GitHub Profile
              </Link>
            </Button>
            {profile?.blog && (
              <Button variant="outline" asChild>
                <Link href={profile.blog} target="_blank">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Visit Blog
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TechIcon name="react native" className="w-6 h-6" />
                  Mobile Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.mobile.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <TechIcon name={skill.name} className="w-4 h-4" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TechIcon name="next.js" className="w-6 h-6" />
                  Web Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.web.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <TechIcon name={skill.name} className="w-4 h-4" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TechIcon name="git" className="w-6 h-6" />
                  Tools & Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.tools.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <TechIcon name={skill.name} className="w-4 h-4" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full text-primary-foreground">
                    {item.icon}
                  </div>
                  {index !== timeline.length - 1 && <div className="w-px h-16 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <Badge variant="outline">{item.year}</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{item.company}</p>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Section */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Beyond Code</h2>
              <p className="text-muted-foreground mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or enjoying outdoor activities like hiking and photography. I believe in continuous learning and staying
                up-to-date with the latest trends in technology.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Open Source Contributor</Badge>
                <Badge variant="secondary">Tech Blogger</Badge>
                <Badge variant="secondary">Photography Enthusiast</Badge>
                <Badge variant="secondary">Hiking Lover</Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
