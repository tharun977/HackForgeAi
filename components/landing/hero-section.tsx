"use client"

import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Sparkles } from "lucide-react"

export function HeroSection() {
  const { data: session } = useSession()

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>

      <div className="container relative flex flex-col items-center space-y-20 py-16 text-center md:py-24 lg:py-32">
        <div className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your AI Hackathon Partner
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Generate production-ready codebases from plain English project descriptions. Let AI handle the scaffolding
              so you can focus on innovation.
            </p>
          </div>

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
              <Link href="/#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg border bg-background/50 shadow-xl backdrop-blur">
          <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-muted-foreground">Project Generator</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-r p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <h3 className="text-sm font-medium">Project Description</h3>
              </div>
              <p className="text-left text-sm text-muted-foreground">
                Create a full-stack e-commerce platform with Next.js, Tailwind CSS, and Stripe integration. Include user
                authentication, product catalog with search and filtering, shopping cart, checkout process, and order
                history.
              </p>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Code className="h-4 w-4 text-green-500" />
                <h3 className="text-sm font-medium">Generated Code</h3>
              </div>
              <pre className="overflow-x-auto rounded bg-muted p-2 text-left text-xs">
                <code>
                  {`// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <TestimonialsSection />
      <NewsletterSignup />
      <Footer />
    </main>
  )
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
