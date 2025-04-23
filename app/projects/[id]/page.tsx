"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heading } from "@/components/ui/heading"
import { Icons } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectEditor } from "@/components/project/project-editor"
import { ProjectFiles } from "@/components/project/project-files"
import { ProjectCollaborators } from "@/components/project/project-collaborators"

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const [activeTab, setActiveTab] = useState("code")
  
  // This would normally fetch from the API
  const project = {
    id: projectId,
    name: "E-commerce Platform",
    description: "A full-stack e-commerce solution with product management, cart, and checkout",
    status: "completed",
    language: "TypeScript",
    framework: "Next.js",
    createdAt: new Date("2023-05-15"),
    fileCount: 34,
    linesOfCode: 4250,
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex gap-2 items-center mb-2">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Icons.chevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Project</span>
            </div>
            <Heading as="h1" size="h2">{project.name}</Heading>
            <p className="text-muted-foreground mt-1">
              {project.description}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Icons.share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              <Icons.download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Language</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.language}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.framework}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{project.status}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="code" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="code">Code Editor</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="team">Collaborators</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="code" className="mt-0">
            <ProjectEditor />
          </TabsContent>
          
          <TabsContent value="files" className="mt-0">
            <ProjectFiles />
          </TabsContent>
          
          <TabsContent value="team" className="mt-0">
            <ProjectCollaborators />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Project Settings</CardTitle>
                  <CardDescription>
                    Manage your project configuration and settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">General</h3>
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Project Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-background border border-input rounded-md"
                          defaultValue={project.name}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          className="w-full px-3 py-2 bg-background border border-input rounded-md min-h-[100px]"
                          defaultValue={project.description}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Visibility</h3>
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        id="public" 
                        className="h-4 w-4 rounded border-input" 
                      />
                      <label htmlFor="public">Make project public</label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Public projects can be viewed by anyone with the link.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                    <Card className="border-destructive/30">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <div>
                            <h4 className="font-medium">Delete this project</h4>
                            <p className="text-sm text-muted-foreground">
                              Once deleted, this project and all its files will be permanently removed.
                            </p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Delete Project
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  )
}