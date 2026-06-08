const path = require('path');
require('./set-database-url.js');

const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const prismaBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const result = spawnSync(prismaBin, ['prisma', ...args], {
  stdio: 'inherit',
  env: process.env,
  cwd: path.join(__dirname, '..'),
  shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);
