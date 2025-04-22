"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      avatar: "AJ",
      content:
        "HackForge AI saved me days of boilerplate coding. I described my e-commerce idea and got a fully functional Next.js app with Stripe integration in minutes!",
    },
    {
      name: "Sarah Chen",
      role: "Full-Stack Engineer",
      avatar: "SC",
      content:
        "The code quality is impressive. Clean architecture, well-commented, and follows best practices. It's not just a prototype—it's production-ready code I can build upon.",
    },
    {
      name: "Michael Rodriguez",
      role: "Startup Founder",
      avatar: "MR",
      content:
        "As a non-technical founder, HackForge AI is a game-changer. I can now prototype my ideas without hiring developers for the initial MVP. Highly recommended!",
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      avatar: "PP",
      content:
        "The real-time collaboration feature is fantastic. Our team can brainstorm together and instantly see our ideas transformed into working code. It's revolutionized our workflow.",
    },
  ]

  return (
    <section className="bg-muted/30 py-20">
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
              <span className="text-xs">Testimonials</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of developers and teams who are building faster with HackForge AI.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">"{testimonial.content}"</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="h-4 w-4 fill-current text-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
