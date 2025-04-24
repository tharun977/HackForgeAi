import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "AJ",
    content:
      "HackForge AI saved me hours of boilerplate coding. I described my project and got a fully functional codebase in minutes. Incredible tool!",
  },
  {
    name: "Sarah Chen",
    role: "Full-Stack Engineer",
    avatar: "SC",
    content:
      "The code quality is impressive. I was skeptical at first, but the generated code follows best practices and is well-structured. Highly recommend!",
  },
  {
    name: "Michael Rodriguez",
    role: "Startup Founder",
    avatar: "MR",
    content:
      "We used HackForge AI to prototype our MVP in record time. The real-time collaboration feature allowed our entire team to contribute ideas.",
  },
]

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Developers Say</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Join thousands of developers who are building faster with HackForge AI.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-black/40 border-primary/20 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
