import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Github } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    createdAt: string
    progress: number
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden border-primary/20 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">Created {project.createdAt}</div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/dashboard/projects/${project.id}`}>
          <Button size="sm" variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" /> View
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <Github className="h-4 w-4" /> Push
          </Button>
          <Button size="sm" variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
