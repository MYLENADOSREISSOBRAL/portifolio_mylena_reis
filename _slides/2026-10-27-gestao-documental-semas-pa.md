---
titulo:
  pt: "Gestão documental e do conhecimento na DTI"
  en: "Document and knowledge management at the IT Directorate"
evento: "SEMAS-PA — Diretoria de Tecnologia da Informação"
date: 2026-10-27
local: "Belém, PA"
# QR code na capa com o endereço da apresentação no GitHub Pages
qr_publicado: true
logos:
  - src: /assets/images/slides/logo_semas_pa.svg
    alt: "Logomarca da Secretaria de Estado de Meio Ambiente, Clima e Sustentabilidade – Governo do Estado do Pará"
    altura: 3.6em
  - src: /assets/images/slides/brasao_ufpa.svg
    alt: "Brasão da Universidade Federal do Pará"
    altura: 5.5em
---
{%- assign img = '/assets/images/slides/gestao-documental/' | relative_url -%}
{%- assign anexos_onboard = '/assets/apresentacoes/2026-10-16-onboard-semas-pa/' | relative_url -%}

## Roteiro

1. Contexto: o problema e o objetivo
2. Por que padronizar: normas, MPS.BR e a posição da SEMAS na escala
3. O padrão: estrutura, ciclo da demanda, nomenclatura, regras e busca
4. Governança: papéis, implantação, indicadores e cuidados
5. Encaminhamento

Guia de orientação para **gestores e usuários** do Google Drive corporativo da DTI.

<!-- slide -->

## O ponto de partida

Hoje, encontrar um documento depende de quem sabe onde ele está.
{: .destaque}

![Antes: documentos soltos, inclinados e duplicados. Depois: três pastas organizadas e conferidas]({{ img }}antes-depois.svg)

**Dispersão** (arquivos duplicados e em versões divergentes) · **falta de contexto** (nomes que não dizem a que sistema pertencem) · **dependência de pessoas** (o conhecimento sai com quem sai).

<!-- slide -->

## Objetivo: conhecimento encontrável

Mais do que criar pastas, a meta é uma forma compartilhada de organizar e recuperar informação.

| Resultado | O que significa |
|---|---|
| **Localização previsível** | Pessoas diferentes chegam ao mesmo documento pelo mesmo caminho |
| **Contexto compreensível** | O arquivo informa a que sistema, demanda e etapa pertence |
| **Reutilização** | Soluções e documentos existentes apoiam novas demandas |
| **Rastreabilidade** | Versões, responsáveis, datas e vínculos entre artefatos ficam claros |
| **Continuidade** | O conhecimento permanece quando pessoas e prioridades mudam |

<!-- slide -->

## No serviço público, organizar é dever

| Norma | O que estabelece | O que muda no dia a dia |
|---|---|---|
| **Lei nº 8.159/1991** (Política Nacional de Arquivos) | Dever do poder público de fazer a gestão documental e proteger os documentos | Documento institucional tem lugar, responsável e destino definidos |
| **Lei nº 12.527/2011** (LAI) | Acesso à informação pública com gestão transparente | Precisamos localizar e entregar a informação quando solicitada |
| **Lei nº 13.709/2018** (LGPD) | Tratamento de dados pessoais com segurança e finalidade | Permissões de acesso definidas; dados pessoais fora de pastas abertas |
| **e-ARQ Brasil** (Res. CONARQ nº 50/2022) | Requisitos para documentos digitais: classificação, metadados e temporalidade | Classificar, nomear e registrar responsável, data e versão |

<!-- slide -->

## O MPS.BR: qualidade comprovada por evidências

- O **MPS.BR** (Melhoria de Processo do Software Brasileiro) é um programa coordenado pela **Softex** que avalia a maturidade dos processos de uma organização.
- A maturidade é medida em **7 níveis, de G a A**, sequenciais e cumulativos; cada nível exige resultados **comprovados por evidências** em avaliação oficial.
- Três modelos de referência:

| Modelo | Foco |
|---|---|
| MPS.BR Software | Desenvolvimento, manutenção e evolução de software |
| **MPS.BR Serviços** | Gestão, entrega e melhoria contínua de serviços de TI: **modelo em que a SEMAS foi avaliada** |
| MPS.BR Gestão de Pessoas | Gestão de pessoas e desenvolvimento de competências |

<!-- slide -->

## Onde a SEMAS está na escala MPS.BR

