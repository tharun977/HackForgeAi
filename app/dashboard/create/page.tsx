'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bot, BrainCircuit, Check, ChevronRight, Loader2, MessageSquarePlus, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EnvStatus } from '@/components/env-status';

// Tech stack options for project generation
const techStackOptions = [
  {
    id: 'next-react',
    name: 'Next.js (React)',
    description: 'Full-stack React framework with server-side rendering',
    icon: <Zap className="h-5 w-5 text-chart-1" />,
    popular: true,
    features: ['Server-side rendering', 'API routes', 'File-based routing']
  },
  {
    id: 'react-vite',
    name: 'React + Vite',
    description: 'Modern frontend development with fast HMR',
    icon: <Zap className="h-5 w-5 text-chart-2" />,
    popular: true,
    features: ['Component-based', 'Virtual DOM', 'JSX syntax']
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: 'Progressive JavaScript framework',
    icon: <Zap className="h-5 w-5 text-chart-4" />,
    features: ['Two-way binding', 'Component system', 'Transitions']
  },
  {
    id: 'node',
    name: 'Node.js API',
    description: 'Backend JavaScript runtime environment',
    icon: <Zap className="h-5 w-5 text-chart-3" />,
    features: ['Non-blocking I/O', 'Event-driven', 'Express.js']
  },
  {
    id: 'full-stack',
    name: 'Full-Stack',
    description: 'Complete solution with frontend, backend, and database',
    icon: <Zap className="h-5 w-5 text-chart-5" />,
    popular: true,
    features: ['React frontend', 'Node.js backend', 'Database integration']
  }
];

// Database options
const databaseOptions = [
  { id: 'postgres', name: 'PostgreSQL', description: 'Robust relational database' },
  { id: 'mongodb', name: 'MongoDB', description: 'NoSQL document database' },
  { id: 'supabase', name: 'Supabase', description: 'Open source Firebase alternative' },
  { id: 'mysql', name: 'MySQL', description: 'Popular relational database' },
  { id: 'none', name: 'No Database', description: 'Skip database setup' }
];

// Deployment options
const deploymentOptions = [
  { id: 'vercel', name: 'Vercel', description: 'Platform for frontend frameworks' },
  { id: 'netlify', name: 'Netlify', description: 'Platform for modern web projects' },
  { id: 'aws', name: 'AWS', description: 'Amazon Web Services' },
  { id: 'gcp', name: 'Google Cloud', description: 'Google Cloud Platform' },
  { id: 'none', name: 'Local Only', description: 'No deployment setup' }
];

export default function CreateProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    techStack: 'next-react',
    database: 'supabase',
    deployment: 'vercel',
    features: []
  });

  // Update form data
interface FormData {
    projectName: string;
    description: string;
    techStack: string;
    database: string;
    deployment: string;
    features: string[];
}

