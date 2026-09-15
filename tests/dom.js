import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
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

export function assertDistinctMeta($page, $baseline, titlePattern) {
  const title = $page('title').text().trim();
  const description = ($page('meta[name="description"]').attr('content') ?? '').trim();

  assert.equal(title.length > 0, true);
  assert.equal(description.length > 0, true);
  assert.notEqual(title, $baseline('title').text().trim());
  assert.notEqual(
    description,
    ($baseline('meta[name="description"]').attr('content') ?? '').trim(),
  );
  assert.match(title, titlePattern);
}
