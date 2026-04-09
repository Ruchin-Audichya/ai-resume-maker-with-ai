# AI Resume Builder Frontend

Frontend for the AI Resume Builder minor project.

Made by Ruchin Auichya, Palak Kumari, Shriya Gakkhar.

## Requirements

- Node.js 18+
- npm 9+

## Setup (Works On Any PC)

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
# Windows
copy .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

3. Update values in `.env.local` if needed:

- `VITE_APP_URL` -> backend URL (default: `http://localhost:5001/`)
- `VITE_GEMINI_API_KEY` -> Gemini key for AI suggestions
- `VITE_DEMO_AUTH` -> set `true` for offline demo auth (recommended for presentation)

4. Start development server:

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Notes

- URL config is normalized, so both `VITE_APP_URL` and `VITE_BASE_URL` are supported.
- If Gemini key is missing, AI actions show a clear error message instead of crashing the app.
- Demo auth is enabled by default; sign-up and sign-in will work even if backend/DB is down.
- Set `VITE_DEMO_AUTH=false` when you want to test real backend authentication.
