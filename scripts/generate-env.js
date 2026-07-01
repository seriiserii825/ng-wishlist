const fs = require('fs');
const path = require('path');
require('dotenv').config();

const outDir = path.join(__dirname, '../src/environments');
const outFile = path.join(outDir, 'environment.ts');

const apiBaseUrl = process.env.API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error('Missing API_BASE_URL in .env');
}

const content = `export const environment = {
  apiBaseUrl: '${apiBaseUrl}',
};
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, content);
console.log(`Generated ${path.relative(process.cwd(), outFile)} from .env`);
