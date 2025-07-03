"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, Download, FileText, Award, Plus, X, Building, Code, Eye, Trash2 } from "lucide-react"
import Image from "next/image"

interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  image?: string
  description?: string
}

interface Experience {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
  current: boolean
}

interface Education {
  id: string
  degree: string
  institution: string
  startDate: string
  endDate: string
  description: string
}

interface Skill {
  id: string
  name: string
  level: number
  category: string
}

export default function ResumePage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      title: "Software Engineering Graduate",
      company: "Adama Science and Technology University",
      startDate: "2020",
      endDate: "2024",
      description:
        "Graduated with a degree in Software Engineering, specializing in mobile and web development technologies.",
      current: false,
    },
  ])
  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      degree: "Bachelor of Software Engineering",
      institution: "Adama Science and Technology University",
      startDate: "2020",
      endDate: "2024",
      description:
        "Comprehensive study of software development, algorithms, data structures, and modern programming practices.",
    },
  ])
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "React Native", level: 90, category: "Mobile" },
    { id: "2", name: "Flutter", level: 85, category: "Mobile" },
    { id: "3", name: "Next.js", level: 95, category: "Web" },
    { id: "4", name: "React", level: 90, category: "Web" },
    { id: "5", name: "TypeScript", level: 88, category: "Web" },
    { id: "6", name: "Node.js", level: 82, category: "Backend" },
  ])

  const [personalInfo, setPersonalInfo] = useState({
    name: "Bonsa Asafa",
    title: "Software Engineer",
    email: "bonsakakuu@gmail.com",
    phone: "+251949097048",
    location: "Adama, Ethiopia",
    summary:
      "Passionate Software Engineering graduate from Adama Science and Technology University with expertise in mobile and web development. Experienced in building scalable applications using modern technologies like React Native, Flutter, and Next.js.",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newCertificate: Certificate = {
            id: Date.now().toString() + Math.random(),
            name: file.name.replace(/\.[^/.]+$/, ""),
            issuer: "",
            date: new Date().toISOString().split("T")[0],
            image: e.target?.result as string,
            description: "",
          }
          setCertificates((prev) => [...prev, newCertificate])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const updateCertificate = (id: string, updates: Partial<Certificate>) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert)))
  }

  const deleteCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id))
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    }
    setExperiences((prev) => [...prev, newExperience])
  }

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperiences((prev) => prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)))
  }

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
  }

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: 50,
      category: "Other",
    }
    setSkills((prev) => [...prev, newSkill])
  }

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills((prev) => prev.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill)))
  }

  const deleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  const generateResume = () => {
    const resumeData = {
      personalInfo,
      experiences,
      education,
      skills,
      certificates: certificates.map((cert) => ({
        ...cert,
        image: undefined, // Don't include image data in JSON
      })),
    }

    // Create downloadable resume
    const resumeContent = `
# ${personalInfo.name}
## ${personalInfo.title}

**Contact Information:**
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- Location: ${personalInfo.location}

**Summary:**
${personalInfo.summary}

## Experience
${experiences
  .map(
    (exp) => `
### ${exp.title} at ${exp.company}
*${exp.startDate} - ${exp.current ? "Present" : exp.endDate}*

${exp.description}
`,
  )
  .join("")}

## Education
${education
  .map(
    (edu) => `
### ${edu.degree}
**${edu.institution}** | ${edu.startDate} - ${edu.endDate}

${edu.description}
`,
  )
  .join("")}

## Skills
${skills.map((skill) => `- ${skill.name} (${skill.level}%) - ${skill.category}`).join("\n")}

## Certificates
${certificates
  .map(
    (cert) => `
### ${cert.name}
**Issued by:** ${cert.issuer} | **Date:** ${cert.date}
${cert.description || ""}
`,
  )
  .join("")}
    `

    const blob = new Blob([resumeContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${personalInfo.name.replace(/\s+/g, "_")}_Resume.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const skillCategories = [...new Set(skills.map((skill) => skill.category))]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
          <p className="text-xl text-muted-foreground">Upload your certificates and build a professional resume</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, summary: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Certificates Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">Upload Certificate Images</p>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your certificate images here, or click to browse
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleCertificateUpload}
                      className="hidden"
                    />
                  </div>

                  {certificates.map((certificate) => (
                    <Card key={certificate.id} className="p-4">
                      <div className="flex gap-4">
                        {certificate.image && (
                          <div className="flex-shrink-0">
                            <Image
                              src={certificate.image || "/placeholder.svg"}
                              alt={certificate.name}
                              width={100}
                              height={100}
                              className="rounded-lg object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Certificate Name</Label>
                              <Input
                                value={certificate.name}
                                onChange={(e) => updateCertificate(certificate.id, { name: e.target.value })}
                                placeholder="e.g., React Developer Certificate"
                              />
                            </div>
                            <div>
                              <Label>Issuing Organization</Label>
                              <Input
                                value={certificate.issuer}
                                onChange={(e) => updateCertificate(certificate.id, { issuer: e.target.value })}
                                placeholder="e.g., Meta, Google, AWS"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Issue Date</Label>
                              <Input
                                type="date"
                                value={certificate.date}
                                onChange={(e) => updateCertificate(certificate.id, { date: e.target.value })}
                              />
                            </div>
                            <div className="flex items-end">
                              <Button variant="destructive" size="sm" onClick={() => deleteCertificate(certificate.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label>Description (Optional)</Label>
                            <Textarea
                              value={certificate.description || ""}
                              onChange={(e) => updateCertificate(certificate.id, { description: e.target.value })}
                              placeholder="Brief description of what this certificate covers"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Work Experience
                  </div>
                  <Button onClick={addExperience} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((experience) => (
                  <Card key={experience.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-3 flex-1">
                          <div>
                            <Label>Job Title</Label>
                            <Input
                              value={experience.title}
                              onChange={(e) => updateExperience(experience.id, { title: e.target.value })}
                              placeholder="e.g., Software Developer"
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={experience.company}
                              onChange={(e) => updateExperience(experience.id, { company: e.target.value })}
                              placeholder="e.g., Tech Company Inc."
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteExperience(experience.id)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            value={experience.startDate}
                            onChange={(e) => updateExperience(experience.id, { startDate: e.target.value })}
                            placeholder="e.g., 2023"
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            value={experience.endDate}
                            onChange={(e) => updateExperience(experience.id, { endDate: e.target.value })}
                            placeholder="e.g., 2024"
                            disabled={experience.current}
                          />
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={experience.current}
                              onChange={(e) =>
                                updateExperience(experience.id, {
                                  current: e.target.checked,
                                  endDate: e.target.checked ? "" : experience.endDate,
                                })
                              }
                            />
                            <span className="text-sm">Current</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={experience.description}
                          onChange={(e) => updateExperience(experience.id, { description: e.target.value })}
                          placeholder="Describe your responsibilities and achievements"
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Skills
                  </div>
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillCategories.map((category) => (
                  <div key={category}>
                    <h4 className="font-medium mb-3">{category}</h4>
                    <div className="space-y-3">
                      {skills
                        .filter((skill) => skill.category === category)
                        .map((skill) => (
                          <div key={skill.id} className="flex items-center gap-3">
                            <Input
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                              placeholder="Skill name"
                              className="flex-1"
                            />
                            <select
                              value={skill.category}
                              onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                              className="px-3 py-2 border rounded-md"
                            >
                              <option value="Mobile">Mobile</option>
                              <option value="Web">Web</option>
                              <option value="Backend">Backend</option>
                              <option value="Database">Database</option>
                              <option value="DevOps">DevOps</option>
                              <option value="Other">Other</option>
                            </select>
                            <div className="flex items-center gap-2 w-32">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) => updateSkill(skill.id, { level: Number.parseInt(e.target.value) })}
                                className="flex-1"
                              />
                              <span className="text-sm w-8">{skill.level}%</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => deleteSkill(skill.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview & Actions */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Resume Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <h3 className="font-bold text-lg">{personalInfo.name}</h3>
                  <p className="text-muted-foreground">{personalInfo.title}</p>
                  <Separator className="my-2" />
                  <p className="text-xs">
                    {personalInfo.email} | {personalInfo.phone}
                  </p>
                  <p className="text-xs">{personalInfo.location}</p>

                  {personalInfo.summary && (
                    <>
                      <Separator className="my-2" />
                      <p className="text-xs">{personalInfo.summary}</p>
                    </>
                  )}

                  {experiences.length > 0 && (
                    <>
                      <Separator className="my-2" />
                      <h4 className="font-semibold text-sm">Experience</h4>
                      {experiences.slice(0, 2).map((exp) => (
                        <div key={exp.id} className="mt-1">
                          <p className="text-xs font-medium">{exp.title}</p>
                          <p className="text-xs text-muted-foreground">{exp.company}</p>
                        </div>
                      ))}
                    </>
                  )}

                  {skills.length > 0 && (
                    <>
                      <Separator className="my-2" />
                      <h4 className="font-semibold text-sm">Top Skills</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {skills.slice(0, 6).map((skill) => (
                          <Badge key={skill.id} variant="secondary" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}

                  {certificates.length > 0 && (
                    <>
                      <Separator className="my-2" />
                      <h4 className="font-semibold text-sm">Certificates ({certificates.length})</h4>
                      {certificates.slice(0, 3).map((cert) => (
                        <p key={cert.id} className="text-xs">
                          {cert.name}
                        </p>
                      ))}
                    </>
                  )}
                </div>

                <Button onClick={generateResume} className="w-full" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>

                <div className="text-xs text-muted-foreground">
                  <p>• Resume will be generated as a Markdown file</p>
                  <p>• You can convert it to PDF using online tools</p>
                  <p>• All certificate images are stored locally</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
