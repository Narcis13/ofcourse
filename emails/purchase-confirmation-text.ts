interface PurchaseConfirmationTextEmailProps {
  userName: string
  purchaseType: "course" | "bundle"
  itemName: string
  price: string
  purchaseDate: string
  accessUrl: string
  supportEmail?: string
}

export function generatePurchaseConfirmationTextEmail({
  userName,
  purchaseType,
  itemName,
  price,
  purchaseDate,
  accessUrl,
  supportEmail = "support@ofcourse.com"
}: PurchaseConfirmationTextEmailProps): string {
  return `
OfCourse - Purchase Confirmation

Hi ${userName},

Thank you for your purchase! Your ${purchaseType} has been successfully processed.

ORDER DETAILS
-------------
Item: ${itemName}
Type: ${purchaseType === "course" ? "Course" : "Bundle"}
Price: $${price}
Purchase Date: ${purchaseDate}

ACCESS YOUR ${purchaseType.toUpperCase()}
${accessUrl}

You can access your ${purchaseType} anytime from your dashboard. If you have any questions or need assistance, please don't hesitate to contact us at ${supportEmail}.

Happy learning!
The OfCourse Team

---
© ${new Date().getFullYear()} OfCourse. All rights reserved.
This email was sent to you because you made a purchase on OfCourse.
`.trim()
}

export default generatePurchaseConfirmationTextEmail