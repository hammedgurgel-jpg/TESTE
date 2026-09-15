import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPage } from './dom.js';

test('Nav tem um botão de toggle mobile com rótulo acessível', () => {
  const $ = loadPage('index.html');
  const toggle = $('.site-nav button.nav-toggle');

  assert.equal(toggle.length, 1);
  assert.equal((toggle.attr('aria-label') ?? '').trim().length > 0, true);
});

test('botão de toggle tem aria-expanded="false" e aria-controls apontando para o container do menu', () => {
  const $ = loadPage('index.html');
  const toggle = $('.site-nav button.nav-toggle');
  const controlsId = toggle.attr('aria-controls');

  assert.equal(toggle.attr('aria-expanded'), 'false');
  assert.equal(typeof controlsId, 'string');
  assert.equal($(`#${controlsId}`).length, 1);
});

test('lista de links do menu mobile contém os mesmos 4 links do menu desktop', () => {
  const $ = loadPage('index.html');
  const toggle = $('.site-nav button.nav-toggle');
  const menu = $(`#${toggle.attr('aria-controls')}`);

  const expectedLinks = [
    { text: 'Início', href: '/' },
    { text: 'Sobre', href: '/sobre' },
    { text: 'Serviços', href: '/servicos' },
    { text: 'Contato', href: '/contato' },
  ];

  for (const { text, href } of expectedLinks) {
    const link = menu.find('a').filter((_, el) => $(el).text().trim() === text);
    assert.equal(link.length, 1, `esperava um link "${text}" no menu mobile`);
    assert.equal(link.attr('href'), href);
  }
});
