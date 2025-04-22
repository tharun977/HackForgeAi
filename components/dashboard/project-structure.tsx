"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
}

interface ProjectStructureProps {
  structure?: FileNode[]
}

export function ProjectStructure({ structure }: ProjectStructureProps) {
  // Use provided structure or fallback to sample
  const projectStructure = structure || [
    {
      name: "app",
      type: "folder",
      children: [
        {
          name: "api",
          type: "folder",
          children: [
            {
              name: "auth",
              type: "folder",
              children: [{ name: "[...nextauth]", type: "folder", children: [{ name: "route.ts", type: "file" }] }],
            },
            {
              name: "snippets",
              type: "folder",
              children: [
                { name: "route.ts", type: "file" },
                { name: "[id]", type: "folder", children: [{ name: "route.ts", type: "file" }] },
              ],
            },
          ],
        },
        { name: "layout.tsx", type: "file" },
        { name: "page.tsx", type: "file" },
      ],
    },
    {
      name: "components",
      type: "folder",
      children: [
        {
          name: "ui",
          type: "folder",
          children: [
            { name: "button.tsx", type: "file" },
            { name: "card.tsx", type: "file" },
          ],
        },
      ],
    },
    {
      name: "lib",
      type: "folder",
      children: [
        { name: "db.ts", type: "file" },
        { name: "utils.ts", type: "file" },
      ],
    },
  ]

  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <div className="mb-4 text-sm font-medium">Project Structure</div>
      <div className="space-y-1 max-h-[600px] overflow-auto">
        {projectStructure.map((node, index) => (
          <FileTreeNode key={index} node={node} level={0} />
        ))}
      </div>
    </div>
  )
}

interface FileTreeNodeProps {
  node: FileNode
  level: number
}

function FileTreeNode({ node, level }: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(level < 1)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div
        className={cn(
          "flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 hover:bg-muted",
          level > 0 && "ml-4",
        )}
        onClick={toggleOpen}
      >
        {node.type === "folder" ? (
          <>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <Folder className="h-4 w-4 text-blue-500" />
          </>
        ) : (
          <>
            <div className="w-4" />
            <File className="h-4 w-4 text-muted-foreground" />
          </>
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {node.type === "folder" && isOpen && node.children && (
        <div className="ml-2">
          {node.children.map((child, index) => (
            <FileTreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
