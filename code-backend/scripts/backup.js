require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is required for backup.');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDir = path.join(process.cwd(), 'backups', timestamp);

fs.mkdirSync(outputDir, { recursive: true });

const command = spawnSync('mongodump', ['--uri', uri, '--out', outputDir], {
  stdio: 'inherit',
  shell: true,
});

if (command.status !== 0) {
  console.error('Backup failed. Ensure mongodump is installed and in PATH.');
  process.exit(command.status || 1);
}

console.log(`Backup completed at ${outputDir}`);
