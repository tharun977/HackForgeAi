"use client"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Menu, MessageSquare, Plus, Search, X } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              HackForge AI
            </span>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              HackForge AI
            </span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>New comment on your project</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your project was deployed successfully</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>New feature available: AI code review</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/new">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}
