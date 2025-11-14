# Astro AI API - Postman Collection

This Postman collection contains all the API endpoints for the Astro AI application.

> **Quick Reference**: See [API_SUMMARY.md](./API_SUMMARY.md) for a concise endpoint reference table.

## Setup

### 1. Import Files into Postman

1. Open Postman
2. Click "Import" button
3. Import both files:
   - `Astro-AI-API.postman_collection.json` - API collection
   - `Astro-AI-API.postman_environment.json` - Environment variables

### 2. Configure Environment

The collection uses a `baseUrl` variable that defaults to `http://localhost:3000`. To change it:

1. Click on "Environments" in Postman
2. Select "Astro AI API Environment"
3. Update the `baseUrl` value if needed
4. Make sure this environment is selected when running requests

## Authentication

Most endpoints require authentication via Supabase. The application supports **two authentication methods**:

### Method 1: Bearer Token (Recommended for API Testing)

This is the easiest method for testing with Postman!

1. **Get your Access Token** from your Supabase client (browser console):

   ```javascript
   const {
     data: { session },
   } = await supabase.auth.getSession();
   console.log(session.access_token);
   ```

2. **In Postman**:
   - Go to the **Authorization** tab
   - Select **Bearer Token** from the Type dropdown
   - Paste your access token in the Token field
3. **OR use the `/api/auth/sync` endpoint**:
   - Send `access_token` and `refresh_token` in the request body
   - The access token will be automatically stored in the `{{accessToken}}` collection variable
   - All subsequent requests will use this Bearer token

### Method 2: Cookies (For Browser Testing)

1. **Sign up/Login** via the frontend application at `http://localhost:3000/login`
2. After successful login, your browser will have session cookies
3. For API testing, you'll need to:
   - Use Postman's cookie jar feature to sync cookies from your browser, OR
   - Manually set cookies in Postman after logging in

### Using Cookie Sync

1. Log in via the web application
2. Open browser DevTools → Application → Cookies
3. Copy the `sb-*` cookies
4. In Postman, go to Cookies tab and add them manually
5. The domain should be `localhost` and path `/`

## API Endpoints

### Health

- **GET** `/api/health` - Health check endpoint
  - No authentication required
  - Returns: `{ ok: true, ts: timestamp }`

### Authentication

- **POST** `/api/auth/signout` - Sign out current user
  - Idempotent: returns 200 even if no session exists
  - Clears all session cookies
  - Returns: `{ ok: true }`

- **POST** `/api/auth/sync` - Sync client session to server
  - Requires: `access_token` and `refresh_token` in body
  - Returns: `{ ok: true }`

### User

- **GET** `/api/user/me` - Get or create current user
  - Requires authentication
  - Returns user profile with id, email, name, created_at

### Location

- **GET** `/api/location/countries` - Search countries
  - Query params:
    - `q` (required, min 2 chars) - Search query
    - `limit` (optional, 1-20, default 10) - Max results
  - Returns: Array of countries with name, lat, lng, etc.

- **GET** `/api/location/cities` - Search cities
  - Query params:
    - `q` (required, min 2 chars) - Search query
    - `country` (optional) - Filter by country name
    - `limit` (optional, 1-25, default 15) - Max results
  - Returns: Array of cities with location data

### Calculate

- **POST** `/api/calculate` - Calculate birth chart
  - Requires authentication
  - Body:
    - `name` (required) - Person's name
    - `year` (required, 1900-2100) - Birth year
    - `month` (required, 1-12) - Birth month
    - `day` (required, 1-31) - Birth day
    - `hour` (required, 0-23) - Birth hour
    - `minute` (required, 0-59) - Birth minute
    - `city` (optional) - Birth city
    - `nation` (optional) - Birth country
  - Returns: Chart data with planets, houses, and aspects

- **POST** `/api/calculate/solar-return` - Calculate solar return chart
  - Body:
    - `birthData` (required) - Full birth data object
    - `targetYear` (required, 1900-2100) - Target year for return
    - `locationCity` (optional) - Location city
    - `locationNation` (optional) - Location country
  - Returns: Solar return chart data

