const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

// 检测异常的图标 ID 列表
const brokenIds = new Set([
  'go', 'office', 'typora', 'ftp', 'ocr', 'video', 'tablego',
  'chromedriver', 'chrome', 'zap', 'neatdm', 'transmission',
  'winmtr', 'intel-driver', 'eraser', 'vmware-workstation',
  'zonealarm', 'google-pinyin', 'spotonthemouse',
  'swordsoft-mousetrack', 'pear-rec', 'potplayer', 'squoosh',
  'usbpcap', 'opera-gx', 'wechat', 'rime', 'powertoys', 'jq',
  'github-cli', 'httpie'
]);

let fixed = 0;
for (const tool of tools) {
  if (brokenIds.has(tool.id) && tool.logo) {
    delete tool.logo;
    fixed++;
  }
}

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2) + '\n');
console.log(`已清理 ${fixed} 个异常图标配置，保留 ${tools.length - fixed} 个可用外部图标。`);
