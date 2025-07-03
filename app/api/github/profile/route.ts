import { NextResponse } from "next/server"

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      return NextResponse.json({ error: "GitHub token not found" }, { status: 500 })
    }

    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch profile")
    }

    const profile = await response.json()
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching GitHub profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}
