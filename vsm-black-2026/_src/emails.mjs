// Conteúdo e template dos 3 e-mails VSM | Black EBM 2026
// Redação: E-MAILS MKT/VIDA SAMAMBAIA/VSM 0027-26 BLACK FRIDAY - E-MAIL MKT.pdf

// Link dos botões. Troque aqui (ou CTA_URL=... no build) quando tiver a LP/WhatsApp com UTM.
const CTA_URL = process.env.CTA_URL || '#';

const LEGAL = '*Campanha válida até 30/11/2026. Consulte condições e unidades participantes com a equipe de vendas. R1-373.946.';

const OFERTA_ALT = 'Até R$ 5 mil + 3 meses de condomínio grátis*. ITBI e registro grátis*.';

export const emails = [
  {
    file: 'email-01-abertura.html',
    subject: 'A Black EBM começou. Seu apê já está pronto!',
    preheader: 'Vida Samambaia pronto para morar, com ITBI e registro grátis.*',
    h1: ['A Black começou.', 'Sua mudança pode ser agora!'],
    blocks: [
      { text: 'Seu novo apê já está pronto no Vida Samambaia. Aproveite a Black EBM para dar o próximo passo: sair do aluguel e conquistar seu 2 quartos em condomínio fechado, com lazer completo.' },
      { img: 'hero-01-acesso.jpg', alt: 'Vida Samambaia, Samambaia. Pronto para morar. Perspectiva do acesso.' },
      { img: 'oferta.jpg', alt: OFERTA_ALT },
    ],
    cta: 'Quero mudar ainda este ano',
  },
  {
    file: 'email-02-reforco.html',
    subject: 'Seu Vida Samambaia com ITBI e registro grátis*',
    preheader: 'Aproveite ITBI e registro grátis* para conquistar seu apartamento no Vida Samambaia.',
    h1: ['Aproveite a Black pra', 'dar adeus ao aluguel.'],
    blocks: [
      { text: 'A Black EBM é a oportunidade para tirar a compra do apê dos planos. No Vida Samambaia, você encontra 2 quartos, condomínio fechado e lazer completo para viver sua nova fase.' },
      { img: 'hero-02-piscina.jpg', alt: 'Vida Samambaia, Samambaia. Pronto para morar. Perspectiva da piscina.' },
      { text: 'Seu novo começo tem muito mais para aproveitar. Piscina, academia e espaços para curtir com a família fazem parte do seu próximo endereço em Samambaia.' },
      { text: 'Fale com um consultor, faça sua simulação e conheça as condições para conquistar seu apê pronto para morar.', strong: true },
      { img: 'oferta.jpg', alt: OFERTA_ALT },
    ],
    cta: 'Quero aproveitar essa condição',
  },
  {
    file: 'email-03-reta-final.html',
    subject: 'Até 30/11 para aproveitar a Black da EBM.',
    preheader: 'Seu novo apê já está pronto para morar. Não espere a Black acabar.',
    h1: ['Últimos dias de Black.', 'Hora de dar o próximo passo!'],
    blocks: [
      { text: 'Ainda dá tempo de aproveitar a Black EBM para conquistar seu Vida Samambaia. Seu apê de 2 quartos, em condomínio fechado e com lazer completo, já está pronto.' },
      { text: 'A campanha termina em 30/11. Fale com um consultor e conheça as condições para fazer do Vida Samambaia o seu novo endereço.', strong: true },
      { img: 'hero-03-fachada.jpg', alt: 'Vida Samambaia, Samambaia. Pronto para morar. Foto real da fachada.' },
      { img: 'prazo.jpg', alt: 'Aproveite até 30/11.' },
      { img: 'oferta.jpg', alt: OFERTA_ALT },
    ],
    cta: 'Quero aproveitar antes de acabar',
  },
];

const BG = '#1E0A04';
const OUTER = '#0F0502';
const YELLOW = '#FFC20E';
const TEXT = '#F3E6DF';
const FONT = "'Montserrat','Segoe UI',Arial,Helvetica,sans-serif";

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function img(name, alt, { base, sizes }, pad = '0') {
  const { w, h } = sizes[name];
  return `
          <tr>
            <td align="center" style="padding:${pad};background-color:${BG};">
              <img src="${base}${name}" width="${w}" height="${h}" alt="${esc(alt)}" class="fluid" style="display:block;width:100%;max-width:${w}px;height:auto;border:0;outline:none;text-decoration:none;color:${TEXT};font-family:${FONT};font-size:16px;line-height:22px;background-color:${BG};">
            </td>
          </tr>`;
}

