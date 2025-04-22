"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SignInButton, useAuth } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const { isSignedIn } = useAuth()

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background"></div>

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Build Your Next Project?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of developers who are building faster and smarter with HackForge AI.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            {isSignedIn ? (
              <Button asChild size="lg" className="group">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="group">
                <SignInButton mode="modal" redirectUrl="/dashboard">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </SignInButton>
              </Button>
            )}
            <Button variant="outline" size="lg" asChild>
              <Link href="/#features">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
