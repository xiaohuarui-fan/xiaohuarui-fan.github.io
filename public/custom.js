// ========== 1. 首页加 .home class ==========
(function() {
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    document.body.classList.add('home');
  }
})();

// ========== 2. 标题右边插入 GIF ==========
(function() {
  var logo = document.getElementById('logo');
  if (!logo) return;
  
  // 避免重复插入
  if (logo.querySelector('.title-gif')) return;
  
  var img = document.createElement('img');
  img.src = '/image/wel.gif';   // ← 你的GIF文件名
  img.alt = '';
  img.className = 'title-gif';
  
  logo.appendChild(img);
})();

// ========== 3. 章节翻页导航 ==========
(function() {
  var match = window.location.pathname.match(/\/ch(\d+)\/?$/);
  if (!match) return;
  
  var currentNum = parseInt(match[1]);
  var basePath = window.location.pathname.replace(/ch\d+\/?$/, '');
  
  var prevUrl = currentNum > 1 ? basePath + 'ch' + (currentNum - 1) + '/' : null;
  var nextUrl = basePath + 'ch' + (currentNum + 1) + '/';
  
  var navHtml = '<div class="chapter-nav" style="display:flex;justify-content:space-between;align-items:center;margin-top:50px;padding:25px 0;border-top:2px dashed #A8D0F8;font-size:16px;">';
  
  if (prevUrl) {
    navHtml += '<a href="' + prevUrl + '" style="color:#4A90E2;text-decoration:none;padding:8px 16px;border:1px solid #4A90E2;border-radius:4px;transition:all 0.3s;">← 上一章</a>';
  } else {
    navHtml += '<span></span>';
  }
  
  navHtml += '<a href="' + basePath + '" style="color:#4A90E2;text-decoration:none;padding:8px 16px;border:1px solid #4A90E2;border-radius:4px;transition:all 0.3s;">📖 目录</a>';
  
  navHtml += '<a href="' + nextUrl + '" id="next-chapter" style="color:#4A90E2;text-decoration:none;padding:8px 16px;border:1px solid #4A90E2;border-radius:4px;transition:all 0.3s;">下一章 →</a>';
  navHtml += '</div>';
  
  var article = document.querySelector('.article-inner, .post-content, article, .content');
  if (article) {
    article.insertAdjacentHTML('beforeend', navHtml);
  }
  
  fetch(nextUrl, { method: 'HEAD' })
    .then(function(r) {
      if (!r.ok) {
        var nextLink = document.getElementById('next-chapter');
        if (nextLink) nextLink.style.display = 'none';
      }
    })
    .catch(function() {
      var nextLink = document.getElementById('next-chapter');
      if (nextLink) nextLink.style.display = 'none';
    });
})();