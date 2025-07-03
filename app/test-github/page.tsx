import GitHubProfileTest from "@/components/github-profile-test"

export default function TestGitHubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">GitHub Profile Picture Test</h1>
          <p className="text-muted-foreground">
            This page helps verify that your GitHub profile picture is loading correctly throughout the site.
          </p>
        </div>

        <GitHubProfileTest />

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            After testing, you can remove this page by deleting <code>app/test-github/page.tsx</code>
          </p>
        </div>
      </div>
    </div>
  )
}
