const { chromium } = require('playwright');

// コマンドライン引数: 1: ログインページのURL 2: 出力storageStateファイル名
const [,, targetUrl, stateFile] = process.argv;

if (!targetUrl || !stateFile) {
  console.error('使い方: node scripts/auth/recordStorageState.js <ログインページURL> <出力ファイルパス>\n例: node scripts/auth/recordStorageState.js https://github.com/login storageState/github.json');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(targetUrl);

  console.log('手動でログイン処理を進めてください（2FA/SSOも可）。\n完了したら ENTER を押して続行します。');
  process.stdin.resume();
  await new Promise(resolve => process.stdin.once('data', resolve));

  await context.storageState({ path: stateFile });
  console.log(`storageStateを ${stateFile} に保存しました。`);
  await browser.close();
  process.exit();
})();