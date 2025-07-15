"use client";

import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  PlayCircle, 
  Lock, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Code, 
  Video, 
  BookOpen, 
  Trophy,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  Zap,
  Target,
  Brain,
  Lightbulb,
  PenTool,
  MessageCircle,
  Download,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface ModuleItem {
  id: string;
  title: string;
  type: "video" | "quiz" | "exercise" | "reading" | "project" | "assignment";
  duration: number; // in minutes
  isCompleted?: boolean;
  isLocked?: boolean;
  isFree?: boolean;
  description?: string;
  resources?: {
    name: string;
    url: string;
    type: "pdf" | "zip" | "link";
  }[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  items: ModuleItem[];
  duration: number; // total minutes
  isLocked?: boolean;
  completionPercentage?: number;
}

export interface CourseCurriculumProps {
  modules: Module[];
  isEnrolled?: boolean;
  expandedByDefault?: boolean;
  showProgress?: boolean;
  onItemClick?: (moduleId: string, itemId: string) => void;
  className?: string;
}

const typeConfig = {
  video: {
    icon: Video,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    label: "Video"
  },
  quiz: {
    icon: Brain,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    label: "Quiz"
  },
  exercise: {
    icon: Code,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    label: "Exercise"
  },
  reading: {
    icon: BookOpen,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    label: "Reading"
  },
  project: {
    icon: Zap,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    label: "Project"
  },
  assignment: {
    icon: PenTool,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    label: "Assignment"
  }
};

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

function ModuleItemRow({ 
  item, 
  moduleId,
  isEnrolled, 
  onItemClick 
}: { 
  item: ModuleItem;
  moduleId: string;
  isEnrolled?: boolean;
  onItemClick?: (moduleId: string, itemId: string) => void;
}) {
  const config = typeConfig[item.type];
  const Icon = config.icon;
  const isAccessible = isEnrolled || item.isFree;
  
  return (
    <div 
      className={cn(
        "group flex items-center gap-4 p-4 rounded-lg transition-all",
        "hover:bg-muted/50",
        isAccessible && onItemClick && "cursor-pointer",
        item.isCompleted && "opacity-80"
      )}
      onClick={() => isAccessible && onItemClick?.(moduleId, item.id)}
    >
      {/* Status Icon */}
      <div className="flex-shrink-0">
        {item.isCompleted ? (
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
        ) : item.isLocked && !isEnrolled ? (
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
        ) : (
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
            config.bgColor,
            isAccessible && "group-hover:bg-opacity-80"
          )}>
            <Icon className={cn("h-5 w-5", config.color)} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className={cn(
            "font-medium text-sm",
            item.isCompleted && "line-through",
            !isAccessible && "text-muted-foreground"
          )}>
            {item.title}
          </h4>
          {item.isFree && !isEnrolled && (
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Free Preview
            </Badge>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {item.description}
          </p>
        )}
        {item.resources && item.resources.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <Download className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {item.resources.length} {item.resources.length === 1 ? 'resource' : 'resources'}
            </span>
          </div>
        )}
      </div>

      {/* Duration & Action */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration(item.duration)}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {config.label}
          </p>
        </div>
        {isAccessible && (
          <PlayCircle className={cn(
            "h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity",
            item.isCompleted ? "text-primary" : "text-muted-foreground"
          )} />
        )}
      </div>
    </div>
  );
}

export default function CourseCurriculum({
  modules,
  isEnrolled = false,
  expandedByDefault = false,
  showProgress = true,
  onItemClick,
  className
}: CourseCurriculumProps) {
  const [expandAll, setExpandAll] = useState(expandedByDefault);
  
  const totalDuration = modules.reduce((sum, module) => sum + module.duration, 0);
  const totalItems = modules.reduce((sum, module) => sum + module.items.length, 0);
  const completedItems = modules.reduce((sum, module) => 
    sum + module.items.filter(item => item.isCompleted).length, 0
  );
  const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const stats = modules.reduce((acc, module) => {
    module.items.forEach(item => {
      acc[item.type] = (acc[item.type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Course Curriculum</h2>
            <p className="text-muted-foreground mt-1">
              {modules.length} modules • {totalItems} lessons • {formatDuration(totalDuration)} total length
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpandAll(!expandAll)}
            className="gap-2"
          >
            {expandAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Collapse All
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Expand All
              </>
            )}
          </Button>
        </div>

        {/* Content Type Stats */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(stats).map(([type, count]) => {
            const config = typeConfig[type as keyof typeof typeConfig];
            const Icon = config.icon;
            return (
              <div 
                key={type}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm",
                  config.bgColor
                )}
              >
                <Icon className={cn("h-4 w-4", config.color)} />
                <span className={config.color}>
                  {count} {config.label}{count > 1 ? 's' : ''}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        {showProgress && isEnrolled && overallProgress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{Math.round(overallProgress)}% Complete</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completedItems} of {totalItems} lessons completed
            </p>
          </div>
        )}
      </div>

      {/* Modules */}
      <Accordion 
        type="multiple" 
        value={expandAll ? modules.map(m => m.id) : undefined}
        className="space-y-3"
      >
        {modules.map((module, index) => {
          const isModuleLocked = module.isLocked && !isEnrolled;
          const completedCount = module.items.filter(item => item.isCompleted).length;
          const moduleProgress = module.items.length > 0 
            ? (completedCount / module.items.length) * 100 
            : 0;

          return (
            <AccordionItem 
              key={module.id} 
              value={module.id}
              className="border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-4">
                    {/* Module Number */}
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center font-semibold",
                      moduleProgress === 100 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    )}>
                      {moduleProgress === 100 ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : isModuleLocked ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Module Info */}
                    <div className="text-left">
                      <h3 className="font-semibold text-base">{module.title}</h3>
                      {module.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {module.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          {module.items.length} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDuration(module.duration)}
                        </span>
                        {isEnrolled && moduleProgress > 0 && (
                          <span className="flex items-center gap-1 text-primary">
                            <Target className="h-3 w-3" />
                            {Math.round(moduleProgress)}% complete
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Circle */}
                  {isEnrolled && moduleProgress > 0 && moduleProgress < 100 && (
                    <div className="relative h-12 w-12">
                      <svg className="h-12 w-12 -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 20}`}
                          strokeDashoffset={`${2 * Math.PI * 20 * (1 - moduleProgress / 100)}`}
                          className="text-primary transition-all duration-500"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {completedCount}/{module.items.length}
                      </span>
                    </div>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-4">
                <div className="space-y-1">
                  {module.items.map((item) => (
                    <ModuleItemRow
                      key={item.id}
                      item={item}
                      moduleId={module.id}
                      isEnrolled={isEnrolled}
                      onItemClick={onItemClick}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Call to Action */}
      {!isEnrolled && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 px-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg border"
        >
          <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Unlock All Course Content
          </h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Get instant access to all modules, downloadable resources, and certificate of completion.
          </p>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Enroll Now
          </Button>
        </motion.div>
      )}
    </div>
  );
}