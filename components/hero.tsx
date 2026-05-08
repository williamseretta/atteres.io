import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Target, TrendingUp } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            <span>Master Your Trading Psychology</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 text-balance">
            Trade with clarity.
            <span className="text-primary"> Grow with discipline.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
            Day trading isn&apos;t just about charts and patterns. It&apos;s about mastering 
            your mind. Join a community focused on sustainable growth and positive trading habits.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="w-full sm:w-auto">
              Start Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Join r/daytrade
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Psychology</span>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Discipline</span>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Growth</span>
          </div>
        </div>
      </div>
    </section>
  )
}
