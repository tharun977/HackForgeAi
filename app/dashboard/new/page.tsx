"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Sparkles } from "lucide-react"
import type { CodeGenerationRequest } from "@/lib/ai-service"
import { toast } from "@/components/ui/use-toast"

export default function NewProjectPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [frontend, setFrontend] = useState("nextjs")
  const [backend, setBackend] = useState("express")
  const [database, setDatabase] = useState("postgres")
  const [styling, setStyling] = useState("tailwind")
  const [features, setFeatures] = useState<string[]>(["authentication"])

  const examplePrompts = [
    "A social media platform for developers to share code snippets with syntax highlighting and comments.",
    "An e-commerce website with product listings, shopping cart, and Stripe checkout integration.",
    "A real-time chat application with private messaging and group channels.",
    "A task management app with drag-and-drop kanban boards and team collaboration.",
  ]

  const featureOptions = [
    { id: "authentication", label: "Authentication" },
    { id: "api-docs", label: "API Documentation" },
    { id: "testing", label: "Testing Setup" },
    { id: "docker", label: "Docker Setup" },
    { id: "ci-cd", label: "CI/CD Pipeline" },
    { id: "analytics", label: "Analytics" },
    { id: "real-time", label: "Real-time Features" },
    { id: "file-upload", label: "File Upload" },
    { id: "notifications", label: "Notifications" },
  ]

  const handleFeatureToggle = (featureId: string) => {
    setFeatures((prev) => (prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]))
  }

  const handleGenerate = async () => {
    if (!projectName || !projectDescription) {
      toast({
        title: "Missing information",
        description: "Please provide a project name and description.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const request: CodeGenerationRequest = {
        projectName,
        description: projectDescription,
        techStack: {
          frontend,
          backend,
          database,
          styling,
        },
        features,
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error("Failed to generate code")
      }

      // Store the project data in localStorage for demo purposes
      // In a real app, this would be stored in a database
      const projectData = await response.json()
      localStorage.setItem(
        "generatedProject",
        JSON.stringify({
          name: projectName,
          description: projectDescription,
          techStack: {
            frontend,
            backend,
            database,
            styling,
          },
          features,
          generatedCode: projectData,
        }),
      )

      router.push("/dashboard/projects/generated")
    } catch (error) {
      console.error("Error generating project:", error)
      toast({
        title: "Error",
        description: "Failed to generate project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground">
          Describe your project idea and let HackForge AI generate the code for you.
        </p>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Provide basic information about your project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="My Awesome Project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project idea in detail..."
                  className="min-h-[200px] resize-none"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
                <div className="pt-2">
                  <p className="text-sm font-medium">Example prompts:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {examplePrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setProjectDescription(prompt)}
                        className="text-xs"
                      >
                        {prompt.substring(0, 40)}...
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tech-stack">Primary Tech Stack</Label>
                <Select value={frontend} onValueChange={setFrontend}>
                  <SelectTrigger id="tech-stack">
                    <SelectValue placeholder="Select a tech stack" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nextjs">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerate}
                disabled={!projectName || !projectDescription || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Project...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Project
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Configuration</CardTitle>
              <CardDescription>Fine-tune your project generation with advanced options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-advanced">Project Name</Label>
                <Input
                  id="name-advanced"
                  placeholder="My Awesome Project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description-advanced">Project Description</Label>
                <Textarea
                  id="description-advanced"
                  placeholder="Describe your project idea in detail..."
                  className="min-h-[200px] resize-none"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="frontend">Frontend Framework</Label>
                  <Select value={frontend} onValueChange={setFrontend}>
                    <SelectTrigger id="frontend">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue.js</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backend">Backend Framework</Label>
                  <Select value={backend} onValueChange={setBackend}>
                    <SelectTrigger id="backend">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="express">Express.js</SelectItem>
                      <SelectItem value="fastapi">FastAPI</SelectItem>
                      <SelectItem value="django">Django</SelectItem>
                      <SelectItem value="flask">Flask</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="database">Database</Label>
                  <Select value={database} onValueChange={setDatabase}>
                    <SelectTrigger id="database">
                      <SelectValue placeholder="Select database" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgres">PostgreSQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="sqlite">SQLite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="styling">Styling</Label>
                  <Select value={styling} onValueChange={setStyling}>
                    <SelectTrigger id="styling">
                      <SelectValue placeholder="Select styling" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tailwind">Tailwind CSS</SelectItem>
                      <SelectItem value="mui">Material UI</SelectItem>
                      <SelectItem value="bootstrap">Bootstrap</SelectItem>
                      <SelectItem value="css">Plain CSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Additional Features</Label>
                <div className="grid grid-cols-2 gap-2">
                  {featureOptions.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature.id}
                        checked={features.includes(feature.id)}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                      />
                      <Label htmlFor={feature.id} className="cursor-pointer">
                        {feature.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerate}
                disabled={!projectName || !projectDescription || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Project...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Project
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
