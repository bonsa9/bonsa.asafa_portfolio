import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Calendar, Award, Github, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getGitHubProfile } from "@/lib/github"
import { getPortfolioContent } from "@/lib/cms"

import { ProfileImage } from "@/components/profile-image"
import { TagCloud3D } from "@/components/tag-cloud"
import { EnhancedTimeline } from "@/components/timeline"
import { CardDescription } from "@/components/ui/card"

export default async function AboutPage() {
  const profile = await getGitHubProfile()
  const content = await getPortfolioContent()

  const displayName = profile?.name || profile?.login || "Developer"
  const joinDate = profile?.created_at ? new Date(profile.created_at).getFullYear() : new Date().getFullYear()

  // Flatten all skills for the tag cloud
  const allSkills = [
    ...content.detailed_skills.mobile.map((s) => s.name),
    ...content.detailed_skills.web.map((s) => s.name),
    ...content.detailed_skills.tools.map((s) => s.name),
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <ProfileImage
            src={profile?.avatar_url || "/placeholder.svg?height=200&width=200"}
            alt={displayName}
            width={200}
            height={200}
            className="rounded-full mx-auto mb-6 border-4 border-primary/20"
            priority
            fallbackSrc="/placeholder.svg?height=200&width=200"
          />
          <h1 className="text-4xl font-bold mb-4">About {displayName}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            {profile?.bio ||
              "I'm a passionate software developer with experience creating innovative mobile and web applications. I love turning complex problems into simple, beautiful, and intuitive solutions."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-muted-foreground mb-6">
            {profile?.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {profile.location}
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              GitHub member since {joinDate}
            </div>
            {profile?.company && (
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                {profile.company}
              </div>
            )}
          </div>

          {/* GitHub Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile?.public_repos || 0}</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile?.followers || 0}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile?.following || 0}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/resume.pdf" target="_blank">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/bonsa9" target="_blank">
                <Github className="h-4 w-4 mr-2" />
                View GitHub Profile
              </Link>
            </Button>
            {profile?.blog && (
              <Button variant="outline" asChild>
                <Link href={profile.blog} target="_blank">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Visit Blog
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* Skills Section - 3D Tag Cloud */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            Technical Expertise
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Overview</CardTitle>
                  <CardDescription>
                    Interactive view of my technical stack
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center overflow-hidden">
                  <TagCloud3D tags={allSkills} radius={180} />
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-1/2 grid gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Mobile Development</h3>
                <div className="flex flex-wrap gap-2">
                  {content.detailed_skills.mobile.map((skill) => (
                    <Badge key={skill.name} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Web Development</h3>
                <div className="flex flex-wrap gap-2">
                  {content.detailed_skills.web.map((skill) => (
                    <Badge key={skill.name} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Tools & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {content.detailed_skills.tools.map((skill) => (
                    <Badge key={skill.name} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
          <EnhancedTimeline items={content.timeline} />
        </section>

        {/* Personal Section */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Beyond Code</h2>
              <p className="text-muted-foreground mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or enjoying outdoor activities like hiking and photography. I believe in continuous learning and staying
                up-to-date with the latest trends in technology.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Open Source Contributor</Badge>
                <Badge variant="secondary">Tech Blogger</Badge>
                <Badge variant="secondary">Photography Enthusiast</Badge>
                <Badge variant="secondary">Hiking Lover</Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
