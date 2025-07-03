"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, Tag, Github } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  githubUrl?: string
}

const MOCK_POSTS: BlogPost[] = [
  /* same mock array as before (omitted for brevity) */
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filtered, setFiltered] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [tag, setTag] = useState("")
  const [source, setSource] = useState<"github" | "mock">("mock")

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, search, tag])

  async function fetchPosts() {
    try {
      const res = await fetch("/api/blog", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        if (data?.length) {
          setPosts(data)
          setSource("github")
        } else {
          setPosts(MOCK_POSTS)
        }
      } else {
        setPosts(MOCK_POSTS)
      }
    } catch (err) {
      console.error("fetch error:", err)
      setPosts(MOCK_POSTS)
    } finally {
      setLoading(false)
    }
  }

  function filterPosts() {
    let list = posts
    if (search)
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
      )
    if (tag) list = list.filter((p) => p.tags.includes(tag))
    setFiltered(list)
  }

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts on software development, technology, and my learning
            journey
          </p>

          <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
            <p>
              <strong>Data&nbsp;Source:</strong>{" "}
              {source === "github" ? "GitHub Repo" : "Mock"}
            </p>
            <p>
              <strong>Total&nbsp;Posts:</strong> {posts.length}
            </p>
            <p>
              <strong>Filtered:</strong> {filtered.length}
            </p>
          </div>
        </div>

        {/* search + tag filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tag:</span>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">All</option>
                {allTags.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={tag === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setTag("")}
            >
              All ({posts.length})
            </Button>
            {allTags.slice(0, 8).map((t) => (
              <Button
                key={t}
                variant={tag === t ? "default" : "outline"}
                size="sm"
                onClick={() => setTag(t)}
              >
                <Tag className="h-3 w-3 mr-1" />
                {t} ({posts.filter((p) => p.tags.includes(t)).length})
              </Button>
            ))}
          </div>
        </div>

        {/* posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="hover:text-primary"
                    >
                      {p.title}
                    </Link>
                  </CardTitle>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {fmt(p.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {p.readTime}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {p.excerpt}
                  </p>

                  <div className="space-y-4">
                    {/* tags */}
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                      {p.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{p.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* buttons */}
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href={`/blog/${p.slug}`}>Read More</Link>
                      </Button>
                      {p.githubUrl && (
                        <Button asChild variant="outline" size="sm">
                          <Link href={p.githubUrl} target="_blank">
                            <Github className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* empty states */}
        {filtered.length === 0 && posts.length > 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts match your search.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch("")
                setTag("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check your GitHub repository or contact support.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
