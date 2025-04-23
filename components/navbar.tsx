"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { cn } from "@/lib/utils"
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigationItems = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "Blog", href: "/blog" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HackForge</span>
          </Link>
          
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:items-center md:gap-4">
            <ModeToggle />
            {session ? (
              <UserNav 
                user={{
                  name: session.user?.name,
                  email: session.user?.email,
                  image: session.user?.image,
                }}
                onSignOut={() => signOut({ callbackUrl: "/" })}
              />
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/signin">
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Icons.menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 pt-16">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Icons.logo className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">HackForge</span>
                </Link>
                <nav className="grid gap-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center py-2 text-lg font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="grid gap-4">
                  {session ? (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setIsOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/signin" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                          Sign Up
                        </Link>
                      </Button>
                    </>
                  )}
                  <div className="py-4">
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}