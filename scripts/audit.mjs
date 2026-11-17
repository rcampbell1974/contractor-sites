import fs from 'fs'; import path from 'path';
const files=[]; (function walk(d){ for(const f of fs.readdirSync(d)){ const p=path.join(d,f); fs.statSync(p).isDirectory()?walk(p):p.endsWith('.html')&&files.push(p);} })('dist');
const titles=new Map(); let bad=0;
for(const f of files){ const h=fs.readFileSync(f,'utf8');
 const t=(h.match(/<title>(.*?)<\/title>/)||[])[1]||''; const d=(h.match(/name="description" content="(.*?)"/)||[])[1]||'';
 const h1=(h.match(/<h1[ >]/g)||[]).length;
 const err=[]; if(!t||t.length>60)err.push(`title ${t.length}`); if(!d||d.length>155)err.push(`desc ${d.length}`); if(h1!==1)err.push(`h1=${h1}`);
 if(titles.has(t))err.push('dup title'); titles.set(t,f); if(/TODO/.test(h))err.push('TODO content');
 if(err.length){bad++;console.log(f,err.join(', '));} }
console.log(`${files.length} pages, ${bad} with issues`); process.exit(bad?1:0);
