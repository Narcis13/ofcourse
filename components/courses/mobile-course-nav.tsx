"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, BookOpen, Grid, Heart, ShoppingBag } from "lucide-react";
import { getCategoryColorScheme } from "@/lib/category-colors";

interface MobileCourseNavProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    courseCount?: number;
  }>;
}

export default function MobileCourseNav({ categories }: MobileCourseNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      title: "All Courses",
      href: "/courses",
      icon: Grid,
    },
    {
      title: "My Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      title: "Favorites",
      href: "/dashboard/favorites",
      icon: Heart,
    },
    {
      title: "Cart",
      href: "/cart",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t">
      <div className="flex items-center justify-around py-2">
        {navItems.slice(0, 3).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs">Categories</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader className="pb-4">
              <SheetTitle>Course Categories</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto">
              <div className="space-y-1">
                <Link
                  href="/courses"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-colors",
                    pathname === "/courses" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  )}
                >
                  <span className="font-medium">All Courses</span>
                </Link>
                
                {categories.map((category) => {
                  const colors = getCategoryColorScheme(category.slug);
                  const isActive = pathname.includes(`/courses/${category.slug}`);
                  
                  return (
                    <Link
                      key={category.id}
                      href={`/courses/${category.slug}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg transition-colors",
                        isActive ? "bg-primary/10" : "hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <span className={cn("font-medium", isActive && "text-primary")}>
                          {category.name}
                        </span>
                      </div>
                      {category.courseCount !== undefined && (
                        <span className="text-sm text-muted-foreground">
                          {category.courseCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}