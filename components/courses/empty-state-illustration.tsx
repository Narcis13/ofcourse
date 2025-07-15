"use client";

import { motion } from "framer-motion";
import { getCategoryColorScheme } from "@/lib/category-colors";

interface EmptyStateIllustrationProps {
  categorySlug?: string;
  variant?: "search" | "filter" | "category" | "default";
}

export function EmptyStateIllustration({ 
  categorySlug,
  variant = "default" 
}: EmptyStateIllustrationProps) {
  const colors = categorySlug ? getCategoryColorScheme(categorySlug) : {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    light: "#DBEAFE",
  };

  if (variant === "search") {
    return (
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div 
            className="w-36 h-36 sm:w-48 sm:h-48 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.light} 0%, transparent 70%)`,
            }}
          />
        </motion.div>
        
        <svg className="relative z-10 w-full h-full" viewBox="0 0 256 256">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="128"
              cy="128"
              r="80"
              fill="none"
              stroke={colors.primary}
              strokeWidth="2"
              strokeDasharray="10 5"
              opacity="0.3"
            />
          </motion.g>
          
          <motion.circle
            cx="128"
            cy="128"
            r="60"
            fill="none"
            stroke={colors.primary}
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <motion.line
            x1="168"
            y1="168"
            x2="200"
            y2="200"
            stroke={colors.primary}
            strokeWidth="8"
            strokeLinecap="round"
            animate={{
              x2: [200, 210, 200],
              y2: [200, 210, 200],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "category") {
    return (
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 w-24 h-32 sm:w-32 sm:h-40 -translate-x-1/2 -translate-y-1/2 rounded-lg"
              style={{
                backgroundColor: `${colors.primary}10`,
                border: `2px solid ${colors.primary}30`,
                transformOrigin: "center bottom",
              }}
              initial={{ rotate: -30 + index * 30 }}
              animate={{
                rotate: [-30 + index * 30, -25 + index * 30, -30 + index * 30],
              }}
              transition={{
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="p-3 space-y-2">
                <div 
                  className="h-2 rounded"
                  style={{ backgroundColor: colors.primary, opacity: 0.3 }}
                />
                <div 
                  className="h-2 rounded w-3/4"
                  style={{ backgroundColor: colors.primary, opacity: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Default illustration
  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div 
          className="w-36 h-36 sm:w-48 sm:h-48 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
      
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <motion.div
          className="w-24 h-32 sm:w-32 sm:h-40 rounded-lg"
          style={{
            backgroundColor: `${colors.primary}10`,
            border: `2px solid ${colors.primary}30`,
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="p-4 space-y-3">
            <div 
              className="h-3 rounded"
              style={{ backgroundColor: colors.primary, opacity: 0.3 }}
            />
            <div 
              className="h-2 rounded"
              style={{ backgroundColor: colors.primary, opacity: 0.2 }}
            />
            <div 
              className="h-2 rounded w-3/4"
              style={{ backgroundColor: colors.primary, opacity: 0.2 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}