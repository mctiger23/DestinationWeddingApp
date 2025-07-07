'use client'

import { Button } from '@/components/ui/button'
import { UserRole } from '@/lib/types'
import { 
  Users, 
  UserCheck, 
  Plane, 
  Calendar, 
  Heart 
} from 'lucide-react'

interface BottomNavigationProps {
  currentScreen: string
  currentUser: UserRole
  isGuestAuthenticated: boolean
  onScreenChange: (screen: string) => void
}

export function BottomNavigation({ 
  currentScreen, 
  currentUser, 
  isGuestAuthenticated, 
  onScreenChange 
}: BottomNavigationProps) {
  if (currentUser === 'guest' && !isGuestAuthenticated) {
    return null
  }

  const guestNavItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'guest-travel', label: 'Travel', icon: Plane },
    { id: 'itinerary', label: 'Schedule', icon: Calendar }
  ]

  const adminNavItems = [
    { id: 'home', label: 'Home', icon: Users },
    { id: 'guests', label: 'Guests', icon: UserCheck },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'itinerary', label: 'Schedule', icon: Calendar }
  ]

  const navItems = currentUser === 'guest' ? guestNavItems : adminNavItems

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="mx-auto flex max-w-md">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onScreenChange(item.id)}
              className={`flex h-16 flex-1 flex-col gap-1 rounded-none ${
                isActive ? 'text-amber-600' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
