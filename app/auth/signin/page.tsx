"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Loader2, Mail } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const error = searchParams.get("error")

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    await signIn("github", { callbackUrl })
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    await signIn("google", { callbackUrl })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome to HackForge AI</CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
          {error && (
            <div className="rounded-md bg-red-50 p-2 text-sm text-red-500">
              {error === "OAuthAccountNotLinked"
                ? "You already have an account with a different provider."
                : "An error occurred. Please try again."}
            </div>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            onClick={handleGithubSignIn}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
            Sign in with GitHub
          </Button>
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="flex items-center gap-2"
          >
            {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
