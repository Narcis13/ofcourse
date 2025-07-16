import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { createCourseCheckout, createBundleCheckout } from "@/actions/stripe"

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// Request validation
function validateCheckoutRequest(data: unknown): { isValid: boolean; error?: string } {
  if (!data || typeof data !== "object" || data === null) {
    return { isValid: false, error: "Invalid request body" }
  }
  
  const obj = data as Record<string, unknown>
  
  if (!obj.type || typeof obj.type !== "string" || !["course", "bundle"].includes(obj.type)) {
    return { isValid: false, error: "Invalid type. Must be 'course' or 'bundle'" }
  }
  
  if (!obj.id || typeof obj.id !== "string" || !UUID_REGEX.test(obj.id)) {
    return { isValid: false, error: "Invalid ID format. Must be a valid UUID" }
  }
  
  return { isValid: true }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = validateCheckoutRequest(body)
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: validation.error || "Invalid request data"
        },
        { status: 400 }
      )
    }

    const { type, id } = body as { type: "course" | "bundle"; id: string }

    // Create checkout session based on type
    let result
    
    if (type === "course") {
      result = await createCourseCheckout(id, userId)
    } else if (type === "bundle") {
      result = await createBundleCheckout(id, userId)
    } else {
      return NextResponse.json(
        { error: "Invalid checkout type" },
        { status: 400 }
      )
    }

    // Handle result
    if (result.error || !result.url) {
      return NextResponse.json(
        { error: result.error || "Failed to create checkout session" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        url: result.url,
        type,
        id 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error("Error in create-checkout endpoint:", error)
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  )
}