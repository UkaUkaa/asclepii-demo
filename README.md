# Asklepiy Clinic — Medical Architecture 2026

> A production-grade, ultra-premium, mobile-first web ecosystem for "Asklepiy" — a leading Ukrainian medical clinic.

## Project Overview

Asklepiy Clinic's digital platform represents a next-generation medical web experience:

- **Precision** — sterile, minimalist design communicating medical authority
- **Trust** — transparent pricing, real doctor profiles, professional aesthetics
- **Technology** — AI assistant, smart booking, digital patient dashboard
- **Performance** — Lighthouse 100 target across all categories

## Key Features

### Asklepiy AI Assistant
- Floating glassmorphism widget (bottom-right)
- Context-aware messages based on page and dwell time
- Semantic symptom detection with department suggestions
- Ukrainian/English support

### Smart Booking System (4-Step Wizard)
- Service selection with visual category tiles
- Doctor selection with ratings
- Animated custom calendar + smart time suggestions
- Confirmation form with appointment summary

### Patient Dashboard
- Simulated auth (Email, Phone SMS, Google OAuth)
- Family profile switcher (Me / Child / Partner)
- Appointments, medical results with AI interpretation
- Interactive wellness timeline
- Document vault

### Internationalization
- Ukrainian (default) + English
- Instant switching without page reload (next-intl v4)

### Mobile-First UX
- Full-screen glassmorphism mobile menu
- Touch-optimized booking calendar
- Responsive across all breakpoints

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x (App Router) | Framework |
| TypeScript | 5.x (Strict) | Language |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| next-intl | 4.x | i18n |
| TanStack Query | 5.x | Data fetching |
| Lucide React | 0.5x | Icons |
| Vitest | 4.x | Unit testing |
| Playwright | 1.5x | E2E testing |

## Architecture

```
src/
├── app/
│   └── [locale]/           # Locale-based routing
│       ├── layout.tsx       # Locale layout + providers
│       ├── page.tsx         # Home page
│       ├── napryamky/       # Services
│       ├── likari/[slug]/   # Doctors + profiles
│       ├── tsiny/           # Prices
│       ├── novyny/          # News
│       ├── analizy/         # Lab analyses
│       ├── deklaratsiya/    # Declaration signing
│       ├── pro-nas/         # About
│       ├── kontakty/        # Contacts + map
│       ├── sign-in/         # Authentication
│       └── dashboard/       # Patient dashboard
├── components/
│   ├── ui/                  # Design system (Button, Card, Badge, Input, Skeleton)
│   ├── layout/              # Header, Footer, MobileMenu
│   ├── sections/            # Home page sections
│   └── providers/           # React providers
├── features/
│   ├── ai-assistant/        # AI Widget
│   ├── booking/             # Booking wizard
│   ├── doctors/             # Doctor components
│   └── services/            # Services feature
├── i18n/                    # next-intl config
├── lib/
│   ├── api/                 # Mock API layer
│   └── utils/               # Utilities
└── middleware.ts             # i18n middleware
```

## Design System — "Medical Architecture 2026"

### Color Palette
```
Primary: #0D3A7E  (Deep Medical Blue)
Accent:  #1A9EC9  (Medical Cyan)
Surface: #FFFFFF  (Pure White)
BG:      #F2F6FB  (Light Medical Blue-Gray)
Text:    #0C1929  (Dark Navy)
Muted:   #4A6180  (Steel Blue)
```

### Typography
- Primary: Inter (300, 400, 500, 600)
- Light-biased weights for premium feel

### Design Principles
- `rounded-[6px]` — no bubbly UI
- Glassmorphism on header, mobile menu, AI widget
- Luxury whitespace (7rem section padding)
- Framer Motion for all state transitions

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-org/asklepiy-clinic.git
cd asklepiy-clinic
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/uk`.

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_key
```

## Testing

```bash
npm run test            # Unit tests
npm run test:coverage   # With coverage
npm run test:e2e        # E2E tests (needs dev server)
npm run test:e2e:ui     # E2E with Playwright UI
```

## Deployment (Vercel)

```bash
npm i -g vercel
vercel --prod
```

The project includes optimized settings for Vercel:
- Edge-compatible middleware for i18n routing
- Automatic ISR for doctor pages
- Image optimization with WebP/AVIF

## Pages

| Route (UK) | Route (EN) | Description |
|-----------|-----------|-------------|
| `/uk` | `/en` | Home |
| `/uk/napryamky` | `/en/services` | Medical Services |
| `/uk/likari` | `/en/doctors` | Doctors Directory |
| `/uk/likari/[slug]` | `/en/doctors/[slug]` | Doctor Profile |
| `/uk/tsiny` | `/en/prices` | Price List |
| `/uk/novyny` | `/en/news` | News & Promotions |
| `/uk/analizy` | `/en/analyses` | Lab Analyses |
| `/uk/deklaratsiya` | `/en/declaration` | Sign Declaration |
| `/uk/pro-nas` | `/en/about` | About Clinic |
| `/uk/kontakty` | `/en/contacts` | Contacts + Map |
| `/uk/sign-in` | `/en/sign-in` | Authentication |
| `/uk/dashboard` | `/en/dashboard` | Patient Dashboard |

## SEO

- JSON-LD structured data (MedicalClinic, Physician)
- OpenGraph per page
- Dynamic metadata with `generateMetadata`
- Locale-specific canonical URLs

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built for Asklepiy Clinic, Ukraine.
