import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPage } from './dom.js';

test('hero da Início comunica o serviço (PPCI/incêndio) e o público-alvo', () => {
  const $ = loadPage('index.html');
  const heroText = $('.hero').text();

  assert.match(heroText, /inc[êe]ndio/i);
  assert.match(heroText, /propriet[áa]rios|s[íi]ndicos|arquitetos|edifica[çc][õo]es/i);
  assert.doesNotMatch(heroText, /em constru[çc][ãa]o/i);
});

test('CTA de WhatsApp está na primeira dobra (dentro do hero)', () => {
  const $ = loadPage('index.html');
  const heroWhatsapp = $('.hero a[href*="wa.me/5587988737929"]');

  assert.equal(heroWhatsapp.length > 0, true);
});

test('Início exibe um badge de credencial/associação profissional em destaque', () => {
  const $ = loadPage('index.html');
  const badge = $('.credential-badge');

  assert.equal(badge.length > 0, true);
});

test('badge de credencial da Início traz nome do responsável técnico e CREA-PE', () => {
  const $ = loadPage('index.html');
  const badgeText = $('.credential-badge').text();

  assert.match(badgeText, /Hammed de Carvalho Gurgel/);
  assert.match(badgeText, /CREA-PE 182237953-9/);
});

test('Início tem seção "Por que nos escolher" com 3 diferenciais numerados (01/02/03)', () => {
  const $ = loadPage('index.html');
  const items = $('.why-us .why-item');

  assert.equal(items.length, 3, 'esperava 3 itens na seção de diferenciais');

  const numbers = items.map((_, el) => $(el).find('.why-number').text().trim()).get();
  assert.deepEqual(numbers, ['01', '02', '03']);

  items.each((_, el) => {
    const title = $(el).find('h2').text().trim();
    const description = $(el).find('p').text().trim();

    assert.equal(title.length > 0, true, 'cada item deve ter um título');
    assert.equal(description.length > 0, true, 'cada item deve ter uma descrição curta');
  });
});
