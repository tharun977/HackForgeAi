import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CodePreview } from "@/components/code-preview"
import { Download, Github, Share2 } from "lucide-react"

export default function ProjectPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch project data based on the ID
  const project = {
    id: params.id,
    name: "Social Media App",
    description: "A platform for developers to share code snippets and get feedback from the community.",
    createdAt: "2 days ago",
    files: [
      {
        name: "app/page.tsx",
        language: "tsx",
        code: `export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">Welcome to CodeShare</h1>
      <p className="mt-4 text-gray-500">
        Share your code snippets and get feedback from the community.
      </p>
    </div>
  );
}`,
      },
      {
        name: "components/CodeSnippet.tsx",
        language: "tsx",
        code: `interface CodeSnippetProps {
  title: string;
  code: string;
  language: string;
  author: {
    name: string;
    avatar: string;
  };
}

export function CodeSnippet({ title, code, language, author }: CodeSnippetProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          <img src={author.avatar || "/placeholder.svg"} alt={author.name} className="h-6 w-6 rounded-full" />
          <span className="text-sm text-gray-500">{author.name}</span>
        </div>
      </div>
      <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-4">
        <code className={\`language-\${language}\`}>{code}</code>
      </pre>
    </div>
  );
}`,
      },
      {
        name: "server/routes/snippets.js",
        language: "js",
        code: `const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// Get all snippets
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new snippet
router.post('/', async (req, res) => {
  const snippet = new Snippet({
    title: req.body.title,
    code: req.body.code,
    language: req.body.language,
    author: req.user._id
  });

  try {
    const newSnippet = await snippet.save();
    res.status(201).json(newSnippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;`,
      },
    ],
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={project.name} text={project.description}>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Github className="h-4 w-4" /> Push to GitHub
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Download
          </Button>
        </div>
      </DashboardHeader>
      <div className="grid gap-8">
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="mt-6">
            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Project Files</CardTitle>
                <CardDescription>Browse and edit the generated code files.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {project.files.map((file) => (
                    <CodePreview key={file.name} file={file} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preview" className="mt-6">
            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Project Preview</CardTitle>
                <CardDescription>Preview your application (not available in demo).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">Preview would be displayed here in a real application.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="docs" className="mt-6">
            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Auto-generated documentation for your project.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <h2>Social Media App</h2>
                  <p>This is a platform for developers to share code snippets and get feedback from the community.</p>
                  <h3>Getting Started</h3>
                  <ol>
                    <li>Clone the repository</li>
                    <li>
                      Install dependencies with <code>npm install</code>
                    </li>
                    <li>
                      Start the development server with <code>npm run dev</code>
                    </li>
                  </ol>
                  <h3>Project Structure</h3>
                  <ul>
                    <li>
                      <code>app/</code> - Next.js application files
                    </li>
                    <li>
                      <code>components/</code> - React components
                    </li>
                    <li>
                      <code>server/</code> - Backend API routes and models
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
