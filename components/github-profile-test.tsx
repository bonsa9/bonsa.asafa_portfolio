"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { RefreshCw, CheckCircle, XCircle } from "lucide-react"

interface GitHubProfile {
  avatar_url: string
  name: string
  login: string
  bio: string
  location: string
  public_repos: number
  followers: number
  following: number
}

export default function GitHubProfileTest() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const fetchProfile = async () => {
    setLoading(true)
    setError(null)
    setImageLoaded(false)
    setImageError(false)

    try {
      console.log("Fetching GitHub profile...")
      const response = await fetch("/api/github/profile")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("GitHub API Response:", data)

      if (!data.avatar_url) {
        throw new Error("No avatar_url in response")
      }

      setProfile(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      console.error("Error fetching GitHub profile:", errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleImageLoad = () => {
    console.log("Profile image loaded successfully")
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = (e: any) => {
    console.error("Profile image failed to load:", e)
    setImageError(true)
    setImageLoaded(false)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          GitHub Profile Test
          <Button onClick={fetchProfile} disabled={loading} size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Status */}
        <div className="space-y-2">
          <h3 className="font-semibold">API Status</h3>
          <div className="flex items-center space-x-2">
            {loading ? (
              <Badge variant="secondary">Loading...</Badge>
            ) : error ? (
              <Badge variant="destructive">
                <XCircle className="h-3 w-3 mr-1" />
                Error
              </Badge>
            ) : profile ? (
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Success
              </Badge>
            ) : (
              <Badge variant="outline">Not loaded</Badge>
            )}
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">Error: {error}</p>}
        </div>

        {/* Profile Data */}
        {profile && (
          <div className="space-y-4">
            <h3 className="font-semibold">Profile Data</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Username:</span> {profile.login}
              </div>
              <div>
                <span className="font-medium">Name:</span> {profile.name || "N/A"}
              </div>
              <div>
                <span className="font-medium">Location:</span> {profile.location || "N/A"}
              </div>
              <div>
                <span className="font-medium">Repos:</span> {profile.public_repos}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Avatar URL:</span>
                <br />
                <code className="text-xs bg-muted p-1 rounded break-all">{profile.avatar_url}</code>
              </div>
            </div>
          </div>
        )}

        {/* Image Test */}
        {profile?.avatar_url && (
          <div className="space-y-4">
            <h3 className="font-semibold">Image Loading Test</h3>

            {/* Image Status */}
            <div className="flex items-center space-x-2">
              {imageLoaded ? (
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Image Loaded
                </Badge>
              ) : imageError ? (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Image Failed
                </Badge>
              ) : (
                <Badge variant="secondary">Loading Image...</Badge>
              )}
            </div>

            {/* Profile Images in Different Sizes */}
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="text-center">
                <p className="text-xs mb-2">32x32 (Chatbot)</p>
                <Image
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt="Profile 32x32"
                  width={32}
                  height={32}
                  className="rounded-full border mx-auto"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>

              <div className="text-center">
                <p className="text-xs mb-2">60x60 (Footer)</p>
                <Image
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt="Profile 60x60"
                  width={60}
                  height={60}
                  className="rounded-full border mx-auto"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>

              <div className="text-center">
                <p className="text-xs mb-2">120x120 (Contact)</p>
                <Image
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt="Profile 120x120"
                  width={120}
                  height={120}
                  className="rounded-full border mx-auto"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>

              <div className="text-center">
                <p className="text-xs mb-2">150x150 (Home)</p>
                <Image
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt="Profile 150x150"
                  width={150}
                  height={150}
                  className="rounded-full border mx-auto"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            </div>

            {/* Direct Image Test */}
            <div className="space-y-2">
              <h4 className="font-medium">Direct Image Test</h4>
              <div className="flex items-center space-x-4">
                <img
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt="Direct img test"
                  width={50}
                  height={50}
                  className="rounded-full border"
                  onLoad={() => console.log("Direct img loaded")}
                  onError={() => console.log("Direct img failed")}
                />
                <div className="text-sm">
                  <p>Using native &lt;img&gt; tag</p>
                  <p className="text-muted-foreground">Check browser console for logs</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">How to Use This Test</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Check if the API Status shows "Success"</li>
            <li>Verify your GitHub data is displayed correctly</li>
            <li>Confirm the Avatar URL is valid</li>
            <li>Check if "Image Loaded" badge appears</li>
            <li>Verify all image sizes display correctly</li>
            <li>Open browser console to see detailed logs</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
