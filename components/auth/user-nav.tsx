"use client"

import { useAuth } from "./auth-provider"
import { LoginButton } from "./login-button"
import { LogoutButton } from "./logout-button"
import { SignupButton } from "./signup-button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserNav() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <LoginButton />
        <SignupButton />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block">
        <p className="text-sm font-medium">Welcome, {user.name}</p>
        <p className="text-xs text-muted-foreground">{user.role}</p>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <LogoutButton />
    </div>
  )
}

