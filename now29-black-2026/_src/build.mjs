// Build dos e-mails NOW 29 | Black EBM 2026
//   npm run build:now29-black            -> renderiza imagens + gera HTMLs (imagens relativas)
//   IMG_BASE=https://cdn.../ npm run build:now29-black   -> HTMLs com URLs absolutas
//   SKIP_IMAGES=1 npm run build:now29-black              -> só regenera os HTMLs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve, launch } from './lib.mjs';
import { emails, renderEmail } from './emails.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(SRC, '..');
const IMG_DIR = path.join(OUT, 'images');

// slice -> arquivo de saída
const SLICES = [
  { file: "header.jpg", q: "s=header" },
  { file: "hero-01-acesso.jpg", q: "s=hero&img=perspectiva-acesso.jpg&label=PERSPECTIVA ACESSO&pos=center 55%" },
  { file: "hero-02-piscina.jpg", q: "s=hero&img=perspectiva-piscina.jpg&label=PERSPECTIVA PISCINA&pos=center 60%" },
  { file: "hero-03-fachada.jpg", q: "s=hero&img=perspectiva-fachada.jpg&label=PERSPECTIVA FACHADA&pos=center 22%&h=440" },
  { file: "oferta.jpg", q: "s=oferta" },
  { file: "prazo.jpg", q: "s=prazo" },
  { file: "footer.png", q: "s=footer" },
];

if (!process.env.SKIP_IMAGES) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  const { server, url } = await serve(SRC);
  const browser = await launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 800, deviceScaleFactor: 2 });
  for (const s of SLICES) {
    await page.goto(`${url}/slices.html?${encodeURI(s.q)}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const el = await page.$('.slice:not([hidden])');
    const jpg = s.file.endsWith('.jpg');
    await el.screenshot({ path: path.join(IMG_DIR, s.file), type: jpg ? 'jpeg' : 'png', ...(jpg ? { quality: 84 } : {}) });
    const box = await el.boundingBox();
    console.log(`img  ${s.file}  ${Math.round(box.width)}x${Math.round(box.height)} (@2x)`);
  }
  await browser.close();
  server.close();
}

// tamanhos (em px CSS) para width/height nas tags <img>
const sizes = {};
for (const f of fs.readdirSync(IMG_DIR)) {
  const buf = fs.readFileSync(path.join(IMG_DIR, f));
  let w, h;
  if (f.endsWith('.png')) { w = buf.readUInt32BE(16); h = buf.readUInt32BE(20); }
  else { // JPEG: procura marcador SOF
    for (let i = 2; i < buf.length;) {
      const m = buf[i + 1], len = buf.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xc3) { h = buf.readUInt16BE(i + 5); w = buf.readUInt16BE(i + 7); break; }
      i += 2 + len;
    }
  }
  sizes[f] = { w: Math.round(w / 2), h: Math.round(h / 2) };
}

const base = process.env.IMG_BASE || 'images/';
for (const e of emails) {
  fs.writeFileSync(path.join(OUT, e.file), renderEmail(e, { base, sizes }));
  console.log(`html ${e.file}`);
}
