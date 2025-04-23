import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 px-4">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="container relative z-10 mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/20 px-3 py-1 text-sm">
                <span className="mr-2 rounded-full bg-primary/20 px-1.5 py-0.5 text-xs text-primary">New</span>
                <span className="text-muted-foreground">Introducing HackForge AI v1.0</span>
              </div>
              
              <Heading 
                as="h1" 
                size="h1" 
                alignment="center"
                className="max-w-3xl leading-tight"
              >
                Transform{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  natural language
                </span>{" "}
                into complete codebases
              </Heading>
              
              <p className="max-w-2xl text-muted-foreground text-lg md:text-xl">
                Create production-ready web applications from simple text descriptions. 
                Let AI handle the heavy lifting while you focus on what matters.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                <Button asChild size="lg" className="group">
                  <Link href="/generate">
                    Get Started 
                    <Icons.arrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/examples">
                    View Examples
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <Features />
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="relative gradient-border glass-card overflow-hidden rounded-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                  <Heading as="h2" size="h2">Ready to start building?</Heading>
                  <p className="text-muted-foreground max-w-md">
                    Join thousands of developers who are already using HackForge AI 
                    to accelerate their development workflow.
                  </p>
                </div>
                <Button asChild size="lg" className="self-start">
                  <Link href="/dashboard">
                    Start Creating
                    <Icons.arrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}