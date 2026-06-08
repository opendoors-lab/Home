const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });

function buildDatabaseUrl() {
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

module.exports = { buildDatabaseUrl };
