"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Package, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/auth/user-nav"
import { ThemeToggle } from "@/components/theme/theme-toggle"

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Products", href: "/products", icon: Package },
  { name: "Transactions", href: "/transactions", icon: ShoppingCart },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 backdrop-blur-sm bg-background/90">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Stock Management</h1>
          </Link>
          <nav className="hidden md:ml-6 md:flex md:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "border-b-2 border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-b-2 hover:border-muted hover:text-foreground",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