![Escala de G a A: G e F alcançados; a SEMAS está no nível F, Gerenciado, do MPS.BR Serviços desde janeiro de 2026; o nível E é o próximo degrau]({{ img }}escada-mps.svg)

**Nível F — Gerenciado:** processos formalmente planejados, acompanhados e comprovados por evidências. **Manter:** a certificação é renovada periodicamente. **Avançar:** no nível E, os processos passam a ser padronizados para toda a organização.

<!-- slide -->

## Sem documento organizado, não há evidência

![Processo executado, documento no lugar certo, evidência localizável e nível mantido na avaliação do MPS.BR]({{ img }}evidencia.svg)

A organização do Drive transforma o trabalho diário da DTI em evidência: é o que sustenta o Nível F e prepara o próximo degrau.
{: .destaque}

<!-- slide -->

## Cada prática pede evidências, e elas têm endereço

| Prática do MPS.BR | Evidência esperada | Onde fica no nosso Drive |
|---|---|---|
| Gerência de projetos e serviços | Planos, cronogramas, atas e acompanhamento | PAE › Gerência do projeto · Comunicação |
| Requisitos | Requisitos aprovados, rastreáveis e com mudanças registradas | PAE › Lista de Requisitos · Sistema › Requisitos e HU |
| Gerência de configuração | Itens identificados, versões controladas e linhas de base | Nomenclatura com versão · Documentação do Sistema |
| Verificação e validação | Planos e evidências de teste, aceite do cliente | PAE › Teste · Homologação · checklist |
| Garantia da qualidade | Aderência de produtos e processos ao padrão | checklist de entrega · revisão periódica das pastas |

<!-- slide -->

## A estrutura padrão do Drive da DTI

![Sistemas › Documentação do Sistema com cinco subpastas; Demandas Projetos com uma pasta PAE por demanda e dez subpastas; pastas de acesso rápido e de não classificados]({{ img }}estrutura-drive.svg)

Estrutura validada pela Qualidade de TI e pela Diretoria em 16/04/2026, com piloto no Sistema Central de Postagens: [ver o e-mail de validação]({{ anexos_onboard }}anexo1.png){:target="_blank" rel="noopener noreferrer"}.

<!-- slide -->

## Uma demanda, do início ao fim, em um só lugar

![Oito etapas da pasta PAE: Formalização, Requisitos, Gerência, Protótipo, Teste, Homologação, Implantação e checklist; Comunicação e Material de Apoio acompanham todo o ciclo]({{ img }}ciclo-demanda.svg)

<!-- slide -->

## Anatomia de um nome de arquivo

![O nome API_SistemaX_IntegracaoY_2026_v1 dividido em tipo, sistema, assunto, ano e versão]({{ img }}nomenclatura.svg)

- **Diga o que é, de onde e de quando**: tipo, sistema ou serviço, assunto e ano.
- **Versione no nome** (v1, v2…) e **use termos padronizados** em todo o Drive.
- **Preserve o que é oficial**: não renomeie documentos formais nem seus identificadores.

<!-- slide -->

## As quatro regras de ouro

1. **Rigor com projetos (PAE)**: toda demanda nasce em Demandas Projetos, no padrão PAE, com todas as subpastas alimentadas.
2. **Documentação viva**: mudou o sistema em produção? Atualize requisitos, HU e arquitetura na Documentação do Sistema.
3. **Atalhos, não cópias**: para acesso rápido, crie um atalho em 00_ACESSO_RAPIDO. Cópias geram versões divergentes.
4. **Zere os não classificados**: NAO_CLASSIFICADOS é temporária. Encontrou algo lá? Mova para o destino correto.
{: .passos}

<!-- slide -->

## Três caminhos para encontrar qualquer documento

| Mecanismo | Como funciona | Benefício |
|---|---|---|
| **Hierarquia de pastas** | Caminho previsível por sistema, demanda e categoria | Ajuda quem navega e conhece o contexto |
| **Índice com links** | Planilha com título, sistema, categoria, ano, status, responsável e link | Filtra sem precisar conhecer a árvore |
| **Nomenclatura consistente** | Nome claro, termos padronizados, data e versão quando couber | Melhora a busca e evita ambiguidade |

<!-- slide -->

## Cada um tem um papel na organização

| Gestores | Usuários | Curadoria (DTI) |
|---|---|---|
| Patrocinar o padrão e acompanhar sua adoção | Salvar cada arquivo no lugar previsto | Manter o guia e o índice atualizados |
| Definir responsáveis por sistema e por pasta | Nomear e versionar conforme o padrão | Revisar as pastas periodicamente |
| Aprovar permissões e critérios de arquivamento | Usar atalhos, nunca cópias; esvaziar NAO_CLASSIFICADOS | Acolher dúvidas e propor ajustes |

