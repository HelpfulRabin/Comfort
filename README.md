# Comfort Summer COD Product Funnel

Complete Cash On Delivery sales funnel built with Next.js App Router and Tailwind CSS.

## Recommended Tech Stack

- Next.js App Router for landing, checkout, thank-you, and API routes.
- Tailwind CSS for a clean responsive UI.
- Google Sheets API for saving orders into your spreadsheet.
- Nodemailer with Gmail SMTP for business and customer email notifications.
- Zod for backend order validation.

## Order Flow

1. Customer clicks a CTA on `/`.
2. The selected product name, quantity, unit price, and total price are passed to `/checkout`.
3. Customer enters name, phone, email, and exact location.
4. Checkout posts the order to `POST /api/order`.
5. The API validates the order, generates an order ID, adds date/time, payment method, and status.
6. The API saves the order to Google Sheets.
7. The API sends the order notification email to your Gmail.
8. The API sends the customer "Order Received" email.
9. Customer is redirected to `/thank-you`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill these values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BUSINESS_EMAIL=chaliserabin8@gmail.com
EMAIL_FROM=chaliserabin8@gmail.com
BRAND_NAME=Comfort Summer

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=Tshirt Order
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=chaliserabin8@gmail.com
SMTP_PASS=

EMAIL_SERVICE_API_KEY=

FRONTEND_URL=http://localhost:3000
```

For Gmail SMTP, use a Gmail App Password in `SMTP_PASS`. Do not use your regular Gmail password.

## Google Spreadsheet Setup

Create a Google Spreadsheet with a tab named:

```text
Tshirt Order
```

Add these columns in row 1:

```text
Order ID
Date & Time
Customer Name
Phone Number
Email Address
Exact Location
Product Name
Quantity
Price Per Piece
Total Price
Payment Method
Order Status
Notes
```

Add filters:

1. Select row 1.
2. Click `Data`.
3. Click `Create a filter`.

Add dropdown options for `Order Status`:

1. Select the `Order Status` column cells below the header.
2. Click `Data` then `Data validation`.
3. Choose `Dropdown`.
4. Add these options:
   - New Order
   - Order Confirmed
   - Order Ongoing
   - Delivered
   - Cancelled
5. Set default order status as `New Order`.

Get the Google Sheet ID:

The ID is the long value in your Sheet URL:

```text
https://docs.google.com/spreadsheets/d/GOOGLE_SHEET_ID/edit
```

Create Google credentials:

1. Go to Google Cloud Console.
2. Create or select a project.
3. Enable the Google Sheets API.
4. Create a Service Account.
5. Create a JSON key for that service account.
6. Add `client_email` to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
7. Add `private_key` to `GOOGLE_PRIVATE_KEY`.

When adding `GOOGLE_PRIVATE_KEY`, keep the newline escapes:

```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
```

Share the Google Sheet:

1. Open your Google Sheet.
2. Click `Share`.
3. Add your service account email.
4. Give it `Editor` access.

## Gmail Notification Setup

The API sends two HTML emails after the Sheet save succeeds:

- Business email: `New Product Order Received - [Order ID]`
- Customer email: `Your Order Has Been Received - Comfort Summer`

For Gmail SMTP:

1. Enable 2-Step Verification on your Google account.
2. Create an App Password.
3. Use that App Password as `SMTP_PASS`.
4. Use `smtp.gmail.com` and port `465`.

## Test Order Submission

1. Install dependencies:

```bash
npm install
```

2. Add `.env.local` values.

3. Start the dev server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

5. Click `Order Now`, fill checkout, and submit.

Success means:

- A new row appears in Google Sheets.
- Your business Gmail receives the order notification.
- The customer email receives the order confirmation.
- The customer lands on `/thank-you`.

If submission fails, the checkout page shows the server error and does not redirect.

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Add all environment variables in Vercel Project Settings.
4. Set:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
FRONTEND_URL=https://your-domain.com
```

5. Deploy.
6. Place a real test order after deployment.

## Routes

- `/` - Product landing page
- `/checkout` - Cash On Delivery checkout
- `/thank-you` - Order confirmation page
- `/api/order` - Secure server-side order submission
