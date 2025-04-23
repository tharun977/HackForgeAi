"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heading } from "@/components/ui/heading"
import { Icons } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectStatus } from "@/lib/types"

// Mock data
const projects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "A full-stack e-commerce solution with product management, cart, and checkout",
    status: "completed" as ProjectStatus,
    language: "TypeScript",
    framework: "Next.js",
    createdAt: new Date("2023-05-15"),
    fileCount: 34,
    linesOfCode: 4250,
  },
  {
    id: "2",
    name: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    status: "completed" as ProjectStatus,
    language: "TypeScript",
    framework: "React",
    createdAt: new Date("2023-06-22"),
    fileCount: 28,
    linesOfCode: 3120,
  },
  {
    id: "3",
    name: "Social Media Backend",
    description: "Backend API for a social media platform with user authentication and post management",
    status: "generating" as ProjectStatus,
    language: "TypeScript",
    framework: "Express.js",
    createdAt: new Date("2023-07-10"),
    fileCount: 18,
    linesOfCode: 2450,
  },
];

const analyticsData = [
  { name: "JavaScript", files: 24, lines: 2130 },
  { name: "TypeScript", files: 56, lines: 5840 },
  { name: "CSS", files: 12, lines: 980 },
  { name: "HTML", files: 8, lines: 560 },
  { name: "JSON", files: 6, lines: 430 },
];

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.status === activeTab);
    
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <Heading as="h1" size="h2">Dashboard</Heading>
            <p className="text-muted-foreground">
              Manage your projects and view analytics.
            </p>
          </div>
          <Button asChild>
            <Link href="/generate">
              <Icons.add className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.length}</div>
              <p className="text-muted-foreground text-xs mt-1">
                Last project created 2 days ago
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Lines of Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {projects.reduce((acc, project) => acc + project.linesOfCode, 0).toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs mt-1">
                Across {projects.reduce((acc, project) => acc + project.fileCount, 0)} files
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Generation Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">47s</div>
              <p className="text-muted-foreground text-xs mt-1">
                Average generation time
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Language Distribution</CardTitle>
              <CardDescription>
                Breakdown of code by programming language
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))"
                    }} 
                  />
                  <Bar dataKey="lines" radius={[4, 4, 0, 0]}>
                    {analyticsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions in your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">Project generated</p>
                  <p className="text-muted-foreground text-sm">E-commerce Platform</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </li>
                <li className="border-l-2 border-secondary pl-4 py-1">
                  <p className="font-medium">Code edited</p>
                  <p className="text-muted-foreground text-sm">Task Management App</p>
                  <p className="text-xs text-muted-foreground">4 days ago</p>
                </li>
                <li className="border-l-2 border-accent pl-4 py-1">
                  <p className="font-medium">Project exported</p>
                  <p className="text-muted-foreground text-sm">E-commerce Platform</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </li>
                <li className="border-l-2 border-muted pl-4 py-1">
                  <p className="font-medium">Collaborator added</p>
                  <p className="text-muted-foreground text-sm">Social Media Backend</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Heading as="h2" size="h3" className="mb-6">Your Projects</Heading>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="generating">Generating</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="glass-card h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription className="mt-2">
                              {project.description}
                            </CardDescription>
                          </div>
                          {project.status === "generating" && (
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Language</span>
                            <span>{project.language}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Framework</span>
                            <span>{project.framework}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Files</span>
                            <span>{project.fileCount}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Lines</span>
                            <span>{project.linesOfCode.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4">
                          <div className="mr-4 flex -space-x-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground">
                              U
                            </div>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                              A
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Created {project.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-border/40 pt-4">
                        <div className="flex justify-between w-full">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${project.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Icons.more className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="glass-card h-full border-dashed flex items-center justify-center">
                    <CardContent className="py-12 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <Icons.add className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Create New Project</h3>
                      <p className="text-muted-foreground mb-4">
                        Transform your ideas into code with AI
                      </p>
                      <Button asChild>
                        <Link href="/generate">
                          Get Started
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}