const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
};

  // Handle next step
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Handle previous step
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  // Simulate project generation
  const handleGenerateProject = async () => {
    // Check if GROQ API key is configured
    if (!process.env.NEXT_PUBLIC_GROQ_CLOUD_API) {
      alert('GROQ API key is not configured. Please add it to continue.');
      return;
    }

    setGenerating(true);
    setGenerationProgress(0);

    // Simulate API progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 500);

    // Simulate completion after 6-7 seconds
    setTimeout(() => {
      clearInterval(interval);
      setGenerationProgress(100);
      
      // Redirect to the new project page after a short delay
      setTimeout(() => {
        router.push(`/dashboard/projects/new-${Date.now()}`);
      }, 1500);
    }, 6500);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to dashboard</span>
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Create New Project</h2>
        </div>
      </div>

      {/* Environment check */}
      <EnvStatus />

      {generating ? (
        /* Project generation UI */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Generating Your Project</CardTitle>
              <CardDescription>
                We're using AI to create your project based on your specifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Generation progress</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>

              <div className="rounded-lg border border-primary/10 bg-black/20 p-4">
                <h3 className="mb-3 font-medium">Generation log:</h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-chart-1">
                    <Check className="h-4 w-4" /> Analyzing project requirements
                  </div>
                  <div className="flex items-center gap-2 text-chart-2">
                    <Check className="h-4 w-4" /> Setting up project structure
                  </div>
                  <div className={`flex items-center gap-2 ${generationProgress > 30 ? 'text-chart-3' : 'text-muted-foreground'}`}>
                    {generationProgress > 30 ? <Check className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />} Generating frontend components
                  </div>
                  <div className={`flex items-center gap-2 ${generationProgress > 50 ? 'text-chart-4' : 'text-muted-foreground'}`}>
                    {generationProgress > 50 ? <Check className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />} Creating API endpoints
                  </div>
                  <div className={`flex items-center gap-2 ${generationProgress > 70 ? 'text-chart-5' : 'text-muted-foreground'}`}>
                    {generationProgress > 70 ? <Check className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />} Setting up database schema
                  </div>
                  <div className={`flex items-center gap-2 ${generationProgress > 90 ? 'text-primary' : 'text-muted-foreground'}`}>
                    {generationProgress > 90 ? <Check className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />} Finalizing project
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Project creation form */
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form steps navigation */}
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm lg:col-span-1">
            <CardHeader>
              <CardTitle>Project Setup</CardTitle>
              <CardDescription>Follow these steps to generate your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${step === 1 ? 'border-primary bg-primary/5' : 'border-primary/10'}`}
                  onClick={() => setStep(1)}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 1 ? 'bg-primary text-primary-foreground' : 'border border-primary/20 text-primary'}`}>
                    {step > 1 ? <Check className="h-4 w-4" /> : '1'}
                  </div>
                  <div>
                    <h3 className="font-medium">Basic Information</h3>
                    <p className="text-xs text-muted-foreground">Project name and description</p>
                  </div>
                </div>
                
                <div 
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${step === 2 ? 'border-primary bg-primary/5' : 'border-primary/10'}`}
                  onClick={() => formData.projectName && formData.description ? setStep(2) : null}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 2 ? 'bg-primary text-primary-foreground' : 'border border-primary/20 text-primary'}`}>
                    {step > 2 ? <Check className="h-4 w-4" /> : '2'}
                  </div>
                  <div>
                    <h3 className="font-medium">Technical Stack</h3>
                    <p className="text-xs text-muted-foreground">Choose your technologies</p>
                  </div>
                </div>
                
                <div 
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${step === 3 ? 'border-primary bg-primary/5' : 'border-primary/10'}`}
                  onClick={() => step > 2 ? setStep(3) : null}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 3 ? 'bg-primary text-primary-foreground' : 'border border-primary/20 text-primary'}`}>
                    {step > 3 ? <Check className="h-4 w-4" /> : '3'}
                  </div>
                  <div>
                    <h3 className="font-medium">Review & Generate</h3>
                    <p className="text-xs text-muted-foreground">Confirm your choices</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step content */}
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm lg:col-span-2">
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Provide details about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      placeholder="My Awesome Project"
                      value={formData.projectName}
                      onChange={(e) => updateFormData('projectName', e.target.value)}
                      className="border-primary/20 bg-black/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project in detail. What problem does it solve? What features should it have?"
                      rows={6}
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      className="border-primary/20 bg-black/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      Be as specific as possible. Include features, user flows, and technical requirements.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleNextStep}
                    disabled={!formData.projectName || !formData.description}
                    className="gap-2"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle>Technical Stack</CardTitle>
                  <CardDescription>Choose the technologies for your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="tech-stack" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
                      <TabsTrigger value="database">Database</TabsTrigger>
                      <TabsTrigger value="deployment">Deployment</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="tech-stack" className="mt-4 space-y-4">
                      <RadioGroup 
                        value={formData.techStack} 
                        onValueChange={(value) => updateFormData('techStack', value)}
                        className="space-y-3"
                      >
                        {techStackOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-all ${formData.techStack === option.id ? 'border-primary/50 bg-primary/5' : 'border-primary/10 hover:border-primary/30'}`}
                            onClick={() => updateFormData('techStack', option.id)}
                          >
                            <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                            <div className="flex flex-1 items-start justify-between">
                              <div>
                                <Label htmlFor={option.id} className="cursor-pointer text-base font-medium">
                                  {option.name}
                                  {option.popular && (
                                    <Badge className="ml-2 bg-chart-1/20 text-chart-1" variant="outline">
                                      Popular
                                    </Badge>
                                  )}
                                </Label>
                                <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {option.features?.map((feature, index) => (
                                    <Badge key={index} variant="secondary" className="bg-primary/10">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                {option.icon}
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </TabsContent>
                    
                    <TabsContent value="database" className="mt-4 space-y-4">
                      <RadioGroup 
                        value={formData.database} 
                        onValueChange={(value) => updateFormData('database', value)}
                        className="space-y-3"
                      >
                        {databaseOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all ${formData.database === option.id ? 'border-primary/50 bg-primary/5' : 'border-primary/10 hover:border-primary/30'}`}
                            onClick={() => updateFormData('database', option.id)}
                          >
                            <RadioGroupItem value={option.id} id={`db-${option.id}`} />
                            <div>
                              <Label htmlFor={`db-${option.id}`} className="cursor-pointer">
                                {option.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </TabsContent>
                    
                    <TabsContent value="deployment" className="mt-4 space-y-4">
                      <RadioGroup 
                        value={formData.deployment} 
                        onValueChange={(value) => updateFormData('deployment', value)}
                        className="space-y-3"
                      >
                        {deploymentOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all ${formData.deployment === option.id ? 'border-primary/50 bg-primary/5' : 'border-primary/10 hover:border-primary/30'}`}
                            onClick={() => updateFormData('deployment', option.id)}
                          >
                            <RadioGroupItem value={option.id} id={`deploy-${option.id}`} />
                            <div>
                              <Label htmlFor={`deploy-${option.id}`} className="cursor-pointer">
                                {option.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="ghost" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="gap-2">
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Review & Generate</CardTitle>
                  <CardDescription>Confirm your project settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                    <h3 className="mb-4 text-lg font-medium">Project Summary</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Project Name</h4>
                        <p>{formData.projectName}</p>
                      </div>
                      
                      <Separator className="bg-primary/10" />
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                        <p className="whitespace-pre-wrap">{formData.description}</p>
                      </div>
                      
                      <Separator className="bg-primary/10" />
                      
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Tech Stack</h4>
                          <p>{techStackOptions.find(t => t.id === formData.techStack)?.name}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Database</h4>
                          <p>{databaseOptions.find(d => d.id === formData.database)?.name}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Deployment</h4>
                          <p>{deploymentOptions.find(d => d.id === formData.deployment)?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 rounded-lg border border-chart-1/30 bg-chart-1/5 p-4 text-sm">
                    <BrainCircuit className="h-5 w-5 text-chart-1" />
                    <p className="text-chart-1">
                      HackForge AI will analyze your inputs and generate a complete project structure based on your requirements.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="ghost" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleGenerateProject} className="gap-2">
                    <BrainCircuit className="h-4 w-4" /> Generate Project
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}