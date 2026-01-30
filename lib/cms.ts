import { SKILLS, FEATURED_PROJECTS, DETAILED_SKILLS, TIMELINE } from "./data"

interface PortfolioContent {
    skills: string[]
    featured_projects: typeof FEATURED_PROJECTS
    detailed_skills: typeof DETAILED_SKILLS
    timeline: typeof TIMELINE
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
    const GITHUB_USERNAME = "bonsa9" // Hardcoded or env var
    const REPO_NAME = "bonsa.asafa_portfolio" // Assuming repo name, should ideally be configurable
    const BRANCH = "main"
    // Try to fetch from public/content.json in the repo
    // URL: https://raw.githubusercontent.com/<user>/<repo>/<branch>/public/content.json

    // You can also use a different path if the user prefers 'content.json' in root.
    // For now, let's assume root or public.

    const contentUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/${BRANCH}/public/content.json`

    try {
        const res = await fetch(contentUrl, {
            next: { revalidate: 60 } // Revalidate every minute
        })

        if (res.ok) {
            const data = await res.json()
            console.log("Fetched content from GitHub CMS")
            return data as PortfolioContent
        }
    } catch (error) {
        console.error("Failed to fetch content from GitHub, using fallback:", error)
    }

    // Fallback to local data
    return {
        skills: SKILLS,
        featured_projects: FEATURED_PROJECTS,
        detailed_skills: DETAILED_SKILLS,
        timeline: TIMELINE,
    }
}
