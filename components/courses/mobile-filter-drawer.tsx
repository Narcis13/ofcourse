"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X } from "lucide-react";
import CategoryFilter, { FilterState } from "./category-filter";

interface MobileFilterDrawerProps {
  categories: any[];
  maxPrice?: number;
  onFiltersChange?: (filters: FilterState) => void;
  activeFilters?: number;
}

export default function MobileFilterDrawer({
  categories,
  maxPrice = 200,
  onFiltersChange,
  activeFilters = 0,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="sm:hidden flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          {activeFilters > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
              {activeFilters}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:hidden p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle>Filters</SheetTitle>
              {activeFilters > 0 && (
                <Badge variant="secondary">
                  {activeFilters} active
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        <div className="overflow-y-auto h-[calc(100vh-5rem)] p-4">
          <CategoryFilter
            categories={categories}
            maxPrice={maxPrice}
            onFiltersChange={(filters) => {
              onFiltersChange?.(filters);
              // Close drawer after applying filters
              setTimeout(() => setOpen(false), 300);
            }}
            className="space-y-4"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}