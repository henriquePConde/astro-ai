// astro-ai-fullstack/src/backend/core/errors/http-errors.ts
export class HttpError extends Error {
  constructor(
    public status: number,
    msg: string,
  ) {
    super(msg);
  }
}

export const badRequest = (m = 'Bad Request') => new HttpError(400, m);
export const unauthorized = (m = 'Unauthorized') => new HttpError(401, m);
export const forbidden = (m = 'Forbidden') => new HttpError(403, m);
export const notFound = (m = 'Not Found') => new HttpError(404, m);
