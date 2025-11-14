## astro-ai-fullstack

Unified Next.js modular monolith scaffold for Astro AI migration.

### Scripts

```
npm run dev
npm run build
npm start
npm run typecheck
npm run lint
npm test
```

### Health Check

GET /api/health → `{ ok: true }`

### API Testing

Postman collection is available for testing all API endpoints:

1. Import `Astro-AI-API.postman_collection.json` into Postman
2. Import `Astro-AI-API.postman_environment.json` for environment variables
3. See [POSTMAN_COLLECTION.md](./POSTMAN_COLLECTION.md) for detailed documentation

The collection includes:

- ✅ 15+ API endpoints organized by feature
- ✅ Request examples with proper schema validation
- ✅ Automatic test scripts for responses
- ✅ Collection variables for report IDs
- ✅ **Bearer token authentication** (recommended) + cookie support
- ✅ Location search, chart calculations, reports, PDF generation
