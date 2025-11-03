# Astro AI API - Quick Reference

## Endpoint Summary

| Method | Endpoint                      | Auth | Description                      |
| ------ | ----------------------------- | ---- | -------------------------------- |
| `GET`  | `/api/health`                 | ❌   | Health check                     |
| `POST` | `/api/auth/signout`           | ❌   | Sign out user                    |
| `POST` | `/api/auth/sync`              | ❌   | Sync session with tokens         |
| `GET`  | `/api/user/me`                | ✅   | Get current user                 |
| `GET`  | `/api/location/countries`     | ❌   | Search countries                 |
| `GET`  | `/api/location/cities`        | ❌   | Search cities                    |
| `POST` | `/api/calculate`              | ✅   | Calculate birth chart            |
| `POST` | `/api/calculate/solar-return` | ❌   | Calculate solar return           |
| `POST` | `/api/calculate/interpret`    | ✅   | AI chart interpretation (stream) |
| `POST` | `/api/reports`                | ✅   | Generate AI report               |
| `GET`  | `/api/reports`                | ✅   | List all reports                 |
| `GET`  | `/api/reports/:id`            | ❌   | Get report by ID                 |
| `GET`  | `/api/reports/daily-usage`    | ✅   | Get usage stats                  |
| `POST` | `/api/pdf`                    | ✅   | Generate PDF                     |
| `GET`  | `/api/pdf/validate-token`     | ❌   | Validate PDF token               |

**Total: 15 endpoints**

## Request Body Schemas

### Birth Data (Used in multiple endpoints)

```json
{
  "name": "string (required)",
  "year": "number (1900-2100, required)",
  "month": "number (1-12, required)",
  "day": "number (1-31, required)",
  "hour": "number (0-23, required)",
  "minute": "number (0-59, required)",
  "city": "string (optional)",
  "nation": "string (optional)"
}
```

### Solar Return

```json
{
  "birthData": {
    /* birth data object above */
  },
  "targetYear": "number (1900-2100, required)",
  "locationCity": "string (optional)",
  "locationNation": "string (optional)"
}
```

### Chart Interpretation

```json
{
  "message": "string (required)",
  "context": {
    "planets": [
      {
        "name": "string",
        "sign": "string",
        "house": "number",
        "position": "string"
      }
    ],
    "aspects": [
      {
        "planet1": "string",
        "planet2": "string",
        "type": "string",
        "angle": "number"
      }
    ],
    "houses": {
      "ascendant": "number",
      "midheaven": "number"
    }
  },
  "chatHistory": "array (optional, default: [])"
}
```

### Generate PDF

```json
{
  "reportId": "UUID (required)",
  "filename": "string (optional)",
  "options": {
    "format": "A4 | Letter (optional)",
    "printBackground": "boolean (optional)",
    "margin": {
      "top": "string (optional)",
      "bottom": "string (optional)",
      "left": "string (optional)",
      "right": "string (optional)"
    },
    "scale": "number (optional)"
  }
}
```

### Auth Sync

```json
{
  "access_token": "string (required)",
  "refresh_token": "string (required)"
}
```

## Query Parameters

### Location Endpoints

- **Countries**: `q` (required, min 2 chars), `limit` (1-20, default 10)
- **Cities**: `q` (required, min 2 chars), `country` (optional), `limit` (1-25, default 15)

### PDF Validation

- `reportId` (UUID, required)
- `pdfToken` (string, required)

## Response Formats

### Success

```json
{
  "success": true,
  "data": { ... }
}
```

### Chart Response

```json
{
  "success": true,
  "data": {
    "planets": [...],
    "houses": {
      "firstHouse": number,
      "secondHouse": number,
      ...
    },
    "aspects": [...]
  }
}
```

### Error

```json
{
  "error": "Error message"
}
```

### Stream Responses

- `/api/calculate/interpret` → `text/plain` (streaming)
- `/api/pdf` → `application/pdf` (binary)

## HTTP Status Codes

- `200` - Success
- `201` - Created (POST /api/reports)
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Testing Tips

1. Start with health check to verify API is running
2. Use location endpoints to find valid coordinates
3. For authenticated endpoints, log in first and sync cookies
4. Create a report first to get a `reportId` variable
5. Use that `reportId` for PDF generation
6. Chart interpretation returns a stream - handle accordingly

## Environment Variables

Set in Postman:

- `baseUrl` - API base URL (default: `http://localhost:3000`)
- `reportId` - Auto-populated after creating a report
