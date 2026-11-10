# VSM 0027-26 · Black EBM · E-mail MKT

3 e-mails do Vida Samambaia para a campanha Black EBM 2026.
Redação: `E-MAILS MKT/VIDA SAMAMBAIA/VSM 0027-26 BLACK FRIDAY - E-MAIL MKT.pdf`.

| Arquivo | Assunto | Pré-header |
|---|---|---|
| `email-01-abertura.html` | A Black EBM começou. Seu apê já está pronto! | Vida Samambaia pronto para morar, com ITBI e registro grátis.* |
| `email-02-reforco.html` | Seu Vida Samambaia com ITBI e registro grátis* | Aproveite ITBI e registro grátis* para conquistar seu apartamento no Vida Samambaia. |
| `email-03-reta-final.html` | Até 30/11 para aproveitar a Black da EBM. | Seu novo apê já está pronto para morar. Não espere a Black acabar. |

## Estrutura

- Título, textos, botão e texto legal são HTML de verdade (Montserrat com fallback Arial). O botão tem versão VML para Outlook.
- Header, foto, ofertas neon, faixa "Aproveite até 30/11" e rodapé são imagens em 2x (`images/`), geradas a partir de `_src/slices.html` com os assets finais da campanha (`IDENTIDADE/ABERTO/ASSETS_FINAIS`).

## Imagens hospedadas

Os HTMLs apontam para o jsDelivr, servindo a pasta `images/` da branch `main` deste repositório (público):

```
https://cdn.jsdelivr.net/gh/beatinyx/emails-ebm@main/vsm-black-2026/images/
```

As imagens só ficam no ar depois do merge na `main`. Se uma imagem mudar depois, o cache do jsDelivr pode levar até 12h para atualizar (ou troque o nome do arquivo).

## Gerar de novo

```bash
npm install
IMG_BASE=https://cdn.jsdelivr.net/gh/beatinyx/emails-ebm@main/vsm-black-2026/images/ npm run build:vsm-black
```

Variáveis opcionais:

- `IMG_BASE=https://.../` grava URLs absolutas das imagens nos HTMLs (necessário para disparo).
- `CTA_URL=https://...` define o link dos botões (hoje é `#`).
- `SKIP_IMAGES=1` regenera só os HTMLs.

Para trocar uma foto: substitua o arquivo em `_src/assets/` (ou mude a linha em `SLICES` no `_src/build.mjs`) e rode o build.
