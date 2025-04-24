"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodePreviewProps {
  file: {
    name: string
    language: string
    code: string
  }
}

export function CodePreview({ file }: CodePreviewProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(file.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden border-muted">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 py-3">
        <CardTitle className="text-sm font-medium">{file.name}</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={copyToClipboard}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <pre className="overflow-x-auto p-4 text-sm">
          <code>{file.code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
