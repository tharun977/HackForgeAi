import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
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
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="capitalize">{project.status}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Created</span>
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
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
  );
}