- **POST** `/api/calculate/interpret` - AI chart interpretation
  - Requires authentication
  - Body:
    - `message` (required) - User's question about the chart
    - `context` (required) - Chart context object with planets, aspects, houses
    - `chatHistory` (optional, default []) - Previous messages
  - Returns: Streaming text response (text/plain)

### Reports

- **POST** `/api/reports` - Generate full AI astrological report
  - Requires authentication
  - Body: Same as birth chart calculation
    - `name`, `year`, `month`, `day`, `hour`, `minute`
    - `city`, `nation` (optional)
  - Returns: Complete report with interpretation (201 Created)
  - **Note**: This endpoint automatically stores the `reportId` in collection variables

- **GET** `/api/reports` - List user's reports
  - Requires authentication
  - Returns: Array of report summaries (id, personName, dates)

- **GET** `/api/reports/:id` - Get specific report with chart
  - Returns: Full report data including chart calculations

- **GET** `/api/reports/daily-usage` - Get daily usage limits
  - Requires authentication
  - Returns: `{ used: number, limit: number }`

### PDF

- **POST** `/api/pdf` - Generate PDF from report
  - Requires authentication
  - Body:
    - `reportId` (required, UUID) - Report ID
    - `filename` (optional) - Custom filename
    - `options` (optional) - PDF formatting options
      - `format`: 'A4' or 'Letter'
      - `printBackground`: boolean
      - `margin`: { top, bottom, left, right }
      - `scale`: number
  - Returns: Binary PDF file

- **GET** `/api/pdf/validate-token` - Validate PDF access token
  - Query params:
    - `reportId` (required, UUID)
    - `pdfToken` (required)
  - Returns: `{ valid: boolean }`

## Testing Flow

### Recommended Testing Order

1. **Health Check** - Verify API is running

   ```
   GET /api/health
   ```

2. **Search Locations** - Find birth location

   ```
   GET /api/location/countries?q=United States
   GET /api/location/cities?q=New York&country=United States
   ```

3. **Calculate Chart** - Get chart data (requires auth)

   ```
   POST /api/calculate
   ```

4. **Get User Info** - Check authentication (requires auth)

   ```
   GET /api/user/me
   ```

5. **Create Report** - Generate full AI report (requires auth)

   ```
   POST /api/reports
   ```

6. **List Reports** - See all your reports (requires auth)

   ```
   GET /api/reports
   ```

7. **Generate PDF** - Download report as PDF (requires auth)
   ```
   POST /api/pdf
   ```

### Testing Authentication-Required Endpoints

Since the app uses cookie-based sessions, you have a few options:

**Option 1: Browser Cookie Sync** (Recommended for development)

- Log in via `http://localhost:3000/login`
- Copy cookies from browser DevTools
- Add to Postman's cookie jar

**Option 2: Use Auth Sync Endpoint**

- Get `access_token` and `refresh_token` from Supabase
- Call `/api/auth/sync` with these tokens
- Subsequent requests will use the session

**Option 3: Manual Cookie Addition**

- After logging in via web app, inspect cookies in DevTools
- Add them manually in Postman: Request → Cookies → Add

## Collection Variables

The collection uses these variables:

- `{{baseUrl}}` - Base URL for all requests (default: `http://localhost:3000`)
- `{{reportId}}` - Auto-populated after creating a report (used in other requests)

## Notes

- All dates/times should use the server's timezone
- Birth chart calculations use Swiss Ephemeris data
- AI interpretations use OpenAI's API
- PDF generation uses Puppeteer
- Daily usage limits are enforced per user
- Most operations are rate-limited to prevent abuse

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created (for new resources)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid auth)
- `404` - Not Found
- `500` - Internal Server Error

## Stream Responses

Some endpoints return streaming responses:

- `/api/calculate/interpret` - Returns streaming text (text/plain)
- `/api/pdf` - Returns binary PDF data

Make sure to handle these appropriately in Postman or your client.

## Support

For issues or questions:

1. Check the main README.md for setup instructions
2. Verify your `.env` file is configured correctly
3. Ensure the database migrations are up to date
4. Check server logs for detailed error messages
