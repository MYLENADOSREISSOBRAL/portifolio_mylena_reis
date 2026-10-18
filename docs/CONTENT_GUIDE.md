# Guia de conteúdo (versão Jekyll)

O site é gerado pelo **Jekyll** a partir de arquivos de texto. O GitHub Pages compila automaticamente a cada envio ao repositório; no seu computador, a compilação serve só para pré-visualizar.

> **Importante:** salve todos os arquivos em **UTF-8 sem BOM** (padrão do VS Code). Arquivos com BOM fazem o Jekyll ignorar o cabeçalho (`---`) da página.

## Pré-visualizar no computador

Pré-requisito (já instalado): Ruby 3.3 + Jekyll (gem `github-pages`).

```powershell
cd portifolio_mylena_reis
bundle exec jekyll serve
```

Abra **http://127.0.0.1:4000/portifolio_mylena_reis/**. A página se atualiza ao salvar os arquivos (exceto `_config.yml`, que exige reiniciar o comando). Para encerrar: `Ctrl+C`.

## Onde fica cada coisa

| O que | Arquivo |
|---|---|
| Configuração geral (endereço, idiomas, plano de fundo padrão) | `_config.yml` |
| Nome, foto, ocupação, universidade, localização, e-mail, GitHub, LinkedIn, currículo | `_data/perfil.yml` (**fonte única**) |
| Menu principal (pt e en) | `_data/navegacao.yml` |
| Textos da interface (botões, rótulos, mensagens) em pt e en | `_data/textos.yml` |
| Projetos | `_data/projetos.yml` |
| Formação, experiência e atividades | `_data/trajetoria.yml` |
| Interesses de pesquisa | `_data/pesquisa.yml` |
| Habilidades | `_data/habilidades.yml` |
| Apresentação da página inicial | `index.md` (texto em Markdown abaixo do cabeçalho `---`) |
| Visual (modelos) | `_layouts/`, `_includes/`, `css/` |
| Comportamentos (tema, preferências, menu) | `js/` |
| Foto de perfil | `assets/images/profile.jpg` |
| Editor de foto (ferramenta pessoal) | `tools/editor-foto.html` |

Em todos os arquivos `.yml`, textos bilíngues seguem o formato:

```yaml
descricao:
  pt: "Texto em português"
  en: "Text in English"
```

Campos sem informação confirmada ficam `null` e **não aparecem** no site. Links só aparecem quando começam com `https://` ou `mailto:`.

## Como editar

### Perfil e links
Edite `_data/perfil.yml`. O mesmo dado alimenta a coluna lateral, as "Informações rápidas" da página inicial, o rodapé e os dados estruturados para buscadores. Para o currículo, coloque o PDF em `assets/docs/` e preencha `curriculo: /assets/docs/curriculo.pdf`.

### Apresentação (página inicial)
Edite o texto de `index.md`. O título grande fica em `titulo_intro` no cabeçalho do arquivo.

### Projetos
Copie um bloco de `_data/projetos.yml` e ajuste:

```yaml
- id: meu-projeto
  nome: Meu Projeto            # ou { pt: "...", en: "..." }
  contexto: { pt: "Disciplina X — UFPA", en: "Course X — UFPA" }
  periodo: { pt: "2026", en: "2026" }
  estado: em-andamento         # concluido | em-andamento | experimental | null
  descricao: { pt: "...", en: "..." }
  tecnologias: [Python, FastAPI]
  repositorio: https://github.com/...
  demonstracao: null
  imagem: null                 # ou /assets/images/meu-projeto.png
  imagem_alt: null             # obrigatório se houver imagem: { pt: "...", en: "..." }
```

### Trajetória, habilidades e interesses
Mesma lógica, em `_data/trajetoria.yml`, `_data/habilidades.yml` (`nivel: estudado | projeto | profissional`) e `_data/pesquisa.yml`.

## Publicações, apresentações e blog (um arquivo por item)

Modelos prontos em `docs/modelos/` — copie, renomeie e preencha. Itens novos aparecem sozinhos nas listas, no ano certo; não há índice para atualizar.

| Conteúdo | Onde criar | Nome do arquivo | Página |
|---|---|---|---|
| Publicação | `_publicacoes/` | curto e único, ex.: `2026-sbes-onboarding.md` | Publicações (lista numerada por ano) |
| Apresentação | `_apresentacoes/` | `AAAA-MM-DD-nome.md`, ex.: `2026-11-20-semana-academica.md` | Apresentações (por ano) e Novidades |
| Texto do blog | `_posts/` | `AAAA-MM-DD-titulo-do-texto.md` (a data é a de publicação) | Blog (por ano), página própria `/blog/titulo-do-texto/` e Novidades |

**Arquivos anexos:** PDFs de publicações em `assets/publicacoes/`; slides/PDFs de apresentações em `assets/apresentacoes/`; imagens dos textos em `assets/images/blog/`. Nos cabeçalhos, use caminhos que começam com `/assets/...` (o endereço do site é acrescentado automaticamente).

