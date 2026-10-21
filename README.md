# WeddingDay — Premium Wedding Services Platform

An elegant, editorial wedding services platform built with Next.js 15, TypeScript, Tailwind CSS, and Motion for React.

## Features
- **Multilingual Support**: Armenian (Default - Հայերեն), English, and Russian with full interface translations and persistent form state.
- **Service Catalog**: Multi-selection catalog with real-time selection updates.
- **Combined Inquiry Form**: Single submission for multiple services with client-side Armenian/English/Russian validation and AMD budget presets.
- **Editorial Gallery**: Wedding portfolio grid with image lightbox overlay.
- **Separated Webhook Integration**: Prepared for Make.com / Google Sheets webhooks via `NEXT_PUBLIC_WEBHOOK_URL`.

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   npm start
   ```
