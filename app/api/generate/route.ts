import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { type CodeGenerationRequest, simulateCodeGeneration } from "@/lib/ai-service"

export async function POST(req: Request) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const requestData = (await req.json()) as CodeGenerationRequest

    // In production, use the actual AI service
    // const result = await generateProjectCode(requestData)

    // For development, use the simulation
    const result = await simulateCodeGeneration(requestData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error generating code:", error)
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 })
  }
}
