import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPage } from './dom.js';

test('página inicial existe e tem HTML válido', () => {
  const $ = loadPage('index.html');
  assert.equal($('html').attr('lang'), 'pt-BR');
});

test('nav contém os 4 links esperados', () => {
  const $ = loadPage('index.html');
  const expectedLinks = [
    { text: 'Início', href: '/' },
    { text: 'Sobre', href: '/sobre' },
    { text: 'Serviços', href: '/servicos' },
    { text: 'Contato', href: '/contato' },
  ];

  for (const { text, href } of expectedLinks) {
    const link = $('nav a').filter((_, el) => $(el).text().trim() === text);
    assert.equal(link.length, 1, `esperava um link "${text}" no nav`);
    assert.equal(link.attr('href'), href);
  }
});

test('footer contém o link do WhatsApp e a área de atuação', () => {
  const $ = loadPage('index.html');
  const footerText = $('footer').text();
  const whatsappHref = $('footer a[href*="wa.me/5587988737929"]');

  assert.equal(whatsappHref.length > 0, true);
  assert.match(footerText, /Petrolina, Juazeiro e região/);
});

test('página tem title e meta description não vazios', () => {
  const $ = loadPage('index.html');
  assert.equal($('title').text().trim().length > 0, true);
  assert.equal(
    ($('meta[name="description"]').attr('content') ?? '').trim().length > 0,
    true,
  );
});
