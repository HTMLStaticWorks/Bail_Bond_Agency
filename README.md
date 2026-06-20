# Apex Bail Bonds Agency Website Template

A commercial-grade, fully responsive, and highly professional HTML5 template suitable for ThemeForest, legal services, emergency response agencies, and bail bond bondsmen. Designed with slate-and-blue high-contrast calm aesthetics, zero sensationalism, and complete accessibility focus.

## Features

- **14 Production-Ready HTML Pages**: Zero empty pages or broken links.
- **Theme Toggle Persistence**: Instant light/dark mode transition using `localStorage` (anti-flash implementation).
- **Responsive Layout**: Validated across all major screen sizes from 320px up to 1440px+ and ultra-wides.
- **Calm, High-Contrast Design System**: Elegant typography using Merriweather and Inter, harmony grids, and minimal glassmorphism highlights.
- **GSAP Driven Micro-Animations**: Smooth reveals, statistics counters, and subtle hover lifts.
- **Bootstrap 5 Grid-Only Stack**: Optimized CSS loading without grid bloat.
- **Local Asset Architecture**: Images downloaded directly from Unsplash for instant loading.

## File Structure

```
/bail-bond-agency-website/
│
├── index.html            # Main home page (Overview, stats, process timeline)
├── home-2.html           # Emergency Form Home (Intake evaluation forms, FAQs)
├── services.html         # Services Catalog (Bond classification directory)
├── service-details.html  # Surety Bonds Deep-Dive (Requirements, tabs, sidebars)
├── how-bail-works.html   # Educational Roadmap (Arrest-to-release sequence)
├── collateral-guide.html # Collateral Policies (Acceptable assets, returns)
├── fees-pricing.html     # Price Transparency (Calculations, 0% APR financing)
├── blog.html             # Educational Resource Feed
├── blog-details.html     # Detailed Guide Reading View
├── contact.html          # Secure office inquiries and map layouts
├── 24-7-assistance.html  # Urgent dispatch panel (Jail directories & hotlines)
├── login.html            # Client portal login
├── signup.html           # Cosigner registration UI
├── 404.html              # Custom page-not-found handler
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css # Bootstrap 5 Grid-Only
│   │   ├── style.css         # Custom property design tokens & light styles
│   │   ├── dark.css          # Dark Mode overrides
│   │   └── animations.css    # Transitions and keyframes helper
│   │
│   ├── js/
│   │   ├── main.js           # Navigation controllers, forms, and accordions
│   │   ├── theme-toggle.js   # LocalStorage theme management
│   │   └── animations.js     # GSAP animation triggers
│   │
│   ├── images/               # Curated local stock photos (hero, services, team, etc.)
│   └── fonts/
│
└── README.md
```

## Setup & Running Locally

1. Clone or download this repository.
2. Open `index.html` in your web browser.
3. No build script, compilers, or server side dependencies are required. Pure static stack.
