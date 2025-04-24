"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

const commands = [
  { text: "> Describe your project idea", delay: 500 },
  {
    text: `"I need a social media platform for developers to share code snippets and get feedback from the community."`,
    delay: 1500,
    isUser: true,
  },
  { text: "> Generating project scaffold...", delay: 1000 },
  { text: "> Creating frontend components...", delay: 800 },
  { text: "> Setting up authentication...", delay: 700 },
  { text: "> Configuring database models...", delay: 900 },
  { text: "> Implementing API endpoints...", delay: 800 },
  { text: "> Project ready! 🚀", delay: 1000 },
]

export function TerminalAnimation() {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentIndex >= commands.length) {
      setTimeout(() => {
        setCurrentIndex(0)
        setDisplayedCommands([])
        setCurrentText("")
      }, 3000)
      return
    }

    const command = commands[currentIndex]

    if (command.isUser) {
      setIsTyping(true)
      let i = 0
      const typingInterval = setInterval(() => {
        if (i <= command.text.length) {
          setCurrentText(command.text.substring(0, i))
          i++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
          setDisplayedCommands([...displayedCommands, command.text])
          setCurrentText("")
          setTimeout(() => {
            setCurrentIndex(currentIndex + 1)
          }, 500)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    } else {
      setTimeout(() => {
        setDisplayedCommands([...displayedCommands, command.text])
        setCurrentIndex(currentIndex + 1)
      }, command.delay)
    }
  }, [currentIndex, displayedCommands])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayedCommands, currentText])

  return (
    <Card className="w-full bg-black/50 border-primary/20 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-primary/20 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <div className="ml-2 text-sm font-medium">hackforge-terminal</div>
      </div>
      <div ref={terminalRef} className="h-[300px] overflow-auto p-4 font-mono text-sm text-green-400">
        {displayedCommands.map((cmd, i) => (
          <div key={i} className={`mb-2 ${cmd.includes("user") ? "text-blue-400" : ""}`}>
            {cmd}
          </div>
        ))}
        {isTyping && (
          <div className="mb-2 text-blue-400">
            {currentText}
            <span className="animate-pulse">|</span>
          </div>
        )}
        {!isTyping && currentIndex < commands.length && !commands[currentIndex].isUser && (
          <div className="animate-pulse">_</div>
        )}
      </div>
    </Card>
  )
}
