"use client"

import { motion } from "framer-motion"
import { MessageSquare, Code, Cpu, Download, ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <MessageSquare className="h-12 w-12 text-green-500" />,
      title: "Describe Your Project",
      description:
        "Start by describing your project idea in plain English. Be as detailed as you want about features, tech stack, and design preferences.",
      delay: 0,
    },
    {
      icon: <Cpu className="h-12 w-12 text-blue-500" />,
      title: "AI Analyzes Your Requirements",
      description:
        "Our advanced AI models analyze your description, breaking it down into technical requirements and architecture decisions.",
      delay: 0.1,
    },
    {
      icon: <Code className="h-12 w-12 text-purple-500" />,
      title: "Generate Full Codebase",
      description:
        "HackForge AI generates a complete, production-ready codebase with frontend, backend, database models, and API endpoints.",
      delay: 0.2,
    },
    {
      icon: <Download className="h-12 w-12 text-yellow-500" />,
      title: "Export & Deploy",
      description:
        "Download your code as a ZIP file or push directly to GitHub. Deploy with one click to your favorite hosting platform.",
      delay: 0.3,
    },
  ]

  return (
    <section id="how-it-works" className="relative overflow-hidden py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-sm">
              <span className="text-xs">Simple Process</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How HackForge AI Works</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              From idea to deployment in four simple steps. No coding required.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">{step.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(100%_-_16px)] top-10 hidden -translate-y-1/2 text-muted-foreground md:block">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
