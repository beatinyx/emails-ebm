# N29 0027-26 · Black EBM · E-mail MKT

3 e-mails do Now 29 para a campanha Black EBM 2026.
Redação: `E-MAILS MKT/NOW/N29 0027-26 BLACK FRIDAY - E-MAIL MKT.pdf`.

| Arquivo | Assunto | Pré-header |
|---|---|---|
| `email-01-abertura.html` | Black EBM: até R$ 24,5 mil de desconto* | Seu Now 29 com ITBI e registro grátis* e condições facilitadas de financiamento*. |
| `email-02-reforco.html` | Now 29: desconto + ITBI e registro grátis* | Até R$ 24,5 mil de desconto* e condições facilitadas para financiar seu apê*. |
| `email-03-reta-final.html` | Até 30/11: aproveite a Black do Now 29 | Últimos dias para aproveitar até R$ 24,5 mil de desconto* no seu novo apê. |

Reenvio do e-mail 3 em 27/11 com o assunto: **A Black do Now 29 termina em 30/11. Aproveite!**

## Estrutura

- Título, textos, botão e texto legal são HTML de verdade (Montserrat com fallback Arial). O botão tem versão VML para Outlook.
- Header, foto, ofertas neon, faixa "Aproveite até 30/11" e rodapé são imagens em 2x (`images/`), geradas a partir de `_src/slices.html` com os assets finais da campanha (`IDENTIDADE/ABERTO/ASSETS_FINAIS`).

## Imagens hospedadas

Os HTMLs apontam para o jsDelivr, servindo a pasta `images/` da branch `main` deste repositório (público):

```
https://cdn.jsdelivr.net/gh/beatinyx/emails-ebm@main/now29-black-2026/images/
```

As imagens só ficam no ar depois do merge na `main`. Se uma imagem mudar depois, o cache do jsDelivr pode levar até 12h para atualizar (ou troque o nome do arquivo).

## Gerar de novo

```bash
npm install
IMG_BASE=https://cdn.jsdelivr.net/gh/beatinyx/emails-ebm@main/now29-black-2026/images/ npm run build:now29-black
```

Variáveis opcionais:

- `IMG_BASE=https://.../` grava URLs absolutas das imagens nos HTMLs (necessário para disparo).
- `CTA_URL=https://...` define o link dos botões (hoje é `#`).
- `SKIP_IMAGES=1` regenera só os HTMLs.

Para trocar uma foto: substitua o arquivo em `_src/assets/` (ou mude a linha em `SLICES` no `_src/build.mjs`) e rode o build.
