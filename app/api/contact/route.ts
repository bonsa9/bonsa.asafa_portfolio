import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, subject, message } = body

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const token = process.env.GITHUB_TOKEN
        const GITHUB_USERNAME = "bonsa9"
        const REPO_NAME = "portfolio-messages"

        if (!token) {
            console.error("GITHUB_TOKEN is missing")
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            )
        }

        // Construct the issue body
        const issueBody = `
### 📬 New Contact Form Submission

**From:** ${name} (${email})

**Message:**
${message}

---
*This issue was automatically created from the portfolio contact form.*
`

        // Create the issue
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/issues`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github.v3+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                },
                body: JSON.stringify({
                    title: `📬 Contact: ${subject}`,
                    body: issueBody,
                    labels: ["contact-form"],
                    assignees: [GITHUB_USERNAME],
                }),
            }
        )

        if (!response.ok) {
            const errorData = await response.json()
            console.error("GitHub API Error:", errorData)
            return NextResponse.json(
                { error: "Failed to create issue" },
                { status: response.status }
            )
        }

        const issueData = await response.json()

        return NextResponse.json({
            success: true,
            issueUrl: issueData.html_url,
            message: "Message sent successfully!",
        })
    } catch (error) {
        console.error("Error processing contact form:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
