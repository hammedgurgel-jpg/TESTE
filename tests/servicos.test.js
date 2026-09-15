import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadPage, assertDistinctMeta } from './dom.js';
import { navLinks, site } from '../src/data/site.ts';

const contextPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'CONTEXT.md',
);

function readServiceNamesFromContext() {
  const content = readFileSync(contextPath, 'utf-8');
  const sectionMatch = content.match(
    /## Servi[çc]os oferecidos pelo escrit[óo]rio\r?\n([\s\S]*)/,
  );
  assert.ok(sectionMatch, 'esperava encontrar a seção de serviços em CONTEXT.md');

  const section = sectionMatch[1];
  const names = [...section.matchAll(/^### (.+)$/gm)].map(([, name]) => name.trim());
  assert.equal(names.length, 5, 'esperava 5 serviços documentados em CONTEXT.md');

  return names.map((name) => ({ name, slug: slugify(name) }));
}

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

test('página Serviços existe e tem HTML válido', () => {
  const $ = loadPage('servicos/index.html');
  assert.equal($('html').attr('lang'), 'pt-BR');
});

test('Serviços lista e detalha os 5 serviços com a terminologia de CONTEXT.md', () => {
  const $ = loadPage('servicos/index.html');
  const expectedServices = readServiceNamesFromContext();
  const renderedDescriptions = new Set();

  for (const { slug, name } of expectedServices) {
    const block = $(`#${slug}`);
    assert.equal(block.length, 1, `esperava um bloco para "${name}"`);
    assert.equal(
      block.find('h2').text().trim(),
      name,
      `nome do serviço deve bater exatamente com a terminologia de CONTEXT.md`,
    );

    const description = block.find('p').text().trim();
    assert.equal(description.length > 0, true, `esperava descrição própria para "${name}"`);
    assert.equal(
      renderedDescriptions.has(description),
      false,
      `descrição de "${name}" deve ser própria, não repetida de outro serviço`,
    );
    renderedDescriptions.add(description);
  }
});

test('Serviços tem title e meta description próprios, distintos da Início', () => {
  const $servicos = loadPage('servicos/index.html');
  const $index = loadPage('index.html');

  assertDistinctMeta($servicos, $index, /Servi[çc]os/i);
});

test('nav de Serviços contém os 4 links do menu', () => {
  const $ = loadPage('servicos/index.html');
  const toggle = $('.site-nav button.nav-toggle');
  const menu = $(`#${toggle.attr('aria-controls')}`);

  for (const { label, href } of navLinks) {
    const link = menu.find('a').filter((_, el) => $(el).text().trim() === label);
    assert.equal(link.length, 1, `esperava um link "${label}" no menu`);
    assert.equal(link.attr('href'), href);
  }
});

test('nav de Serviços contém o link do WhatsApp', () => {
  const $ = loadPage('servicos/index.html');
  const whatsappLink = $(`.site-nav a[href*="${site.whatsappUrl}"]`);

  assert.equal(whatsappLink.length > 0, true);
});
