import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../../.env') });
config({ path: resolve(__dirname, '../../.env') });

export function buildDatabaseUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.DATABASE_HOST ?? 'localhost';
  const port = process.env.DATABASE_PORT ?? '5432';
  const user = process.env.DATABASE_USER ?? 'postgres';
  const password = process.env.DATABASE_PASSWORD ?? 'postgres';
  const name = process.env.DATABASE_NAME ?? 'mobimatesHome';

  const encodedPassword = encodeURIComponent(password);
  return `postgresql://${user}:${encodedPassword}@${host}:${port}/${name}`;
}

process.env.DATABASE_URL = buildDatabaseUrl();
