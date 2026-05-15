const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const tools = require('../src/data/tools.json');

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https:') ? https : http;
    const req = client.request(url, { method: 'HEAD', timeout: 10000 }, (res) => {
      resolve({ status: res.statusCode, headers: res.headers });
    });
    req.on('error', (err) => resolve({ status: 0, error: err.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'timeout' });
    });
    req.end();
  });
}

async function main() {
  const results = [];
  for (const tool of tools) {
    const logo = tool.logo;
    if (!logo) {
      results.push({ id: tool.id, name: tool.name, logo: null, status: 'missing', ok: false });
      continue;
    }
    process.stdout.write(`Checking ${tool.id} ... `);
    const res = await checkUrl(logo);
    const ok = res.status >= 200 && res.status < 400;
    const contentType = res.headers?.['content-type'] || '';
    results.push({ id: tool.id, name: tool.name, logo, status: res.status, contentType, ok, error: res.error });
    console.log(ok ? `OK (${res.status})` : `FAIL (${res.status}${res.error ? ' ' + res.error : ''})`);
    await new Promise(r => setTimeout(r, 200));
  }

  const failed = results.filter(r => !r.ok);
  const ok = results.filter(r => r.ok);

  console.log('\n========== 汇总 ==========');
  console.log(`总计: ${results.length}`);
  console.log(`正常: ${ok.length}`);
  console.log(`异常: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n--- 异常的图标 ---');
    failed.forEach(r => {
      console.log(`${r.id}: ${r.logo} => ${r.status}${r.error ? ' ('+r.error+')' : ''}`);
    });
  }

  fs.writeFileSync(path.join(__dirname, 'logo-check-results.json'), JSON.stringify({ ok, failed }, null, 2));
  console.log('\n详细结果已保存到 scripts/logo-check-results.json');
}

main();
