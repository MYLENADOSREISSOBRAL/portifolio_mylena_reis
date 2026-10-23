---
titulo:
  pt: "Apresentação da Trajetória de Execução do Projeto Onboard"
  en: "Execution path of the Onboard Project"
evento: "SEMAS-PA — Diretoria de Tecnologia da Informação"
date: 2026-10-16
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
{%- assign anexos = '/assets/apresentacoes/2026-10-16-onboard-semas-pa/' | relative_url -%}

## Roteiro

1. Propósito e contexto · *~3 min*
2. Linha do tempo (fev–out/2026) · *~5 min*
3. Marcos e entregas · *~3 min*
4. Anexos para verificação · *~1 min*
5. Pontos a validar e próximos passos · *~2 min*

Período de referência: **fevereiro a outubro de 2026** · Tempo estimado: **15 min**, mais perguntas

<!-- slide -->

## Propósito do projeto

Construir um **modelo de onboarding baseado em evidências científicas** para a DTI/SEMAS, que:

- reduza o tempo de adaptação dos novos integrantes;
- facilite a transferência de conhecimento;
- aumente a autonomia dos novos integrantes;
- padronize o processo de integração.

Fonte: Onboard – Proposta ([Anexo 4]({{ anexos }}anexo4.pdf)) e Política Organizacional, cap. 6 ([Anexo 3]({{ anexos }}anexo3.pdf))

<!-- slide -->

## Contexto de execução

O trabalho ocorreu na DTI/SEMAS, em paralelo a outras demandas:

- padronização do repositório documental (Drive DTI);
- adoção da plataforma **Rede Conecta** para tarefas e projetos;
- automação documental com o **MPS Robô** (modelo MPS.BR);
- atualização do Plano e da Política Organizacional.

Em 05/08/2026, constatou-se que a Política da DTI **não tinha referência consolidada** a onboarding.
{: .destaque}

<!-- slide -->

## Como ler as situações

| Situação | Significado |
|---|---|
| **Concluída** | Registrada como finalizada **e** com anexo que a demonstra |
| **Registrada** | Consta no cronograma, sem anexo comprobatório |
| **Em andamento** | Iniciada, sem conclusão documentada |
| **Pendente** | Aguardando ação ou validação |

O cronograma é um registro mantido pela executora: orienta a ordem dos fatos, mas sozinho não comprova conclusão.

<!-- slide -->

## Linha do tempo

