"use client";

import { Suspense } from "react";
import { WeddingApp } from "@/components/wedding/wedding-app";
import { WeddingProvider } from "@/components/wedding/wedding-context";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card, CardContent } from "@/components/ui/card";

function WeddingAppLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center space-y-4">
            <LoadingSpinner size="lg" />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                Loading Your Wedding App
              </h2>
              <p className="text-muted-foreground">
                Setting up your destination wedding planning experience...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <WeddingProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Suspense fallback={<WeddingAppLoading />}>
          <WeddingApp />
        </Suspense>
      </div>
    </WeddingProvider>
  );
}
