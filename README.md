# totvs/tlpp-sample-rest-documentation

Metadados REST, doc-generate, rotas dinâmicas e snapshot OpenAPI (`tlpp.doc.generate()`).

**Exemplos TDN (oREST, verbos, callbacks)** ficam em [totvs/tlpp-sample-rest](https://github.com/totvs/tlpp-sample-rest).

## Estrutura `src/rest/`

| Pasta | Conteúdo |
|-------|----------|
| `01_traditional_annotation/` | `@Rest` + `description` |
| `02_dictionary_i18n/` | `description="<id>"` + i18n |
| `03_dedicated_function_doc/` | Função `_DOC` + JSON |
| `04_dynamic_mapping/` | Rotas dinâmicas + `tlpp.doc.List()` |
| `generator/` | Endpoint que gera OpenAPI |

Documentação MDX em `docs/metadados/` e `docs/doc-generate/` — sincronizada no hub via `npm run sync:deps`.

## Repositórios relacionados

| Repo | Papel |
|------|-------|
| [totvs/tlpp-sample-rest](https://github.com/totvs/tlpp-sample-rest) | Exemplos TLPP REST (TDN) |
| [totvs/totvstec-doc](https://github.com/totvs/totvstec-doc) | Site de documentação |
