"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Download, FileCode, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CodeViewerProps {
  code: string
  language: string
  filePath?: string
  description?: string
}

export function CodeViewer({ code, language, filePath, description }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{filePath || "Code"}</span>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-sm">
                  <p>{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
            <Download className="h-3 w-3" />
            Download
          </Button>
        </div>
      </div>
      <Tabs defaultValue="code">
        <TabsList className="px-4 pt-2">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-0">
          <pre className="overflow-auto p-4 text-sm max-h-[500px]">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </TabsContent>
        <TabsContent value="preview" className="mt-0">
          <div className="p-4 text-sm">Preview not available</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