<figure class="deck-figura">
<svg class="linha-do-tempo" viewBox="0 0 1200 300" role="img" aria-labelledby="ldt-titulo ldt-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="ldt-titulo">Linha do tempo do Projeto Onboard, fevereiro a outubro de 2026</title>
  <desc id="ldt-desc">Fevereiro: leitura de artigos, com 16 referências catalogadas no Zotero, com anexo e link para o Anexo 8. Março: equipe de automação com IA e primeiro questionário de adesão, aplicado e não bem aceito, com link para o questionário. Abril: estrutura de pastas do Drive validada, com anexo. Maio: migração das demandas para a Rede Conecta, com anexo. Junho: fluxo de projetos aplicado ao SISFLORA na Rede Conecta, com anexo. Julho: Documento de Planejamento Simplificado, com anexo. Agosto: modelo experimental de onboarding para integrar novos membros da DTI aceito pela QA e pela GESIS, com anexo. Setembro: capítulo 6 da Política Organizacional, com anexo. Outubro: pedido de aprovação e proposta de Trilha de Onboarding a partir de novembro de 2026, com anexo.</desc>
  <style>.linha-do-tempo:has(.ldt-m1:hover, .ldt-m1:focus-visible) .ldt-b1, .linha-do-tempo:has(.ldt-m2:hover, .ldt-m2:focus-visible) .ldt-b2, .linha-do-tempo:has(.ldt-m3:hover, .ldt-m3:focus-visible) .ldt-b3, .linha-do-tempo:has(.ldt-m4:hover, .ldt-m4:focus-visible) .ldt-b4, .linha-do-tempo:has(.ldt-m5:hover, .ldt-m5:focus-visible) .ldt-b5, .linha-do-tempo:has(.ldt-m6:hover, .ldt-m6:focus-visible) .ldt-b6, .linha-do-tempo:has(.ldt-m7:hover, .ldt-m7:focus-visible) .ldt-b7, .linha-do-tempo:has(.ldt-m8:hover, .ldt-m8:focus-visible) .ldt-b8, .linha-do-tempo:has(.ldt-m9:hover, .ldt-m9:focus-visible) .ldt-b9 { opacity: 1; visibility: visible; }</style>
  <line class="ldt-linha" x1="40" y1="130" x2="1160" y2="130"/>
  <a class="ldt-marco ldt-marco--feito ldt-m1" href="{{ anexos }}anexo8-relatorio-zotero.htm" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Anexo 8 – Relatório Zotero (nova aba)"><rect class="ldt-alvo" x="8" y="60" width="124" height="165"/><circle cx="70" cy="130" r="17"/><path d="M62 130l6 6 11-12"/><text x="70" y="88">Fev</text><text class="ldt-acao" x="70" y="185">Leitura de</text><text class="ldt-acao" x="70" y="212">artigos</text></a>
  <a class="ldt-marco ldt-marco--feito ldt-m2" href="https://docs.google.com/forms/d/e/1FAIpQLScez3jmYZ9chfepjEBHlGyvm6wZskYbLvDevM1DS-1NGyf7yg/viewform" target="_blank" rel="noopener noreferrer" aria-label="Abrir o questionário 1 de adesão de novos integrantes – Google Forms (nova aba)"><rect class="ldt-alvo" x="141" y="60" width="124" height="165"/><circle cx="203" cy="130" r="17"/><path d="M195 130l6 6 11-12"/><text x="203" y="88">Mar</text><text class="ldt-acao" x="203" y="185">Equipe IA e</text><text class="ldt-acao" x="203" y="212">questionário</text></a>
  <a class="ldt-marco ldt-marco--feito ldt-m3" href="{{ anexos }}anexo1.png" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Anexo 1 – e-mail de validação da estrutura de pastas (nova aba)"><rect class="ldt-alvo" x="274" y="60" width="124" height="165"/><circle cx="336" cy="130" r="17"/><path d="M328 130l6 6 11-12"/><text x="336" y="88">Abr</text><text class="ldt-acao" x="336" y="185">Pastas</text><text class="ldt-acao" x="336" y="212">validadas</text></a>
  <a class="ldt-marco ldt-marco--feito ldt-m4" href="{{ anexos }}anexo6.png" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Anexo 6 – quadro Kanban da Rede Conecta (nova aba)"><rect class="ldt-alvo" x="407" y="60" width="124" height="165"/><circle cx="469" cy="130" r="17"/><path d="M461 130l6 6 11-12"/><text x="469" y="88">Mai</text><text class="ldt-acao" x="469" y="185">Migração</text><text class="ldt-acao" x="469" y="212">p/ Conecta</text></a>
  <a class="ldt-marco ldt-marco--feito ldt-m5" href="{{ anexos }}anexo6.png" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Anexo 6 – quadro Kanban da Rede Conecta (nova aba)"><rect class="ldt-alvo" x="540" y="60" width="124" height="165"/><circle cx="602" cy="130" r="17"/><path d="M594 130l6 6 11-12"/><text x="602" y="88">Jun</text><text class="ldt-acao" x="602" y="185">Fluxo de</text><text class="ldt-acao" x="602" y="212">projetos</text></a>
  <a class="ldt-marco ldt-marco--feito ldt-m6" href="{{ anexos }}anexo2.pdf" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Anexo 2 – Documento de Planejamento Simplificado (nova aba)"><rect class="ldt-alvo" x="673" y="60" width="124" height="165"/><circle cx="735" cy="130" r="17"/><path d="M727 130l6 6 11-12"/><text x="735" y="88">Jul</text><text class="ldt-acao" x="735" y="185">Planejamento</text><text class="ldt-acao" x="735" y="212">simplificado</text></a>
  <a class="ldt-marco ldt-marco--feito ldt-m7" href="{{ anexos }}anexo4.pdf" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Anexo 4 – Onboard – Proposta (nova aba)"><rect class="ldt-alvo" x="806" y="60" width="124" height="165"/><circle cx="868" cy="130" r="17"/><path d="M860 130l6 6 11-12"/><text x="868" y="88">Ago</text><text class="ldt-acao" x="868" y="185">Onboarding</text><text class="ldt-acao" x="868" y="212">aceito</text></a>
  <a class="ldt-marco ldt-marco--feito ldt-m8" href="{{ anexos }}anexo3.pdf" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Anexo 3 – Política Organizacional da DTI (nova aba)"><rect class="ldt-alvo" x="939" y="60" width="124" height="165"/><circle cx="1001" cy="130" r="17"/><path d="M993 130l6 6 11-12"/><text x="1001" y="88">Set</text><text class="ldt-acao" x="1001" y="185">Cap. 6 da</text><text class="ldt-acao" x="1001" y="212">Política</text></a>
  <a class="ldt-marco ldt-marco--feito ldt-m9" href="{{ anexos }}anexo7.pdf" target="_blank" rel="noopener noreferrer" aria-label="Abrir o Anexo 7 – Proposta da Trilha de Onboarding (nova aba)"><rect class="ldt-alvo" x="1072" y="60" width="124" height="165"/><circle cx="1134" cy="130" r="17"/><path d="M1126 130l6 6 11-12"/><text x="1134" y="88">Out</text><text class="ldt-acao" x="1134" y="185">Aprovação</text><text class="ldt-acao" x="1134" y="212">e trilha</text></a>
  <g class="ldt-legenda"><circle class="ldt-legenda--feito" cx="250" cy="268" r="8"/><text x="266" y="275">entrega com anexo</text><text x="470" y="275">· passe o mouse sobre o mês · clique para abrir a evidência</text></g>
  <g class="ldt-balao ldt-b1" aria-hidden="true"><rect x="4" y="150" width="622" height="144" rx="12"/><path d="M58 152L70 136L82 152"/><text class="ldt-balao__titulo" x="24" y="182">Fevereiro/2026 · clique para abrir o Anexo 8</text><text x="24" y="206">05/02: leitura dos artigos e da Política Organizacional.</text><text x="24" y="230">16/02: 16 referências sobre onboarding catalogadas</text><text x="24" y="254">no Zotero (Anexo 8). 06/02: seminários semanais da QA.</text><text x="24" y="278">26/02: início do trabalho com o Plano Organizacional.</text></g>
  <g class="ldt-balao ldt-b2" aria-hidden="true"><rect x="4" y="150" width="612" height="144" rx="12"/><path d="M191 152L203 136L215 152"/><text class="ldt-balao__titulo" x="24" y="182">Março/2026 · clique para abrir o questionário</text><text x="24" y="206">04/03: leitura dos artigos sobre onboarding.</text><text x="24" y="230">13/03: início da equipe de automação de processos (IA);</text><text x="24" y="254">1º questionário de adesão aplicado: não foi bem aceito.</text><text x="24" y="278">23/03: organização de pastas no Drive.</text></g>
  <g class="ldt-balao ldt-b3" aria-hidden="true"><rect x="4" y="150" width="664" height="144" rx="12"/><path d="M324 152L336 136L348 152"/><text class="ldt-balao__titulo" x="24" y="182">Abril/2026 · clique para abrir o Anexo 1</text><text x="24" y="206">08/04: 2ª etapa do MPS Robô; fim do Guia Prático no Conecta.</text><text x="24" y="230">15/04: prazos de desenvolvimento até julho (auditoria).</text><text x="24" y="254">16/04: estrutura de pastas do Drive DTI validada</text><text x="24" y="278">com a Diretora (Anexo 1).</text></g>
  <g class="ldt-balao ldt-b4" aria-hidden="true"><rect x="163" y="150" width="612" height="144" rx="12"/><path d="M457 152L469 136L481 152"/><text class="ldt-balao__titulo" x="183" y="182">Maio/2026 · clique para abrir o Anexo 6</text><text x="183" y="206">08/05: responsáveis pelos projetos confirmados; testes.</text><text x="183" y="230">11/05: reunião sobre a segurança da Rede Conecta.</text><text x="183" y="254">12/05: demandas migradas como tarefas e projetos</text><text x="183" y="278">na Rede Conecta (Anexo 6).</text></g>
  <g class="ldt-balao ldt-b5" aria-hidden="true"><rect x="301" y="150" width="602" height="144" rx="12"/><path d="M590 152L602 136L614 152"/><text class="ldt-balao__titulo" x="321" y="182">Junho/2026 · clique para abrir o Anexo 6</text><text x="321" y="206">11–16/06: adoção das tarefas do Portal PLANBIO.</text><text x="321" y="230">17/06: fluxo de desenvolvimento da DTI aplicado ao</text><text x="321" y="254">projeto ID449 – Melhorias SISFLORA (Anexo 6).</text><text x="321" y="278">22–29/06: tarefas e verificação do projeto CATIS/GLPI.</text></g>
  <g class="ldt-balao ldt-b6" aria-hidden="true"><rect x="408" y="150" width="654" height="144" rx="12"/><path d="M723 152L735 136L747 152"/><text class="ldt-balao__titulo" x="428" y="182">Julho/2026 · clique para abrir o Anexo 2</text><text x="428" y="206">03/07: logomarcas e links de projetos na Rede Conecta.</text><text x="428" y="230">20–22/07: Documento de Planejamento Simplificado (Anexo 2).</text><text x="428" y="254">29–30/07: práticas de onboarding da DTI levantadas;</text><text x="428" y="278">13 mídias de onboarding inspecionadas no Drive.</text></g>
  <g class="ldt-balao ldt-b7" aria-hidden="true"><rect x="541" y="150" width="654" height="144" rx="12"/><path d="M856 152L868 136L880 152"/><text class="ldt-balao__titulo" x="561" y="182">Agosto/2026 · modelo aceito · clique para abrir o Anexo 4</text><text x="561" y="206">04/08: a QA e a GESIS aceitaram o modelo experimental</text><text x="561" y="230">de onboarding para integrar novos membros da DTI (Anexo 4).</text><text x="561" y="254">05–17/08: framework na Política; cartoons (Anexo 5).</text><text x="561" y="278">26–27/08: avaliação positiva do material, com ajustes.</text></g>
  <g class="ldt-balao ldt-b8" aria-hidden="true"><rect x="594" y="150" width="602" height="144" rx="12"/><path d="M989 152L1001 136L1013 152"/><text class="ldt-balao__titulo" x="614" y="182">Setembro/2026 · clique para abrir o Anexo 3</text><text x="614" y="206">03/09: revalidação do texto da Política (Anexo 3).</text><text x="614" y="230">Capítulo 6 – Integração de Novos Colaboradores</text><text x="614" y="254">finalizado; Cartilha v_03; questionário para gestores.</text><text x="614" y="278">2 reuniões de finalização textual do onboarding.</text></g>
  <g class="ldt-balao ldt-b9" aria-hidden="true"><rect x="542" y="150" width="654" height="144" rx="12"/><path d="M1122 152L1134 136L1146 152"/><text class="ldt-balao__titulo" x="562" y="182">Outubro/2026 · clique para abrir o Anexo 7</text><text x="562" y="206">07/10: pedido de aprovação da Política e da Cartilha.</text><text x="562" y="230">09/10: proposta de Trilha de Onboarding na Rede Conecta,</text><text x="562" y="254">a partir de nov/2026 (Anexo 7), aguardando validação.</text><text x="562" y="278">16/10: reunião de documentos e apresentação dos resultados.</text></g>
