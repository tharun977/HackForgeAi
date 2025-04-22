"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Github, Loader2, Upload } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface ExportOptionsProps {
  setupInstructions?: string
  dependencies?: {
    frontend: Record<string, string>
    backend: Record<string, string>
  }
}

export function ExportOptions({ setupInstructions, dependencies }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [repoName, setRepoName] = useState("my-project")
  const [selectedFormat, setSelectedFormat] = useState("zip")
  const [includeOptions, setIncludeOptions] = useState({
    readme: true,
    env: true,
    git: true,
    docs: true,
  })

  const handleExport = () => {
    setIsExporting(true)
    // Simulate export
    setTimeout(() => {
      setIsExporting(false)
    }, 2000)
  }

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate GitHub connection
    setTimeout(() => {
      setIsConnecting(false)
    }, 2000)
  }

  const toggleIncludeOption = (option: keyof typeof includeOptions) => {
    setIncludeOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  return (
    <Tabs defaultValue="download" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="download">Download</TabsTrigger>
        <TabsTrigger value="github">GitHub</TabsTrigger>
        <TabsTrigger value="setup">Setup Instructions</TabsTrigger>
      </TabsList>
      <TabsContent value="download" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Download Project</CardTitle>
            <CardDescription>Download your project as a ZIP file to your local machine.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Format</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="zip"
                    checked={selectedFormat === "zip"}
                    onCheckedChange={() => setSelectedFormat("zip")}
                  />
                  <Label htmlFor="zip" className="cursor-pointer">
                    ZIP Archive
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tar"
                    checked={selectedFormat === "tar"}
                    onCheckedChange={() => setSelectedFormat("tar")}
                  />
                  <Label htmlFor="tar" className="cursor-pointer">
                    TAR Archive
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Include</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="readme"
                    checked={includeOptions.readme}
                    onCheckedChange={() => toggleIncludeOption("readme")}
                  />
                  <Label htmlFor="readme" className="cursor-pointer">
                    README.md
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="env" checked={includeOptions.env} onCheckedChange={() => toggleIncludeOption("env")} />
                  <Label htmlFor="env" className="cursor-pointer">
                    .env.example
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="git" checked={includeOptions.git} onCheckedChange={() => toggleIncludeOption("git")} />
                  <Label htmlFor="git" className="cursor-pointer">
                    .git files
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="docs"
                    checked={includeOptions.docs}
                    onCheckedChange={() => toggleIncludeOption("docs")}
                  />
                  <Label htmlFor="docs" className="cursor-pointer">
                    Documentation
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleExport} disabled={isExporting} className="w-full">
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing Download...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Project
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="github" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Push to GitHub</CardTitle>
            <CardDescription>Push your project directly to a GitHub repository.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-status">GitHub Status</Label>
              <div className="flex items-center gap-2 rounded-md border bg-muted p-3">
                <Github className="h-5 w-5" />
                <span className="text-sm">Not connected to GitHub</span>
                <Button variant="outline" size="sm" className="ml-auto" onClick={handleConnect} disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="repo-name">Repository Name</Label>
              <Input id="repo-name" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Repository Visibility</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="public" checked={true} />
                  <Label htmlFor="public" className="cursor-pointer">
                    Public
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="private" checked={false} />
                  <Label htmlFor="private" className="cursor-pointer">
                    Private
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Push to GitHub
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="setup" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>Follow these steps to set up and run your project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {setupInstructions ? (
              <div className="rounded-md bg-muted p-4">
                <pre className="whitespace-pre-wrap text-sm">{setupInstructions}</pre>
              </div>
            ) : (
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm">
                  # Setup Instructions 1. Clone the repository 2. Install dependencies: `npm install` 3. Set up
                  environment variables 4. Start the development server: `npm run dev`
                </p>
              </div>
            )}

            {dependencies && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Frontend Dependencies</h3>
                  <div className="rounded-md bg-muted p-4">
                    <pre className="whitespace-pre-wrap text-sm">
                      {Object.entries(dependencies.frontend)
                        .map(([name, version]) => `${name}: ${version}`)
                        .join("\n")}
                    </pre>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Backend Dependencies</h3>
                  <div className="rounded-md bg-muted p-4">
                    <pre className="whitespace-pre-wrap text-sm">
                      {Object.entries(dependencies.backend)
                        .map(([name, version]) => `${name}: ${version}`)
                        .join("\n")}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
