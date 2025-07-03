"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, ExternalLink, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import SocialLinks from "@/components/social-links"
import { useState, useEffect } from "react"

interface GitHubProfile {
  avatar_url: string
  name: string
  login: string
  location: string
  email: string
}

export default function ContactSection() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)

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
        console.error("Contact section - Failed to fetch profile:", response.status)
      }
    } catch (error) {
      console.error("Contact section - Error fetching profile:", error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
            <p className="text-xl text-muted-foreground">
              Ready to collaborate? Reach out through any of these platforms
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <Image
                    src={profile?.avatar_url || "/placeholder.svg?height=120&width=120"}
                    alt="Bonsa Asafa"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-primary/20"
                    onError={(e) => {
                      console.error("Contact section - Failed to load profile image")
                      e.currentTarget.src = "/placeholder.svg?height=120&width=120"
                    }}
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Bonsa Asafa</h3>
                    <div className="space-y-1 mb-4">
                      <Badge variant="secondary" className="mr-2">
                        Software Engineering Graduate
                      </Badge>
                      <Badge variant="outline">Adama Science and Technology University</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Passionate about creating innovative mobile and web solutions. Experienced in full-stack
                      development with modern technologies and always eager to take on new challenges.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Adama, Ethiopia
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Available for opportunities
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Connect with me on</h3>
              <p className="text-muted-foreground">Choose your preferred platform</p>
            </div>
            <div className="flex justify-center">
              <SocialLinks variant="compact" showLabels className="max-w-3xl" />
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Email Me</h4>
                    <p className="text-sm text-muted-foreground mb-4">Send me a direct message</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="mailto:bonsakakuu@gmail.com">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <ExternalLink className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">View My Work</h4>
                    <p className="text-sm text-muted-foreground mb-4">Check out my projects and code</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/projects">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Projects
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Send  className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Let's Chat</h4>
                    <p className="text-sm text-muted-foreground mb-4">Quick message via Telegram</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://t.me/aba_biya" target="_blank">
                        <Send className="h-4 w-4 mr-2" />
                        Telegram
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Prefer a formal approach?</h3>
                <p className="text-muted-foreground mb-4">Send me a detailed message through the contact form</p>
                <Button asChild size="lg">
                  <Link href="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Form
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