</svg>
<div class="ldt-regulador" data-ldt-regulador data-coluna="124" hidden>
  <label for="ldt-tamanho">Tamanho das letras</label>
  <input id="ldt-tamanho" type="range" min="0.8" max="1.3" step="0.05" value="1">
  <output for="ldt-tamanho">100%</output>
</div>
</figure>

<!-- slide -->

## Fev–mar/2026 · Ambientação e diagnóstico

| Data | Atividade | Situação |
|---|---|---|
| 05/02 | Leitura dos artigos e da Política Organizacional: 16 referências catalogadas no Zotero — [Anexo 8]({{ anexos }}anexo8-relatorio-zotero.htm) | **Concluída** |
| 26/02 | Início do trabalho com o Plano Organizacional | Em andamento |
| 04/03 | Leitura dos artigos sobre onboarding | Registrada |
| 13/03 | Início da equipe de Automatização de Processos (IA) | Em andamento |
| 13/03 | 1º questionário anônimo de adesão, para novos integrantes: **não foi bem aceito** — [abrir questionário (Google Forms)](https://docs.google.com/forms/d/e/1FAIpQLScez3jmYZ9chfepjEBHlGyvm6wZskYbLvDevM1DS-1NGyf7yg/viewform){:target="_blank" rel="noopener noreferrer"} | **Concluída** (aplicado) |
| 23/03 | Organização de pastas no Drive | Em andamento |

<!-- slide -->

## Abr–mai/2026 · Estrutura documental e Rede Conecta

| Data | Atividade | Situação |
|---|---|---|
| 15/04 | Alinhamento: prazos de desenvolvimento até julho (auditoria interna) | Registrada |
| 16/04 | **Estrutura de pastas do Drive validada com a Diretora** (piloto: Sistema Central de Postagens) — [Anexo 1]({{ anexos }}anexo1.png) | **Concluída** |
| 08/05 | Verificação dos responsáveis pelos projetos; testes da Rede Conecta | Registrada |
| 12/05 | **Demandas migradas para a Rede Conecta** como tarefas e projetos (em vez de anexar arquivos do Drive) — [Anexo 6]({{ anexos }}anexo6.png) | **Concluída** |

A estrutura de pastas foi formalizada no item 3.1 da Política Organizacional ([Anexo 3]({{ anexos }}anexo3.pdf)).

<!-- slide -->

## Jun–jul/2026 · Processos e instrumentos

| Data | Atividade | Situação |
|---|---|---|
| 16/06 | Adoção das tarefas do Portal PLANBIO | Registrada |
| 17/06 | Fluxo de desenvolvimento da DTI no projeto **ID449 – Melhorias SISFLORA** — [Anexo 6]({{ anexos }}anexo6.png) | Em andamento |
| 22–29/06 | Tarefas do CATIS na Rede Conecta; verificação do projeto CATIS/GLPI | Registrada |
| 20/07 | Projeto piloto de automação com o MPS Robô (itens essenciais MPS.BR) | Registrada |
| 20–22/07 | Template **Documento de Planejamento Simplificado (DPS)** — [Anexo 2]({{ anexos }}anexo2.pdf) | Em andamento |
| 29–30/07 | Levantamento das práticas de onboarding e inspeção de 13 mídias | Registrada |

<!-- slide -->

## Ago/2026 · O modelo Onboard

| Data | Atividade | Situação |
|---|---|---|
| 04/08 | **Aceito o modelo experimental de onboarding** (integração de novos membros da DTI), apresentado à QA e à GESIS — [Anexo 4]({{ anexos }}anexo4.pdf) | **Concluída** |
| 05–17/08 | Framework de integração incluído na Política (rev. 4.1, 13/08) — [Anexo 3]({{ anexos }}anexo3.pdf) | **Concluída** |
| 05–17/08 | Cartoons e **Cartilha Ilustrativa** da Política — [Anexo 5]({{ anexos }}anexo5.pdf) | **Concluída** |
| até 17/08 | Documento de Planejamento Simplificado finalizado — [Anexo 2]({{ anexos }}anexo2.pdf) | **Concluída** |
| 26–27/08 | Reunião de avaliação do material: resultado positivo, com ajustes | Registrada |

<!-- slide -->

## Set–out/2026 · Consolidação e aprovação

| Data | Atividade | Situação |
|---|---|---|
| 03/09 | Revalidação do texto da Política (rev. 4.2) — [Anexo 3]({{ anexos }}anexo3.pdf) | **Concluída** |
| set | **Capítulo 6 – Integração de Novos Colaboradores** finalizado — [Anexo 3]({{ anexos }}anexo3.pdf) | **Concluída** |
| set | Cartilha v_03; questionário para os gestores — [abrir questionário (Google Forms)](https://docs.google.com/forms/d/e/1FAIpQLSfD8W7ThutfpAbvTlPxeyx8G5saRa3qm-bC4NktzwrFkdC7pg/viewform){:target="_blank" rel="noopener noreferrer"} | Registrada |
| 07/10 | Pedido de aprovação da nova Política e da Cartilha à Diretoria | **Pendente** |
| 09/10 | Proposta de **Trilha de Onboarding** na Rede Conecta — [Anexo 7]({{ anexos }}anexo7.pdf) | **Pendente** (validação) |
| 09/10 | Relatórios de agosto e setembro | **Pendente** |

<!-- slide -->

## O onboarding na Política Organizacional

Capítulo 6 da Política ([Anexo 3]({{ anexos }}anexo3.pdf)): aprendizagem progressiva em quatro metodologias

1. **Autoestudo:** cartilha, Plano e Política, catálogo de serviços
2. **Mãos na massa (hands-on):** atividades práticas supervisionadas
3. **Aprendizagem baseada em projetos:** participação gradual em projetos reais
4. **Integração:** atuação na equipe, com orientação e feedback
{: .passos}

<!-- slide -->

## Proposta: Trilha de Aprendizagem na Rede Conecta

Conceito de Universidade Corporativa da DTI ([Anexo 7]({{ anexos }}anexo7.pdf))

| Módulo | Carga |
|---|---|
| 1. Integração e Diretrizes da DTI | 8 h |
| 2. Infraestrutura e Ferramentas | 12 h |
| 3. Rotinas e Procedimentos Operacionais | 10 h |
| **Total** | **30 h** |

Aplicação a partir de **novembro de 2026**, sujeita a validação.
{: .destaque}

[Acessar a Rede Conecta (abre em nova aba)](https://conecta.semas.pa.gov.br/login){: .deck-anexo .deck-anexo--site target="_blank" rel="noopener noreferrer"}

<!-- slide -->

## Marcos com evidência

| Marco | Período | Anexo |
|---|---|---|
| Fundamentação científica (16 referências) | fev | [8]({{ anexos }}anexo8-relatorio-zotero.htm) |
| Estrutura de pastas validada | 16/04 | [1]({{ anexos }}anexo1.png), [3]({{ anexos }}anexo3.pdf) |
| Migração das demandas e fluxo de projetos na Rede Conecta | mai–jun | [6]({{ anexos }}anexo6.png) |
| Documento de Planejamento Simplificado | jul–ago | [2]({{ anexos }}anexo2.pdf) |
| Modelo de onboarding (integração de novos membros) aceito | 04/08 | [4]({{ anexos }}anexo4.pdf) |
| Cartilha Ilustrativa | ago–set | [5]({{ anexos }}anexo5.pdf) |
| Onboarding na Política (cap. 6) | ago–set | [3]({{ anexos }}anexo3.pdf) |
| Proposta de Trilha de Onboarding | out | [7]({{ anexos }}anexo7.pdf) |

<!-- slide -->

## Anexos para verificação

- [Anexo 1 — E-mail de validação da estrutura de pastas (imagem)]({{ anexos }}anexo1.png)
- [Anexo 2 — Documento de Planejamento Simplificado (PDF, 2 págs.)]({{ anexos }}anexo2.pdf)
- [Anexo 3 — Política Organizacional da DTI (PDF, 29 págs.)]({{ anexos }}anexo3.pdf)
- [Anexo 4 — Onboard – Proposta (PDF, 11 págs.)]({{ anexos }}anexo4.pdf)
- [Anexo 5 — Cartilha Ilustrativa da Política (PDF, 6 págs., 17 MB)]({{ anexos }}anexo5.pdf)
- [Anexo 6 — Quadro Kanban da Rede Conecta (imagem)]({{ anexos }}anexo6.png)
- [Anexo 7 — Proposta da Trilha de Onboarding (PDF, 10 págs.)]({{ anexos }}anexo7.pdf)
- [Anexo 8 — Relatório Zotero: 16 referências sobre onboarding (página)]({{ anexos }}anexo8-relatorio-zotero.htm)
- [Cronograma do projeto (texto)]({{ anexos }}cronograma-do-projeto.txt)
- [Questionário 1 — adesão de novos integrantes, 13/03/2026 (Google Forms)](https://docs.google.com/forms/d/e/1FAIpQLScez3jmYZ9chfepjEBHlGyvm6wZskYbLvDevM1DS-1NGyf7yg/viewform){:target="_blank" rel="noopener noreferrer"}
- [Questionário 2 — gestores, set/2026 (Google Forms)](https://docs.google.com/forms/d/e/1FAIpQLSfD8W7ThutfpAbvTlPxeyx8G5saRa3qm-bC4NktzwrFkdC7pg/viewform){:target="_blank" rel="noopener noreferrer"}
{: .colunas}

<!-- slide -->

## Pontos a validar

- Aprovação da nova Política e da Cartilha (pedida em 07/10) **não documentada**
- O cronograma cita "Política 4.0"; o onboarding entra nas revisões **4.1 e 4.2**
- Anexo 7 ainda traz o cronograma de piloto em **janeiro de 2027**: atualizar para novembro de 2026
- Versão da cartilha anexada (v2.0 ou v_03) não identificada
- Data da captura do Anexo 6 e andamento posterior do SISFLORA não confirmados
- Auditoria interna prevista para julho: realização não registrada

<!-- slide -->

## Próximos passos documentados

- Aprovação da Política e da Cartilha pela Diretoria da DTI
- Validação da trilha por gerentes, QA, consultoria e Diretoria
- Entrega dos relatórios de agosto e setembro
- Oficina de validação e **aplicação da trilha a partir de novembro de 2026**
{: .passos}

<!-- slide -->

## Obrigada!

> Os documentos que sustentam cada informação estão disponíveis nos anexos.

Contato: [mylena1408@gmail.com](mailto:mylena1408@gmail.com) · [mylena.sobral@icen.ufpa.br](mailto:mylena.sobral@icen.ufpa.br)
