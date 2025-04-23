"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"

// Mocked file data for demo purposes
const mockFiles = [
  {
    id: "1",
    name: "package.json",
    path: "/package.json",
    size: "1.2 KB",
    updated: "2 days ago",
    language: "JSON",
  },
  {
    id: "2",
    name: "app.tsx",
    path: "/src/app.tsx",
    size: "0.8 KB",
    updated: "2 days ago",
    language: "TypeScript",
  },
  {
    id: "3",
    name: "index.tsx",
    path: "/src/pages/index.tsx",
    size: "1.5 KB",
    updated: "2 days ago",
    language: "TypeScript",
  },
  {
    id: "4",
    name: "products.tsx",
    path: "/src/pages/products.tsx",
    size: "2.1 KB",
    updated: "2 days ago",
    language: "TypeScript",
  },
  {
    id: "5",
    name: "product.tsx",
    path: "/src/pages/product/[id].tsx",
    size: "1.9 KB",
    updated: "2 days ago",
    language: "TypeScript",
  },
  {
    id: "6",
    name: "globals.css",
    path: "/src/styles/globals.css",
    size: "3.4 KB",
    updated: "2 days ago",
    language: "CSS",
  },
  {
    id: "7",
    name: "productApi.ts",
    path: "/src/api/productApi.ts",
    size: "0.7 KB",
    updated: "2 days ago",
    language: "TypeScript",
  },
];

export function ProjectFiles() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5;
  
  // Filter files based on search
  const filteredFiles = mockFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(search.toLowerCase()) ||
      file.path.toLowerCase().includes(search.toLowerCase())
  );
  
  // Pagination
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);
  const startIndex = (currentPage - 1) * filesPerPage;
  const endIndex = startIndex + filesPerPage;
  const currentFiles = filteredFiles.slice(startIndex, endIndex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Project Files</CardTitle>
              <CardDescription className="mt-2">
                Manage and organize your project files.
              </CardDescription>
            </div>
            <Button>
              <Icons.add className="mr-2 h-4 w-4" />
              New File
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Icons.code className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search files..."
                className="w-full pl-10 py-2 bg-background border border-input rounded-md"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell className="text-muted-foreground">{file.path}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.language}</TableCell>
                  <TableCell>{file.updated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icons.copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icons.more className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t border-border/40 pt-6">
          <p className="text-sm text-muted-foreground">
            {filteredFiles.length} files in this project.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}