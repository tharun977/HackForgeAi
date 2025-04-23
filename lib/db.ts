// Simple in-memory database for now
// We'll replace this with Prisma once we've fixed the deployment issues

type User = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

type Project = {
  id: string
  name: string
  description?: string
  userId: string
  techStack: Record<string, any>
  features: string[]
  status: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

class InMemoryDB {
  private users: Map<string, User> = new Map()
  private projects: Map<string, Project> = new Map()

  // User methods
  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  async createUser(user: User): Promise<User> {
    this.users.set(user.id, user)
    return user
  }

  // Project methods
  async getProject(id: string): Promise<Project | null> {
    return this.projects.get(id) || null
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter((project) => project.userId === userId)
  }

  async createProject(project: Project): Promise<Project> {
    this.projects.set(project.id, project)
    return project
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
    const project = this.projects.get(id)
    if (!project) return null

    const updatedProject = { ...project, ...data, updatedAt: new Date() }
    this.projects.set(id, updatedProject)
    return updatedProject
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id)
  }
}

export const db = new InMemoryDB()
