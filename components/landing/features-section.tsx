"use client"

import { motion } from "framer-motion"
import { Code, Users, Zap, Download, Github, MessageSquare, Layers, FileCode, Cpu } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Code className="h-10 w-10 text-green-500" />,
      title: "Full-Stack Code Generation",
      description:
        "Generate complete, production-ready codebases with frontend and backend components from natural language descriptions.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: "Real-Time Collaboration",
      description:
        "Invite friends to co-brainstorm and co-generate code in real-time with integrated chat and collaborative editing.",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "Instant Deployment",
      description:
        "Deploy your generated projects with one click to popular hosting platforms like Vercel, Netlify, or Heroku.",
    },
    {
      icon: <Download className="h-10 w-10 text-yellow-500" />,
      title: "Export Options",
      description: "Download your code as a ZIP file or push directly to GitHub with our seamless GitHub integration.",
    },
    {
      icon: <Github className="h-10 w-10 text-gray-500" />,
      title: "GitHub Integration",
      description: "Push your generated code directly to GitHub repositories with our OAuth integration.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-pink-500" />,
      title: "AI-Powered Assistance",
      description:
        "Get help with your code through our AI assistant that can explain, debug, and optimize your generated code.",
    },
    {
      icon: <Layers className="h-10 w-10 text-orange-500" />,
      title: "Multiple Tech Stacks",
      description:
        "Choose from various tech stacks including Next.js, React, Vue, Node.js, Express, FastAPI, and more.",
    },
    {
      icon: <FileCode className="h-10 w-10 text-indigo-500" />,
      title: "Detailed Documentation",
      description: "Every generated project comes with comprehensive documentation and inline code comments.",
    },
    {
      icon: <Cpu className="h-10 w-10 text-red-500" />,
      title: "Advanced AI Models",
      description:
        "Powered by state-of-the-art AI models to ensure high-quality, maintainable, and efficient code generation.",
    },
  ]

  return (
    <section id="features" className="relative overflow-hidden bg-muted/50 py-20">
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
              <span className="text-xs">Powerful Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to Build Faster
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              HackForge AI provides all the tools you need to turn your ideas into reality without writing a single line
              of code.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-green-500/10 blur-3xl transition-all group-hover:bg-green-500/20"></div>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
