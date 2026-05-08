import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-semibold text-foreground">atteres.io</span>
          </Link>
          
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Empowering traders with the psychology and discipline needed for sustainable success.
          </p>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
            <Link href="#psychology" className="hover:text-foreground transition-colors">
              Psychology
            </Link>
            <Link href="#education" className="hover:text-foreground transition-colors">
              Education
            </Link>
            <Link href="#community" className="hover:text-foreground transition-colors">
              Community
            </Link>
            <a 
              href="https://reddit.com/r/daytrade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              r/daytrade
            </a>
          </nav>
          
          <div className="text-xs text-muted-foreground">
            <p className="mb-2">
              Trading involves substantial risk of loss. This is not financial advice.
            </p>
            <p>© {new Date().getFullYear()} atteres.io. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
