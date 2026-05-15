const https = require('https');
const http = require('http');

const urls = [
  {id:'go', url:'https://go.dev/favicon.ico', alt:'https://go.dev/images/favicon-gopher.png'},
  {id:'office', url:'https://www.onlyoffice.com/favicon.ico', alt:'https://www.onlyoffice.com/images/favicon.ico'},
  {id:'typora', url:'https://typora.io/img/icon_256x256.png', alt:'https://typora.io/img/favicon-32x32.png'},
  {id:'ftp', url:'https://filezilla-project.org/favicon.ico', alt:''},
  {id:'video', url:'https://www.videolan.org/favicon.ico', alt:''},
  {id:'zap', url:'https://www.zaproxy.org/favicon.ico', alt:''},
  {id:'transmission', url:'https://transmissionbt.com/favicon.ico', alt:''},
  {id:'vmware', url:'https://www.vmware.com/favicon.ico', alt:''},
  {id:'wechat', url:'https://weixin.qq.com/favicon.ico', alt:''},
  {id:'rime', url:'https://rime.im/favicon.ico', alt:''},
  {id:'github-cli', url:'https://cli.github.com/favicon.ico', alt:''},
  {id:'httpie', url:'https://httpie.io/favicon.ico', alt:''},
  {id:'opera-gx', url:'https://www.opera.com/favicon.ico', alt:''},
  {id:'zonealarm', url:'https://www.zonealarm.com/favicon.ico', alt:''},
  {id:'chrome', url:'https://www.google.com/favicon.ico', alt:''},
];

function get(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {timeout:8000}, (res) => {
      resolve({status: res.statusCode, type: res.headers['content-type']});
    });
    req.on('error', e => resolve({status:0, error:e.message}));
    req.on('timeout', () => { req.destroy(); resolve({status:0, error:'timeout'}); });
  });
}

(async () => {
  for (const u of urls) {
    const r1 = await get(u.url);
    let r2 = {status:'skip'};
    if (u.alt) r2 = await get(u.alt);
    console.log(u.id + ': GET ' + u.url + ' => ' + r1.status + (r1.type?' '+r1.type:'') + (r1.error?' err:'+r1.error:'') + (u.alt ? ' | ALT ' + u.alt + ' => ' + r2.status + (r2.error?' err:'+r2.error:'') : ''));
    await new Promise(r=>setTimeout(r,300));
  }
})();
