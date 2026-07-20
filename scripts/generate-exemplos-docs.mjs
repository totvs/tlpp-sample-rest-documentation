#!/usr/bin/env node
/**
 * Gera docs/exemplos/*.mdx a partir da árvore src/
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'docs/exemplos');

const REPO_ID = 'doc-generate';
const DOCS_BASE = '/docs/tlpp/rest/exemplos-doc-generate';

const CATEGORY_LABELS = {
  '': 'Orquestração',
  'rest/00_metadados_snippets': 'Snippets de metadados',
  'rest/01_traditional_annotation': 'Annotation tradicional',
  'rest/02_dictionary_i18n': 'Dicionário i18n',
  'rest/03_dedicated_function_doc/basic': 'Função DOC · básico',
  'rest/03_dedicated_function_doc/advanced': 'Função DOC · avançado',
  'rest/04_dynamic_mapping': 'Rotas dinâmicas',
  'rest/generator': 'Gerador OpenAPI',
  components: 'TLPP Component',
};

const CATEGORY_ORDER = [
  '',
  'rest/00_metadados_snippets',
  'rest/01_traditional_annotation',
  'rest/02_dictionary_i18n',
  'rest/03_dedicated_function_doc/basic',
  'rest/03_dedicated_function_doc/advanced',
  'rest/04_dynamic_mapping',
  'rest/generator',
  'components',
];

function slug(category) {
  return category ? category.replace(/\//g, '-') : 'orquestracao';
}

function walkTlpp(dir, base = '') {
  const entries = [];
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const rel = base ? `${base}/${ent.name}` : ent.name;
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      entries.push(...walkTlpp(abs, rel));
    } else if (ent.name.endsWith('.tlpp')) {
      const category = base.replace(/\\/g, '/');
      entries.push({category, file: ent.name});
    }
  }
  return entries;
}

function pageMdx(category, files, position) {
  const label = CATEGORY_LABELS[category] ?? category;
  const rows = files
    .sort((a, b) => a.file.localeCompare(b.file))
    .map((f) => {
      const pathAttr = category ? ` path="${category}"` : '';
      return `| \`${f.file}\` | <ExemploRef repo="${REPO_ID}" file="${f.file}"${pathAttr} /> |`;
    })
    .join('\n');

  return `---
title: "${label}"
sidebar_label: "${label}"
sidebar_position: ${position}
displayed_sidebar: restSidebar
---

import ExemploRef from '@site/src/components/ExemploRef';
import RepoLink from '@site/src/components/RepoLink';

# ${label}

Exemplos TLPP em <RepoLink id="${REPO_ID}" /> (\`${category ? `src/${category}/` : 'src/'}\`).

| Arquivo | Repositório |
|---------|-------------|
${rows}
`;
}

function main() {
  const manifest = walkTlpp(SRC);
  const byCategory = new Map();
  for (const entry of manifest) {
    if (!byCategory.has(entry.category)) byCategory.set(entry.category, []);
    byCategory.get(entry.category).push(entry);
  }

  fs.rmSync(OUT, {recursive: true, force: true});
  fs.mkdirSync(OUT, {recursive: true});

  const categories = [
    ...CATEGORY_ORDER.filter((c) => byCategory.has(c)),
    ...[...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
  ];

  let pos = 2;
  for (const cat of categories) {
    fs.writeFileSync(
      path.join(OUT, `${slug(cat)}.mdx`),
      pageMdx(cat, byCategory.get(cat), pos++),
      'utf8',
    );
  }

  const indexLinks = categories
    .map((cat) => {
      const label = CATEGORY_LABELS[cat] ?? cat;
      return `- [${label}](${DOCS_BASE}/${slug(cat)})`;
    })
    .join('\n');

  fs.writeFileSync(
    path.join(OUT, 'index.mdx'),
    `---
title: Exemplos do repositório
sidebar_label: Visão geral
sidebar_position: 1
displayed_sidebar: restSidebar
---

import RepoLink from '@site/src/components/RepoLink';

# Exemplos TLPP (Doc Generate)

Código-fonte em <RepoLink id="${REPO_ID}" />, organizado por abordagem em \`src/rest/\`.

Use esta seção **depois** da trilha conceitual do menu DOC GENERATE — cada página lista arquivos \`.tlpp\` com link para o GitHub.

## Categorias

${indexLinks}

## Como usar os exemplos

1. Leia a página conceitual correspondente (ex.: [Description](/docs/tlpp/rest/metadados/description)).
2. Abra o arquivo \`.tlpp\` no repositório pelo link da tabela.
3. Compile no RPO e execute \`tlpp.doc.generate()\` conforme [Doc Generate](/docs/tlpp/rest/doc-generate).
`,
    'utf8',
  );

  console.log(
    `generate-exemplos-docs: ${categories.length + 1} páginas, ${manifest.length} arquivos .tlpp`,
  );
}

main();
