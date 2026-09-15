import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as cheerio from 'cheerio';

const distDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'dist',
);

export function loadPage(relativePath) {
  const html = readFileSync(path.join(distDir, relativePath), 'utf-8');
  return cheerio.load(html);
}

export function classesOf($, scope) {
  return $(scope)
    .find('*')
    .map((_, el) => $(el).attr('class') ?? '')
    .get();
}
