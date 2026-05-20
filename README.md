# Ghost AI — Real-Time Collaborative System Architect

Ghost AI is a real-time collaborative system design workspace. Users describe a system in plain English, an AI agent maps that system onto a shared canvas, collaborators refine the architecture together, and the app generates a persistent Markdown technical specification directly from the resulting graph.

<div align="center">
  <img src="public/readme/readme-hero.webp" alt="Project Banner" width="100%" style="border-radius: 12px; margin: 20px 0;">

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/-Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/-shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" /><br/>
    <img src="https://img.shields.io/badge/-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
    <img src="https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img src="https://img.shields.io/badge/-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" /><br/>
    <img src="https://img.shields.io/badge/Trigger.dev-22c55e?style=for-the-badge&logo=triggerdotdev&logoColor=white" />
    <img src="https://img.shields.io/badge/-Liveblocks-050505?style=for-the-badge&logo=liveblocks&logoColor=white" />
  </div>
</div>

---

## 📋 Table of Contents

1. ✨ [Introduction](#-introduction)
2. ⚙️ [Tech Stack](#️-tech-stack)
3. 🔋 [Key Features](#-key-features)
4. 🤸 [Quick Start (Local Setup)](#-quick-start-local-setup)
5. 📂 [Project Structure](#-project-structure)
6. 🚀 [Production Hosting](#-production-hosting)

---

## ✨ Introduction

**Ghost AI** is an agentic planning and collaborative design application built for modern engineering teams. 

A user submits a natural-language prompt (e.g., *"Design a scalable e-commerce backend with RabbitMQ and a green PostgreSQL database"*), and a Google Gemini-powered AI agent autonomously places custom nodes and edges onto a shared React Flow canvas in real-time. Team members can watch the AI build the diagram live, then collaboratively edit, resize, style, and connect nodes. 

Once satisfied, the team can trigger spec generation. A second serverless background task translates the visual canvas graph into a comprehensive, multi-page Markdown technical specification that can be viewed in a gorgeous markdown modal or downloaded instantly as an attachment.

---

## ⚙️ Tech Stack

* **Frontend Framework:** [Next.js 16 (Turbopack) & React 19](https://nextjs.org/) — server-side rendering, type-safe API routers, and optimized image/font asset delivery.
* **Component Library & Styling:** [Tailwind CSS v4 & shadcn/ui](https://ui.shadcn.com/) — bespoke dark-themed CSS variables mapped directly to components.
* **Authentication:** [Clerk Auth Middleware](https://clerk.com/) — session synchronization, secure route protection, and metadata-aware profiles.
* **Database & ORM:** [Prisma ORM & Prisma Postgres](https://www.prisma.io/) — type-safe relation modeling, transactional task run records, and hosted cloud database persistence.
* **Real-time multiplayer:** [Liveblocks Socket Network & React Flow](https://liveblocks.io/) — WebSocket presence indicators, live shared cursor tracking, and collaborative state management.
* **Background Tasks:** [Trigger.dev serverless jobs](https://trigger.dev/) — robust orchestrator for heavy Gemini AI generations and spec document compilations.
* **Artifact Storage:** [Vercel Blob Storage](https://vercel.com/features/blob) — private secure storage for canvas states and technical specs.

---

## 🔋 Key Features

* 👉 **AI Architecture Agent:** Submit plain-English prompts; Gemini compiles visual canvas nodes, positions them cleanly, and writes them live to shared storage.
* 👉 **Multiplayer Canvas:** WebSocket synchronization enables collaborative editing, real-time presence cursor tracking, and active participant avatar stacks.
* 👉 **Bespoke Canvas Node Styling:** Draggable custom shapes (Rectangle, Decision Diamond, Pill Service, Circle Event, Database Cylinder, Hexagon Boundary) with 8 custom color-matching palettes.
* 👉 **Inline Editing & Resizing:** Double-click labels or edges to edit text inline; grab resize handles to shape components dynamically.
* 👉 **AI Spec Compilation:** Generates structured technical spec documents (including Architecture summary, Data models, Caching/Messaging strategies, Security, and Deployment guidelines) in markdown.
* 👉 **Canvas Autosave:** Debounced-saves canvas graphs every 3 seconds of inactivity to Vercel Blob and links the file record in PostgreSQL.
* 👉 **Project Collaboration Management:** Create projects, manage share access, invite collaborators by email, and track workspace ownership.

---

## 🤸 Quick Start (Local Setup)

Follow these steps to set up the project locally on your machine.

### Prerequisites
* [Node.js (v20+)](https://nodejs.org/)
* [Git](https://git-scm.com/)
* npm (Node Package Manager)

### 1. Clone the Repository
```bash
git clone https://github.com/MISTERXYMISTER/Ghost-ai.git
cd Ghost-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file at the root of the project:
```env
# Database
DATABASE_URL="postgres://.../postgres?sslmode=verify-full"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Liveblocks
LIVEBLOCKS_SECRET_KEY=sk_dev_...

# Trigger.dev Tasks
TRIGGER_SECRET_KEY=tr_dev_...
TRIGGER_PROJECT_REF=proj_...

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# App URL
APP_URL=http://localhost:3000
```

### 4. Build and Run the App
Launch the Next.js development server:
```bash
npm run dev
```

In a second terminal, launch the local tasks worker process:
```bash
npx trigger.dev@latest dev --skip-update-check
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📂 Project Structure

```
.
├── app/
│   ├── api/              # API routes (Clerk auth, Gemini design/spec triggers, autosave)
│   ├── editor/           # Canvas workspace pages
│   ├── generated/prisma/ # Auto-generated type-safe Prisma client
│   └── layout.tsx        # Application root layout wrapped in Clerk & Liveblocks providers
├── components/
│   ├── editor/           # Workspace Navbar, Project Sidebar, AI Chat Feed
│   │   └── canvas/       # Multi-user canvas rendering, cursors, shapes, controls
│   └── ui/               # Reusable atomic shadcn/ui primitives
├── context/              # Architectural, UI theme, and developmental guidelines
├── hooks/                # Custom React hooks (autosave, shortcuts, dialog state)
├── lib/                  # Shared utility layers (Prisma adapter, Liveblocks client, AI helper)
├── prisma/               # Prisma schema modeling and migrations
├── trigger/              # Trigger.dev background task workflow handlers
└── types/                # System-wide type contracts and interfaces
```

---

## 🚀 Production Hosting

### 1. Web App (Vercel)
The Next.js frontend and API endpoints are built to deploy natively on **Vercel** with a single click. Connect your GitHub repository, add your environment variables in the project settings, and click **Deploy**.

### 2. Background Workers (Trigger.dev Cloud)
To deploy your Gemini background task workers to the cloud, run:
```bash
npx trigger.dev@latest deploy
```

---
*Created by **MISTERXYMISTER**.*
