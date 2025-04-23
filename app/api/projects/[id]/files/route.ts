import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs';

// Get all files for a project
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const projectId = params.id;
    
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
    
    // Check if user has access to the project
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { userId: user.id },
          {
            collaborators: {
              some: {
                userId: user.id,
              },
            },
          },
          { isPublic: true },
        ],
      },
    });
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'You do not have access to this project' },
        { status: 403 }
      );
    }
    
    // Get files
    const files = await prisma.projectFile.findMany({
      where: { projectId },
      orderBy: { path: 'asc' },
    });
    
    return NextResponse.json({ files });
    
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create a new file
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const projectId = params.id;
    const body = await req.json();
    const { name, path, content, language } = body;
    
    if (!name || !path || !language) {
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
    
    // Check if user has edit access to the project
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { userId: user.id },
          {
            collaborators: {
              some: {
                userId: user.id,
                role: { in: ['owner', 'editor'] },
              },
            },
          },
        ],
      },
    });
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'You do not have permission to add files to this project' },
        { status: 403 }
      );
    }
    
    // Create file
    const file = await prisma.projectFile.create({
      data: {
        name,
        path,
        content: content || '',
        language,
        projectId,
      },
    });
    
    return NextResponse.json({ file });
    
  } catch (error) {
    console.error('Error creating file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}