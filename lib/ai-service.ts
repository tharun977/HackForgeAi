import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface CodeGenerationRequest {
  projectName: string
  description: string
  techStack: {
    frontend: string
    backend: string
    database: string
    styling: string
  }
  features: string[]
}

export interface GeneratedFile {
  path: string
  content: string
  description?: string
}

export interface CodeGenerationResponse {
  files: GeneratedFile[]
  projectStructure: {
    name: string
    type: "file" | "folder"
    children?: any[]
  }[]
  setupInstructions: string
  dependencies: {
    frontend: Record<string, string>
    backend: Record<string, string>
  }
}

const systemPrompt = `You are an expert full-stack developer who specializes in generating production-ready code. 
Your task is to generate code for a project based on the user's description.
You should generate a complete project structure with all necessary files.
The response should be a valid JSON object with the following structure:
{
  "files": [
    {
      "path": "relative/path/to/file.ext",
      "content": "// File content here",
      "description": "Brief description of what this file does"
    }
  ],
  "projectStructure": [
    {
      "name": "folder-name",
      "type": "folder",
      "children": [
        {
          "name": "file-name.ext",
          "type": "file"
        }
      ]
    }
  ],
  "setupInstructions": "Step-by-step instructions to set up and run the project",
  "dependencies": {
    "frontend": {
      "dependency-name": "^version"
    },
    "backend": {
      "dependency-name": "^version"
    }
  }
}

Generate code that follows best practices, is well-commented, and is production-ready.
Focus on the core functionality first and make sure the code is clean and maintainable.
`

export async function generateProjectCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
  try {
    const prompt = `
Generate a ${request.projectName} project with the following specifications:

Description: ${request.description}

Tech Stack:
- Frontend: ${request.techStack.frontend}
- Backend: ${request.techStack.backend}
- Database: ${request.techStack.database}
- Styling: ${request.techStack.styling}

Features:
${request.features.map((feature) => `- ${feature}`).join("\n")}

Please generate a complete project structure with all necessary files.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt,
      temperature: 0.7,
      maxTokens: 4000,
    })

    // Parse the response as JSON
    const response = JSON.parse(text) as CodeGenerationResponse
    return response
  } catch (error) {
    console.error("Error generating code:", error)
    throw new Error("Failed to generate code. Please try again.")
  }
}

// This function simulates the code generation process for development
export async function simulateCodeGeneration(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Sample response for a social media app
  return {
    files: [
      {
        path: "app/page.tsx",
        content: `import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Welcome to ${request.projectName}</h1>
        <p className="text-xl mb-8 text-center max-w-md">
          ${request.description}
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/auth/sign-in">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}`,
        description: "Main landing page component that displays a welcome message and call-to-action buttons.",
      },
      {
        path: "app/api/posts/route.ts",
        content: `import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { content, imageUrl } = await req.json();
    
    const post = await db.post.create({
      data: {
        content,
        imageUrl,
        authorId: userId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}`,
        description: "API route handler for fetching and creating posts.",
      },
      {
        path: "components/posts/post-card.tsx",
        content: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, Share } from 'lucide-react';
import Link from "next/link";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    imageUrl?: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      imageUrl?: string;
    };
    _count: {
      likes: number;
      comments: number;
    };
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.imageUrl || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={\`/profile/\${post.author.id}\`} className="font-semibold hover:underline">
              {post.author.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-md">
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt="Post image"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between">
        <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
          <Heart className="h-5 w-5" />
          <span>{post._count.likes}</span>
        </button>
        <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
          <MessageSquare className="h-5 w-5" />
          <span>{post._count.comments}</span>
        </button>
        <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
          <Share className="h-5 w-5" />
          <span>Share</span>
        </button>
      </CardFooter>
    </Card>
  );
}`,
        description:
          "Reusable component for displaying a post with author information, content, and interaction buttons.",
      },
      {
        path: "prisma/schema.prisma",
        content: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  userId    String   @unique
  name      String
  imageUrl  String?
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts    Post[]
  comments Comment[]
  likes    Like[]

  followers Follow[] @relation("following")
  following Follow[] @relation("follower")

  @@index([userId])
}

model Post {
  id        String   @id @default(cuid())
  content   String
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  comments Comment[]
  likes    Like[]

  @@index([authorId])
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  postId String
  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)

  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([postId])
  @@index([authorId])
}

model Like {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  postId String
  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@index([postId])
  @@index([userId])
}

model Follow {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  followerId String
  follower   User   @relation("follower", fields: [followerId], references: [id], onDelete: Cascade)

  followingId String
  following   User   @relation("following", fields: [followingId], references: [id], onDelete: Cascade)

  @@unique([followerId, followingId])
  @@index([followerId])
  @@index([followingId])
}`,
        description: "Prisma schema defining the database models for users, posts, comments, likes, and follows.",
      },
      {
        path: "lib/db.ts",
        content: `import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}`,
        description:
          "Database client initialization with Prisma, using a global instance to prevent multiple instances during development.",
      },
    ],
    projectStructure: [
      {
        name: "app",
        type: "folder",
        children: [
          {
            name: "api",
            type: "folder",
            children: [
              {
                name: "posts",
                type: "folder",
                children: [{ name: "route.ts", type: "file" }],
              },
              {
                name: "comments",
                type: "folder",
                children: [{ name: "route.ts", type: "file" }],
              },
            ],
          },
          { name: "page.tsx", type: "file" },
          { name: "layout.tsx", type: "file" },
        ],
      },
      {
        name: "components",
        type: "folder",
        children: [
          {
            name: "posts",
            type: "folder",
            children: [
              { name: "post-card.tsx", type: "file" },
              { name: "post-form.tsx", type: "file" },
            ],
          },
          {
            name: "ui",
            type: "folder",
            children: [
              { name: "button.tsx", type: "file" },
              { name: "input.tsx", type: "file" },
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
      {
        name: "prisma",
        type: "folder",
        children: [{ name: "schema.prisma", type: "file" }],
      },
    ],
    setupInstructions: `
# Setup Instructions

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Set up environment variables:
   Create a \`.env\` file with the following variables:
   \`\`\`
   DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   \`\`\`
4. Initialize the database:
   \`\`\`
   npx prisma migrate dev --name init
   \`\`\`
5. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`
6. Open http://localhost:3000 in your browser
    `,
    dependencies: {
      frontend: {
        next: "^14.0.0",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        tailwindcss: "^3.3.0",
        "framer-motion": "^10.16.4",
        "date-fns": "^2.30.0",
        "lucide-react": "^0.292.0",
      },
      backend: {
        "@prisma/client": "^5.5.2",
        prisma: "^5.5.2",
        "@clerk/nextjs": "^4.26.1",
        "socket.io": "^4.7.2",
        "socket.io-client": "^4.7.2",
      },
    },
  }
}
