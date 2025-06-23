"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AnalyticsDashboard({ userId }: { userId: number }) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-white">Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-400">
        <p>
          Coming soon – detailed usage and performance insights for user&nbsp;
          <span className="text-white font-medium">#{userId}</span>.
        </p>
      </CardContent>
    </Card>
  )
}