function text(t, strong) {
  return `
          <tr>
            <td class="px" style="padding:0 48px 20px;background-color:${BG};font-family:${FONT};font-size:17px;line-height:27px;color:${strong ? '#FFFFFF' : TEXT};${strong ? 'font-weight:600;' : ''}text-align:center;">
              ${esc(t)}
            </td>
          </tr>`;
}

function button(label) {
  return `
          <tr>
            <td align="center" class="px" style="padding:8px 48px 40px;background-color:${BG};">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${CTA_URL}" style="height:60px;v-text-anchor:middle;width:440px;" arcsize="50%" stroke="f" fillcolor="${YELLOW}">
                <w:anchorlock/>
                <center style="color:#2A0904;font-family:Arial,sans-serif;font-size:17px;font-weight:bold;text-transform:uppercase;">${esc(label)}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${CTA_URL}" target="_blank" class="btn" style="display:inline-block;background-color:${YELLOW};color:#2A0904;font-family:${FONT};font-size:17px;line-height:22px;font-weight:800;letter-spacing:.3px;text-transform:uppercase;text-decoration:none;padding:19px 40px;border-radius:999px;box-shadow:0 0 24px rgba(255,170,20,.45);mso-hide:all;">${esc(label)}&nbsp;&rarr;</a>
              <!--<![endif]-->
            </td>
          </tr>`;
}

export function renderEmail(e, ctx) {
  const body = e.blocks.map(b => b.img
    ? img(b.img, b.alt, ctx, b.img.startsWith('hero') ? '4px 0 0' : '0')
    : text(b.text, b.strong)).join('');

  return `<!doctype html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<!-- ASSUNTO: ${esc(e.subject)} -->
<!-- PRÉ-HEADER: ${esc(e.preheader)} -->
<title>${esc(e.subject)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>td,th,div,p,a,h1{font-family:Arial,sans-serif !important;}</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet">
<!--<![endif]-->
<style>
  :root{color-scheme:dark;supported-color-schemes:dark;}
  html,body{margin:0 !important;padding:0 !important;width:100% !important;background-color:${OUTER};}
  *{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
  img{-ms-interpolation-mode:bicubic;}
  a{text-decoration:none;}
  a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;}
  u + #body a{color:inherit;text-decoration:none;}
  @media only screen and (max-width:620px){
    .container{width:100% !important;}
    .fluid{width:100% !important;max-width:100% !important;height:auto !important;}
    .px{padding-left:24px !important;padding-right:24px !important;}
    .h1{font-size:22px !important;line-height:28px !important;}
    .btn{display:block !important;padding:18px 16px !important;font-size:15px !important;}
  }
</style>
</head>
<body id="body" style="margin:0;padding:0;background-color:${OUTER};">
  <!-- pré-header (oculto) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${OUTER};opacity:0;">
    ${esc(e.preheader)}${'&#8199;&#65279;&#847; '.repeat(40)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${OUTER};">
    <tr>
      <td align="center" style="padding:0;">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${BG};">
${img('header.jpg', 'Black EBM', ctx)}
          <tr>
            <td class="px" style="padding:6px 28px 18px;background-color:${BG};text-align:center;">
              <h1 class="h1" style="margin:0;font-family:${FONT};font-size:27px;line-height:34px;font-weight:800;text-transform:uppercase;letter-spacing:.2px;color:#FFFFFF;">
                ${esc(e.h1[0])}<br><span style="color:${YELLOW};">${esc(e.h1[1])}</span>
              </h1>
            </td>
          </tr>${body}${button(e.cta)}
${img('footer.png', 'Aqui, sua compra é pra vida toda. Vida Samambaia | EBM', ctx)}
          <tr>
            <td class="px" style="padding:4px 48px 36px;background-color:${BG};font-family:${FONT};font-size:11px;line-height:17px;color:#A88A7C;text-align:center;">
              ${esc(LEGAL).replace(/(R1-[0-9.]+)/, '<span style="white-space:nowrap;">$1</span>')}
            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
