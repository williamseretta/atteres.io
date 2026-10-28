import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Users } from "lucide-react"

const resources = [
  {
    title: "Trading Fundamentals",
    description: "Build a solid foundation with core concepts, terminology, and market mechanics.",
    level: "Beginner",
    duration: "2 hours",
    students: "12k+"
  },
  {
    title: "Risk & Position Sizing",
    description: "Learn to protect your capital with proper risk management and position sizing strategies.",
    level: "Intermediate",
    duration: "1.5 hours",
    students: "8k+"
  },
  {
    title: "The Psychology Blueprint",
    description: "Develop mental frameworks for staying calm, focused, and disciplined during market hours.",
    level: "All Levels",
    duration: "3 hours",
    students: "15k+"
  }
]

export function EducationSection() {
  return (
    <section id="education" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">Education</span>
          <h2 className="text-3xl font-bold text-foreground mt-2 mb-4 text-balance">
            Learn at your own pace
          </h2>
          <p className="text-muted-foreground text-pretty">
            Free resources designed to help you become a more mindful and profitable trader.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {resources.map((resource) => (
            <Card key={resource.title} className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {resource.level}
                  </Badge>
                  <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-lg leading-snug">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {resource.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{resource.students}</span>
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
