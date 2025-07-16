"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Award,
  Medal,
  Crown,
  Flame,
  BookOpen,
  Clock,
  TrendingUp,
  Users,
  ChevronRight,
  Lock,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: Date
  rarity: "common" | "rare" | "epic" | "legendary"
  category: "learning" | "streak" | "social" | "mastery"
  points: number
}

interface AchievementBadgesProps {
  achievements: Achievement[]
  totalPoints: number
  userLevel: number
  nextLevelPoints: number
  className?: string
}

export function AchievementBadges({ 
  achievements, 
  totalPoints,
  userLevel,
  nextLevelPoints,
  className 
}: AchievementBadgesProps) {
  const rarityColors = {
    common: "from-slate-500 to-slate-600",
    rare: "from-blue-500 to-blue-600",
    epic: "from-purple-500 to-purple-600",
    legendary: "from-amber-500 to-amber-600",
  }

  const rarityBorderColors = {
    common: "border-slate-500/20",
    rare: "border-blue-500/20",
    epic: "border-purple-500/20",
    legendary: "border-amber-500/20",
  }

  const rarityGlows = {
    common: "",
    rare: "shadow-blue-500/20",
    epic: "shadow-purple-500/20",
    legendary: "shadow-amber-500/20 animate-pulse",
  }

  const categoryIcons = {
    learning: <BookOpen className="h-4 w-4" />,
    streak: <Flame className="h-4 w-4" />,
    social: <Users className="h-4 w-4" />,
    mastery: <Crown className="h-4 w-4" />,
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const recentAchievements = unlockedAchievements
    .filter(a => a.unlockedAt)
    .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
    .slice(0, 3)

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">Achievements</CardTitle>
            <p className="text-sm text-muted-foreground">
              Track your learning milestones
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">{totalPoints}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg">
                  {userLevel}
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="font-semibold">Level {userLevel}</p>
                <p className="text-sm text-muted-foreground">
                  {nextLevelPoints - totalPoints} points to level {userLevel + 1}
                </p>
              </div>
            </div>
          </div>
          <Progress 
            value={(totalPoints % 1000) / 10} 
            className="h-2"
          />
        </div>

        {recentAchievements.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">Recent Achievements</h3>
            <div className="space-y-2">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border bg-card transition-all hover:shadow-md",
                    rarityBorderColors[achievement.rarity]
                  )}
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                      rarityColors[achievement.rarity],
                      rarityGlows[achievement.rarity]
                    )}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.unlockedAt && getRelativeTime(achievement.unlockedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      +{achievement.points}
                    </Badge>
                    {categoryIcons[achievement.category]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground">All Achievements</h3>
          <div className="grid grid-cols-4 gap-3">
            <TooltipProvider>
              {achievements.slice(0, 12).map((achievement) => (
                <Tooltip key={achievement.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "relative aspect-square rounded-lg border-2 transition-all cursor-pointer",
                        achievement.unlocked
                          ? cn(
                              "bg-gradient-to-br hover:scale-110",
                              rarityColors[achievement.rarity],
                              rarityBorderColors[achievement.rarity],
                              rarityGlows[achievement.rarity]
                            )
                          : "bg-muted border-muted-foreground/20 opacity-50"
                      )}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        {achievement.unlocked ? (
                          achievement.icon
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      {!achievement.unlocked && achievement.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b-md overflow-hidden">
                          <div
                            className="h-full bg-white/50 transition-all"
                            style={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-semibold">{achievement.name}</p>
                      <p className="text-xs">{achievement.description}</p>
                      {!achievement.unlocked && (
                        <p className="text-xs text-muted-foreground">
                          Progress: {achievement.progress}/{achievement.maxProgress}
                        </p>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {achievement.points} points
                      </Badge>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {unlockedAchievements.length} of {achievements.length} unlocked
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/achievements">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return date.toLocaleDateString()
}