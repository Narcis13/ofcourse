import * as React from "react"

interface PurchaseConfirmationEmailProps {
  userName: string
  purchaseType: "course" | "bundle"
  itemName: string
  price: string
  purchaseDate: string
  accessUrl: string
  supportEmail?: string
}

export const PurchaseConfirmationEmail: React.FC<PurchaseConfirmationEmailProps> = ({
  userName,
  purchaseType,
  itemName,
  price,
  purchaseDate,
  accessUrl,
  supportEmail = "support@ofcourse.com"
}) => {
  return (
    <div style={main}>
      <div style={container}>
        <div style={header}>
          <h1 style={heading}>OfCourse</h1>
        </div>
        
        <div style={content}>
          <h2 style={title}>Purchase Confirmation</h2>
          
          <p style={text}>Hi {userName},</p>
          
          <p style={text}>
            Thank you for your purchase! Your {purchaseType} has been successfully processed.
          </p>
          
          <div style={purchaseDetails}>
            <h3 style={sectionTitle}>Order Details</h3>
            <table style={table}>
              <tbody>
                <tr>
                  <td style={tableLabel}>Item:</td>
                  <td style={tableValue}>{itemName}</td>
                </tr>
                <tr>
                  <td style={tableLabel}>Type:</td>
                  <td style={tableValue}>{purchaseType === "course" ? "Course" : "Bundle"}</td>
                </tr>
                <tr>
                  <td style={tableLabel}>Price:</td>
                  <td style={tableValue}>${price}</td>
                </tr>
                <tr>
                  <td style={tableLabel}>Purchase Date:</td>
                  <td style={tableValue}>{purchaseDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={ctaContainer}>
            <a href={accessUrl} style={button}>
              Access Your {purchaseType === "course" ? "Course" : "Bundle"}
            </a>
          </div>
          
          <p style={text}>
            You can access your {purchaseType} anytime from your dashboard. If you have any questions 
            or need assistance, please don't hesitate to contact us at {supportEmail}.
          </p>
          
          <p style={text}>
            Happy learning!<br />
            The OfCourse Team
          </p>
        </div>
        
        <div style={footer}>
          <p style={footerText}>
            © {new Date().getFullYear()} OfCourse. All rights reserved.
          </p>
          <p style={footerText}>
            This email was sent to you because you made a purchase on OfCourse.
          </p>
        </div>
      </div>
    </div>
  )
}

// Styles
const main: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
}

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
}

const header: React.CSSProperties = {
  padding: "32px 48px",
  borderBottom: "1px solid #e6ebf1",
}

const heading: React.CSSProperties = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1a1a1a",
  margin: 0,
}

const content: React.CSSProperties = {
  padding: "48px",
}

const title: React.CSSProperties = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "600",
  color: "#1a1a1a",
  marginBottom: "24px",
}

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#525252",
  marginBottom: "16px",
}

const sectionTitle: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: "1.3",
  fontWeight: "600",
  color: "#1a1a1a",
  marginBottom: "16px",
}

const purchaseDetails: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "32px",
}

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
}

const tableLabel: React.CSSProperties = {
  fontSize: "14px",
  color: "#8898aa",
  padding: "8px 0",
  width: "40%",
}

const tableValue: React.CSSProperties = {
  fontSize: "14px",
  color: "#1a1a1a",
  padding: "8px 0",
  fontWeight: "500",
}

const ctaContainer: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "32px",
}

const button: React.CSSProperties = {
  backgroundColor: "#5469d4",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "12px 32px",
}

const footer: React.CSSProperties = {
  padding: "0 48px",
}

const footerText: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#8898aa",
  marginBottom: "8px",
}

export default PurchaseConfirmationEmail