# Payment Gateway UI Assignment

This project is a frontend implementation of a simulated payment gateway flow built as part of a technical assignment using Next.js App Router, TypeScript, Zustand, and Tailwind CSS.

The application focuses on recreating a realistic payment experience by handling card validation, transaction lifecycle management, retry attempts, timeout scenarios, and persistent transaction history without relying on any third-party payment SDKs.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Zustand
- Tailwind CSS
- Framer Motion

---

## Features Implemented

### Payment Form
- Cardholder name input
- Card number formatting with automatic spacing
- Card type detection (Visa, Mastercard, Amex)
- Expiry date validation
- CVV validation based on card type
- Amount input with currency selector (INR / USD)
- Real-time field level validation
- Submit button disabled until valid

### Interactive Card Preview
- Live synchronized card preview
- Dynamic card type badge
- Clickable 3D flip animation
- Backside CVV and card details display

### Payment Lifecycle Handling
- Idle
- Processing
- Success
- Failed
- Timeout

### Mock Payment Gateway
- Next.js Route Handler at `/api/pay`
- Randomized success / failure / timeout simulation
- AbortController based frontend timeout cancellation

### Retry Logic
- Maximum 3 retries per transaction
- Same transaction ID reused for retries
- Attempt count tracking
- Final retry lock after 3 failures

### Transaction History
- Persistent transaction history using localStorage
- View previous transaction details
- No duplicate entries during retries

### Accessibility & Responsiveness
- Mobile responsive layout (375px)
- Desktop optimized layout (1280px)
- Visible form labels
- `aria-describedby` linked validation messages
- Improved focus handling across state transitions

### Assumptions
- Payment processing outcomes are intentionally randomized server-side to simulate real gateway uncertainty.
- Retries are considered part of the same transaction and therefore reuse the same transaction ID.
- Transaction history persistence is handled locally through browser localStorage for assignment simplicity.
- Card preview is implemented as a UX enhancement and not tied to any real payment provider branding restrictions.
- Network timeout handling is simulated through delayed API response and frontend request abortion.

## What I Would Improve With More Time

- Move transaction persistence from localStorage to a lightweight backend datastore so transaction records remain consistent across devices and browser sessions.
- Introduce stronger idempotency safeguards on the API layer by storing and validating transaction IDs server-side instead of relying only on frontend retry control.
- Add automated unit tests for card validation, formatting utilities, retry handling, and timeout scenarios to improve long-term maintainability.
- Improve payment status recovery for accidental refreshes during processing by restoring the last known transaction state.
- Add more realistic gateway failure simulations such as invalid card, bank decline, gateway unavailable, and duplicate submission scenarios.
- Enhance keyboard-only accessibility by refining focus traps, tab order, and screen reader announcements after state transitions.
- Introduce transaction filtering and search in history if the transaction list grows over time.
- Further optimize micro-interactions and loading feedback to better communicate slow network conditions to the user.
- Add lightweight analytics/error logging hooks to monitor failed payments, timeout frequency, and retry abandonment patterns.
---

## Project Setup

### 1. Clone Repository

```bash
git clone git@github.com:positiveabhii/payment-page-ui.git
cd payment-page-ui
```

2. Install Dependencies

```bash
npm install
```

3. Run Development Server

```bash
npm run dev
```

4. Open Application

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## License

This project is created as part of a technical assignment and is intended for evaluation purposes only.

---

**Assignment Submission**
For assignment submission, please refer to the specific instructions provided by your instructor or evaluator.