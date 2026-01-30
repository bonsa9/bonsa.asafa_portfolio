import { unstable_noStore as noStore } from "next/cache"

export interface GitHubProfile {
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

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
        console.warn("GitHub token not found")
        return null
    }

    try {
        const response = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3+json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        })

        if (!response.ok) {
            console.error("Failed to fetch profile:", response.status)
            return null
        }

        return response.json()
    } catch (error) {
        console.error("Error fetching profile:", error)
        return null
    }
}
