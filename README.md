# EXEMPLOS: Documentação de APIs REST (OpenAPI) em TLPP

![Licença](https://img.shields.io/badge/License-MIT-blue.svg)
![tlppCore](https://img.shields.io/badge/tlppCore-v01.04.02+-brightgreen.svg)
![AppServer](https://img.shields.io/badge/AppServer-v20.3.1.10+-orange.svg)

Esta é uma iniciativa open source, sob **Licença MIT**, e como tal, é disponibilizada **sem qualquer garantia, expressa ou implícita**, não havendo restrições sobre usar, copiar, modificar, fundir, publicar, distribuir, sublicenciar e/ou vender cópias de seu conteúdo.

O **tlppCore** possui uma ferramenta nativa para a geração automática da especificação OpenAPI (antigo formato Swagger) das rotas REST expostas no ambiente. Este motor de documentação é distribuído diretamente no RPO nativo (`tlpp.rpo`) juntamente com o AppServer da TOTVS, portanto, o motor em si é proprietário e não está sob a licença MIT deste repositório.

---

## ?? Índice
1. [O Poder dos Metadados no TLPP](#o-poder-dos-metadados-no-tlpp)
2. [Matriz de Estratégias (Abordagens)](#matriz-de-estrategias-abordagens)
3. [Recursos Avançados e Reutilização](#recursos-avancados-e-reutilizacao)
4. [Dicas](#dicas-e-pegadinhas-tips--gotchas)
5. [Como Executar e Gerar o Arquivo Final](#como-executar-e-gerar-o-arquivo-final)


---

## ?? O Poder dos Metadados no TLPP

A arquitetura de documentação do TLPP baseia-se fortemente na separação de responsabilidades utilizando **metadados** inseridos nas anotações (annotations) dos métodos HTTP (`@Get`, `@Post`, `@Put`, etc.).

É fundamental compreender a diferença entre os metadados **Imperativos** e os **Informativos**:
- **Imperativo (`endpoint=" /rota" `):** É funcional e dita as regras do servidor. Ele literalmente levanta e expõe a rota REST.
- **Informativos (`description`, `params`, `responses`, `title`):** São puramente descritivos e alimentam o motor gerador do OpenAPI. 

> **Importante:** A validação real de um parâmetro (ex: verificar se ele existe) deve continuar sendo feita na lógica do seu código (via `oRest:getQueryRequest()`), mesmo que o metadado informe `"required": true` na documentação.

---

## ??? Matriz de Estratégias (Abordagens)

O motor do tlppCore oferece quatro estratégias principais para a inserção de metadados. Abaixo está a explicação de cada uma, qual é o seu caso de uso ideal, e onde encontrar os exemplos no código:

| Estratégia | Como funciona e Para que serve | Onde encontrar o código |
|:---|:---|:---|
| **1. Tradicional (Direto)** | O JSON é injetado diretamente na annotation `@Get(..., description='{JSON}')`.<br><br>**Para que serve:** Apenas para documentações extremamente simples (ex: só o título ou uma linha de descrição), pois polui o arquivo de regras de negócio com strings gigantescas. | ?? [`/src/rest/01_traditional_annotation/sample_02_basic_by_annotation.tlpp`](./src/rest/01_traditional_annotation/sample_02_basic_by_annotation.tlpp) |
| **2. Via Dicionário (i18n)** | A annotation usa um ponteiro numérico (ex: `@Get(..., description="<1>")`) apontando para um ID em um arquivo `_i18n.tlpp`.<br><br>**Para que serve:** Ideal quando a tradução do idioma da documentação é um requisito rígido, mantendo a annotation do código limpa. | ?? [`/src/rest/02_dictionary_i18n/sample_03_basic_by_id.tlpp`](./src/rest/02_dictionary_i18n/sample_03_basic_by_id.tlpp)<br>?? [`/src/rest/02_dictionary_i18n/sample_03_basic_by_id-i18n.tlpp`](./src/rest/02_dictionary_i18n/sample_03_basic_by_id-i18n.tlpp) |
| **3. Função Dedicada (`_DOC`)** | A annotation aponta para uma função (ex: `description="[U_MinhaAPI_DOC]"`). O motor executa a função em tempo de compilação para resgatar o JSON formatado usando o comando `TOSTRING`.<br><br>**Para que serve:** **Altamente Recomendada.** É a abordagem mais escalável e limpa. Desacopla a documentação e permite construir retornos estruturados livremente, sem se preocupar com caracteres de escape ou formatação de múltiplas linhas na anotação. | ?? [`/src/rest/03_dedicated_function_doc/basic/sample_04_basic_by_function.tlpp`](./src/rest/03_dedicated_function_doc/basic/sample_04_basic_by_function.tlpp) |
| **4. Dinâmica (Sem Anotação)** | Mapeado programaticamente via objeto `tlpp.doc.List`, já que as rotas levantadas via código (classe `VdrCtrl`) não possuem annotations para ancorar a documentação.<br><br>**Para que serve:** Obrigatório para ambientes complexos e arquiteturas dinâmicas onde as rotas REST nascem da leitura de diretórios, bancos de dados ou configurações em tempo de execução. | ?? [`/src/rest/04_dynamic_mapping/dynamic_list_functions.tlpp`](./src/rest/04_dynamic_mapping/dynamic_list_functions.tlpp)<br>?? [`/src/rest/04_dynamic_mapping/dynamic_rest_services_DOC.tlpp`](./src/rest/04_dynamic_mapping/dynamic_rest_services_DOC.tlpp) |

---

## ?? Recursos Avançados e Reutilização

Ao optar por usar a abordagem da **Função Dedicada (`_DOC`)**, o tlppCore abre as portas para recursos avançados da especificação OpenAPI, demonstrados no nosso diretório ?? [`/src/rest/03_dedicated_function_doc/advanced/`](./src/rest/03_dedicated_function_doc/advanced/).

O motor permite:
* **Traduzir Textos Inline (i18n):** Você não precisa escolher entre Dicionário e Função. Você pode misturar ambos usando o prefixo `translate:<namespace>:<id>:<texto>` direto no JSON da Função `_DOC`.
* **Componentização Global:** Para evitar a repetição de código, você pode criar esquemas de Request/Response reutilizáveis (como erros padrões ou corpos de entrada) usando a propriedade `"type": "component", "component": "NomeDoComponente"`.
* **Múltiplos Content-Types:** Documentar retornos dinâmicos para a mesma requisição (ex: suportar tanto `application/json` quanto `application/xml` na resposta).

---

## ?? Dicas e Pegadinhas (Tips & Gotchas)

Se você optar por injetar a descrição da documentação via annotation tradicional e o seu texto for muito longo, o tlppCore permite quebrar em propriedades sequenciais (`description1`, `description2`, etc.).
Porém, **atenção máxima:** o motor lê essas quebras em uma sequência rígida. Se houver um salto numérico (por exemplo, pular do `description6` para o `description8`), **o motor interrompe silenciosamente a leitura** no primeiro número faltante, ignorando todo o texto posterior.
*(Consulte o exemplo detalhado em ?? [`/src/rest/03_dedicated_function_doc/basic/sample_05_basic_multiline.tlpp`](./src/rest/03_dedicated_function_doc/basic/sample_05_basic_multiline.tlpp))*

---

## ?? Como Executar e Gerar o Arquivo Final

A geração do arquivo final `.yaml` ou `.json` contendo toda a documentação da API é disparada programaticamente pela função nativa do motor.

No nosso exemplo, criamos um endpoint de "gatilho" para disparar a geração (?? [`/src/rest/generator/sample_06_generate_doc_endpoint.tlpp`](./src/rest/generator/sample_06_generate_doc_endpoint.tlpp)). A assinatura é:

```tlpp
tlpp.doc.generate( cFormato, cNomeArquivo, [aPorts], [aLocales], [cListFunc] )