// Converte uma logo em PDF (vetor) para PNG transparente via pdf.js no Edge.
// Uso: node rasterize-logo.mjs <entrada.pdf> <saida.png> [larguraPx]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve, launch } from './lib.mjs';

const [, , input, output, width = '800'] = process.argv;
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const tmp = path.join(repo, 'node_modules', '.tmp-logo.pdf');
fs.copyFileSync(input, tmp);

const { server, url } = await serve(repo);
const browser = await launch();
const page = await browser.newPage();
await page.goto(`${url}/package.json`);
const dataUrl = await page.evaluate(async (base, w) => {
  const pdfjs = await import(`${base}/node_modules/pdfjs-dist/build/pdf.mjs`);
  pdfjs.GlobalWorkerOptions.workerSrc = `${base}/node_modules/pdfjs-dist/build/pdf.worker.mjs`;
  const doc = await pdfjs.getDocument({ url: `${base}/node_modules/.tmp-logo.pdf` }).promise;
  const pg = await doc.getPage(1);
  const v1 = pg.getViewport({ scale: 1 });
  const vp = pg.getViewport({ scale: w / v1.width });
  const c = document.createElement('canvas');
  c.width = Math.round(vp.width); c.height = Math.round(vp.height);
  await pg.render({ canvasContext: c.getContext('2d'), viewport: vp, background: 'rgba(0,0,0,0)' }).promise;
  // recorta área vazia ao redor
  const ctx = c.getContext('2d');
  const d = ctx.getImageData(0, 0, c.width, c.height).data;
  let x0 = c.width, y0 = c.height, x1 = 0, y1 = 0;
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
    if (d[(y * c.width + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  const o = document.createElement('canvas');
  o.width = x1 - x0 + 1; o.height = y1 - y0 + 1;
  o.getContext('2d').drawImage(c, -x0, -y0);
  return o.toDataURL('image/png');
}, url, Number(width));
fs.writeFileSync(output, Buffer.from(dataUrl.split(',')[1], 'base64'));
fs.unlinkSync(tmp);
await browser.close(); server.close();
console.log('ok', output);
