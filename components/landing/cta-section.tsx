"use client"

import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const { data: session } = useSession()

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-10 blur-[100px]"></div>

      <div className="container relative space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Ready to Build Your Next Project?
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
          Join thousands of developers using HackForge AI to accelerate their development workflow. Generate
          production-ready code in minutes, not days.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {session ? (
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" onClick={() => signIn()}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button size="lg" variant="outline" asChild>
            <Link href="/#features">Explore Features</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
