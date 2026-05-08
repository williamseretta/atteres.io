"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, RefreshCw } from "lucide-react"

const tips = [
  {
    tip: "Before you trade, check in with yourself. How are you feeling? Anxious, confident, tired? Your emotional state directly impacts your decisions.",
    author: "Trading Psychology 101"
  },
  {
    tip: "Set your daily loss limit BEFORE the market opens. When you hit it, walk away. Tomorrow is another day.",
    author: "Risk Management"
  },
  {
    tip: "The market will always be there. Missing a trade is not losing money—it's preserving capital for the right opportunity.",
    author: "Patience Principle"
  },
  {
    tip: "Journal not just your trades, but your emotions during them. Patterns in your feelings often predict patterns in your results.",
    author: "Self-Awareness"
  },
  {
    tip: "Size down when you're on a losing streak. Your confidence and clarity matter more than catching up.",
    author: "Position Sizing"
  }
]

export function DailyTip() {
  const [currentTip, setCurrentTip] = useState(0)

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length)
  }

  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-primary/20 bg-card">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Lightbulb className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Daily Mindset Tip</span>
            </div>
            
            <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-4">
              &ldquo;{tips[currentTip].tip}&rdquo;
            </blockquote>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">— {tips[currentTip].author}</span>
              <Button variant="ghost" size="sm" onClick={nextTip} className="text-muted-foreground hover:text-foreground">
                <RefreshCw className="w-4 h-4 mr-2" />
                New Tip
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
