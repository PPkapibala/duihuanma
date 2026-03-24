const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const https = require('https');

// PlantUML base64 alphabet (see https://plantuml.com/text-encoding)
const PLANTUML_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

function deflateSync(str) {
  return zlib.deflateRawSync(Buffer.from(str, 'utf8'), { level: 9 });
}

function encode64PlantUML(data) {
  let out = '';
  for (let i = 0; i < data.length; i += 3) {
    const b0 = data[i];
    const b1 = i + 1 < data.length ? data[i + 1] : 0;
    const b2 = i + 2 < data.length ? data[i + 2] : 0;
    const n = (b0 << 16) | (b1 << 8) | b2;
    out += PLANTUML_ALPHABET[(n >> 18) & 63];
    out += PLANTUML_ALPHABET[(n >> 12) & 63];
    out += PLANTUML_ALPHABET[(n >> 6) & 63];
    out += PLANTUML_ALPHABET[n & 63];
  }
  const pad = data.length % 3;
  if (pad === 1) return out.slice(0, -2);
  if (pad === 2) return out.slice(0, -1);
  return out;
}

function encodePlantUML(text) {
  const compressed = deflateSync(text);
  return encode64PlantUML(compressed);
}

function fetchPng(encoded) {
  return new Promise((resolve, reject) => {
    const url = 'https://www.plantuml.com/plantuml/png/' + encoded;
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

const files = [
  { puml: 'flow-1-申请流程与基础配置.puml', png: 'flow-1-申请流程与基础配置.png' },
  { puml: 'flow-2-单人兑换码.puml', png: 'flow-2-单人兑换码.png' },
  { puml: 'flow-3-复用兑换码.puml', png: 'flow-3-复用兑换码.png' },
];

(async () => {
  const dir = __dirname;
  for (const { puml, png } of files) {
    const pumlPath = path.join(dir, puml);
    const pngPath = path.join(dir, png);
    const text = fs.readFileSync(pumlPath, 'utf8');
    const encoded = encodePlantUML(text);
    console.log('Fetching', png, '...');
    const buf = await fetchPng(encoded);
    fs.writeFileSync(pngPath, buf);
    console.log('Written', pngPath);
  }
  console.log('Done.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
