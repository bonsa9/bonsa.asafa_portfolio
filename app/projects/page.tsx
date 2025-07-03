"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Star, GitFork, Search } from "lucide-react"
import Link from "next/link"
import { TechIcon } from "@/components/tech-icons"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  topics: string[]
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

export default function ProjectsPage() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchRepositories()
  }, [])

  useEffect(() => {
    filterRepositories()
  }, [repositories, filter, searchTerm])

  const fetchRepositories = async () => {
    try {
      const response = await fetch("/api/github")
      const data = await response.json()
      setRepositories(data)
    } catch (error) {
      console.error("Error fetching repositories:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterRepositories = () => {
    let filtered = repositories

    // Filter by category
    if (filter === "mobile") {
      filtered = filtered.filter((repo) =>
        repo.topics.some((topic) => ["react-native", "flutter", "mobile", "ios", "android"].includes(topic)),
      )
    } else if (filter === "web") {
      filtered = filtered.filter((repo) =>
        repo.topics.some((topic) => ["nextjs", "react", "web", "frontend", "backend"].includes(topic)),
      )
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredRepos(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-xl text-muted-foreground">A collection of my work in mobile and web development</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                All Projects
              </Button>
              <Button variant={filter === "mobile" ? "default" : "outline"} onClick={() => setFilter("mobile")}>
                Mobile
              </Button>
              <Button variant={filter === "web" ? "default" : "outline"} onClick={() => setFilter("web")}>
                Web
              </Button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <Card key={repo.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{repo.name.replace(/-/g, " ")}</span>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center">
                      <GitFork className="h-4 w-4 mr-1" />
                      {repo.forks_count}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-4 flex-1">{repo.description}</p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <div key={topic} className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md">
                        <TechIcon name={topic} className="w-3 h-3" />
                        <span className="text-xs">{topic}</span>
                      </div>
                    ))}
                    {repo.topics.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{repo.topics.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{repo.language}</span>
                    <span>Updated {formatDate(repo.updated_at)}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={repo.html_url} target="_blank">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Link href="#" target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
