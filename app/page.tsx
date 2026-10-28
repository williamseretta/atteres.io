import Link from "next/link"
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
        <section className="px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/golf"
              className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Golf Performance & Bag History →
            </Link>
          </div>
        </section>
        <PsychologySection />
        <DailyTip />
        <EducationSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
