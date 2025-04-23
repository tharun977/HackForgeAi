"use client"

import * as React from "react"
import Link from "next/link"
import { useSession, signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">HackForge AI</span>
        </Link>
        <NavigationMenu className="hidden md:flex md:flex-1 md:justify-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/#features" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Features</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#how-it-works" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>How It Works</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {resources.map((resource) => (
                    <ListItem key={resource.title} title={resource.title} href={resource.href}>
                      {resource.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />
          {session ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => signIn()}>
                Sign In
              </Button>
              <Button asChild>
                <Link href="/auth/signin">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

const resources = [
  {
    title: "Documentation",
    href: "#",
    description: "Learn how to use HackForge AI to generate production-ready codebases.",
  },
  {
    title: "API Reference",
    href: "#",
    description: "Detailed API documentation for integrating HackForge AI into your workflow.",
  },
  {
    title: "Examples",
    href: "#",
    description: "Explore example projects generated with HackForge AI.",
  },
  {
    title: "Community",
    href: "#",
    description: "Join our community of developers building with AI.",
  },
]
