# Astro AI — AI-Powered Astrological Chart Interpreter

> **Live demo:** [https://astro-ai-gray.vercel.app/](https://astro-ai-gray.vercel.app/)

Astro AI is a full-stack web application that calculates birth charts using the Swiss Ephemeris and delivers rich, AI-powered astrological interpretations through a modern chat interface. You can generate detailed natal chart reports, explore solar returns, and download beautifully formatted PDF summaries — all in one place.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Set up Supabase](#3-set-up-supabase)
  - [4. Configure environment variables](#4-configure-environment-variables)
  - [5. Set up the database](#5-set-up-the-database)
  - [6. Run the development server](#6-run-the-development-server)
- [Environment Variables Reference](#environment-variables-reference)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [Database Schema](#database-schema)
- [API Testing with Postman](#api-testing-with-postman)

---

## Features

- **Birth Chart Calculation** — Accurate planet positions, house cusps, and aspects powered by the Swiss Ephemeris (`swisseph-v2`).
- **Solar Return Charts** — Calculate and visualize solar return charts for any given year.
- **AI-Powered Interpretations** — Streamed, conversational chart readings via OpenAI GPT-4o-mini.
- **Comprehensive Reports** — Multi-section astrological reports generated asynchronously with real-time progress tracking.
- **PDF Export** — Server-side PDF generation with Puppeteer, protected by JWT-signed access tokens.
- **3D Chart Visualization** — Interactive natal chart rendered with Three.js and React Three Fiber.
- **Location Autocomplete** — City and country search backed by Nominatim and Photon geocoding APIs.
- **Usage Limits** — Configurable daily report limits per user with an optional bypass list.

---

## Tech Stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| Framework     | Next.js 15 (App Router) with React 19         |
| Language      | TypeScript 5.6                                |
| UI Components | Material UI (MUI) 7                           |
| Data Fetching | TanStack React Query 5                        |
| Forms         | React Hook Form + Zod                         |
| 3D / Charts   | Three.js, React Three Fiber, D3.js            |
| ORM           | Prisma 5                                      |
| Database      | PostgreSQL (via Supabase)                     |
| Auth          | Supabase Auth                                 |
| AI            | OpenAI GPT-4o-mini via Vercel AI SDK          |
| PDF           | Puppeteer + @sparticuz/chromium               |
| Astrology     | swisseph-v2 (Swiss Ephemeris native bindings) |
| Testing       | Vitest                                        |
| Deployment    | Vercel                                        |

---

## Architecture Overview

The project follows a **modular monolith** pattern with clean-architecture principles applied to the backend:

```
src/
├── app/                   # Next.js App Router (pages + API routes)
│   └── api/               # 15+ API endpoints organized by feature
├── backend/               # Server-side business logic
│   ├── core/              # Cross-cutting concerns (auth, db client, errors, middleware)
│   └── features/          # Feature modules, each with:
│       ├── domain/        #   Entities & validation rules
│       ├── application/   #   Use cases & business logic
│       ├── infra/         #   External service implementations
│       └── http/          #   Request/response schemas
├── features/              # Frontend feature modules (components + hooks)
├── shared/                # Reusable UI components, hooks, utilities
└── types/                 # Shared TypeScript types
```

Report generation is **asynchronous and job-based**: the API accepts a request, returns a `202 Accepted` with a job ID, and the client polls for progress until the report is ready.

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js** >= 20 ([download](https://nodejs.org/))
- **npm** >= 10
- A **Supabase** project (free tier works fine) or Docker for local Supabase
- An **OpenAI API key** ([platform.openai.com](https://platform.openai.com/))
- A **TimezoneDB API key** — free at [timezonedb.com](https://timezonedb.com/register)

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/henriquePConde/astro-ai-fullstack.git
cd astro-ai-fullstack
```

### 2. Install dependencies

```bash
npm install
```

This also runs `prisma generate` automatically via the `postinstall` script.

### 3. Set up Supabase

You have two options:

**Option A — Use a hosted Supabase project (recommended for getting started quickly)**

1. Go to [supabase.com](https://supabase.com/) and create a free project.
2. Once your project is ready, grab the following from **Project Settings → API**:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_ANON_KEY`
   - `service_role` key → this is your `SUPABASE_SERVICE_ROLE_KEY`
3. From **Project Settings → Database**, grab the connection string:
   - **Transaction pooler** connection string (port `6543`) → `DATABASE_URL`
   - **Direct connection** string (port `5432`) → `DIRECT_URL`

**Option B — Run Supabase locally with Docker**

A ready-to-use Docker Compose setup is included:

```bash
cd supabase-selfhost
cp .env.example .env
# Edit .env if needed (defaults work for local development)
docker-compose up -d
```

Supabase Studio will be available at `http://localhost:8000`. After it starts, retrieve your local keys from the Studio dashboard or the `.env` file you configured.

### 4. Configure environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.development .env.local
```

Open `.env.local` and fill in the required variables. See the [Environment Variables Reference](#environment-variables-reference) section below for a description of each one.

At a minimum, you need to set:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
DIRECT_URL
OPENAI_API_KEY
TIMEZONEDB_API_KEY
PDF_JWT_SECRET
```

### 5. Set up the database

Run Prisma migrations to create all the necessary tables:

```bash
npm run prisma:migrate
```

If you just want to apply existing migrations without running the interactive migrate dev flow (e.g. in a CI environment), use:

```bash
npm run prisma:migrate:deploy
```

You can open the Prisma Studio GUI to inspect your database at any time:

```bash
npm run prisma:studio
```

### 6. Run the development server

```bash
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## Environment Variables Reference

Create a `.env.local` file at the project root with the following variables:

```bash
# ─── Supabase (public — safe to expose to the browser) ───────────────────────
NEXT_PUBLIC_SUPABASE_URL=           # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=      # Supabase anonymous public key

# ─── Supabase (server-only — never expose to the browser) ────────────────────
SUPABASE_ANON_KEY=                  # Same anon key, used server-side
SUPABASE_SERVICE_ROLE_KEY=          # Service role key for admin operations

# ─── Database ─────────────────────────────────────────────────────────────────
DATABASE_URL=                       # Pooled connection string (port 6543 on Supabase)
DIRECT_URL=                         # Direct connection string (port 5432, used by Prisma migrations)

# ─── OpenAI ───────────────────────────────────────────────────────────────────
OPENAI_API_KEY=                     # Your OpenAI API key (sk-...)

# ─── PDF generation ───────────────────────────────────────────────────────────
PDF_JWT_SECRET=                     # A long random string to sign PDF access tokens
FRONTEND_BASE_URL=http://localhost:3000  # Base URL used in PDF links

# ─── Timezone ─────────────────────────────────────────────────────────────────
TIMEZONEDB_API_KEY=                 # Free key from timezonedb.com

# ─── Geocoding (optional — public APIs, defaults work out of the box) ─────────
NOMINATIM_URL=https://nominatim.openstreetmap.org
PHOTON_URL=https://photon.komoot.io
LOCATION_USER_AGENT=astro-ai/1.0   # Required by Nominatim usage policy

# ─── Development helpers ──────────────────────────────────────────────────────
REPORTS_USE_MOCKS=false             # Set to "true" to skip OpenAI calls during development
REPORT_LIMIT_BYPASS_USER_IDS=       # Comma-separated user IDs that bypass daily limits

# ─── Optional ─────────────────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=                # Overrides the API base URL (defaults to relative paths)
```

> **Tip:** Setting `REPORTS_USE_MOCKS=true` is very useful during local development — it returns pre-baked report content without making any OpenAI API calls, saving you both time and credits.

---

## Available Scripts

| Script                          | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| `npm run dev`                   | Start the Next.js development server with hot reload  |
| `npm run build`                 | Build the application for production                  |
| `npm start`                     | Start the production server                           |
| `npm run typecheck`             | Run TypeScript type checking                          |
| `npm run lint`                  | Lint the codebase with ESLint                         |
| `npm test`                      | Run the test suite with Vitest                        |
| `npm run prisma:generate`       | Regenerate the Prisma client after schema changes     |
| `npm run prisma:migrate`        | Create and apply a new database migration             |
| `npm run prisma:migrate:deploy` | Apply pending migrations (use in CI/production)       |
| `npm run prisma:studio`         | Open the Prisma Studio database browser               |
| `npm run gen:types`             | Regenerate TypeScript types from your Supabase schema |

---

## API Overview

All endpoints are under `/api`. Authentication is handled via a Bearer token (from Supabase) or session cookie.

| Method | Endpoint                      | Description                                    |
| ------ | ----------------------------- | ---------------------------------------------- |
| `GET`  | `/api/health`                 | Health check                                   |
| `POST` | `/api/auth/signup`            | Register a new user                            |
| `POST` | `/api/auth/login`             | Log in                                         |
| `POST` | `/api/auth/signout`           | Sign out                                       |
| `POST` | `/api/auth/sync`              | Sync session tokens                            |
| `GET`  | `/api/auth/check-user`        | Check if a user exists                         |
| `POST` | `/api/calculate`              | Calculate a birth chart                        |
| `POST` | `/api/calculate/solar-return` | Calculate a solar return chart                 |
| `POST` | `/api/calculate/interpret`    | Stream an AI chart interpretation (chat)       |
| `POST` | `/api/reports`                | Start async report generation (returns job ID) |
| `GET`  | `/api/reports`                | List the current user's reports                |
| `GET`  | `/api/reports/:id`            | Get a report by ID                             |
| `GET`  | `/api/reports/daily-usage`    | Get daily report usage and limits              |
| `GET`  | `/api/reports/jobs/:id`       | Poll report job progress                       |
| `POST` | `/api/pdf`                    | Generate a PDF for a report                    |
| `GET`  | `/api/pdf/validate-token`     | Validate a PDF access token                    |
| `GET`  | `/api/user/me`                | Get the current user's profile                 |
| `GET`  | `/api/location/countries`     | Search countries                               |
| `GET`  | `/api/location/cities`        | Search cities within a country                 |

For detailed request/response schemas, see [API_SUMMARY.md](./API_SUMMARY.md).

---

## Database Schema

Managed by Prisma. Five models:

```
User              — Core user profile linked to Supabase Auth
Chart             — Saved birth charts with cached calculation results
Report            — Completed astrological reports (stored as JSON)
ReportJob         — Async report generation jobs with progress tracking
InterpretMessage  — Chat messages for conversational chart interpretation
```

---

## API Testing with Postman

A Postman collection is included for testing all API endpoints:

1. Import `Astro-AI-API.postman_collection.json` into Postman.
2. Import `Astro-AI-API.postman_environment.json` for environment variables.
3. See [POSTMAN_COLLECTION.md](./POSTMAN_COLLECTION.md) for full documentation.

The collection covers all 15+ endpoints with example request bodies, automatic test scripts, and Bearer token authentication support.
