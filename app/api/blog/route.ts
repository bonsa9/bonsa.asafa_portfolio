import { NextResponse } from "next/server"

export const dynamic = "force-dynamic" // never cache this route

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

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN

    // --- fallback to mock data if no token ---
    if (!token) {
      console.log("No GitHub token found, using mock data")
      return NextResponse.json(getMockPosts())
    }

    // --- fetch repo file list ---
    const listRes = await fetch(
      "https://api.github.com/repos/bonsa9/blog-posts/contents",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      },
    )

    if (!listRes.ok) {
      console.log("Blog repository not found, using mock data")
      return NextResponse.json(getMockPosts())
    }

    const files = await listRes.json()
    const mdFiles = files.filter((f: any) => f.name.endsWith(".md"))

    const posts: BlogPost[] = []

    // --- download each markdown file ---
    for (const file of mdFiles) {
      try {
        const fileRes = await fetch(file.download_url, { cache: "no-store" })
        const raw = await fileRes.text()

        const post = parseMarkdownPost(raw, file.name)
        if (post) {
          post.githubUrl = file.html_url
          posts.push(post)
        }
      } catch (err) {
        console.error(`Error processing ${file.name}:`, err)
      }
    }

    // newest first
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(posts)
  } catch (err) {
    console.error("Error in blog API route:", err)
    return NextResponse.json(getMockPosts())
  }
}

/* ---------- helpers ---------- */

function parseMarkdownPost(content: string, filename: string): BlogPost | null {
  try {
    // front‑matter
    const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const m = content.match(fmRegex)
    if (!m) return null

    const front = m[1]
    const body = m[2]

    const meta: Record<string, string | string[]> = {}
    front.split("\n").forEach((line) => {
      const i = line.indexOf(":")
      if (i === -1) return
      const k = line.slice(0, i).trim()
      let v: string | string[] = line.slice(i + 1).trim()

      // remove quotes
      if (
        typeof v === "string" &&
        ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      )
        v = v.slice(1, -1)

      // array
      if (typeof v === "string" && v.startsWith("[") && v.endsWith("]"))
        v = v
          .slice(1, -1)
          .split(",")
          .map((t) => t.trim().replace(/['"]/g, ""))

      meta[k] = v
    })

    const words = body.split(/\s+/).length
    const readTime = Math.ceil(words / 200)
    const slug = filename.replace(".md", "").toLowerCase().replace(/[^a-z0-9]+/g, "-")

    return {
      id: slug,
      title: (meta.title as string) || "Untitled",
      excerpt:
        (meta.excerpt as string) || body.substring(0, 200).trim().concat("..."),
      content: body,
      date: (meta.date as string) || new Date().toISOString().split("T")[0],
      readTime: `${readTime} min read`,
      tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
      slug,
    }
  } catch (err) {
    console.error("Error parsing markdown:", err)
    return null
  }
}

function getMockPosts(): BlogPost[] {
  return [
    {
      id: "1",
      title: "Getting Started with React Native Development",
      excerpt:
        "A comprehensive guide to building your first React Native application with modern best practices and tools.",
      content: "",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["React Native", "Mobile Development", "JavaScript"],
      slug: "getting-started-react-native",
      githubUrl:
        "https://github.com/bonsa9/blog-posts/blob/main/react-native-guide.md",
    },
    {
      id: "2",
      title: "Building Scalable Web Apps with Next.js",
      excerpt:
        "Learn how to create performant and scalable web applications using Next.js 14 with the new App Router.",
      content: "",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: ["Next.js", "React", "Web Development", "TypeScript"],
      slug: "nextjs-scalable-apps",
      githubUrl:
        "https://github.com/bonsa9/blog-posts/blob/main/nextjs-scalable-apps.md",
    },
    {
      id: "3",
      title: "Flutter vs React Native: A Developer's Perspective",
      excerpt:
        "Comparing two popular cross‑platform frameworks from a developer who has worked extensively with both.",
      content: "",
      date: "2024-01-05",
      readTime: "10 min read",
      tags: ["Flutter", "React Native", "Mobile Development", "Comparison"],
      slug: "flutter-vs-react-native",
      githubUrl:
        "https://github.com/bonsa9/blog-posts/blob/main/flutter-vs-react-native.md",
    },
    {
      id: "4",
      title: "My Journey at Adama Science and Technology University",
      excerpt:
        "Reflecting on my Software Engineering education and the experiences that shaped my career path.",
      content: "",
      date: "2024-01-01",
      readTime: "6 min read",
      tags: ["Education", "Personal", "Software Engineering", "University"],
      slug: "university-journey",
      githubUrl:
        "https://github.com/bonsa9/blog-posts/blob/main/university-journey.md",
    },
  ]
}
