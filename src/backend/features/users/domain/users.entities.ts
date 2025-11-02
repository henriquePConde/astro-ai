/**
 * Domain entities and business rules for the users feature.
 */

export type User = {
  id: string;
  email: string;
  name: string | null;
  created_at: Date;
};

/**
 * Validates user email meets business requirements.
 */
export function isValidUserEmail(email: string): boolean {
  return email.trim().length > 0 && email.includes('@');
}

/**
 * Validates user name meets business requirements.
 */
export function isValidUserName(name: string | null): boolean {
  if (name === null) return true; // Name is optional
  return name.trim().length >= 1;
}
