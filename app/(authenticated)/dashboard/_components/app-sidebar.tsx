"use client"

import { 
  Link, 
  Settings2, 
  User, 
  Users, 
  BookOpen, 
  Home, 
  CreditCard, 
  HelpCircle,
  GraduationCap,
  Library,
  Trophy,
  BarChart3
} from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "../_components/nav-main"
import { NavUser } from "../_components/nav-user"
import { TeamSwitcher } from "../_components/team-switcher"

export function AppSidebar({
  userData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userData: {
    name: string
    email: string
    avatar: string
    membership: string
  }
}) {
  const data = {
    user: userData,
    teams: [
      {
        name: "Personal",
        logo: User,
        plan: "Account"
      },
      {
        name: "Team 1",
        logo: Users,
        plan: "Team"
      },
      {
        name: "Team 2",
        logo: Users,
        plan: "Team"
      },
      {
        name: "Team 3",
        logo: Users,
        plan: "Team"
      }
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home
      },
      {
        title: "My Courses",
        url: "/dashboard/courses",
        icon: BookOpen,
        items: [
          {
            title: "All Courses",
            url: "/dashboard/courses"
          },
          {
            title: "In Progress",
            url: "/dashboard/courses/in-progress"
          },
          {
            title: "Completed",
            url: "/dashboard/courses/completed"
          }
        ]
      },
      {
        title: "Learning Paths",
        url: "/dashboard/learning-paths",
        icon: GraduationCap
      },
      {
        title: "Library",
        url: "/dashboard/library",
        icon: Library
      },
      {
        title: "Achievements",
        url: "/dashboard/achievements",
        icon: Trophy
      },
      {
        title: "Progress",
        url: "/dashboard/progress",
        icon: BarChart3
      },
      {
        title: "Billing",
        url: "/dashboard/billing",
        icon: CreditCard
      },
      {
        title: "Support",
        url: "/dashboard/support",
        icon: HelpCircle
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "/dashboard/settings"
          },
          {
            title: "Preferences",
            url: "/dashboard/settings/preferences"
          },
          {
            title: "Notifications",
            url: "/dashboard/settings/notifications"
          }
        ]
      }
    ]
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
