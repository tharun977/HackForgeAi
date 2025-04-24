"use client"

import { CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export function EnvStatus() {
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the API key is configured by making a simple request
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/check-env", { method: "GET" })
        const data = await response.json()
        setApiKeyConfigured(data.configured)
      } catch (error) {
        setApiKeyConfigured(false)
      }
    }

    checkApiKey()
  }, [])

  return (
    <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Environment Status</CardTitle>
        <CardDescription>Status of required environment variables</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {apiKeyConfigured === null ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded-full bg-muted"></div>
              <span>Checking Groq API key...</span>
            </div>
          ) : apiKeyConfigured ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Groq API key is configured</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span>Groq API key is not configured</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
