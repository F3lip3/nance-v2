import { hashSync } from 'bcrypt';

export function encrypt(value?: string): string | undefined {
  if (!value) return undefined;

  return hashSync(value, 10);
}
