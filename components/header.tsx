"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg text-foreground">atteres.io</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#psychology" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Psychology
            </Link>
            <Link href="#education" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Education
            </Link>
            <Link href="#community" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Community
            </Link>
            <Button size="sm">Get Started</Button>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="#psychology"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Psychology
              </Link>
              <Link
                href="#education"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Education
              </Link>
              <Link
                href="#community"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              <Button className="w-full">Get Started</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
