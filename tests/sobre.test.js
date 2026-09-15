import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, classesOf, assertDistinctMeta } from './dom.js';
import { navLinks, site } from '../src/data/site.ts';

test('página Sobre existe e tem HTML válido', () => {
  const $ = loadPage('sobre/index.html');
  assert.equal($('html').attr('lang'), 'pt-BR');
});

test('Sobre apresenta o responsável técnico e a credencial CREA-PE', () => {
  const $ = loadPage('sobre/index.html');
  const bodyText = $('body').text();

  assert.match(bodyText, /Hammed de Carvalho Gurgel/);
  assert.match(bodyText, /Engenheiro Mecânico/);
  assert.match(bodyText, /CREA-PE 182237953-9/);
});

test('badge de credencial da Sobre usa o mesmo componente compartilhado da Início', () => {
  const $ = loadPage('sobre/index.html');
  const badge = $('.credential-badge');

  assert.equal(badge.length, 1, 'esperava um único .credential-badge na Sobre');
  assert.equal(badge.find('.badge-seal').length, 1);
});

test('badge de credencial é estruturalmente idêntico entre Início e Sobre', () => {
  const $index = loadPage('index.html');
  const $sobre = loadPage('sobre/index.html');

  assert.deepEqual(
    classesOf($sobre, '.credential-badge'),
    classesOf($index, '.credential-badge'),
  );
});

test('Sobre apresenta a história/missão do escritório', () => {
  const $ = loadPage('sobre/index.html');
  assert.match($('body').text(), /miss[ãa]o/i);
});

test('Sobre menciona a área de atuação', () => {
  const $ = loadPage('sobre/index.html');
  assert.match($('body').text(), /Petrolina, Juazeiro e região/);
});

test('Sobre tem title e meta description próprios, em pt-BR, distintos da Início', () => {
  const $sobre = loadPage('sobre/index.html');
  const $index = loadPage('index.html');

  assertDistinctMeta($sobre, $index, /Sobre/i);
});

test('nav da Sobre contém os 4 links do menu', () => {
  const $ = loadPage('sobre/index.html');
  const toggle = $('.site-nav button.nav-toggle');
  const menu = $(`#${toggle.attr('aria-controls')}`);

  for (const { label, href } of navLinks) {
    const link = menu.find('a').filter((_, el) => $(el).text().trim() === label);
    assert.equal(link.length, 1, `esperava um link "${label}" no menu`);
    assert.equal(link.attr('href'), href);
  }
});

test('nav da Sobre contém o link do WhatsApp', () => {
  const $ = loadPage('sobre/index.html');
  const whatsappLink = $(`.site-nav a[href*="${site.whatsappUrl}"]`);

  assert.equal(whatsappLink.length > 0, true);
});
