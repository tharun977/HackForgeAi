import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { EnvStatus } from "@/components/env-status"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data for demonstration
  const recentProjects = [
    {
      id: "1",
      name: "Social Media App",
      description: "A platform for developers to share code snippets",
      createdAt: "2 days ago",
      progress: 100,
    },
    {
      id: "2",
      name: "E-commerce Dashboard",
      description: "Admin dashboard for managing products and orders",
      createdAt: "1 week ago",
      progress: 100,
    },
    {
      id: "3",
      name: "Task Management API",
      description: "RESTful API for task management application",
      createdAt: "2 weeks ago",
      progress: 100,
    },
  ]

  const trendingIdeas = [
    {
      id: "4",
      name: "AI Image Generator",
      description: "Web app that generates images from text descriptions",
      likes: 245,
    },
    {
      id: "5",
      name: "Crypto Portfolio Tracker",
      description: "Dashboard to track cryptocurrency investments",
      likes: 189,
    },
    {
      id: "6",
      name: "Recipe Sharing Platform",
      description: "Social platform for sharing and discovering recipes",
      likes: 156,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Create and manage your AI-generated projects.</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      <EnvStatus />

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="trending">Trending Ideas</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="trending" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingIdeas.map((idea) => (
              <Card key={idea.id} className="overflow-hidden border-primary/20 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{idea.name}</CardTitle>
                  <CardDescription>{idea.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">{idea.likes} likes</div>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="activity" className="mt-6">
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-primary/20 p-2">
                    <Plus className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created a new project</p>
                    <p className="text-xs text-muted-foreground">Social Media App - 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-primary/20 p-2">
                    <Plus className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created a new project</p>
                    <p className="text-xs text-muted-foreground">E-commerce Dashboard - 1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-primary/20 p-2">
                    <Plus className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created a new project</p>
                    <p className="text-xs text-muted-foreground">Task Management API - 2 weeks ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
