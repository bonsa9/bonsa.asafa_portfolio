"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, Sparkles, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
  links?: Array<{ text: string; url: string }>
}

interface GitHubProfile {
  avatar_url: string
  name: string
  login: string
}

interface ConversationContext {
  lastTopic: string
  userInterests: string[]
  askedQuestions: string[]
  conversationDepth: number
}

export default function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm Bonsa Asafa, your AI assistant. I can tell you everything about my journey as a Software Engineering graduate from Adama Science and Technology University, my projects, skills, and how we can connect. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "Tell me about your background",
        "What technologies do you use?",
        "Show me your projects",
        "How can I contact you?",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [context, setContext] = useState<ConversationContext>({
    lastTopic: "",
    userInterests: [],
    askedQuestions: [],
    conversationDepth: 0,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // User's real information
  const userInfo = {
    name: "Bonsa Asafa",
    email: "bonsakakuu@gmail.com",
    phone: "+251949097048",
    twitter: "@BonsaAAyana",
    instagram: "@bonsa.__",
    university: "Adama Science and Technology University",
    degree: "Software Engineering",
    location: "Adama, Ethiopia",
    github: "https://github.com/bonsa9",
    linkedin: "https://linkedin.com/in/yourprofile",
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/github/profile")
      if (response.ok) {
        const data = await response.json()
        console.log("Chatbot - GitHub profile:", data)
        setProfile(data)
      } else {
        console.error("Chatbot - Failed to fetch profile:", response.status)
      }
    } catch (error) {
      console.error("Chatbot - Error fetching profile:", error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isTyping && isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isTyping, isOpen])

  const updateContext = (topic: string, question: string) => {
    setContext((prev) => ({
      lastTopic: topic,
      userInterests: prev.userInterests.includes(topic) ? prev.userInterests : [...prev.userInterests, topic],
      askedQuestions: [...prev.askedQuestions, question.toLowerCase()],
      conversationDepth: prev.conversationDepth + 1,
    }))
  }

  const getContextualResponse = (message: string, previousContext: ConversationContext) => {
    const lowerMessage = message.toLowerCase()

    if (previousContext.lastTopic === "skills" && (lowerMessage.includes("more") || lowerMessage.includes("detail"))) {
      return getDetailedSkillsResponse()
    }

    if (
      previousContext.lastTopic === "projects" &&
      (lowerMessage.includes("more") || lowerMessage.includes("detail"))
    ) {
      return getDetailedProjectsResponse()
    }

    if (previousContext.lastTopic === "contact" && (lowerMessage.includes("prefer") || lowerMessage.includes("best"))) {
      return getPreferredContactResponse()
    }

    if (previousContext.userInterests.includes("react-native") && lowerMessage.includes("project")) {
      return getReactNativeProjectsResponse()
    }

    if (previousContext.userInterests.includes("flutter") && lowerMessage.includes("project")) {
      return getFlutterProjectsResponse()
    }

    return getRegularResponse(message)
  }

  const getDetailedSkillsResponse = () => ({
    text: "Great question! Let me dive deeper into my technical expertise 🔧\n\n**Frontend Mastery:**\n• React & Next.js: Building scalable web applications with SSR/SSG\n• TypeScript: Type-safe development for better code quality\n• Tailwind CSS: Rapid UI development with utility-first approach\n• Framer Motion: Creating smooth, engaging animations\n\n**Mobile Excellence:**\n• React Native: Cross-platform apps with native performance\n• Flutter: Beautiful UIs with Dart programming\n• Native iOS (Swift) & Android (Kotlin) development\n• App Store & Play Store deployment experience\n\n**Backend & Cloud:**\n• Node.js with Express for RESTful APIs\n• Firebase for real-time databases and authentication\n• AWS services for scalable cloud solutions\n• Database design with MongoDB and PostgreSQL\n\n**Development Tools:**\n• Git & GitHub for version control\n• Docker for containerization\n• CI/CD pipelines for automated deployment\n• Testing frameworks (Jest, Cypress)\n\nI'm always learning new technologies to stay current with industry trends!",
    suggestions: [
      "Which technology do you prefer?",
      "Show me projects using these skills",
      "What are you learning next?",
      "Tell me about your development process",
    ],
    topic: "detailed-skills",
  })

  const getDetailedProjectsResponse = () => ({
    text: "I'd love to share more about my projects! Each one showcases different aspects of my skills 🚀\n\n**🛒 E-Commerce Mobile App**\n• Built with React Native and TypeScript\n• Features: User authentication, product catalog, shopping cart, payment integration\n• Backend: Firebase for real-time data and Stripe for payments\n• Challenges solved: Offline functionality, push notifications, performance optimization\n\n**📊 SaaS Dashboard Platform**\n• Next.js with server-side rendering for SEO\n• Real-time analytics with Chart.js and D3.js\n• User management system with role-based access\n• Responsive design that works on all devices\n\n**🏃 Fitness Tracking App**\n• Cross-platform Flutter application\n• Device sensor integration for step counting\n• Social features for sharing achievements\n• Custom animations and beautiful UI design\n\n**💼 Portfolio Website (This site!)**\n• Built with Next.js and Tailwind CSS\n• Features: Dark/light mode, responsive design, GitHub API integration\n• Animated components with Framer Motion\n• AI chatbot (that's me!) for interactive experience\n\nEach project taught me valuable lessons about user experience, performance optimization, and scalable architecture.",
    suggestions: [
      "Tell me about the e-commerce app",
      "How did you build this portfolio?",
      "What was the biggest challenge?",
      "Can I see the code?",
    ],
    topic: "detailed-projects",
    links: [
      { text: "View All Projects", url: "/projects" },
      { text: "GitHub Repository", url: userInfo.github },
    ],
  })

  const getPreferredContactResponse = () => ({
    text: "Great question! Here are the best ways to reach me, depending on what you need 📞\n\n**For Professional Inquiries:**\n• 📧 Email: bonsakakuu@gmail.com (Best for detailed discussions)\n• 💼 LinkedIn: Professional networking and opportunities\n• 📱 Phone: +251949097048 (For urgent matters)\n\n**For Quick Messages:**\n• 💬 WhatsApp: +251949097048 (Fastest response)\n• 🐦 Twitter: @BonsaAAyana (Tech discussions and updates)\n• 📸 Instagram: @bonsa.__ (More personal, behind-the-scenes content)\n\n**For Code & Collaboration:**\n• 🐙 GitHub: Check out my repositories and contribute\n• 💻 This website's contact form for project inquiries\n\n**Response Times:**\n• Email & WhatsApp: Usually within 2-4 hours\n• Social media: Throughout the day\n• Phone calls: Best between 9 AM - 6 PM EAT (Ethiopian time)\n\nI'm always excited to discuss new opportunities, collaborations, or just chat about technology!",
    suggestions: [
      "What's your email again?",
      "Are you available for freelance work?",
      "What time zone are you in?",
      "Tell me about your availability",
    ],
    topic: "contact-preferences",
    links: [
      { text: "Send Email", url: `mailto:${userInfo.email}` },
      { text: "WhatsApp", url: `https://wa.me/${userInfo.phone.replace(/[^0-9]/g, "")}` },
      { text: "Twitter", url: `https://twitter.com/${userInfo.twitter.replace("@", "")}` },
    ],
  })

  const getReactNativeProjectsResponse = () => ({
    text: "Sure! Here are some of my React Native projects:\n\n**🛒 E-Commerce Mobile App**\n• Built with React Native and TypeScript\n• Features: User authentication, product catalog, shopping cart, payment integration\n• Backend: Firebase for real-time data and Stripe for payments\n• Challenges solved: Offline functionality, push notifications, performance optimization\n\n**💼 Portfolio Website (This site!)**\n• Built with Next.js and Tailwind CSS\n• Features: Dark/light mode, responsive design, GitHub API integration\n• Animated components with Framer Motion\n• AI chatbot (that's me!) for interactive experience\n\nFeel free to ask more about these projects or any other topic!",
    suggestions: [
      "Tell me about the e-commerce app",
      "How did you build this portfolio?",
      "What was the biggest challenge?",
      "Can I see the code?",
    ],
    topic: "react-native-projects",
    links: [
      { text: "View All Projects", url: "/projects" },
      { text: "GitHub Repository", url: userInfo.github },
    ],
  })

  const getFlutterProjectsResponse = () => ({
    text: "Absolutely! Here are some of my Flutter projects:\n\n**🏃 Fitness Tracking App**\n• Cross-platform Flutter application\n• Device sensor integration for step counting\n• Social features for sharing achievements\n• Custom animations and beautiful UI design\n\nFeel free to ask more about these projects or any other topic!",
    suggestions: [
      "Tell me about the fitness tracking app",
      "How did you build this project?",
      "What was the biggest challenge?",
      "Can I see the code?",
    ],
    topic: "flutter-projects",
    links: [
      { text: "View All Projects", url: "/projects" },
      { text: "GitHub Repository", url: userInfo.github },
    ],
  })

  const getRegularResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()

    if (
      lowerMessage.includes("background") ||
      lowerMessage.includes("about") ||
      lowerMessage.includes("story") ||
      lowerMessage.includes("journey")
    ) {
      return {
        text: `Hi! I'm Bonsa Asafa, a passionate Software Engineering graduate from Adama Science and Technology University 🎓\n\n**My Journey:**\nI discovered my love for programming during my first year at university when I built my first "Hello World" app. What started as curiosity quickly became a passion for creating solutions that make people's lives easier.\n\n**Education at ASTU:**\n• Bachelor's degree in Software Engineering\n• Specialized in mobile and web development\n• Participated in coding competitions and hackathons\n• Led several team projects and collaborated with diverse groups\n• Graduated with strong foundations in computer science principles\n\n**What Drives Me:**\nI believe technology should be accessible and beautiful. Whether I'm building a mobile app or a web platform, I focus on creating intuitive user experiences that solve real problems.\n\n**Current Focus:**\n• Building scalable mobile applications\n• Exploring AI and machine learning integration\n• Contributing to open-source projects\n• Mentoring fellow developers\n\nI'm based in Adama, Ethiopia 🇪🇹, but I work with clients and teams globally. I'm always excited to take on new challenges and learn emerging technologies!`,
        suggestions: [
          "Tell me about your university",
          "What technologies do you use?",
          "Show me your projects",
          "What are you working on now?",
        ],
        topic: "background",
      }
    }

    if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
      return {
        text: `I'm proficient in a comprehensive range of modern technologies! 🚀\n\n**Mobile Development (My Specialty):**\n• React Native (90%) - Cross-platform mobile apps\n• Flutter (85%) - Beautiful native interfaces\n• Swift (75%) - Native iOS development\n• Kotlin (70%) - Native Android development\n\n**Web Development:**\n• Next.js (95%) - Full-stack React framework\n• React (90%) - Component-based UIs\n• TypeScript (88%) - Type-safe JavaScript\n• Node.js (82%) - Backend development\n\n**Design & Styling:**\n• Tailwind CSS - Utility-first styling\n• Framer Motion - Smooth animations\n• Figma - UI/UX design\n• Material Design & Human Interface Guidelines\n\n**Backend & Database:**\n• Firebase - Real-time databases and auth\n• MongoDB - NoSQL database design\n• PostgreSQL - Relational databases\n• REST APIs and GraphQL\n\n**Tools & DevOps:**\n• Git & GitHub - Version control\n• Docker - Containerization\n• AWS - Cloud services\n• CI/CD pipelines\n\nI'm constantly learning and adapting to new technologies. Currently exploring AI integration and advanced React patterns!`,
        suggestions: [
          "Tell me more about React Native",
          "What about Flutter?",
          "Show me projects using these",
          "Which is your favorite?",
        ],
        topic: "skills",
      }
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return {
        text: `Hello! Great to meet you! 😊\n\nI'm Bonsa Asafa, a Software Engineering graduate from Adama Science and Technology University. I'm passionate about creating innovative mobile and web solutions that make a real difference.\n\n**What I love doing:**\n• Building beautiful, functional mobile apps\n• Creating responsive web applications\n• Solving complex technical challenges\n• Learning new technologies and frameworks\n• Collaborating with amazing teams\n\nI'm always excited to discuss technology, share my experience, or explore new opportunities. Whether you're interested in my projects, want to know about my technical skills, or just want to chat about the latest in tech, I'm here to help!\n\nWhat would you like to know about me?`,
        suggestions: [
          "Tell me about your background",
          "What technologies do you use?",
          "Show me your projects",
          "How can I contact you?",
        ],
        topic: "greeting",
      }
    }

    return {
      text: `That's a great question! 🤔\n\nI'd be happy to help you learn more about me and my work. I'm Bonsa Asafa, a Software Engineering graduate from Adama Science and Technology University, and I love creating innovative mobile and web solutions.\n\n**You can ask me about:**\n• 🎓 My educational background and university experience\n• 💻 Technical skills and technologies I work with\n• 📱 Mobile and web projects I've built\n• 🌟 My development process and approach\n• 📞 How to get in touch and work together\n• 🚀 What I'm currently working on or learning\n\n**Quick Facts:**\n• Based in Adama, Ethiopia 🇪🇹\n• Specializing in React Native, Flutter, and Next.js\n• Available for remote work globally\n• Always excited about new challenges!\n\nWhat interests you most?`,
      suggestions: [
        "Tell me about your skills",
        "Show me your projects",
        "Your educational background",
        "How to contact you",
      ],
      topic: "default",
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue
    if (!text.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    const response = getContextualResponse(text, context)
    updateContext(response.topic, text)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: response.suggestions,
        links: response.links,
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (!isTyping) {
      handleSendMessage(suggestion)
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-24 right-6 z-40"
            style={{
              width: "384px",
              height: "600px",
              maxWidth: "calc(100vw - 3rem)",
              maxHeight: "calc(100vh - 8rem)",
            }}
          >
            <Card className="h-full w-full flex flex-col shadow-2xl border-2 border-primary/20 overflow-hidden">
              <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10 flex-shrink-0 border-b">
                <CardTitle className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    {profile?.avatar_url ? (
                      <Image
                        src={profile.avatar_url || "/placeholder.svg"}
                        alt="Bonsa Asafa"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-primary/20"
                        onError={(e) => {
                          console.error("Chatbot header - Failed to load profile image")
                          e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold truncate block">Bonsa AI Assistant</span>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      <span>Online</span>
                    </div>
                  </div>
                  <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 pb-4 pt-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[85%] ${
                            message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.sender === "user" ? "bg-primary" : "bg-muted"
                            }`}
                          >
                            {message.sender === "user" ? (
                              <User className="h-3 w-3 text-primary-foreground" />
                            ) : profile?.avatar_url ? (
                              <Image
                                src={profile.avatar_url || "/placeholder.svg"}
                                alt="Bonsa"
                                width={28}
                                height={28}
                                className="rounded-full"
                                onError={(e) => {
                                  console.error("Chatbot message - Failed to load profile image")
                                  e.currentTarget.src = "/placeholder.svg?height=28&width=28"
                                }}
                              />
                            ) : (
                              <Bot className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <div className="space-y-2 min-w-0 flex-1">
                            <div
                              className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-line break-words ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              {message.text}
                            </div>
                            {message.links && (
                              <div className="flex flex-wrap gap-2">
                                {message.links.map((link, index) => (
                                  <Link
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    className="inline-flex items-center text-xs text-primary hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">{link.text}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                            {message.suggestions && (
                              <div className="flex flex-wrap gap-1">
                                {message.suggestions.map((suggestion, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <Badge
                                      variant="outline"
                                      className={`cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs ${
                                        isTyping ? "opacity-50 cursor-not-allowed" : ""
                                      }`}
                                      onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                      {suggestion}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            {profile?.avatar_url ? (
                              <Image
                                src={profile.avatar_url || "/placeholder.svg"}
                                alt="Bonsa"
                                width={28}
                                height={28}
                                className="rounded-full"
                              />
                            ) : (
                              <Bot className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <div className="bg-muted rounded-2xl px-4 py-3">
                            <div className="flex space-x-1">
                              <motion.div
                                className="w-2 h-2 bg-muted-foreground rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-muted-foreground rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-muted-foreground rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t bg-background flex-shrink-0">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1 rounded-full"
                      disabled={isTyping}
                      maxLength={500}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => handleSendMessage()}
                        size="icon"
                        className="rounded-full flex-shrink-0"
                        disabled={isTyping || !inputValue.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
