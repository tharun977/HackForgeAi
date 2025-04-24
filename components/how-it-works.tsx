'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: "Describe Your Idea",
    description: "Explain what you want to build in plain English.",
    detail: "Our AI extracts technical requirements, features, and structure from your natural language prompt."
  },
  {
    title: "Review the Plan",
    description: "Get a suggested architecture for your project.",
    detail: "HackForge AI proposes tech stacks, database schemas, and key components tailored to your idea."
  },
  {
    title: "Generate Your Codebase",
    description: "Receive a complete codebase instantly.",
    detail: "Frontend, backend, and database — clean, production-ready code with best practices and tests."
  },
  {
    title: "Customize & Deploy",
    description: "Make changes and deploy with ease.",
    detail: "Tweak your code in-browser and deploy to Vercel, Netlify, or AWS in one click."
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeStep]);

  const handleStepClick = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveStep(index);
  };

  return (
    <section className="py-24">
      <div className="container space-y-16">
        <header className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-4 text-muted-foreground">
            Building with HackForge AI is simple, fast, and designed for developers of all skill levels.
          </p>
        </header>

        <div className="space-y-10 max-w-5xl mx-auto">
          {/* Step Indicators */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => handleStepClick(index)}
                className="z-10 flex flex-col items-center cursor-pointer group"
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    activeStep >= index
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground"
                  )}
                >
                  {activeStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className="mt-2 text-xs sm:text-sm font-medium text-center">
                  {step.title}
                </span>
              </div>
            ))}

            {/* Connecting Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted-foreground/30 z-0">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Detail Card */}
          <div className="rounded-xl border border-primary/20 bg-black/40 p-8 backdrop-blur-md space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">{steps[activeStep].title}</h3>
              <p className="text-lg mt-2">{steps[activeStep].description}</p>
              <p className="mt-4 text-muted-foreground">{steps[activeStep].detail}</p>
            </div>

            {/* Progress dots */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "h-1.5 rounded transition-colors cursor-pointer",
                    index === activeStep ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
