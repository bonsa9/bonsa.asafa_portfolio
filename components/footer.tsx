"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Heart, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"

interface GitHubProfile {
  avatar_url: string
  name: string
  login: string
}

export default function Footer() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/github/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      } else {
        console.error("Footer - Failed to fetch profile:", response.status)
      }
    } catch (error) {
      console.error("Footer - Error fetching profile:", error)
    }
  }

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/bonsa9",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile",
      icon: Linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/BonsaAAyana",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/bonsa.__",
      icon: Instagram,
      color: "hover:text-pink-500",
    },
    {
      name: "Email",
      href: "mailto:bonsakakuu@gmail.com",
      icon: Mail,
      color: "hover:text-red-500",
    },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={profile?.avatar_url || "/placeholder.svg?height=60&width=60"}
                alt="Bonsa Asafa"
                width={60}
                height={60}
                className="rounded-full border-2 border-primary/20"
                onError={(e) => {
                  console.error("Footer - Failed to load profile image")
                  e.currentTarget.src = "/placeholder.svg?height=60&width=60"
                }}
              />
              <div>
                <h3 className="text-lg font-semibold">Bonsa Asafa</h3>
                <p className="text-sm text-muted-foreground">Software Engineering Graduate</p>
                <p className="text-xs text-muted-foreground">Adama Science and Technology University</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Passionate software engineer specializing in mobile and web development. Creating innovative solutions
              with modern technologies and clean, efficient code.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <Link href={social.href} target="_blank" className={`transition-colors ${social.color}`}>
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>bonsakakuu@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+251949097048</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Adama, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>© {currentYear} Bonsa Asafa. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
