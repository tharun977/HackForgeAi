"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { signOut, useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Plus, Settings, User } from "lucide-react"

export function DashboardHeader() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "U"

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">HackForge AI</span>
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/dashboard"
                className={`text-sm font-medium ${
                  pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                } transition-colors hover:text-primary`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/projects"
                className={`text-sm font-medium ${
                  pathname.startsWith("/dashboard/projects") ? "text-primary" : "text-muted-foreground"
                } transition-colors hover:text-primary`}
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/dashboard/new">
          <Button size="sm" className="hidden md:flex">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
        <ModeToggle />
        {status === "authenticated" && session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex w-full cursor-pointer items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex w-full cursor-pointer items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex cursor-pointer items-center text-red-500 focus:text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
