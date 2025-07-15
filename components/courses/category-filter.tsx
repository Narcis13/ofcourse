"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  ChevronUp,
  Filter,
  Sparkles,
  DollarSign,
  Clock,
  BarChart3,
  BookOpen,
  Users,
  Star,
  TrendingUp,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug: string;
  courseCount?: number;
  icon?: React.ReactNode;
  color?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  maxPrice?: number;
  className?: string;
  onFiltersChange?: (filters: FilterState) => void;
}

export interface FilterState {
  category?: string;
  priceRange?: [number, number];
  duration?: string[];
  difficulty?: string[];
  rating?: number;
  features?: string[];
  sortBy?: string;
}

interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
}

function FilterSection({ title, icon, children, defaultOpen = true, badge }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-medium hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
          {badge !== undefined && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
              {badge}
            </Badge>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-1 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const difficultyOptions = [
  { value: "beginner", label: "Beginner", icon: "🌱", color: "text-emerald-600" },
  { value: "intermediate", label: "Intermediate", icon: "🚀", color: "text-blue-600" },
  { value: "advanced", label: "Advanced", icon: "⚡", color: "text-purple-600" },
];

const durationOptions = [
  { value: "0-2", label: "0-2 hours", icon: <Clock className="h-3 w-3" /> },
  { value: "2-5", label: "2-5 hours", icon: <Clock className="h-3 w-3" /> },
  { value: "5-10", label: "5-10 hours", icon: <Clock className="h-3 w-3" /> },
  { value: "10+", label: "10+ hours", icon: <Clock className="h-3 w-3" /> },
];

const featureOptions = [
  { value: "certificate", label: "Certificate", icon: <Star className="h-3 w-3" /> },
  { value: "exercises", label: "Exercises", icon: <BookOpen className="h-3 w-3" /> },
  { value: "projects", label: "Projects", icon: <Zap className="h-3 w-3" /> },
  { value: "lifetime", label: "Lifetime Access", icon: <TrendingUp className="h-3 w-3" /> },
];

export default function CategoryFilter({
  categories,
  maxPrice = 200,
  className,
  onFiltersChange,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get("category") || undefined,
    priceRange: [0, maxPrice],
    duration: [],
    difficulty: [],
    rating: 0,
    features: [],
    sortBy: searchParams.get("sort") || "popular",
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const activeFilterCount = Object.values(filters).filter(v => 
    v && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange?.(updated);
    
    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updated).forEach(([key, value]) => {
      if (value && (!Array.isArray(value) || value.length > 0)) {
        params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`, { scroll: false });
  }, [filters, searchParams, router, onFiltersChange]);

  const clearAllFilters = () => {
    setFilters({});
    setPriceRange([0, maxPrice]);
    router.push(window.location.pathname, { scroll: false });
  };

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-8 px-2 text-xs"
          >
            Clear all
            <X className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>

      <Separator />

      {/* Categories */}
      <FilterSection 
        title="Categories" 
        icon={<BarChart3 className="h-4 w-4" />}
        defaultOpen={true}
      >
        <RadioGroup
          value={filters.category || "all"}
          onValueChange={(value) => updateFilters({ category: value === "all" ? undefined : value })}
        >
          <label className="flex items-center space-x-2 cursor-pointer group">
            <RadioGroupItem value="all" />
            <span className="text-sm group-hover:text-foreground transition-colors">
              All Categories
            </span>
          </label>
          {categories.map((category) => (
            <label 
              key={category.id} 
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={category.slug} />
                <span className="text-sm group-hover:text-foreground transition-colors flex items-center gap-2">
                  {category.icon}
                  {category.name}
                </span>
              </div>
              {category.courseCount !== undefined && (
                <Badge variant="outline" className="ml-auto text-xs h-5">
                  {category.courseCount}
                </Badge>
              )}
            </label>
          ))}
        </RadioGroup>
      </FilterSection>

      <Separator />

      {/* Price Range */}
      <FilterSection 
        title="Price Range" 
        icon={<DollarSign className="h-4 w-4" />}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value as [number, number]);
              updateFilters({ priceRange: value as [number, number] });
            }}
            min={0}
            max={maxPrice}
            step={10}
            className="w-full"
          />
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Min</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    const newRange: [number, number] = [value, priceRange[1]];
                    setPriceRange(newRange);
                    updateFilters({ priceRange: newRange });
                  }}
                  className="h-8 pl-6 text-sm"
                  min={0}
                  max={priceRange[1]}
                />
              </div>
            </div>
            <span className="text-muted-foreground mt-5">-</span>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Max</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    const newRange: [number, number] = [priceRange[0], value];
                    setPriceRange(newRange);
                    updateFilters({ priceRange: newRange });
                  }}
                  className="h-8 pl-6 text-sm"
                  min={priceRange[0]}
                  max={maxPrice}
                />
              </div>
            </div>
          </div>
        </div>
      </FilterSection>

      <Separator />

      {/* Difficulty */}
      <FilterSection 
        title="Difficulty Level" 
        icon={<BarChart3 className="h-4 w-4" />}
        badge={filters.difficulty?.length}
      >
        <div className="space-y-2">
          {difficultyOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <Checkbox
                checked={filters.difficulty?.includes(option.value)}
                onCheckedChange={(checked) => {
                  const current = filters.difficulty || [];
                  updateFilters({
                    difficulty: checked
                      ? [...current, option.value]
                      : current.filter((d) => d !== option.value),
                  });
                }}
              />
              <span className={cn(
                "text-sm group-hover:text-foreground transition-colors flex items-center gap-2",
                option.color
              )}>
                <span>{option.icon}</span>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Duration */}
      <FilterSection 
        title="Course Duration" 
        icon={<Clock className="h-4 w-4" />}
        badge={filters.duration?.length}
        defaultOpen={false}
      >
        <div className="space-y-2">
          {durationOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <Checkbox
                checked={filters.duration?.includes(option.value)}
                onCheckedChange={(checked) => {
                  const current = filters.duration || [];
                  updateFilters({
                    duration: checked
                      ? [...current, option.value]
                      : current.filter((d) => d !== option.value),
                  });
                }}
              />
              <span className="text-sm group-hover:text-foreground transition-colors flex items-center gap-2">
                {option.icon}
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Rating */}
      <FilterSection 
        title="Minimum Rating" 
        icon={<Star className="h-4 w-4" />}
        defaultOpen={false}
      >
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <RadioGroupItem
                value={rating.toString()}
                checked={filters.rating === rating}
                onClick={() => updateFilters({ rating })}
              />
              <span className="text-sm group-hover:text-foreground transition-colors flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                    )}
                  />
                ))}
                <span className="ml-1 text-muted-foreground">& up</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Features */}
      <FilterSection 
        title="Features" 
        icon={<Sparkles className="h-4 w-4" />}
        badge={filters.features?.length}
        defaultOpen={false}
      >
        <div className="space-y-2">
          {featureOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <Checkbox
                checked={filters.features?.includes(option.value)}
                onCheckedChange={(checked) => {
                  const current = filters.features || [];
                  updateFilters({
                    features: checked
                      ? [...current, option.value]
                      : current.filter((f) => f !== option.value),
                  });
                }}
              />
              <span className="text-sm group-hover:text-foreground transition-colors flex items-center gap-2">
                {option.icon}
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}