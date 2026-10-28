import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Zap, Eye } from "lucide-react"

const principles = [
  {
    icon: Heart,
    title: "Emotional Awareness",
    description: "Recognize fear and greed before they control your decisions. Your emotions are data, not directives."
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Protect your capital like it&apos;s your lifeline. Small, consistent wins beat occasional big swings."
  },
  {
    icon: Zap,
    title: "Patience Over FOMO",
    description: "The best trades are the ones you don&apos;t take. Wait for your setup, not every opportunity."
  },
  {
    icon: Eye,
    title: "Self-Reflection",
    description: "Journal your trades and emotions. Growth comes from understanding your patterns."
  }
]

export function PsychologySection() {
  return (
    <section id="psychology" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">Trading Psychology</span>
          <h2 className="text-3xl font-bold text-foreground mt-2 mb-4 text-balance">
            Master your mind, master the market
          </h2>
          <p className="text-muted-foreground text-pretty">
            The difference between profitable traders and the rest isn&apos;t strategy—it&apos;s psychology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {principles.map((principle) => (
            <Card key={principle.title} className="border-border/50 bg-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <principle.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
