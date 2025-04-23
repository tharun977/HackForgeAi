"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Icons } from "@/components/icons"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const formSchema = z.object({
  projectName: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  projectDescription: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  language: z.string(),
  framework: z.string(),
});

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "java", label: "Java" },
];

const frameworks = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "express", label: "Express.js" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "spring", label: "Spring" },
];

export default function GeneratePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      language: "typescript",
      framework: "next",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    console.log(values);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 2000);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl py-12 px-4">
        <div className="space-y-6 mb-10">
          <Heading as="h1" size="h2">Generate Your Project</Heading>
          <p className="text-muted-foreground text-lg">
            Describe your project in natural language and we'll generate the code for you.
          </p>
        </div>
        
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Provide details about your project to get started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="My Awesome Project" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Language</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {languages.map((language) => (
                                  <SelectItem key={language.value} value={language.value}>
                                    {language.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="framework"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Framework</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a framework" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {frameworks.map((framework) => (
                                  <SelectItem key={framework.value} value={framework.value}>
                                    {framework.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project in detail. For example: 'Create a blog application with user authentication, post creation, and commenting features.'"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>Generate Code</>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow"></div>
                  <span className="text-primary text-sm font-medium">Processing</span>
                </div>
                <CardTitle>Generating Your Project</CardTitle>
                <CardDescription>
                  Our AI is creating your project based on your description.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-2 bg-secondary/20 rounded-full w-4/5 animate-pulse"></div>
                  <div className="h-2 bg-secondary/20 rounded-full w-3/5 animate-pulse"></div>
                  <div className="h-2 bg-secondary/20 rounded-full w-2/3 animate-pulse"></div>
                  <div className="h-2 bg-secondary/20 rounded-full w-full animate-pulse"></div>
                  <div className="h-2 bg-secondary/20 rounded-full w-3/4 animate-pulse"></div>
                </div>
                
                <div className="mt-8">
                  <div className="border border-border/50 rounded-md p-4 bg-card/40">
                    <h4 className="text-sm font-medium mb-2">Generation Progress</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2">
                        <Icons.chevronRight className="h-4 w-4 text-primary" />
                        <span>Analyzing project requirements...</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icons.chevronRight className="h-4 w-4 text-primary" />
                        <span>Setting up project structure...</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icons.chevronRight className="h-4 w-4 text-primary" />
                        <span>Generating core components...</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Icons.chevronRight className="h-4 w-4" />
                        <span>Implementing business logic...</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Icons.chevronRight className="h-4 w-4" />
                        <span>Adding documentation...</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  This process typically takes 1-2 minutes to complete.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}