const { chromium } = require('playwright');
const path = require('path');

// 必要に応じて書き換えてください
const storageStatePath = path.join(__dirname, '../storageState/github.json');
// キャプチャしたいGitHubのURL（GITHUB_REPO_URL 環境変数で対象リポジトリを変更可能）
const repoUrl = process.env.GITHUB_REPO_URL || 'https://github.com/hihats/auto-capturize';
const targetUrl = `${repoUrl.replace(/\/+$/, '')}/settings/code-quality`;

// 保存先
const outputPath = path.join(__dirname, '../assets/code_quality_latest.png');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: storageStatePath
  });
  const page = await context.newPage();
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  // 必要ならログイン済み確認やダイアログスキップも追加
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log('Screenshot saved:', outputPath);

  await browser.close();
})();
