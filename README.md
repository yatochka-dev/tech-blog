# Tech Blog (Architecture)

Tech Blog is a full-featured blog platform built and delivered for a non-profit organization.
It supports articles, tags, media, and a complete search and filtering system.

The project is built with **Next.js App Router** as the main framework, with **Payload CMS** running in the same codebase for content management.

---

## Overview

* **Next.js** serves the public site using React Server Components
* **Payload CMS** provides the admin panel, content models, and API
* **PostgreSQL** stores all structured content
* Shared types are generated from Payload for strongly typed access
* A **tRPC layer** powers dynamic features like search and tag filtering

---

## Main Modules

### Next.js App Router (`src/app`)

* Public website routes under `src/app/(app)`
* Payload admin UI and CMS API mounted under `src/app/(payload)`

### Payload CMS (`payload.config.ts`, `src/collections`)

* Collections for posts, tags, media, users, comments
* Hooks handle slugs, access rules, and cache revalidation
* Globals provide site-wide configuration

### Data Access (`src/data-access`)

* Central helper for initializing and reusing the Payload client across the app

### Search + Filtering API (tRPC)

* Typed routers under `src/server/api`
* Used for live search, tag lookup, and filter queries
* Integrated with React Query for hydration

### UI Components (`src/components`)

* Modular cards, layouts, and reusable feature components

---

## Data Flow

1. Next.js renders public pages or serves the Payload admin routes
2. Server components query content through Payload collections
3. Payload persists data via PostgreSQL and handles media uploads through R2
4. Collection hooks trigger Next.js cache revalidation when content changes
5. Search and filtering requests go through tRPC and hydrate client state

---

## Key Technologies

* Next.js (App Router, React Server Components)
* Payload CMS (Admin UI, content models, API)
* PostgreSQL (primary database)
* Cloudflare R2 (media storage, S3-compatible)
* tRPC + React Query (typed search and filtering layer)
* Zod (validation)
* Sharp (image processing)
* Resend (email notifications)
