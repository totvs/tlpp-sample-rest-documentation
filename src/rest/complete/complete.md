# Exemplo completo

O Exemplo completo tem o objetivo de centralizar todos os recursos disponíveis em um único local.

Primeiro vamos entender todos os arquivos e suas funções nesse exemplo, que contempla implementação de um serviço REST, sua documentação e a localizaçao das strings.

Vejamos então:

```
src/
├── components
│   └── sample_components.tlpp
└── rest
    └── complete
        ├── sample_complete.tlpp
        ├── sample_complete-i18n.tlpp
        ├── sample_complete_DOC.tlpp
        └── sample_complete_DOC-i18n.tlpp
```
<br/>
## Implementação do REST - sample_complete.tlpp

Por esse arquivo, nós temos a implementação do serviço REST que irá responder pelo endpoint [*/rest/sample/doc/complete/:param1*].

Esse serviço não faz nada de efetivo, apenas tem a implementação de tratamento dos parâmetros de entrada e respostas, dessa forma, conseguiremos entender o que será feito na documentação para representar o funcionamento do REST.

Nesse arquivo, iremos apontar para dois itens importantes:

- ***Localização de Strings***
  Toda a localização de strings (Tradução), faremos uso direto da função:
  **Localize()**

- ***Indicação onde está a documentação***
  Dentro da annotation @Put(), além do endpoint criado nós também informamos onde estão os dados da documentação para este serviço. Nesse exemplo, estamos utilizando a propriedade **description** em um de seus modos, na qual passamos o nome da função que irá retornar o JSON com dados da documentação, sendo:
  **description="[rest_sample_complete_DOC]"**
  
<br/>
## Localização do REST - sample_complete-i18n.tlpp

Aqui estarão todas as strings que foram localizadas no fonte principal através do Localize(), portanto todas as strings localizadas, ou seja, as strings com seus respectivos idiomas.

> Nota: mantivemos o mesmo nome do fonte principal apenas acrescentando ao final do nome "**-i18n**" antes da extensão.

Nesse exemplo, utilizamos somente 2:

- BRA - Portugues Brasil;

- USA - Inglês Americano.

<br/>
## Função indicada para o REST DOC - sample_complete_DOC.tlpp

Nesse fonte é onde temos a função que retornará o JSON com todas as definições das funcionalidades presentes no REST para que o motor de gerador de documentação gere o documento final.

Importante ressaltar que a estrutura do JSON apresentado nesse exemplo deve ser seguida, pois o motor entende com exatamente essa estrutura.

> Nota: mantivemos o mesmo nome do fonte principal apenas acrescentando ao final do nome "**_DOC**" antes da extensão.

Nesse arquivo, iremos apontar para dois itens importantes:

* ***Localização de Strings***
  Importante perceber que as strings utilizadas nesse exemplo, estão sendo localizadas através da instrução: 
  "*translate:Nome_FUNCAO:ID:STRING*", na qual o motor irá aplicar a mesma funcionalidade do Localize().

* ***Componentes***
Para as estruturas de entrada e saída pelo Body da mensagem HTTP nós iremos as descrever através dos componentes, informando em "Content-Type" como: 
  *"type" : "component",*
  *"component" : "nameComponent"*

<br/>
## Localização do DOC - sample_complete_DOC-i18n.tlpp

Aqui estarão todas as strings que foram localizadas no fonte de DOC através do "translate:", portanto todas as strings localizadas, ou seja, as strings com seus respectivos idiomas.

> Nota: mantivemos o mesmo nome do fonte principal apenas acrescentando ao final do nome "**-i18n**" antes da extensão.

Nesse exemplo, utilizamos somente 2:

* BRA - Portugues Brasil;

* USA - Inglês Americano.

<br/>
## Definição dos componentes - sample_components.tlpp

Todos os componentes citados na documentação, foram criados nesse arquivo seguindo a seguinte sintaxe:

TLPP COMPONENT <Nome_Componente> <Nome_Propriedade> <Tipo_Propriedade> <Exemplo>

> Obrigatório o uso da include:
> **#include "tlpp-doc.th"**
