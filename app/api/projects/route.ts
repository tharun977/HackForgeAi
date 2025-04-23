import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs';

// Get all projects for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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
    
    // Get projects where user is owner or collaborator
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { userId: user.id },
          {
            collaborators: {
              some: {
                userId: user.id,
              },
            },
          },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    
    return NextResponse.json({ projects });
    
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create a new project
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
    const { name, description, language, framework } = body;
    
    if (!name || !description || !language || !framework) {
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
        name,
        description,
        prompt: description,
        language,
        framework,
        status: 'draft',
        userId: user.id,
      },
    });
    
    return NextResponse.json({ project });
    
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}