---
# ============================================================================
# MODELO DE SLIDES EM HTML — copie para _slides/ com data e nome curto,
# por exemplo: _slides/2026-11-20-semana-academica.md
# O endereço será …/slides/2026-11-20-semana-academica/
# A CAPA é gerada sozinha com: titulo, evento, data, local, seu nome e a UFPA.
# Depois, ligue os slides à apresentação em _apresentacoes/, no campo
#   links:
#     slides: /slides/2026-11-20-semana-academica/
# ============================================================================
titulo:
  pt: "Título da apresentação"
  en: "Talk title"          # opcional
evento: "Nome do evento — UFPA"
date: 2026-11-20
local: "Belém, PA"
# lang: en                  # use se os slides forem em inglês
---

## Primeiro slide

Cada slide começa, de preferência, com um título `##`.

- Listas, **negrito**, *itálico*, [links](https://exemplo.com) e `código`
- Imagens: `![descrição](/portifolio_mylena_reis/assets/images/slides/figura.png)`

<!-- slide -->

## Separando slides

O comentário `<!-- slide -->`, sozinho numa linha, começa um novo slide.

<!-- slide -->

## Itens um de cada vez

- Aparece primeiro
- Depois este
- Por último este
{: .passos}

<!-- slide -->

## Frase em destaque

Uma frase importante, em caixa destacada.
{: .destaque}

<!-- slide -->

## Código e tabelas

```python
print("blocos de código quebram linha automaticamente")
```

| Coluna | Coluna |
|---|---|
| valor | valor |

<!-- slide -->

## Obrigada!

> Perguntas?
