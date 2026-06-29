<div align="center">
  <img alt="tlpp logo" src="images/tlpp_logo.jpg" width="250px" />
  <h1>EXEMPLOS: Documentação de APIs REST (OpenAPI) em TLPP</h1>
</div>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <img alt="tlppCore" src="https://img.shields.io/badge/tlppCore-01.04.02+-blue" />
  <img alt="AppServer" src="https://img.shields.io/badge/AppServer-20.3.1.10+-blue" />
</p>

> Esta é uma iniciativa open source, sob **Licença MIT**, e como tal, é disponibilizada **sem qualquer garantia, expressa ou implícita**, não havendo restrições sobre usar, copiar, modificar, fundir, publicar, distribuir, sublicenciar e/ou vender cópias de seu conteúdo.

---

##  Informações Importantes e Pré-requisitos

O **tlppCore** possui uma ferramenta nativa para a geração automática da especificação OpenAPI (antigo formato Swagger) das rotas REST expostas no ambiente. Este motor de documentação é distribuído diretamente no RPO nativo (`tlpp.rpo`) juntamente com o AppServer da TOTVS, portanto, **o motor em si é proprietário (TOTVS S/A)** e não está sob a licença MIT deste repositório.

* **Versão Mínima do Ambiente:** `tlppCore 01.04.02` + `AppServer 20.3.1.10`.

Os códigos contidos neste repositório servem como um **guia de referência prático** com exemplos detalhados de como utilizar os recursos e as anotações do ecossistema TLPP para documentar seus serviços de forma eficiente.

>  **DISCLAIMER:** O módulo REST-DOC é um recurso em constante evolução. O produto recebe frequentes ajustes e melhorias pelo time de engenharia da TOTVS. Sinta-se à vontade para abrir *Issues* neste repositório para reportar dúvidas ou sugestões de melhoria nos exemplos!

---

##  Matriz de Estratégias de Metadados

O motor do tlppCore oferece flexibilidade para a inserção de metadados informativos da API. Abaixo está o comparativo das abordagens exemplificadas no projeto:

| Estratégia | Localização do JSON | Impacto no Código Principal | Recomendação |
| :--- | :--- | :--- | :--- |
| **1. Tradicional (Direto)** | Injetado na annotation `@Get`/`@Post` | **Alto:** Polui o arquivo de regras de negócio com strings JSON gigantescas. | Apenas para documentações extremamente simples (ex: só descrição). |
| **2. Via Dicionário (i18n)** | Isolado em arquivos `_i18n.tlpp` por ID | **Baixo:** Mantém a annotation limpa, mas pode duplicar chaves estruturais. | Ideal quando o reaproveitamento não é crítico, mas a tradução de idiomas é obrigatória. |
| **3. Função Dedicada (`_DOC`)** | Centralizado em uma função externa | **Mínimo:** A annotation apenas aponta para o nome da função. Código limpo e desacoplado. |  **Altamente Recomendada.** Abordagem mais escalável e legível para projetos médios/grandes. |
| **4. Dinâmica (Sem Anotação)** | Mapeado programaticamente via objeto | **Nenhum:** Utilizado para serviços levantados via código (`VdrCtrl`), sem annotations. | Obrigatório para APIs estruturadas dinamicamente por leitura de arquivos JSON. |

---

##  Arquitetura e Fluxo de Metadados

Para entender como a documentação é amarrada, separamos o fluxo de trabalho em dois cenários principais: APIs com anotações fixas e APIs com rotas dinâmicas.

###  1. Endpoints Fixos (via Annotation)

As anotações (ex: `@Get`, `@Post`) localizadas no topo das funções REST são a porta de entrada para os metadados. Elas ditam como o motor irá ler as informações:

* ? **Tradicional (Direto):** `@Get(..., description='{JSON_Completo}')`
  * **O Fluxo:** `Annotation` ? `Motor OpenAPI`
  * *Ponto fraco:* O texto massivo do JSON reside dentro da anotação, poluindo o escopo de desenvolvimento.

*  **Via Arquivo de Tradução:** `@Get(..., description='<1>')`
  * **O Fluxo:** `Annotation` ? `Arquivo de Tradução (_i18n.tlpp)` ? `Motor OpenAPI`
  * *Onde vive o JSON:* O ID `<1>` informa ao motor que a estrutura JSON deve ser buscada e traduzida dentro do arquivo de idiomas.

