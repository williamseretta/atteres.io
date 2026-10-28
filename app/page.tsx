import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PsychologySection } from "@/components/psychology-section"
import { DailyTip } from "@/components/daily-tip"
import { EducationSection } from "@/components/education-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PsychologySection />
        <DailyTip />
        <EducationSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
