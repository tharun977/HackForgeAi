import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs';

// Get a specific project by ID
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
    
    // Get project with files and check if user is allowed to access it
    const project = await prisma.project.findFirst({
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
      include: {
        files: true,
        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        analytics: true,
      },
    });
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found or you do not have access' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ project });
    
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update a project
export async function PUT(
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
    
    // Check if user is owner or has edit permissions
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
        { error: 'You do not have permission to update this project' },
        { status: 403 }
      );
    }
    
    // Update project
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: body.name,
        description: body.description,
        isPublic: body.isPublic,
        // Don't allow changing the owner
      },
    });
    
    return NextResponse.json({ project: updatedProject });
    
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete a project
export async function DELETE(
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
    
    // Check if user is owner
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    });
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found or you do not have permission to delete it' },
        { status: 403 }
      );
    }
    
    // Delete project
    await prisma.project.delete({
      where: { id: projectId },
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}