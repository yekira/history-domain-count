// バッジに表示するトータルドメイン数の初期値を設定
chrome.action.setBadgeText({ text: '0' });

function run(){
// 履歴の取得とドメイン数のカウント
chrome.history.search({ text: '', maxResults: 0 }, function(historyItems) {
  var domains = {};
  for (var i = 0; i < historyItems.length; i++) {
    var url = new URL(historyItems[i].url);
    var domain = url.hostname;
    if (!domains[domain]) {
      domains[domain] = true;
    }
  }
  var totalDomains = Object.keys(domains).length;
  // バッジにトータルドメイン数を表示
  chrome.action.setBadgeText({ text: totalDomains.toString() });
});
}

chrome.runtime.onInstalled.addListener(() => {
    run();
});

chrome.runtime.onStartup.addListener(() => {
    run();
});
