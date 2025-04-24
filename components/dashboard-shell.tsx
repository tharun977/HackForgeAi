import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">HackForge AI</span>
            </a>
          </div>
          <nav className="flex items-center gap-4">
            <a href="/dashboard" className="text-sm font-medium">
              Dashboard
            </a>
            <a href="/projects" className="text-sm font-medium text-muted-foreground">
              Projects
            </a>
            <a href="/settings" className="text-sm font-medium text-muted-foreground">
              Settings
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container grid gap-12 py-8">{children}</div>
      </main>
    </div>
  )
}
