import Link from "next/link"
import { useEffect, useRef } from "react"
import { ArrowRight, Github, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { TerminalAnimation } from "@/components/terminal-animation"
import { HeroGradient } from "@/components/hero-gradient"
import { PartnerLogos } from "@/components/partner-logos"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-black">
      <header className="sticky top-0 z-40 w-full border-b border-b-transparent backdrop-blur-lg">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 animate-pulse rounded-full bg-primary/50 blur-lg"></div>
              <Zap className="relative h-8 w-8 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">HackForge AI</span>
          </div>
          <MainNav />
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/40">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-24 -left-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute top-1/2 -right-20 h-[400px] w-[400px] rounded-full bg-chart-2/20 blur-[100px]" />
            <div className="absolute -bottom-24 left-1/4 h-[300px] w-[300px] rounded-full bg-chart-3/20 blur-[100px]" />
          </div>
          <div className="container relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Now in public beta
            </div>
            <h1 className="max-w-4xl bg-gradient-to-br from-white via-white to-primary/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              The <span className="relative">
                <span className="absolute -inset-1 block rounded-lg bg-primary/30 blur-xl"></span>
                <span className="relative text-primary">AI Hackathon Partner</span>
              </span> for your next big idea
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Describe your project idea in plain English and receive a fully scaffolded, production-ready codebase with
              frontend and backend components in minutes, not days.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="group rounded-full bg-gradient-to-r from-primary to-chart-2 px-8 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/40">
                  Start Building <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="https://github.com/tharun977/hackforgeai" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="rounded-full border-primary/20 bg-background/50 backdrop-blur-sm">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </Link>
            </div>
            <div className="mt-12 w-full max-w-4xl">
              <TerminalAnimation />
            </div>
          </div>
        </section>

        <PartnerLogos />
        <Features />
        <HowItWorks />
        <Testimonials />

        <section id="cta" className="py-24">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 md:p-12">
              <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to build your next big idea?</h2>
                  <p className="mt-4 text-muted-foreground">
                    Join thousands of developers who are building faster with HackForge AI.
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <Link href="/dashboard">
                    <Button size="lg" className="gap-2">
                      Start Building <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">HackForge AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HackForge AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
