"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWedding } from "@/components/wedding/wedding-context";
import { UserRole } from "@/lib/types";
import { Crown, Settings, User, Plus } from "lucide-react";

export function UserToggle() {
  const { state, setUserRole, setCurrentScreen } = useWedding();
  const { currentUser } = state;

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role !== "guest") {
      setCurrentScreen("home");
    }
  };

  const handleNewSetup = () => {
    setCurrentScreen("setup");
  };

  const roles = [
    {
      id: "couple" as UserRole,
      label: "Couple",
      icon: Crown,
      description: "Full admin access",
    },
    {
      id: "coordinator" as UserRole,
      label: "Coordinator",
      icon: Settings,
      description: "Guest & event management",
    },
    {
      id: "guest" as UserRole,
      label: "Guest",
      icon: User,
      description: "Private guest access",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">User Role</h3>
        <Badge variant="secondary" className="text-xs">
          Demo Mode
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = currentUser === role.id;

          return (
            <Button
              key={role.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleChange(role.id)}
              className="flex h-auto flex-col gap-1 p-3"
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{role.label}</span>
            </Button>
          );
        })}
      </div>

      {/* New Setup Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleNewSetup}
        className="w-full border-amber-200 text-amber-700 hover:bg-amber-50"
      >
        <Plus className="mr-2 h-4 w-4" />
        New Wedding Setup
      </Button>

      {/* Current role description */}
      <p className="text-xs text-muted-foreground text-center">
        {roles.find((role) => role.id === currentUser)?.description}
      </p>
    </div>
  );
}
