import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

// Initialize Groq with the API key from environment variables
const groqApiKey = process.env.GROQ_CLOUD_API

export async function POST(req: NextRequest) {
  try {
    const { projectName, projectDescription, frontendFramework, backendFramework, database } = await req.json()

    // Validate input
    if (!projectName || !projectDescription) {
      return NextResponse.json({ error: "Project name and description are required" }, { status: 400 })
    }

    // Validate API key
    if (!groqApiKey) {
      return NextResponse.json({ error: "Groq API key is not configured" }, { status: 500 })
    }

    // Create a prompt for the AI model
    const prompt = `
      Generate a project scaffold for a web application with the following details:
      
      Project Name: ${projectName}
      Project Description: ${projectDescription}
      Frontend Framework: ${frontendFramework || "Next.js"}
      Backend Framework: ${backendFramework || "Express.js"}
      Database: ${database || "MongoDB"}
      
      Please provide a detailed project structure with file paths and code snippets for key components.
    `

    // Generate text using Groq with the API key from environment variables
    const { text } = await generateText({
      model: groq("llama3-70b-8192", { apiKey: groqApiKey }),
      prompt,
      system:
        "You are an expert full-stack developer who specializes in creating project scaffolds based on user requirements. Provide detailed, production-ready code with best practices.",
    })

    return NextResponse.json({ result: text })
  } catch (error) {
    console.error("Error generating project:", error)
    return NextResponse.json({ error: "Failed to generate project" }, { status: 500 })
  }
}
