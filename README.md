# Aircraft Near Me

A prototype for finding aircraft near a UK postcode. The frontend currently validates postcode formats and shows sample aircraft data. Live aircraft lookup and browser geolocation are planned.

## Stack

- Frontend: Next.js, TypeScript, GOV.UK Frontend, pnpm
- Backend: FastAPI, Python 3.12+, uv

## Run locally

With Docker and Docker Compose installed, start both services from the repository root:

```bash
docker compose up --build
```

Open http://localhost:3000 for the frontend and http://localhost:8000/docs for the API. Both services reload when source files change. Stop with Ctrl+C, then use `docker compose down` to remove the containers. Rebuild after dependency or configuration changes.

### Without Docker

Start the frontend:

```bash
cd frontend
pnpm install
pnpm dev
```

Open http://localhost:3000.

In another terminal, start the backend:

```bash
cd backend
uv sync
uv run fastapi dev
```

The API runs at http://127.0.0.1:8000, with docs at `/docs` and a health check at `/health`. The frontend is not yet connected to the backend.

## Checks

From `frontend/`, run `pnpm lint` and `pnpm build`.