**O que cada lista mostra**
- **Publicações:** título, autores (suas formas de citação — `nome_citacao` em `_config.yml` — em **negrito**), tipo · veículo, ano, selos, resumo e a linha de links **PDF · DOI · Slides · Vídeo · Código · Dados · Pôster** — só os links preenchidos.
- **Apresentações:** título, tipo · evento · local · data por extenso, resumo e links **Slides · PDF · Vídeo · Página do evento**. O campo `date:` é **obrigatório** (define ordem, ano e Novidades).
- **Blog:** título, data, tempo de leitura (200 palavras/min) e resumo (`resumo:` no cabeçalho ou, sem ele, o primeiro parágrafo).
- **Novidades (página inicial):** os 3 itens mais recentes entre blog e apresentações; aparece só quando houver itens. Publicações não entram (têm só o ano).

**Seções vazias** mostram uma nota discreta ("Esta página será atualizada…").

**Arquivos que começam com `_`** (como `_LEIA-ME.md`) são ignorados pelo Jekyll — use isso para guardar rascunhos dentro das pastas sem publicá-los.

### Erros comuns

| Sintoma | Causa provável |
|---|---|
| A compilação falha com "YAML Exception" | Cabeçalho mal formatado: falta `---` no início/fim, aspas não fechadas ou dois-pontos dentro de texto sem aspas (`titulo: "Parte 1: Introdução"` precisa das aspas) |
| O item não aparece | Arquivo fora da pasta certa, nome começando com `_`, ou (no blog) nome sem a data `AAAA-MM-DD-` |
| A página mostra o cabeçalho `---` como texto | Arquivo salvo em UTF-8 **com BOM** — salve sem BOM |
| Item aparece antes da hora | O site publica itens com data futura (`future: true` em `_config.yml`), útil para slides e apresentações preparados antes do evento |
| Link não aparece | O endereço precisa começar com `https://` ou `/assets/...` |
| Apresentação na data errada | Falta `date: AAAA-MM-DD` no cabeçalho |

## Slides em HTML

Apresentações de slides que abrem no navegador (sem PowerPoint), no visual do site — tema claro/escuro, cor de destaque e fonte escolhidos no painel de preferências também valem nos slides.

1. Copie `docs/modelos/slides.md` para `_slides/AAAA-MM-DD-nome.md` (ex.: `_slides/2026-11-20-semana-academica.md`).
2. Preencha o cabeçalho (`titulo`, `evento`, `date`, `local`): a **capa** é gerada sozinha, com seu nome e a UFPA.
3. Escreva os slides em Markdown; separe-os com uma linha contendo só `<!-- slide -->`. Comece cada slide com um título `##`.
4. Recursos: `{: .passos}` logo abaixo de uma lista faz os itens aparecerem um de cada vez; `{: .destaque}` abaixo de um parágrafo cria uma caixa em destaque; código, tabelas, citações e imagens funcionam como no blog.
5. Ligue os slides à apresentação, em `_apresentacoes/…md`: `links: slides: /slides/2026-11-20-semana-academica/` (e, se quiser, `pdf:` com um PDF).

**Durante a apresentação:** → / Espaço / PageDown avançam; ← / PageUp voltam; Home e End vão ao início e ao fim; **F** liga a tela cheia; no celular, deslize o dedo. O endereço acompanha o slide (`…/#5`), então dá para recarregar ou compartilhar um slide específico.

**Gerar PDF:** no navegador, `Ctrl+P` → "Salvar como PDF" (ou o botão de impressora na barra): sai um slide por página, com todos os itens revelados.

Sem JavaScript, os slides aparecem um abaixo do outro, como um documento.

## Versão em inglês

O site existe em português (`/`) e em inglês (`/en/`). O seletor **Português | English** leva à versão equivalente da página; a escolha fica salva no navegador e, nas próximas visitas, o visitante vai direto para a versão no idioma escolhido (quando ela existe).

| Conteúdo | Como traduzir |
|---|---|
| Projetos, trajetória, habilidades, interesses, perfil, menu, textos da interface | Campos `en:` nos arquivos de `_data/` (já preenchidos — **revise as traduções propostas**) |
| Publicações e apresentações | O mesmo arquivo serve aos dois idiomas: use `{ pt: "...", en: "..." }` em título, resumo, evento. Título só no idioma original? Escreva o texto simples e, se ele estiver em inglês, acrescente `idioma: en` (leitores de tela pronunciam corretamente) |
| Apresentação da página inicial | `index.md` (português) e `en/index.md` (inglês) |
| Página de cada seção | `projetos.html` ↔ `en/projects.html` etc. — só o cabeçalho; o conteúdo vem de `_includes/paginas/` (não edite o conteúdo duas vezes) |
| Texto do blog | Opcional: versão em inglês em `_posts/en/AAAA-MM-DD-title.md`, com o **mesmo `ref:`** do original (veja `docs/modelos/post.md`) |

