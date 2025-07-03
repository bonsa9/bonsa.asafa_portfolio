import { NextResponse } from "next/server"

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      console.log("No GitHub token found, using mock data")
      return NextResponse.json(getMockData())
    }

    try {
      const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=50", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })

      if (!response.ok) {
        console.log("GitHub API request failed, using mock data")
        return NextResponse.json(getMockData())
      }

      const repos = await response.json()
      return NextResponse.json(repos)
    } catch (apiError) {
      console.log("GitHub API error, using mock data:", apiError)
      return NextResponse.json(getMockData())
    }
  } catch (error) {
    console.error("Error in GitHub API route:", error)
    return NextResponse.json(getMockData())
  }
}

function getMockData() {
  return [
    {
      id: 1,
      name: "ecommerce-mobile-app",
      description: "A full-featured e-commerce mobile app built with React Native",
      html_url: "https://github.com/johndeveloper/ecommerce-mobile-app",
      topics: ["react-native", "mobile", "ecommerce", "firebase"],
      stargazers_count: 45,
      forks_count: 12,
      language: "JavaScript",
      updated_at: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      name: "saas-dashboard",
      description: "Modern SaaS dashboard with analytics and user management",
      html_url: "https://github.com/johndeveloper/saas-dashboard",
      topics: ["nextjs", "web", "dashboard", "typescript"],
      stargazers_count: 78,
      forks_count: 23,
      language: "TypeScript",
      updated_at: "2024-01-10T14:20:00Z",
    },
    {
      id: 3,
      name: "fitness-tracker-flutter",
      description: "Cross-platform fitness tracking app with social features",
      html_url: "https://github.com/johndeveloper/fitness-tracker-flutter",
      topics: ["flutter", "mobile", "fitness", "dart"],
      stargazers_count: 32,
      forks_count: 8,
      language: "Dart",
      updated_at: "2024-01-08T09:15:00Z",
    },
    {
      id: 4,
      name: "portfolio-website",
      description: "Personal portfolio website built with Next.js and Tailwind CSS",
      html_url: "https://github.com/johndeveloper/portfolio-website",
      topics: ["nextjs", "web", "portfolio", "tailwindcss"],
      stargazers_count: 15,
      forks_count: 5,
      language: "TypeScript",
      updated_at: "2024-01-05T16:45:00Z",
    },
    {
      id: 5,
      name: "chat-app-react-native",
      description: "Real-time chat application with push notifications",
      html_url: "https://github.com/johndeveloper/chat-app-react-native",
      topics: ["react-native", "mobile", "chat", "realtime"],
      stargazers_count: 67,
      forks_count: 19,
      language: "JavaScript",
      updated_at: "2024-01-03T11:30:00Z",
    },
    {
      id: 6,
      name: "blog-cms-nextjs",
      description: "Headless CMS blog platform with markdown support",
      html_url: "https://github.com/johndeveloper/blog-cms-nextjs",
      topics: ["nextjs", "web", "blog", "cms"],
      stargazers_count: 28,
      forks_count: 7,
      language: "TypeScript",
      updated_at: "2023-12-28T13:20:00Z",
    },
    {
      id: 7,
      name: "weather-app-flutter",
      description: "Beautiful weather app with location-based forecasts",
      html_url: "https://github.com/johndeveloper/weather-app-flutter",
      topics: ["flutter", "mobile", "weather", "api"],
      stargazers_count: 23,
      forks_count: 6,
      language: "Dart",
      updated_at: "2023-12-20T08:45:00Z",
    },
    {
      id: 8,
      name: "task-manager-web",
      description: "Collaborative task management web application",
      html_url: "https://github.com/johndeveloper/task-manager-web",
      topics: ["react", "web", "productivity", "collaboration"],
      stargazers_count: 41,
      forks_count: 14,
      language: "TypeScript",
      updated_at: "2023-12-15T15:20:00Z",
    },
  ]
}
