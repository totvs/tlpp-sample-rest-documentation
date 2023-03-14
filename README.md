# EXEMPLOS de Documentação de APIs REST em TLPP

> [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br>Esta é uma iniciativa open source, sob **Licença MIT**, e como tal, é disponibilizada **sem qualquer garantia, expressa ou implícita**, não havendo restrições sobre usar, copiar, modificar, fundir, publicar, distribuir, sublicenciar e/ou vender cópias de seu conteúdo.

#### Informações importantes

O tlppCore contém uma ferramenta nativa para a geração de documentação das APIs presentes no ambiente. Esse motor será distribuído através do tlpp.rpo juntamente com o appserver e esta ferramenta não estará sob a licença MIT.

> ***Nota 1*** O projeto contindo nesse repositório não é a implementação do motor de geração da documentação do tlppCore mencionada acima. O motor é de propriedade da TOTVS S/A.

> ***Nota 2*** Os fontes aqui presentes são apenas exemplos de como utilizar os recursos disponíveis para a geração dos documentos.

> ***Nota 3*** O motor de geração de documentação do tlppCore ainda está em sua **Versão Beta** e portanto os comportamentos podem mudar assim que seu desenvolvimento evolua.



## Exemplos

Aqui apresentaremos diversos fontes com exemplos de como criar suas documentações e portanto teremos somente os exemplos nesse projeto, portanto é essencial que leiam a documentação oficial do motor no TDN acessando o link abaixo:

> [TDN: Gerador de documentação](https://tdn.totvs.com/pages/viewpage.action?pageId=745121740)



Abaixo segue a lista com exemplos:

###### Básicos

- Somente descrição:
  \src\rest\basic\sample_01_basic.tlpp
<br/>
- Documentando utilizando annotation:
  \src\rest\basic\sample_02_basic.tlpp
<br/>
- Documentando diretamente no i18n:
  \src\rest\basic\sample_03_basic_by_id.tlpp
<br/>
- Documentando através de função:
  \src\rest\basic\sample_04_basic_by_function.tlpp
<br/>
- Descrição multi-linha:
  \src\rest\basic\sample_05_basic_multiline.tlpp

###### Completo (Documento + i18n)

Resumo do exemplo completo -> [complete.md](src\rest\complete\complete.md)

- *REST:*
  \src\rest\complete\sample_complete.tlpp
  \src\rest\complete\sample_complete-i18n.tlpp
<br/>
- *DOC:*
  \src\rest\complete\sample_complete_DOC.tlpp
  \src\rest\complete\sample_complete_DOC-i18n.tlpp
<br/>
- *Component:*
  \src\components\sample_components.tlpp