**Textos do blog sem tradução** aparecem só no blog do idioma original; o blog do outro idioma mostra o link "More posts in Portuguese →" / "Mais textos em inglês →". No seletor, eles levam ao blog do outro idioma.

**Campo sem versão em inglês** (por exemplo, um resumo só em português): a página em inglês mostra o original, marcado com `lang="pt-BR"` para leitores de tela.

O vínculo entre versões é o campo `ref:` — mantenha-o igual nas duas versões e diferente entre páginas/textos distintos.

## Buscadores, compartilhamento e RSS

| Recurso | Endereço | Observações |
|---|---|---|
| Mapa do site | `…/portifolio_mylena_reis/sitemap.xml` | Gerado sozinho (plugin `jekyll-sitemap`) com todas as páginas pt/en e os textos do blog. Ficam de fora: o editor de foto e a página 404 (`sitemap: false`) |
| Feeds do blog | `…/feed/pt.xml` e `…/feed/en.xml` | Um por idioma (plugin `jekyll-feed`). O link "RSS do blog" aparece no rodapé quando há textos naquele idioma |
| Página 404 | `404.html` | Exibida pelo GitHub Pages para endereços inexistentes; mensagem em português e inglês |
| Imagem de compartilhamento | `assets/images/og-pt.png` e `og-en.png` | Cartão 1200 × 630 px que aparece ao colar o link no LinkedIn, WhatsApp, Teams |

**Gerar de novo a imagem de compartilhamento** (após trocar a foto, o nome ou a ocupação em `_data/perfil.yml`):

```powershell
cd portifolio_mylena_reis
python docs/ferramentas/gerar-og.py
```

Depois de publicar, cole o endereço no **LinkedIn Post Inspector** (linkedin.com/post-inspector) para atualizar a prévia guardada em cache.

**Google Search Console (opcional, após publicar):** em search.google.com/search-console, adicione a propriedade com o prefixo `https://mylenadosreissobral.github.io/portifolio_mylena_reis/`, confirme a propriedade (método "Tag HTML": copie a meta tag fornecida para `_includes/head.html`) e envie o mapa do site `sitemap.xml`.

> Sobre `robots.txt`: em sites de projeto (`…github.io/nome-do-repositorio/`) os buscadores só leem o `robots.txt` da raiz do domínio, que fica fora deste repositório — por isso ele não existe aqui. O editor de foto está protegido pela meta tag `noindex` e fora do mapa do site.

## Plano de fundo padrão

Em `_config.yml`:

```yaml
plano_de_fundo: liso        # liso | grade | papel | gradiente | riscas | imagem
plano_de_fundo_imagem: ""   # para "imagem": /assets/backgrounds/apresentacao.jpg
```

Para imagem própria: paisagem, 1920 × 1080 px ou mais, JPEG otimizado, sem pessoas identificáveis. Cada visitante ainda pode escolher outro fundo no painel "Preferências de exibição" (a escolha fica só no navegador dele).

## Foto de perfil

1. Abra o editor: `…/portifolio_mylena_reis/tools/editor-foto.html` (pela pré-visualização ou pelo site publicado).
2. Ajuste recorte, filtros e ajustes; clique em **Baixar JPEG** (480 × 480 px, sem EXIF).
3. Substitua `assets/images/profile.jpg` pelo arquivo baixado.

Use fotos sem terceiros identificáveis. A foto original (`imagens - foto/`) fica fora do projeto.

## Temas e cores

Cores dos temas em `css/variables.css` (tema escuro em dois blocos iguais). Se alterar `--color-bg`, atualize `BACKGROUNDS` em `js/preferences.js`. Preferências do visitante ficam no `localStorage` (`portfolio.theme`, `portfolio.textSize`, `portfolio.font`, `portfolio.accent`, `portfolio.background`, `portfolio.backgroundImage`); o script no `<head>` (`_includes/head.html`) usa as mesmas chaves.

---

## Dados pendentes de confirmação

- **Projetos:** estado de cada projeto (nenhum confirmado); MiniDB sem repositório público (seria `bd_2_gustavo_pinto_2026`?); tecnologias do LuaPDF.
- **Trajetória:** grau, ingresso e previsão de conclusão na UFPA; SEMAS-PA (vínculo, setor, período, o que pode ser divulgado).
- **Pesquisa:** tema e orientação do TCC; publicações e apresentações.
- **Habilidades:** levantadas dos repositórios (nível `projeto`) — confirme e complete.
- **Traduções para o inglês:** propostas por mim; revise em especial a apresentação, o nome da SEMAS-PA e os nomes traduzidos dos projetos.
- **Currículo em PDF** e **imagem de compartilhamento** (`og:image`): não fornecidos.
