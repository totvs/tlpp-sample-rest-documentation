# tlpp-sample-rest-documentation

Exemplos TLPP de **Doc Generate** — metadados REST, quatro abordagens de documentação, rotas dinâmicas e geração OpenAPI com `tlpp.doc.generate()`.

Cada arquivo `.tlpp` em `src/` ilustra um padrão de metadados ou um trecho do fluxo de exportação.

## Estrutura `src/`

| Pasta | Conteúdo |
|-------|----------|
| `rest/01_traditional_annotation/` | Metadados via annotation tradicional |
| `rest/02_dictionary_i18n/` | Dicionário i18n para descrições |
| `rest/03_dedicated_function_doc/` | Função DOC dedicada (básico e avançado) |
| `rest/04_dynamic_mapping/` | Rotas dinâmicas com `tlpp.doc.List()` |
| `rest/generator/` | Orquestração e `tlpp.doc.generate()` |
| `rest/00_metadados_snippets/` | Fragmentos de annotation de referência |
| `components/` | `TLPP COMPONENT` de exemplo |

O snapshot OpenAPI gerado fica em `output/api_doc_8080.yaml`.

Exemplos gerais de REST (oREST, verbos HTTP, callbacks) ficam em [tlpp-sample-rest](https://github.com/totvs/tlpp-sample-rest).

## Documentação

Conceitos, trilha de leitura e mapa dos exemplos:

**https://totvs.github.io/totvstec-doc/docs/tlpp/rest/doc-generate/**

Metadados REST: **https://totvs.github.io/totvstec-doc/docs/tlpp/rest/metadados/**
