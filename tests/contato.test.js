import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, assertDistinctMeta } from './dom.js';
import { site } from '../src/data/site.ts';

test('página Contato existe e tem HTML válido', () => {
  const $ = loadPage('contato/index.html');
  assert.equal($('html').attr('lang'), 'pt-BR');
});

test('Contato tem formulário Netlify Forms detectável estaticamente', () => {
  const $ = loadPage('contato/index.html');

  const visibleForm = $('form[name="contato"][data-netlify="true"]:not([hidden])');
  assert.equal(visibleForm.length, 1, 'esperava um formulário visível com data-netlify="true"');

  const hiddenForm = $('form[name="contato"][data-netlify="true"][hidden]');
  assert.equal(
    hiddenForm.length,
    1,
    'esperava o formulário oculto correspondente presente no HTML de build (padrão de detecção estática da Netlify)',
  );

  for (const form of [visibleForm, hiddenForm]) {
    assert.equal(form.find('input[name="nome"]').length, 1);
    assert.equal(form.find('input[name="telefone-ou-email"]').length, 1);
    assert.equal(form.find('textarea[name="mensagem"]').length, 1);
  }
});

test('Contato apresenta o CTA de WhatsApp como canal preferencial', () => {
  const $ = loadPage('contato/index.html');
  const whatsappLink = $(`a[href*="${site.whatsappUrl}"]`);

  assert.equal(whatsappLink.length > 0, true);
  assert.match($('body').text(), /prefer/i);
});

test('Contato tem title e meta description próprios, em pt-BR, distintos das outras páginas', () => {
  const $contato = loadPage('contato/index.html');
  const $index = loadPage('index.html');

  assertDistinctMeta($contato, $index, /Contato/i);
});
