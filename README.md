# AR Menu Prototype

A prototype that simulates the full video-to-3D pipeline for an AR restaurant menu.

## What's Built

- **Backend** (`backend/`) — NestJS + Prisma + SQLite
  - Public menu API: `GET /api/menu/:restaurantId`
  - Admin CRUD: `GET/POST/PATCH/DELETE /api/admin/items`
  - Job orchestration: `POST /api/jobs/confirm` + `GET /api/jobs/:id/status`
  - WebSocket live progress updates on `/jobs` namespace
  - Simulated processing worker (runs inline) — steps through: Download → Extract Frames → Photogrammetry → Mesh → Optimize → Draco Compress → Done

- **Frontend** (`frontend/context/`) — React 19 + Vite + Tailwind v4
  - Public consumer menu at `/` (mobile-first, editorial design)
  - 3D viewer with `@google/model-viewer` on dish detail page
  - Admin dashboard at `/admin`
  - Add new menu items
  - Upload video + watch simulated processing pipeline with live progress
  - Stock 3D model (Astronaut) assigned on completion

## Running the Prototype

### 1. Start the Backend

```bash
cd backend
pnpm install
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
npx nest build
node dist/src/main.js
```

Backend runs on **http://localhost:3001**

### 2. Start the Frontend

```bash
cd frontend/context
pnpm install
npx vite
```

Frontend runs on **http://localhost:5173**

### 3. Try It

- Open **http://localhost:5173** → browse the public menu with 3D models
- Click **Admin** in the top-right corner
- Add a new dish, then click **Upload Video** on a dish without a model
- Select any `.mp4` file → watch the simulated pipeline run end-to-end
- The dish will automatically get a 3D model after ~13 seconds

## Architecture

```
Frontend (Vite)  ←── proxy ──→  NestJS API  ←── SQLite/Prisma
     │                                │
     │  WebSocket                     │  Inline simulated worker
     │  /jobs                         │  (QUEUED → PROCESSING → COMPLETED)
     ↓                                ↓
UploadModal                  ProcessingJob table
```

## Next Steps for Production

1. Replace inline simulated worker with a real GPU worker (RunPod / AWS Batch)
2. Add S3 pre-signed URLs for video upload
3. Add JWT authentication for admin routes
4. Replace SQLite with Postgres + Redis for pub/sub
5. Integrate real photogrammetry pipeline (AliceVision / Meshroom)
6. Train/fine-tune a model for food-specific 3D reconstruction
