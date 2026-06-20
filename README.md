# Fazig Pizza — Premium Delivery Web App

Next-generation pizza delivery platform with 3D visuals, glassmorphism UI, live order tracking, and full e-commerce flow.

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- **Framer Motion** — animations & transitions
- **React Three Fiber** — 3D pizza models
- **Zustand** — cart & order state
- **Radix UI / Shadcn-style** components

## Features

- Landing page with 3D rotating pizza hero
- Full menu with filters & search
- Product detail with size/crust/toppings customization
- Cart, checkout, order confirmation
- Live order tracking with animated map
- Offers page with countdown timers
- User account (login, signup, order history)
- About, Contact, Admin dashboard
- PWA support, SEO, sitemap, robots.txt
- Custom cursor, toast notifications, glassmorphism UI

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
npm run build
```

Push to GitHub and connect to [Vercel](https://vercel.com) for instant deployment.

## Project Structure

```
/app          — Next.js pages & routes
/components   — UI, layout, 3D, effects
/constants    — Pizza data, navigation, deals
/hooks        — Toast & custom hooks
/lib          — Store, utils, metadata
/types        — TypeScript interfaces
/public       — Static assets, PWA manifest
/styles       — Global CSS & Tailwind theme
```

## License

All rights reserved.
