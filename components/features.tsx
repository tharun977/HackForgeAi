"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heading } from "@/components/ui/heading"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

const features = [
  {
    id: "ai-generation",
    title: "AI-Powered Code Generation",
    description: "Transform natural language into complete codebases with intelligent AI that understands your requirements.",
    icon: Icons.codeEditor,
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "collaboration",
    title: "Real-time Collaboration",
    description: "Work seamlessly with your team in real-time with collaborative editing, presence indicators, and in-app chat.",
    icon: Icons.team,
    image: "https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "export",
    title: "Export & Deployment",
    description: "Export your projects to GitHub, download as a ZIP, or deploy directly to your favorite hosting platform.",
    icon: Icons.github,
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "dashboard",
    title: "Project Analytics",
    description: "Gain insights into your projects with detailed analytics on code generation, performance, and team activity.",
    icon: Icons.code,
    image: "https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export function Features() {
  const [activeTab, setActiveTab] = useState("ai-generation")
  
  return (
    <section 
      id="features" 
      className="py-20 px-4 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <Heading as="h2" size="h2" alignment="center">
            Supercharge your development workflow
          </Heading>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            HackForge AI combines cutting-edge AI with powerful development tools to help you build faster and better.
          </p>
        </div>
        
        <Tabs 
          defaultValue="ai-generation" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id}
                value={feature.id}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 h-auto py-3 px-4",
                  "data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
                )}
              >
                <feature.icon className="h-5 w-5" />
                <span className="text-center">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {features.map((feature) => (
            <TabsContent 
              key={feature.id}
              value={feature.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-6 md:order-first">
                <Heading as="h3" size="h3">
                  {feature.title}
                </Heading>
                <p className="text-muted-foreground text-lg">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.id === "ai-generation" && (
                    <>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>State-of-the-art language models for accurate code generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Support for multiple languages and frameworks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Intelligent suggestions and code optimization</span>
                      </li>
                    </>
                  )}
                  {feature.id === "collaboration" && (
                    <>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Real-time cursor sharing and presence indicators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Built-in chat and commenting system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Role-based access control for team members</span>
                      </li>
                    </>
                  )}
                  {feature.id === "export" && (
                    <>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>One-click GitHub repository creation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>ZIP download with complete project structure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Deployment scripts for popular hosting platforms</span>
                      </li>
                    </>
                  )}
                  {feature.id === "dashboard" && (
                    <>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Detailed code generation metrics and statistics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Team activity tracking and contribution insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icons.chevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Project health monitoring and performance analysis</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="gradient-border rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full max-h-[300px] md:max-h-[400px]"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}