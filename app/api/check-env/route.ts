import { NextResponse } from "next/server"

export async function GET() {
  // Check if the Groq API key is configured
  const groqApiKey = process.env.GROQ_CLOUD_API

  return NextResponse.json({
    configured: !!groqApiKey,
  })
}
