import { Button } from "@/components/ui/button"
import { TerminalAnimation } from "@/components/terminal-animation"
import { HeroGradient } from "@/components/hero-gradient"
import { PartnerLogos } from "@/components/partner-logos"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { ArrowRight, Github, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">HackForge AI</span>
        </div>
        <MainNav />
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 md:py-32">
          <HeroGradient />
          <div className="container relative z-10 flex flex-col items-center text-center">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              The <span className="text-primary">AI Hackathon Partner</span> for your next big idea
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Describe your project idea in plain English and receive a fully scaffolded, production-ready codebase with
              frontend and backend components.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Start Building <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com/hackforgeai" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="h-4 w-4" /> GitHub
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
