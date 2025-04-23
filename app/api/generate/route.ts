import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { type CodeGenerationRequest, simulateCodeGeneration } from "@/lib/ai-service"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
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
