"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

// Mocked collaborator data for demo purposes
const collaborators = [
  {
    id: "1",
    name: "You",
    email: "you@example.com",
    role: "owner",
    avatar: null,
    isYou: true,
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    role: "editor",
    avatar: null,
    isYou: false,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "viewer",
    avatar: null,
    isYou: false,
  },
];

export function ProjectCollaborators() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Invite Collaborators</CardTitle>
          <CardDescription>
            Invite team members to collaborate on this project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                placeholder="colleague@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-[180px] items-center gap-1.5">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select
                value={inviteRole}
                onValueChange={setInviteRole}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mb-0.5">
              Invite
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            People with access to this project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={collaborator.avatar || ""} />
                    <AvatarFallback>
                      {collaborator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {collaborator.name}
                      {collaborator.isYou && (
                        <span className="text-xs bg-primary/20 text-primary py-0.5 px-1.5 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {collaborator.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    defaultValue={collaborator.role}
                    disabled={collaborator.isYou}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {!collaborator.isYou && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Icons.close className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/40 pt-6">
          <div className="text-sm text-muted-foreground">
            {collaborators.length} people with access
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}