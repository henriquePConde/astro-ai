/**
 * Generates user initials from name or email.
 * - If name is available: returns first letter of first name and first letter of last name (if exists)
 * - If only email is available: returns first letter of email
 * - Returns empty string if neither is available
 */
export function getInitials(options: { name?: string | null; email?: string | null }): string {
  const { name, email } = options;

  if (name && name.trim()) {
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length >= 2) {
      // First letter of first name + first letter of last name
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else {
      // Only one name part, use first letter
      return nameParts[0][0].toUpperCase();
    }
  }

  if (email && email.trim()) {
    // Use first letter of email
    return email[0].toUpperCase();
  }

  return '';
}
