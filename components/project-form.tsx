"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function ProjectForm() {
  const [loading, setLoading] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [frontendFramework, setFrontendFramework] = useState("nextjs")
  const [backendFramework, setBackendFramework] = useState("express")
  const [database, setDatabase] = useState("mongodb")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Call our API endpoint that uses Groq
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          projectDescription,
          frontendFramework,
          backendFramework,
          database,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to generate project")
      }

      // Handle successful response
      const data = await response.json()
      console.log("Generated project:", data.result)

      // In a real app, you would save the generated code and redirect
      setLoading(false)
      window.location.href = "/dashboard/projects/new"
    } catch (error) {
      console.error("Error generating project:", error)
      setLoading(false)
      // In a real app, you would show an error message
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            placeholder="My Awesome Project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your project idea in detail. For example: I need a social media platform for developers to share code snippets and get feedback from the community."
            className="min-h-32"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </div>

        <Tabs defaultValue="frameworks">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
          </TabsList>
          <TabsContent value="frameworks" className="mt-4 space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="frontend">Frontend Framework</Label>
              <Select value={frontendFramework} onValueChange={setFrontendFramework}>
                <SelectTrigger id="frontend">
                  <SelectValue placeholder="Select frontend framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nextjs">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue.js</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="backend">Backend Framework</Label>
              <Select value={backendFramework} onValueChange={setBackendFramework}>
                <SelectTrigger id="backend">
                  <SelectValue placeholder="Select backend framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="express">Express.js</SelectItem>
                  <SelectItem value="fastapi">FastAPI</SelectItem>
                  <SelectItem value="nestjs">NestJS</SelectItem>
                  <SelectItem value="django">Django</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="database">Database</Label>
              <Select value={database} onValueChange={setDatabase}>
                <SelectTrigger id="database">
                  <SelectValue placeholder="Select database" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mongodb">MongoDB</SelectItem>
                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="supabase">Supabase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="advanced" className="mt-4 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="auth" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="auth">Authentication</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="realtime" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="realtime">Real-time Features</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="testing" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="testing">Testing Setup</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="docker" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="docker">Docker Setup</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Project...
            </>
          ) : (
            "Generate Project"
          )}
        </Button>
      </div>
    </form>
  )
}
