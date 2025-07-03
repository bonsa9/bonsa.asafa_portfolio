import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import EnhancedChatbot from "@/components/enhanced-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bonsa Ayana - Software Engineer | Mobile & Web Developer",
  description:
    "Software Engineering graduate from Adama Science and Technology University. Specializing in React Native, Flutter, Next.js, and modern web technologies.",
  keywords: [
    "bonsa ayana",
    "software engineer",
    "mobile developer",
    "web developer",
    "react native",
    "flutter",
    "nextjs",
    "adama university",
    "ethiopia developer",
  ],
  authors: [{ name: "Bonsa Ayana" }],
  openGraph: {
    title: "Bonsa Ayana - Software Engineer",
    description: "Software Engineering graduate specializing in mobile and web development",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <EnhancedChatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
