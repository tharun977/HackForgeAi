"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"

export function DashboardWelcome() {
  const { user } = useUser()
  const firstName = user?.firstName || "there"

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-background to-background"></div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Hey, {firstName}! 👋</h1>
            <p className="text-muted-foreground">
              Ready to transform your ideas into code? Create a new project or continue working on an existing one.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/dashboard/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="hidden items-center justify-end md:flex">
          <div className="w-full max-w-[250px] rounded-lg border bg-muted/50 p-4 shadow-sm">
            <div className="space-y-2">
              <div className="text-sm font-medium">Quick Stats</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md bg-background p-2">
                  <div className="text-xs text-muted-foreground">Projects</div>
                  <div className="text-xl font-bold">3</div>
                </div>
                <div className="rounded-md bg-background p-2">
                  <div className="text-xs text-muted-foreground">Collaborators</div>
                  <div className="text-xl font-bold">5</div>
                </div>
                <div className="rounded-md bg-background p-2">
                  <div className="text-xs text-muted-foreground">Code Generated</div>
                  <div className="text-xl font-bold">12k</div>
                </div>
                <div className="rounded-md bg-background p-2">
                  <div className="text-xs text-muted-foreground">Deployments</div>
                  <div className="text-xl font-bold">8</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
