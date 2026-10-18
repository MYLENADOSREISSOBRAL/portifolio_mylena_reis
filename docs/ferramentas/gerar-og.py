"""Gera as imagens de compartilhamento (og:image) do site: 1200 × 630 px.

Uso (na pasta do projeto, com Python 3 + Pillow + PyYAML):
    python docs/ferramentas/gerar-og.py

Lê a foto (assets/images/profile.jpg), o nome, a ocupação, a instituição e a
localização de _data/perfil.yml e o endereço de _config.yml, e grava
assets/images/og-pt.png e assets/images/og-en.png.
Rode de novo sempre que trocar a foto ou esses dados. Depois de publicar,
use o Post Inspector do LinkedIn para atualizar a prévia em cache.
"""
import os
import sys

import yaml
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
ESCALA = 2  # desenha em 2× e reduz no fim (bordas suaves)
W, H = 1200, 630

# Cores do site (css/variables.css, tema claro)
FUNDO = "#fafaf7"
TEXTO = "#1c1f22"
SECUNDARIO = "#50575e"
DESTAQUE = "#2b8e9e"
LINK = "#1d6b77"

FONTES = os.path.join(os.environ.get("WINDIR", r"C:\Windows"), "Fonts")


def fonte(nome, tamanho):
    caminho = os.path.join(FONTES, nome)
    if not os.path.exists(caminho):
        sys.exit("Fonte não encontrada: %s (ajuste FONTES no script)" % caminho)
    return ImageFont.truetype(caminho, tamanho * ESCALA)


def ajusta(draw, texto, nome_fonte, tamanho, largura_max):
    """Reduz o tamanho da fonte até o texto caber na largura."""
    while tamanho > 12:
        f = fonte(nome_fonte, tamanho)
        if draw.textlength(texto, font=f) <= largura_max * ESCALA:
            return f
        tamanho -= 1
    return fonte(nome_fonte, tamanho)


def gera(idioma, perfil, endereco):
    s = ESCALA
    img = Image.new("RGB", (W * s, H * s), FUNDO)
    d = ImageDraw.Draw(img)

    # faixa de identidade à esquerda
    d.rectangle([0, 0, 18 * s, H * s], fill=DESTAQUE)

    # foto circular com anel na cor de destaque
    diam, x0, y0, anel = 380, 90, 125, 7
    foto = Image.open(os.path.join(RAIZ, "assets", "images", "profile.jpg")).convert("RGB")
    foto = foto.resize((diam * s, diam * s), Image.LANCZOS)
    mascara = Image.new("L", (diam * s, diam * s), 0)
    ImageDraw.Draw(mascara).ellipse([0, 0, diam * s - 1, diam * s - 1], fill=255)
    d.ellipse([(x0 - anel) * s, (y0 - anel) * s, (x0 + diam + anel) * s, (y0 + diam + anel) * s], fill=DESTAQUE)
    img.paste(foto, (x0 * s, y0 * s), mascara)

    # textos
    xt, largura = 540, W - 540 - 60
    nome = perfil["nome"]
    linhas = [
        (perfil["ocupacao"][idioma], "segoeui.ttf", 34, TEXTO),
        (perfil["instituicao"][idioma], "segoeui.ttf", 32, SECUNDARIO),
        (perfil["localizacao"][idioma], "segoeui.ttf", 30, SECUNDARIO),
    ]
    f_nome = ajusta(d, nome, "segoeuib.ttf", 72, largura)
    d.text((xt * s, 170 * s), nome, font=f_nome, fill=TEXTO)
    d.rectangle([xt * s, 268 * s, (xt + 90) * s, 274 * s], fill=DESTAQUE)
    y = 300
    for texto, nome_fonte, tamanho, cor in linhas:
        f = ajusta(d, texto, nome_fonte, tamanho, largura)
        d.text((xt * s, y * s), texto, font=f, fill=cor)
        y += tamanho + 22
    f_url = ajusta(d, endereco, "segoeuib.ttf", 26, largura)
    d.text((xt * s, 520 * s), endereco, font=f_url, fill=LINK)

    saida = os.path.join(RAIZ, "assets", "images", "og-%s.png" % idioma)
    img.resize((W, H), Image.LANCZOS).save(saida, "PNG", optimize=True)
    print("gerada:", os.path.relpath(saida, RAIZ), "(%d KB)" % (os.path.getsize(saida) // 1024))


def main():
    with open(os.path.join(RAIZ, "_data", "perfil.yml"), encoding="utf-8") as f:
        perfil = yaml.safe_load(f)
    with open(os.path.join(RAIZ, "_config.yml"), encoding="utf-8") as f:
        config = yaml.safe_load(f)
    endereco = (config["url"] + config.get("baseurl", "")).replace("https://", "")
    for idioma in ("pt", "en"):
        gera(idioma, perfil, endereco)


if __name__ == "__main__":
    main()
