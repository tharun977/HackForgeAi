"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"

// Mocked file data for demo purposes
const mockFiles = [
  {
    id: "1",
    name: "package.json",
    path: "/package.json",
    content: `{
  "name": "e-commerce-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^13.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
    language: "json",
  },
  {
    id: "2",
    name: "app.tsx",
    path: "/src/app.tsx",
    content: `import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;`,
    language: "tsx",
  },
  {
    id: "3",
    name: "index.tsx",
    path: "/src/pages/index.tsx",
    content: `import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>E-Commerce Platform</title>
        <meta name="description" content="Modern e-commerce platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to our E-Commerce Platform</h1>
        <p>
          Get started by editing{' '}
          <code>pages/index.tsx</code>
        </p>

        <div>
          <Link href="/products">
            Browse Products
          </Link>
        </div>
      </main>
    </div>
  );
}`,
    language: "tsx",
  },
];

export function ProjectEditor() {
  const [activeFile, setActiveFile] = useState(mockFiles[0]);
  const [openFiles, setOpenFiles] = useState(mockFiles);
  const [editedContent, setEditedContent] = useState(activeFile.content);
  
  // User presence indicator
  const users = [
    { id: "1", name: "You", color: "bg-primary" },
    { id: "2", name: "John", color: "bg-purple-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="flex items-center border-b border-border/50 px-4 py-2">
            <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar">
              {openFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => {
                    setActiveFile(file);
                    setEditedContent(file.content);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md ${
                    activeFile.id === file.id
                      ? "bg-secondary/20 text-secondary"
                      : "hover:bg-secondary/10"
                  }`}
                >
                  <Icons.file className="h-3.5 w-3.5" />
                  <span>{file.name}</span>
                  {activeFile.id === file.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newOpenFiles = openFiles.filter(
                          (f) => f.id !== file.id
                        );
                        setOpenFiles(newOpenFiles);
                        if (newOpenFiles.length > 0) {
                          setActiveFile(newOpenFiles[0]);
                          setEditedContent(newOpenFiles[0].content);
                        }
                      }}
                      className="p-0.5 rounded-full hover:bg-secondary/20"
                    >
                      <Icons.close className="h-3 w-3" />
                    </button>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-12">
            <div className="col-span-3 border-r border-border/50 p-4 max-h-[70vh] overflow-y-auto">
              <h3 className="text-sm font-medium mb-3 flex items-center justify-between">
                <span>Files</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icons.add className="h-3.5 w-3.5" />
                </Button>
              </h3>
              
              <div className="space-y-0.5">
                {mockFiles.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => {
                      setActiveFile(file);
                      setEditedContent(file.content);
                      if (!openFiles.some((f) => f.id === file.id)) {
                        setOpenFiles([...openFiles, file]);
                      }
                    }}
                    className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md w-full text-left ${
                      activeFile.id === file.id
                        ? "bg-secondary/20 text-secondary"
                        : "hover:bg-secondary/10"
                    }`}
                  >
                    <Icons.file className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{file.path}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="col-span-9">
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
                <div className="text-sm text-muted-foreground">
                  {activeFile.path}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                        style={{ backgroundColor: user.color === "bg-primary" ? "hsl(var(--primary))" : user.color }}
                        title={user.name}
                      >
                        {user.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Icons.save className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-[60vh] bg-background text-foreground p-2 font-mono text-sm rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Tabs defaultValue="terminal">
          <TabsList>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="problems">Problems</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Language: <span className="text-foreground">{activeFile.language}</span>
          </div>
          <div className="h-4 w-px bg-border"></div>
          <div className="text-sm text-muted-foreground">
            Lines: <span className="text-foreground">{editedContent.split('\n').length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}