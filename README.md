# tlpp-sample-rest-documentation

Repositório **Doc Generate**: código TLPP de metadados/OpenAPI, documentação MDX e snapshot YAML.

| Pasta | Conteúdo |
|-------|----------|
| `src/rest/` | 4 abordagens de metadados, rotas dinâmicas, gerador OpenAPI |
| `src/rest/00_metadados_snippets/` | Fragmentos de annotation do TDN |
| `src/main.tlpp` | Orquestrador `U_sampleDOC()` + `tlpp.doc.generate()` |
| `src/components/` | `TLPP COMPONENT` de exemplo |
| `docs/doc-generate/` | MDX da seção Doc Generate (hub) |
| `docs/metadados/` | MDX de metadados REST (hub) |
| `output/` | `api_doc_8080.yaml` gerado |

O [totvstec-doc](https://github.com/totvs/totvstec-doc) sincroniza `docs/` e `output/` no build.

Exemplos gerais REST (oREST, verbos HTTP, TDN) ficam em [tlpp-sample-rest](https://github.com/totvs/tlpp-sample-rest).

## Compilar

Use `rest.lst` na raiz do projeto TLPP.
