"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // Analytics implementation would go here
      // This is a placeholder for actual analytics tracking
      console.log(`Page view: ${pathname}${searchParams ? `?${searchParams}` : ''}`)
    }
  }, [pathname, searchParams])

  return null
}