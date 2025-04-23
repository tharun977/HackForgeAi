import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    const { projectName, projectDescription, language, framework } = body;
    
    if (!projectName || !projectDescription || !language || !framework) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user exists in our database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create project
    const project = await prisma.project.create({
      data: {
        name: projectName,
        description: projectDescription,
        prompt: projectDescription,
        language,
        framework,
        status: 'generating',
        userId: user.id,
      },
    });
    
    return NextResponse.json({ 
      success: true,
      project: {
        id: project.id,
        name: project.name,
        status: project.status,
      }
    });
    
  } catch (error) {
    console.error('Error generating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}