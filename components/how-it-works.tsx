import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Code2, Rocket } from "lucide-react"

const steps = [
  {
    icon: BrainCircuit,
    title: "Describe Your Idea",
    description: "Explain your project idea in plain English. The more details you provide, the better the results.",
  },
  {
    icon: Code2,
    title: "AI Generates Code",
    description:
      "Our AI analyzes your requirements and generates a full-stack codebase with frontend and backend components.",
  },
  {
    icon: Rocket,
    title: "Build & Deploy",
    description: "Download the code, customize it further if needed, and deploy your project to production.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-black/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mt-4 text-xl text-muted-foreground">Three simple steps to turn your idea into reality.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="bg-black/40 border-primary/20 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
