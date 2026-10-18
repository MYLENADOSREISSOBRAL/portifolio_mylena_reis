---
# ============================================================================
# MODELO DE TEXTO DO BLOG — copie para _posts/ com o nome
#   AAAA-MM-DD-titulo-do-texto.md   (ex.: _posts/2026-10-20-primeiros-passos.md)
# A data do nome do arquivo é a data de publicação; o restante vira o endereço:
#   …/blog/titulo-do-texto/
# ============================================================================
title: "Título do texto"
# Identificador que liga este texto à versão em inglês (opcional; use letras
# minúsculas e hífens). A versão em inglês fica em _posts/en/ com o mesmo ref.
ref: titulo-do-texto
# Frase curta exibida na lista do blog (opcional; sem ela, usa o 1º parágrafo)
resumo: "Uma frase que resume o texto."
---

Primeiro parágrafo do texto. Escreva em **Markdown**: *itálico*, **negrito**,
[links](https://exemplo.com) e `código`.

## Um subtítulo

- Item de lista
- Outro item

> Uma citação.

```python
print("Blocos de código também funcionam")
```

Imagens: coloque o arquivo em `assets/images/blog/` e use
`![Descrição da imagem para leitores de tela]({{ '/assets/images/blog/arquivo.jpg' | relative_url }})`.
