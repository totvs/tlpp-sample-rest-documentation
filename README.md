
# 📚 TLPP REST API: Documentação OpenAPI

![Licença](https://img.shields.io/badge/License-MIT-blue.svg)
![tlppCore](https://img.shields.io/badge/tlppCore-v01.04.02+-brightgreen.svg)
![AppServer](https://img.shields.io/badge/AppServer-v20.3.1.10+-orange.svg)
![Status](https://img.shields.io/badge/Doc_Features-BETA-yellow.svg)

Um guia prático e direto com código pronto para você documentar suas APIs REST no tlppCore utilizando a especificação OpenAPI (Swagger). 

> **⚠️ AVISO SOBRE A FASE BETA:** Embora o motor do TLPP REST seja altamente maduro e amplamente validado em produção, os recursos específicos de documentação abordados neste repositório (como a leitura de metadados nas anotações e a integração com dicionários `i18n`) ainda estão em **fase Beta** no tlppCore.

---

## 🚀 Início Rápido (Gerando a Documentação)

Para extrair o `.yaml` ou `.json` com a documentação da sua API, é necessário chamar a função nativa do motor TLPP. Deixamos um endpoint "gatilho" pronto para isso na pasta `/generator/`.

Basta fazer uma requisição `GET` para a rota:
```http
GET /rest/sample/doc/generate
```

> **⚠️ O Gatilho do Swagger:** A função interna `tlpp.doc.generate()` exige, por retrocompatibilidade, que o primeiro parâmetro seja a string `'swagger'`, mesmo gerando o formato OpenAPI atual.

---

## 📁 Explorando os Exemplos

Este projeto está estruturado exatamente pelas 4 abordagens oficiais suportadas pelo TLPP. Escolha a que melhor se adapta à complexidade da sua API:

| Abordagem | Caso de Uso Ideal | Onde encontrar? |
| :--- | :--- | :--- |
| **1. Tradicional** | Documentações simples (1 ou 2 linhas). O JSON é injetado diretamente na anotação `@Get`. | 📁 [`01_traditional_annotation`](./src/rest/01_traditional_annotation/) |
| **2. Dicionário (i18n)** | Documentação multilíngue (ex: PT-BR, EN-US). A anotação aponta para um arquivo de tradução. | 📁 [`02_dictionary_i18n`](./src/rest/02_dictionary_i18n/) |
| **3. Função Dedicada (`_DOC`)** | **🌟 Altamente Recomendada.** Para APIs reais. Isola a documentação em uma função limpa, permitindo reaproveitar schemas. | 📁 [`03_dedicated_function_doc`](./src/rest/03_dedicated_function_doc/) |
| **4. Rotas Dinâmicas** | Rotas criadas programaticamente (`VdrCtrl`), que não possuem anotações `@Get` para ancorar os metadados. | 📁 [`04_dynamic_mapping`](./src/rest/04_dynamic_mapping/) |

---

## 💡 2 Dicas de Ouro (Evite dores de cabeça)

**1. Evite Strings, use `JsonObject():New()`**
Na abordagem de "Função Dedicada", não tente concatenar strings para formar a documentação. Construa seus metadados montando um objeto JSON nativo e retorne com `:toJson()`. Isso garante que sua documentação nunca vai quebrar por falta de uma vírgula. *(Consulte o exemplo avançado em [`03_dedicated_function_doc/advanced/complete_api_DOC.tlpp`](./src/rest/03_dedicated_function_doc/advanced/complete_api_DOC.tlpp))*

**2. A pegadinha das quebras de linha**
Se você optar por quebrar descrições grandes na anotação HTTP usando `description1`, `description2`, etc., **não salte números**. Se você pular do `description3` para o `description5`, o motor do TLPP interrompe a leitura silenciosamente no número 4 e descarta o resto.