*  **Via Função Dedicada (Recomendado):** `@Get(..., description='[NomeDaFuncao]')`
  * **O Fluxo:** `Annotation` ? `Função _DOC Isolada` ? `Motor OpenAPI`
  * *Por que é o melhor?* A anotação apenas aciona um ponteiro `[]`. O JSON fica blindado e estruturado dentro de uma função exclusiva (geralmente terminada em `_DOC`), permitindo código limpo e validação isolada.

###  2. Endpoints Dinâmicos (Sem Annotation)

Rotas levantadas via código (`VdrCtrl` / `loadUrns`) **não possuem** anotações `@Get`/`@Post` para ancorar a documentação. Neste caso, o tlppCore utiliza um fluxo programático:

1. **A Função `_DOC`:** Você cria a mesma *Função Dedicada* descrita acima contendo o JSON estruturado do seu serviço dinâmico.
2. **A Função Mapeadora:** Você cria uma função que retorna uma lista (`tlpp.doc.List`) cujo único objetivo é dizer ao motor: *"A Rota Dinâmica X está documentada na Função Y"*.
3. **O Fluxo Final:** `Rota Dinâmica` ? `Função Mapeadora` ? `Função _DOC Isolada` ? `Motor OpenAPI`

>  **O Motor Central:** Independentemente do caminho escolhido, todos os fluxos desembocam na execução da função `tlpp.doc.generate()`, responsável por ler essa malha de vínculos, compilar os dados e gerar o arquivo `.yaml` ou `.json` final.

---

##  Guia e Estrutura do Código Fonte

O projeto está organizado em módulos progressivos para facilitar o aprendizado da arquitetura de documentação:

### 1. Exemplos Básicos (`/src/rest/basic/`)

Demonstração das mecânicas fundamentais e regras de sintaxe do motor:

* **Somente descrição:** `\src\rest\basic\sample_01_basic.tlpp`
  Explica a diferença entre metadados *imperativos/funcionais* (`endpoint`) e *informativos* (`description`).
* **Metadados na annotation:** `\src\rest\basic\sample_02_basic.tlpp`
  Introduz propriedades estendidas na anotação (`title`, `params`, `responses`).
* **Documentando via i18n:** `\src\rest\basic\sample_03_basic_by_id.tlpp`
  Armazena as chaves de documentação OpenAPI dentro do ecossistema de internacionalização.
* **Documentando via função:** `\src\rest\basic\sample_04_basic_by_function.tlpp`
  Aplica a boa prática de apontar o metadado para uma função dedicada usando o comando `TOSTRING`.
* **Descrição multi-linha:** `\src\rest\basic\sample_05_basic_multiline.tlpp`
  Explica as regras rígidas do processador do tlppCore para descrições longas.

### 2. Exemplo Completo e Reutilização (`/src/rest/complete/`)

Cenário real simulando um ambiente produtivo com todas as features combinadas:

* **Lógica REST:** `\src\rest\complete\sample_complete.tlpp`
* **Mensagens e Erros (i18n):** `\src\rest\complete\sample_complete-i18n.tlpp`
* **Metadados Estruturados (DOC):** `\src\rest\complete\sample_complete_DOC.tlpp`
* **Textos OpenAPI (i18n):** `\src\rest\complete\sample_complete_DOC-i18n.tlpp`
* **Componentes Globais:** `\src\components\sample_components.tlpp` (Cria esquemas de dados reutilizáveis como *Body In/Out*).

### 3. Endpoints Dinâmicos (`/src/rest/dynamic endpoints/`)

Estratégia avançada para rotas que nascem programaticamente via código através da classe `VdrCtrl`:

* **Start do Servidor e URNs:** `dynamic_rest_start.tlpp`
* **Lógica dos Serviços:** `dynamic_rest_services.tlpp`
* **Metadados Dinâmicos (DOC):** `dynamic_rest_services_DOC.tlpp`
* **Mapeador de Rotas (DOC List):** `dynamic_list_functions.tlpp` (Adiciona os mapeamentos através do método `oDoc:add()`).

---

##  Como Executar e Gerar o Arquivo Final

A geração do arquivo de documentação é disparada programaticamente no ecossistema através do arquivo centralizador **`\src\main.tlpp`**.

Ao executar a função contida no arquivo principal, o motor varrerá o RPO compilado em busca das anotações e dos mapeamentos dinâmicos registrados.

### Assinatura Completa do Gerador

A função nativa `tlpp.doc.generate()` aceita até 5 parâmetros para refinar o arquivo exportado:

```tlpp
tlpp.doc.generate( cFormato, cNomeArquivo, [aPorts], [aLocales], [cListFunc] )
