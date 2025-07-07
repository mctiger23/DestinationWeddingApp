'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, Heart, Bell, Settings } from 'lucide-react'

interface AppHeaderProps {
  currentScreen: string
  onBack: () => void
  showBackButton: boolean
}

export function AppHeader({ currentScreen, onBack, showBackButton }: AppHeaderProps) {
  const getTitle = () => {
    switch (currentScreen) {
      case 'setup':
        return 'Wedding Setup'
      case 'guests':
        return 'Guest Management'
      case 'flights':
        return 'Flight Search'
      case 'itinerary':
        return 'Wedding Itinerary'
      case 'hotels':
        return 'Hotels'
      case 'guest-travel':
        return 'Your Travel Plans'
      default:
        return 'WeddingDestination'
    }
  }

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-amber-600" />
            <h1 className="text-lg font-bold">{getTitle()}</h1>
          </div>
        </div>
        
        {currentScreen !== 'setup' && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
