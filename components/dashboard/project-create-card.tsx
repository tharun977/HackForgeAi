import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

export function ProjectCreateCard() {
  return (
    <Card className="flex h-full cursor-pointer items-center justify-center border-dashed transition-colors hover:border-primary hover:bg-muted/50">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Link href="/dashboard/new" className="flex h-full w-full flex-col items-center justify-center gap-1">
          <div className="rounded-full bg-primary/10 p-2">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium">Create New Project</span>
          <span className="text-xs text-muted-foreground">Generate code from your idea</span>
        </Link>
      </CardContent>
    </Card>
  )
}
