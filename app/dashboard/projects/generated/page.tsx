"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeViewer } from "@/components/dashboard/code-viewer"
import { ProjectStructure } from "@/components/dashboard/project-structure"
import { ExportOptions } from "@/components/dashboard/export-options"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Github, Loader2, Play, Share2 } from "lucide-react"
import type { CodeGenerationResponse } from "@/lib/ai-service"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

interface GeneratedProject {
  name: string
  description: string
  techStack: {
    frontend: string
    backend: string
    database: string
    styling: string
  }
  features: string[]
  generatedCode: CodeGenerationResponse
}

export default function GeneratedProjectPage() {
  const [activeTab, setActiveTab] = useState("code")
  const [isDeploying, setIsDeploying] = useState(false)
  const [project, setProject] = useState<GeneratedProject | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we're using localStorage
    const storedProject = localStorage.getItem("generatedProject")
    if (storedProject) {
      try {
        const parsedProject = JSON.parse(storedProject) as GeneratedProject
        setProject(parsedProject)

        // Set the first file as selected by default
        if (parsedProject.generatedCode?.files?.length > 0) {
          setSelectedFile(parsedProject.generatedCode.files[0].path)
        }
      } catch (error) {
        console.error("Error parsing project data:", error)
        toast({
          title: "Error",
          description: "Failed to load project data.",
          variant: "destructive",
        })
      }
    }
    setIsLoading(false)
  }, [])

  const handleDeploy = () => {
    setIsDeploying(true)
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false)
      toast({
        title: "Deployment successful",
        description: "Your project has been deployed to the staging environment.",
      })
    }, 3000)
  }

  const getSelectedFileContent = () => {
    if (!project || !selectedFile) return null

    const file = project.generatedCode.files.find((f) => f.path === selectedFile)
    return file ? file.content : null
  }

  const getFileLanguage = (filePath: string) => {
    const extension = filePath.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "ts":
      case "tsx":
        return "typescript"
      case "js":
      case "jsx":
        return "javascript"
      case "css":
        return "css"
      case "html":
        return "html"
      case "json":
        return "json"
      case "md":
        return "markdown"
      case "prisma":
        return "prisma"
      default:
        return "plaintext"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <h2 className="text-2xl font-bold">No Project Found</h2>
        <p className="text-muted-foreground">
          It seems you haven't generated a project yet or the project data was lost.
        </p>
        <Button asChild>
          <Link href="/dashboard/new">Create a New Project</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
              Generated
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleDeploy} disabled={isDeploying}>
            {isDeploying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Deploy
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button size="sm">
            <Github className="mr-2 h-4 w-4" />
            Push to GitHub
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{project.techStack.frontend}</Badge>
        <Badge variant="secondary">{project.techStack.backend}</Badge>
        <Badge variant="secondary">{project.techStack.database}</Badge>
        <Badge variant="secondary">{project.techStack.styling}</Badge>
        {project.features.map((feature) => (
          <Badge key={feature} variant="secondary">
            {feature}
          </Badge>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="structure">Project Structure</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="md:col-span-1 overflow-auto rounded-lg border bg-muted/50 p-4 max-h-[600px]">
              <div className="mb-4 text-sm font-medium">Files</div>
              <div className="space-y-1">
                {project.generatedCode.files.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file.path)}
                    className={`w-full text-left text-sm px-2 py-1 rounded-md hover:bg-muted ${
                      selectedFile === file.path ? "bg-muted font-medium" : ""
                    }`}
                  >
                    {file.path}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              {selectedFile && getSelectedFileContent() ? (
                <CodeViewer
                  code={getSelectedFileContent() || ""}
                  language={getFileLanguage(selectedFile)}
                  filePath={selectedFile}
                  description={project.generatedCode.files.find((f) => f.path === selectedFile)?.description}
                />
              ) : (
                <div className="flex items-center justify-center h-[400px] rounded-lg border bg-muted/50">
                  <p className="text-muted-foreground">Select a file to view its content</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="structure">
          <ProjectStructure structure={project.generatedCode.projectStructure} />
        </TabsContent>
        <TabsContent value="export">
          <ExportOptions
            setupInstructions={project.generatedCode.setupInstructions}
            dependencies={project.generatedCode.dependencies}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
