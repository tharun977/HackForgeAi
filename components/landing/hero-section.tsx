"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SignInButton, useAuth } from "@clerk/nextjs"
import { ArrowRight, Code, Sparkles } from "lucide-react"

export function HeroSection() {
  const { isSignedIn } = useAuth()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-background to-background"></div>

      {/* Animated grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm"
              >
                <Sparkles className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-xs">Your AI Hackathon Partner</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              >
                <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Turn Ideas into Code
                </span>
                <br />
                in Minutes, Not Days
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[600px] text-muted-foreground md:text-xl"
              >
                HackForge AI transforms your project ideas into production-ready codebases. Just describe what you want
                to build, and we'll generate the complete code structure for you.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
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
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </SignInButton>
                </Button>
              )}
              <Button variant="outline" size="lg" asChild>
                <Link href="/#how-it-works">See How It Works</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted"
                  >
                    <span className="text-xs font-medium">U{i}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs">
                Trusted by <span className="font-medium">1,000+</span> developers
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative overflow-hidden rounded-xl border bg-background/50 p-2 shadow-xl backdrop-blur">
              <div className="flex items-center border-b px-3 py-2">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm font-medium">HackForge AI Generator</div>
              </div>
              <div className="relative space-y-4 p-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Project Description</div>
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p className="text-muted-foreground">
                      Build a social media app for developers to share code snippets with real-time collaboration
                      features.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Generated Code</div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Code className="h-3 w-3" />
                      <span>Generating...</span>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-auto rounded-md bg-muted p-3">
                    <pre className="text-xs">
                      <code className="language-typescript">
                        {`// File: app/api/snippets/route.ts
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const snippets = await db.snippet.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(snippets);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch snippets' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { title, code, language } = await req.json();
    
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
        language,
        userId,
      },
    });

    return NextResponse.json(snippet);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create snippet' },
      { status: 500 }
    );
  }
}`}
                      </code>
                    </pre>
                  </div>
                </div>
                <motion.div
                  animate={{
                    width: isHovered ? "100%" : "60%",
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-10 rounded-md bg-gradient-to-r from-green-500 to-blue-500"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
