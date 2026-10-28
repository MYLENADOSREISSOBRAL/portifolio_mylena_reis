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

## Roteiro

1. Contexto: o problema e o objetivo
2. Por que padronizar: base normativa e MPS.BR
3. O padrão: estrutura, ciclo da demanda, nomenclatura, regras e busca
4. Governança: papéis, implantação, indicadores e cuidados
5. Encaminhamento

Guia de orientação para **gestores e usuários** do Google Drive corporativo da DTI.

<!-- slide -->

## O ponto de partida

Hoje, encontrar um documento depende de quem sabe onde ele está.
{: .destaque}

| Sintoma | Como aparece |
|---|---|
| **Dispersão** | Arquivos espalhados, duplicados e em versões divergentes |
| **Falta de contexto** | Nomes que não dizem a que sistema, demanda ou etapa o arquivo pertence |
| **Dependência de pessoas** | Quando alguém sai ou muda de equipe, o conhecimento vai junto |

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

## MPS.BR: qualidade de processo

- O **MPS.BR** (Melhoria de Processo do Software Brasileiro) é coordenado pela **Softex**; o modelo de referência para software, **MR-MPS-SW**, foi atualizado em 2024.
- São **7 níveis de maturidade**, de **G** (parcialmente gerenciado) a **A** (em otimização), sequenciais e cumulativos.
- Cada nível exige processos com **resultados esperados comprovados por evidências**.

Sem documentação organizada não há evidência e, sem evidência, não há maturidade demonstrável.
{: .destaque}

<!-- slide -->

## Cada processo pede evidências, e elas têm endereço

| Processo do MR-MPS-SW | Evidência esperada | Onde fica no nosso Drive |
|---|---|---|
| Gerência de Projetos | Planos, cronogramas, atas e acompanhamento | PAE › Gerência do projeto · Comunicação |
| Engenharia de Requisitos | Requisitos aprovados, rastreáveis e com mudanças registradas | PAE › Lista de Requisitos · Sistema › Requisitos e HU |
| Gerência de Configuração | Itens identificados, versões controladas e linhas de base | Nomenclatura com versão · Documentação do Sistema |
| Verificação e Validação | Planos e evidências de teste, aceite do cliente | PAE › Teste · Homologação · checklist |
| Garantia da Qualidade | Aderência de produtos e processos ao padrão | checklist de entrega · revisão periódica das pastas |

<!-- slide -->

## A estrutura padrão do Drive da DTI

```text
Sistemas
└── Documentação do Sistema ........ base permanente de cada sistema
    ├── Requisitos e HU
    ├── Dados de Teste
    ├── Manuais e Treinamentos
    ├── Documentação de Implantação
    └── Documentação de Arquitetura – Integração
Demandas Projetos
└── PAE XXXXX Versão XXXX .......... uma pasta por demanda ativa
    ├── Formalização da Demanda · Lista de Requisitos · Gerência do projeto
    ├── Comunicação · Material de Apoio · Protótipo
    └── Teste · Homologação · Implantação · checklist
00_ACESSO_RAPIDO_ATALHOS_MAIS_UTILIZADOS ... atalhos, nunca cópias
NAO_CLASSIFICADOS ........................... área temporária: esvaziar sempre
```

<!-- slide -->

## Uma demanda, do início ao fim, em um só lugar

1. **Formalização da Demanda**: documentos oficiais de abertura
2. **Lista de Requisitos**: escopo e regras acordados
3. **Gerência do projeto**: cronograma, atas e escopo
4. **Protótipo**: Figma, wireframes e mockups
5. **Teste**: bugs, evidências e relatórios de QA
6. **Homologação**: termos de aceite e validações
7. **Implantação**: roteiro de subida do projeto
8. **checklist**: critérios de pronto da entrega
{: .colunas}

Durante todo o ciclo: **Comunicação** (alinhamentos e e-mails formais) e **Material de Apoio** (pesquisas e referências).
{: .destaque}

<!-- slide -->

## O nome do arquivo é o primeiro filtro de busca

```text
Arquivo:            Tipo_Sistema_Assunto_Ano_vN
Exemplo:            API_SistemaX_IntegracaoY_2026_v1
Pasta de demanda:   PAE XXXXX Versão XXXX
```

- **Diga o que é, de onde e de quando**: tipo, sistema ou serviço, assunto e ano.
- **Versione no nome**: v1, v2… sempre que houver revisão.
- **Use termos padronizados**: os mesmos nomes de sistema em todo o Drive.
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

- SOFTEX. Programa MPS.BR e Comunicado 01/2024: novas versões MPS-SW:2024, MPS-SV:2024 e Guia de Avaliação 2024. [softex.br/mpsbr](https://softex.br/mpsbr/){:target="_blank" rel="noopener noreferrer"}
- SOFTEX. MPS.BR – Guia de Implementação, Parte 1: nível G do MR-MPS-SW. 2013.
- BRASIL. Lei nº 8.159/1991 (arquivos); Lei nº 12.527/2011 (LAI); Lei nº 13.709/2018 (LGPD).
- CONARQ. e-ARQ Brasil, 2ª versão, adotada pela Resolução nº 50/2022. [gov.br/conarq](https://www.gov.br/conarq){:target="_blank" rel="noopener noreferrer"}
- DTI/SEMAS-PA. Guia de Orientação DTI (18/06/2026) e Mapa mental da gestão documental (14/07/2026).
- SEMAS-PA. Gestão documental e gestão do conhecimento: organização e recuperação de informações no Google Drive. Síntese executiva, 2026.
