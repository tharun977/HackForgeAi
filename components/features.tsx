import { Code, Cpu, Database, Download, Globe, Layers, Lightbulb, Rocket, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Lightbulb,
    title: "Idea to Code",
    description: "Describe your project in plain English and get production-ready code instantly.",
  },
  {
    icon: Layers,
    title: "Full-Stack Generation",
    description: "Generate both frontend and backend components with proper architecture.",
  },
  {
    icon: Users,
    title: "Build with Friends",
    description: "Invite collaborators to co-brainstorm and co-generate projects in real-time.",
  },
  {
    icon: Code,
    title: "Multiple Frameworks",
    description: "Support for Next.js, React, Vue, Express, FastAPI, and more.",
  },
  {
    icon: Database,
    title: "Database Integration",
    description: "Automatic schema design and models for MongoDB or PostgreSQL.",
  },
  {
    icon: Download,
    title: "Export Options",
    description: "Download as .zip or push directly to GitHub via OAuth.",
  },
  {
    icon: Globe,
    title: "API Generation",
    description: "Auto-generate RESTful APIs with proper documentation.",
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Leverages advanced AI models to understand complex requirements.",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Generated code follows best practices and is ready for deployment.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Supercharge Your Hackathon Projects
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">From idea to implementation in minutes, not days.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-black/40 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors"
            >
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
