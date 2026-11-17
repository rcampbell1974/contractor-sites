import sharp from 'sharp';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
const base = 'https://act.floot.app/_cdn/static/';
const imgs = { hero:'db5d2eff-b4d3-4934-a6a3-bbefaa25424a', skyline:'b06cbdbd-1cf5-4739-b9dc-4bf15aa90541', sedan:'d4ff57ec-02ec-429a-aa64-9c9f190593ae', suv:'15d260be-cba3-4386-a2de-2e1618fd4fdf', limousine:'f70fb9f6-8e22-4455-b3de-b6eb9d3db751', 'party-bus':'ba19d8bb-a959-4533-918b-f3874f590095' };
mkdirSync('public/img', { recursive: true });
for (const [k, id] of Object.entries(imgs)) {
  const out = `public/img/${k}.webp`;
  if (existsSync(out)) continue;
  const r = await fetch(`${base}${id}.png`);
  if (!r.ok) throw new Error(`image ${k} failed: ${r.status}`);
  const buf = await sharp(Buffer.from(await r.arrayBuffer())).resize({ width: k==='hero'||k==='skyline'?1600:900, withoutEnlargement:true }).webp({ quality: 72 }).toBuffer();
  writeFileSync(out, buf);
}
