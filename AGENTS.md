# Project Agent Instructions

## Project

**Aircraft Near Me** is currently a prototype: the frontend validates UK postcode formats and displays sample aircraft data, and the backend exposes `/health`. The frontend does not yet call the backend.

Finding nearby live aircraft using a UK postcode or browser geolocation is planned functionality. The responsibility lists below describe the intended architecture as these features are implemented.

## Stack

Frontend:

- Next.js
- TypeScript
- App Router
- pnpm
- GOV.UK Frontend

Backend:

- FastAPI
- Python
- uv

## Repository Structure

```text
aircraft-near-me/
├── frontend/
├── backend/
└── AGENTS.md
```

## Frontend

Work inside `frontend/`.

Commands:

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm lint
```

Use pnpm only.

Prefer Server Components.

Use `"use client"` only when required for:

- state
- event handlers
- effects
- browser APIs
- geolocation

Use GOV.UK Frontend as the primary design system.

Do not add Tailwind or another UI library unless explicitly requested.

Prefer GOV.UK classes and patterns before custom CSS.

Use `"Helvetica Neue", Helvetica, Arial, sans-serif` for the service text, with Roboto for the header brand. Keep the header font override applied to its child elements too.

Keep the UI simple, accessible, and task-focused.

Use the `@/*` import alias.

## Backend

Work inside `backend/`.

Commands:

```bash
uv sync
uv run fastapi dev
```

or:

```bash
uv run uvicorn backend.main:app --reload
```

Use uv for Python dependency management.

Keep the existing `src/backend/` package layout:

```text
backend/
├── src/
│   └── backend/
│       ├── __init__.py
│       └── main.py
├── pyproject.toml
└── uv.lock
```

The FastAPI entrypoint is configured as `backend.main:app` in `pyproject.toml`. Add `api/`, `services/`, and `models/` under `src/backend/` as needed.

Keep API routes thin.

Put business logic in service modules rather than directly inside route handlers.

The backend should handle:

- postcode lookup
- latitude/longitude conversion
- aircraft provider requests
- distance calculations
- selecting the nearest aircraft
- normalising external API responses

Use Pydantic models for request and response schemas where useful.

Prefer async endpoints for network-bound operations.

## Frontend / Backend Boundary

Frontend handles:

- forms
- rendering
- browser geolocation
- loading states
- validation messages
- displaying API responses

Backend handles:

- external API integrations
- geospatial calculations
- postcode processing
- aircraft lookup logic

Do not duplicate backend business logic in the frontend.

## API

Use environment variables for service URLs and configuration.

Frontend example:

```text
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Never put secrets in `NEXT_PUBLIC_*`.

Backend secrets should use environment variables and must not be committed.

## TypeScript

Avoid:

- `any`
- unnecessary type assertions
- ignored TypeScript errors

Use explicit types for API responses and domain models.

## Python

Use type hints.

Prefer:

```python
def calculate_distance(...) -> float:
    ...
```

Avoid large functions and unnecessary classes.

Use clear service boundaries for external APIs and calculations.

## Testing

Add focused tests for business logic.

Backend tests should prioritise:

- distance calculations
- postcode handling
- aircraft response normalisation
- nearest-aircraft selection

Frontend tests should focus on important user interactions rather than implementation details.

## Accessibility

Use semantic HTML and GOV.UK accessibility patterns.

Ensure:

- inputs have labels
- buttons use `<button>`
- links use `<a>`
- heading order is logical
- validation errors are accessible

## Code Quality

Prefer readable code over clever code.

Avoid:

- premature abstraction
- unnecessary state
- unnecessary `useEffect`
- duplicated logic
- large components
- large route handlers

Keep changes focused and minimal.

## Security

Never commit:

- API keys
- passwords
- tokens
- `.env` files containing secrets

Use `.env.example` for documented configuration.

## Git

Commit lockfiles:

```text
frontend/pnpm-lock.yaml
backend/uv.lock
```

Do not commit:

```text
node_modules/
.venv/
.next/
.env
```

Keep commits concise and focused.