<!-- slide -->

## Implantação gradual, em cinco etapas

1. **Inventariar**: levantar pastas, arquivos, duplicatas e responsáveis, sem mover tudo de imediato.
2. **Escolher um piloto**: um sistema ou serviço representativo, com usuários de perfis diferentes.
3. **Validar o padrão**: categorias, regras de nome, campos do índice e critérios para arquivos antigos e duplicados.
4. **Organizar e testar**: aplicar no piloto e pedir que usuários encontrem documentos com tarefas reais.
5. **Ajustar e expandir**: corrigir o que falhou, documentar responsáveis e ampliar por etapas.
{: .passos}

<!-- slide -->

## Como saberemos que funciona

| Indicador | Como observar | Pergunta de avaliação |
|---|---|---|
| Tempo de localização | Da tarefa recebida até abrir o documento correto | Encontramos mais rápido? |
| Taxa de sucesso | % de tarefas concluídas sem ajuda | A informação foi encontrada? |
| Erros de classificação | Arquivos em categorias inadequadas ou confundidos | O padrão é compreensível? |
| Reutilização | Uso de documentos existentes, versões e responsáveis claros | O conhecimento segue útil e confiável? |
| Autonomia | Diferença entre usuários iniciantes e experientes | Funciona para todos os perfis? |

Medimos antes e depois no piloto, com tarefas equivalentes.

<!-- slide -->

## Cuidados durante a migração

- **Preservar** documentos oficiais e os identificadores exigidos pela instituição.
- **Evitar cópias paralelas**: preferir links quando um documento serve a mais de um contexto.
- **Definir** permissões de acesso, responsáveis pela atualização e critérios de arquivamento.
- **Triar, não excluir**: duplicatas e arquivos sem contexto passam por análise antes de qualquer descarte.
- **Verificar** se o Google Drive é o repositório adequado para cada tipo de documento.

<!-- slide -->

## Encaminhamento

Começar pequeno, medir e só então expandir.
{: .destaque}

Um serviço-piloto, o padrão aplicado, um índice com links e testes de localização com servidores iniciantes e experientes.

> O objetivo não é só organizar arquivos: é tornar o conhecimento institucional encontrável, compreensível, reutilizável e sustentável.

<!-- slide -->

## Referências

**MPS.BR e SEMAS**

- SOFTEX. MPS.BR: modelos de referência (Software, Serviços e Gestão de Pessoas). [mpsbr.softex.br/modelos](https://mpsbr.softex.br/modelos/){:target="_blank" rel="noopener noreferrer"}
- SOFTEX. Comunicado 01/2024: novas versões dos modelos de Software e de Serviços e Guia de Avaliação 2024. [softex.br](https://softex.br/comunicado-01-2024-novas-versoes-mps-sw2024-mps-sv-2024-e-guia-de-avaliacao-2024-2/){:target="_blank" rel="noopener noreferrer"}
- SOFTEX. MPS.BR – Guia de Implementação, Parte 11. 2016.
- TI PARÁ. Semas conquista certificação nacional em Gestão de Tecnologia da Informação. 09/01/2026. [tipara.com.br](https://tipara.com.br/semas-conquista-certificacao-nacional-em-gestao-de-tecnologia-da-informacao/){:target="_blank" rel="noopener noreferrer"}

**Normas e documentos internos**

- BRASIL. [Lei nº 8.159/1991](https://www.planalto.gov.br/ccivil_03/leis/l8159.htm){:target="_blank" rel="noopener noreferrer"}; [Lei nº 12.527/2011 (LAI)](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm){:target="_blank" rel="noopener noreferrer"}; [Lei nº 13.709/2018 (LGPD)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm){:target="_blank" rel="noopener noreferrer"}.
- CONARQ. [Resolução nº 50, de 6 de maio de 2022](https://www.gov.br/conarq/pt-br/legislacao-arquivistica/resolucoes-do-conarq/resolucao-no-50-de-06-de-maio-de-2022){:target="_blank" rel="noopener noreferrer"}: e-ARQ Brasil, versão 2.
- DTI/SEMAS-PA. Guia de Orientação DTI (18/06/2026) e validação da estrutura de pastas (16/04/2026).
- SEMAS-PA. Organização e recuperação de informações no Google Drive. Síntese executiva, 2026.
