import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Users, TrendingUp, ExternalLink } from "lucide-react"

const stats = [
  { icon: Users, value: "900k+", label: "Members" },
  { icon: MessageCircle, value: "Active", label: "Daily Discussion" },
  { icon: TrendingUp, value: "Free", label: "Education" }
]

export function CommunitySection() {
  return (
    <section id="community" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary font-medium text-sm uppercase tracking-wide">Community</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4 text-balance">
              Join r/daytrade
            </h2>
            <p className="text-muted-foreground text-pretty max-w-xl mx-auto">
              Connect with like-minded traders focused on growth, discipline, and supporting each other through the highs and lows.
            </p>
          </div>

          <Card className="border-border/50 bg-background overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="grid grid-cols-3 gap-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-foreground mb-1">
                          <stat.icon className="w-4 h-4 text-primary" />
                          <span className="text-xl font-bold">{stat.value}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild size="lg" className="shrink-0">
                    <a href="https://reddit.com/r/daytrade" target="_blank" rel="noopener noreferrer">
                      Visit Subreddit
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="font-semibold text-foreground mb-3">Community Values</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Focus on education and long-term skill development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Honest discussions about losses and lessons learned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>No pump-and-dump schemes or get-rich-quick promises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Support for traders at every experience level</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
