import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, Smartphone, Globe, MapPin } from "lucide-react"
import { AnimatedTechGrid } from "@/components/tech-icons"
import { FloatingTechIcons } from "@/components/floating-icons"
import ContactSection from "@/components/contact-section"
import SocialLinks from "@/components/social-links"
import { getGitHubProfile } from "@/lib/github"
import { ProfileImage } from "@/components/profile-image"
import { getPortfolioContent } from "@/lib/cms"

export default async function Home() {
  const profile = await getGitHubProfile()
  const content = await getPortfolioContent()

  const displayName = profile?.name || profile?.login || "Developer"
  const displayBio = profile?.bio || "Crafting Seamless Mobile & Web Experiences"

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative text-center py-20 overflow-hidden">
        <FloatingTechIcons />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <ProfileImage
              src={profile?.avatar_url || "/placeholder.svg?height=150&width=150"}
              alt={displayName}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-6 border-4 border-primary/20"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-primary">{displayName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">{displayBio}</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-muted-foreground mb-8">
            {profile?.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {profile.location}
              </div>
            )}
            {profile?.public_repos && (
              <div className="flex items-center">
                <Code className="h-4 w-4 mr-2" />
                {profile.public_repos} repositories
              </div>
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I specialize in building high-quality mobile and web applications using modern technologies. From React
            Native to Next.js, I bring ideas to life with clean code and intuitive design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg">
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
          <SocialLinks variant="minimal" className="justify-center" />
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Mobile Development</h3>
                <p className="text-muted-foreground">
                  Building native and cross-platform mobile apps with React Native and Flutter
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Web Development</h3>
                <p className="text-muted-foreground">
                  Creating modern web applications with Next.js, React, and TypeScript
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Full-Stack Solutions</h3>
                <p className="text-muted-foreground">End-to-end development from backend APIs to frontend interfaces</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Technologies I Work With</h2>
          <AnimatedTechGrid technologies={content.skills} />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">Some of my recent work</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.featured_projects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={project.image || "/fitnes.svg"}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection profile={profile} />
    </div>
  )
}
