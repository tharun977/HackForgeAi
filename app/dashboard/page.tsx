import { ProjectCard } from "@/components/dashboard/project-card"
import { ProjectCreateCard } from "@/components/dashboard/project-create-card"
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  // Mock data for projects
  const projects = [
    {
      id: "1",
      name: "E-commerce Platform",
      description: "A full-stack e-commerce platform with product listings, cart, and checkout.",
      techStack: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
      lastUpdated: "2 days ago",
      progress: 100,
    },
    {
      id: "2",
      name: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      techStack: ["React", "Express", "MongoDB", "Socket.IO"],
      lastUpdated: "1 week ago",
      progress: 85,
    },
    {
      id: "3",
      name: "Personal Blog",
      description: "A markdown-based blog with comments and social sharing.",
      techStack: ["Next.js", "MDX", "Tailwind CSS"],
      lastUpdated: "3 weeks ago",
      progress: 70,
    },
  ]

  return (
    <div className="space-y-8">
      <DashboardWelcome />
      <DashboardMetrics />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Your Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCreateCard />
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <RecentActivity />
    </div>
  )
}
