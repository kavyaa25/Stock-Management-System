import { Header } from "@/components/layout/header"
import { MobileNav } from "@/components/layout/mobile-nav"
import { DeploymentGuide } from "@/components/deployment-guide"

export default function DeploymentPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MobileNav />
            <h2 className="text-2xl font-bold tracking-tight">Deployment Guide</h2>
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <DeploymentGuide />
        </div>
      </main>
    </div>
  )
}

