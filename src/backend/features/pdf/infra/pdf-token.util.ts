// src/backend/features/pdf/infra/pdf-token.util.ts
import jwt from 'jsonwebtoken';

type Payload = Record<string, unknown>;

export function signPdfToken(
  payload: Payload | null | undefined,
  secret: string,
  expiresInSeconds = 15 * 60, // 15 minutes
) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('signPdfToken: payload must be a non-null object');
  }
  if (!secret) {
    throw new Error('signPdfToken: secret is missing');
  }
  return jwt.sign(payload, secret, { expiresIn: expiresInSeconds });
}

export function generatePdfToken(payload: Payload) {
  return signPdfToken(payload, process.env.PDF_JWT_SECRET!, 15 * 60);
}

export function verifyPdfToken<T = any>(token: string): T {
  const secret = process.env.PDF_JWT_SECRET!;
  return jwt.verify(token, secret) as T;
}
