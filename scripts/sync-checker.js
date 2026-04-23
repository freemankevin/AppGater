/**
 * AppGater 工具链接健康检测脚本
 * 每日自动检测所有官方链接的可用性
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 配置文件
const CONFIG = {
  timeout: 15000,           // 请求超时时间 (ms)
  retries: 2,               // 重试次数
  retryDelay: 1000,         // 重试间隔 (ms)
  toolsFile: path.join(__dirname, '../src/data/tools.json'),
};

// 颜色输出
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 检查单个链接
async function checkLink(url, retries = CONFIG.retries) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const startTime = Date.now();
    
    const options = {
      method: 'HEAD',
      timeout: CONFIG.timeout,
      headers: {
        'User-Agent': 'AppGater-HealthChecker/1.0',
        'Accept': '*/*',
      },
    };

    const req = client.request(url, options, (res) => {
      const responseTime = Date.now() - startTime;
      const status = res.statusCode;
      
      // 2xx 和 3xx 都认为是正常的
      const isOk = status >= 200 && status < 400;
      
      resolve({
        status,
        ok: isOk,
        responseTime,
        error: isOk ? null : `HTTP ${status}`,
      });
    });

    req.on('error', (err) => {
      if (retries > 0) {
        log(`  Retrying ${url}... (${retries} left)`, 'yellow');
        setTimeout(() => {
          checkLink(url, retries - 1).then(resolve);
        }, CONFIG.retryDelay);
      } else {
        resolve({
          status: 0,
          ok: false,
          responseTime: Date.now() - startTime,
          error: err.message,
        });
      }
    });

    req.on('timeout', () => {
      req.destroy();
      if (retries > 0) {
        log(`  Timeout, retrying ${url}... (${retries} left)`, 'yellow');
        setTimeout(() => {
          checkLink(url, retries - 1).then(resolve);
        }, CONFIG.retryDelay);
      } else {
        resolve({
          status: 0,
          ok: false,
          responseTime: CONFIG.timeout,
          error: 'Timeout',
        });
      }
    });

    req.end();
  });
}

// 确定工具状态
function determineStatus(checkResult) {
  if (!checkResult.ok) return 'offline';
  if (checkResult.responseTime > 5000) return 'slow';
  return 'online';
}

// 主函数
async function main() {
  log('🚀 AppGater Health Checker Starting...', 'blue');
  log(`📁 Loading tools from ${CONFIG.toolsFile}`);

  // 读取工具数据
  let tools;
  try {
    const data = fs.readFileSync(CONFIG.toolsFile, 'utf8');
    tools = JSON.parse(data);
  } catch (error) {
    log(`❌ Failed to load tools file: ${error.message}`, 'red');
    process.exit(1);
  }

  log(`📊 Found ${tools.length} tools to check\n`, 'blue');

  // 统计
  let stats = {
    total: tools.length,
    online: 0,
    slow: 0,
    offline: 0,
    errors: [],
  };

  // 检测每个工具
  const results = [];
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    const progress = `[${i + 1}/${tools.length}]`;
    
    log(`${progress} Checking ${tool.name}...`);
    
    const check = await checkLink(tool.official);
    const status = determineStatus(check);
    
    // 更新统计
    if (status === 'online') stats.online++;
    else if (status === 'slow') stats.slow++;
    else stats.offline++;

    // 显示结果
    if (status === 'online') {
      log(`  ✓ Online (${check.responseTime}ms)`, 'green');
    } else if (status === 'slow') {
      log(`  ⚠ Slow (${check.responseTime}ms)`, 'yellow');
    } else {
      log(`  ✗ Offline - ${check.error}`, 'red');
      stats.errors.push({ name: tool.name, error: check.error });
    }

    // 构建结果
    results.push({
      ...tool,
      lastChecked: new Date().toISOString(),
      healthStatus: status,
      httpStatus: check.status,
      responseTime: check.responseTime,
      status: status,  // 同步更新状态字段
    });
  }

  // 保存结果
  try {
    fs.writeFileSync(CONFIG.toolsFile, JSON.stringify(results, null, 2));
    log(`\n💾 Results saved to ${CONFIG.toolsFile}`, 'green');
  } catch (error) {
    log(`\n❌ Failed to save results: ${error.message}`, 'red');
    process.exit(1);
  }

  // 打印统计
  log('\n📈 Health Check Summary:', 'blue');
  log(`  Total:   ${stats.total}`, 'blue');
  log(`  Online:  ${stats.online} ✓`, 'green');
  log(`  Slow:    ${stats.slow} ⚠`, 'yellow');
  log(`  Offline: ${stats.offline} ✗`, 'red');
  
  if (stats.errors.length > 0) {
    log('\n⚠️ Failed checks:', 'yellow');
    stats.errors.forEach(({ name, error }) => {
      log(`  - ${name}: ${error}`, 'red');
    });
  }

  log('\n✅ Health check completed!', 'green');
  
  // 如果有失败的链接，以非零退出码结束（可选）
  if (stats.offline > 0) {
    log(`\n⚠️ ${stats.offline} tool(s) are offline`, 'yellow');
  }
}

// 运行
main().catch((error) => {
  log(`\n💥 Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
