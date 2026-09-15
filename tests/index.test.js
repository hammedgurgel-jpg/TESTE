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
