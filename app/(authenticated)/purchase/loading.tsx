import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function PurchaseLoading() {
  return (
    <div className="container max-w-3xl py-16">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <h2 className="text-xl font-semibold">Processing your purchase...</h2>
          <p className="mt-2 text-muted-foreground">
            Please wait while we confirm your payment.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}