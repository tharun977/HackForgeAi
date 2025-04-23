"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function DashboardWelcome() {
  const { data: session, status } = useSession()
  const userName = session?.user?.name?.split(" ")[0] || "there"

  if (status === "loading") {
    return <div className="mb-8">Loading...</div>
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
      <p className="mt-2 text-muted-foreground">Ready to create your next project? Let AI do the heavy lifting.</p>
      <div className="mt-4">
        <Link href="/dashboard/new">
          <Button>
            Create New Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
