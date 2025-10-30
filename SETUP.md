# 🛠️ Setup Guide - FlipBook Viewer

Complete setup instructions for running the project locally.

## Prerequisites

### Required
- ✅ Node.js >= 18.17.0
- ✅ npm >= 9.0.0
- ✅ Git

### Optional
- PostgreSQL (for database features)
- MongoDB (alternative to PostgreSQL)

## Installation Steps

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/flipbook-viewer.git
cd flipbook-viewer

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your settings
```

**Minimum required for local development:**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Optional Features Setup

### Database (PostgreSQL)

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (varies by OS)
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql
# Windows: Download from postgresql.org

# Start PostgreSQL service
# macOS: brew services start postgresql
# Ubuntu: sudo service postgresql start

# Create database
createdb flipbook_db

# Add to .env.local
DATABASE_URL="postgresql://localhost:5432/flipbook_db"

# Generate Prisma client and push schema
npm run db:generate
npm run db:push
```

**Option B: Cloud PostgreSQL (Neon - Free tier)**
1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new project
4. Copy connection string
5. Add to `.env.local`:
   ```env
   DATABASE_URL="postgresql://user:pass@host/db"
   ```
6. Run:
   ```bash
   npm run db:push
   ```

**Option C: Supabase (Free tier)**
1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Get connection string from Settings → Database
4. Add to `.env.local`
5. Run migrations

### Google Analytics

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Create GA4 property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Google Tag Manager

1. Create account at [tagmanager.google.com](https://tagmanager.google.com)
2. Create container
3. Get Container ID (GTM-XXXXXXX)
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

## Troubleshooting

### "Cannot find module" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma errors

```bash
# Regenerate Prisma client
npm run db:generate

# If schema changed, push to database
npm run db:push
```

### Next.js build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Port 3000 already in use

```bash
# Use different port
PORT=3001 npm run dev

# Or kill process on port 3000
# macOS/Linux: lsof -ti:3000 | xargs kill -9
# Windows: netstat -ano | findstr :3000
#          taskkill /PID <PID> /F
```

## Development Workflow

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Format code
npm run format

# Check formatting
npm run format:check
```

### Database Management

```bash
# Open Prisma Studio (GUI for database)
npm run db:studio

# Create migration
npm run db:migrate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test -- --watch
```

## Project Structure Overview

```
flipbook-viewer/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── [locale]/          # Localized pages (future)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Shared utilities
│   ├── constants.ts       # App constants
│   ├── utils.ts           # Helper functions
│   └── prisma.ts          # Database client
├── messages/              # Translations (i18n)
├── prisma/                # Database schema
├── public/                # Static files
├── types/                 # TypeScript types
└── middleware.ts          # Next.js middleware
```

## Common Tasks

### Add a New Translation

1. Create file in `messages/`:
   ```bash
   cp messages/en.json messages/pt.json
   ```

2. Translate content in `messages/pt.json`

3. Add locale to `lib/constants.ts`:
   ```typescript
   export const LOCALES = ['en', 'he', 'es', 'fr', 'de', 'ja', 'zh', 'pt']
   ```

4. Update middleware if needed

### Add a New Component

1. Create component in `app/components/`:
   ```tsx
   // app/components/MyComponent.tsx
   'use client' // if using hooks/interactivity

   export function MyComponent() {
     return <div>My Component</div>
   }
   ```

2. Import and use:
   ```tsx
   import { MyComponent } from './components/MyComponent'
   ```

### Add a New API Route

1. Create file in `app/api/`:
   ```tsx
   // app/api/hello/route.ts
   import { NextResponse } from 'next/server'

   export async function GET() {
     return NextResponse.json({ message: 'Hello' })
   }
   ```

2. Call from client:
   ```tsx
   const response = await fetch('/api/hello')
   const data = await response.json()
   ```

## Performance Tips

### Development
- Use `npm run dev` with Turbopack (default in Next.js 16)
- Hot reload works automatically
- Clear `.next` folder if experiencing issues

### Production
- Always run `npm run build` before deploying
- Test production build locally:
  ```bash
  npm run build
  npm start
  ```

## VS Code Recommended Extensions

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma"
  ]
}
```

## Next Steps

1. ✅ Set up development environment
2. ✅ Run `npm run dev`
3. 📝 Configure environment variables
4. 🗄️ Set up database (optional)
5. 📊 Add analytics (optional)
6. 🚀 Deploy to Vercel
7. 📈 Monitor and improve

---

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

**Issues?** Create an issue on GitHub or check the troubleshooting section above.

Good luck building! 🚀
