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

// ========== 雪花飘落 ==========
(function() {
  // 只在首页显示雪花（如果你想所有页面都有，删掉下面这行 if）
  if (!document.body.classList.contains('home')) return;

  const container = document.createElement('div');
  container.className = 'snow-container';
  document.body.appendChild(container);

  const snowCount = 40;  // 雪花数量，越多越密
  const snowChars = ['❄', '✦', '•', '◦'];

  for (let i = 0; i < snowCount; i++) {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.innerText = snowChars[Math.floor(Math.random() * snowChars.length)];

    // 随机参数，让每片雪花都不一样
    const left = Math.random() * 100;      // 水平位置 0-100%
    const duration = 2 + Math.random() * 12;  // 下落速度 6-18秒
    const delay = Math.random() * 15;      // 延迟出现 0-15秒
    const size = 15 + Math.random() * 14;  // 大小 10-24px
    const opacity = 0.4 + Math.random() * 0.5;

    flake.style.left = left + '%';
    flake.style.animationDuration = duration + 's';
    flake.style.animationDelay = delay + 's';
    flake.style.fontSize = size + 'px';
    flake.style.opacity = opacity;

    container.appendChild(flake);
  }
})();

// ========== 侧边栏标题旁蝴蝶结图片 ==========
(function() {
  // 直接找所有标题
  const titles = document.querySelectorAll('.widget-title');
  
  titles.forEach(title => {
    // 避免重复添加
    if (title.querySelector('.widget-bow-img')) return;

    // 让标题变成 flex 布局，文字和图片在同一行两端对齐
    title.style.display = 'flex';
    title.style.justifyContent = 'space-between';
    title.style.alignItems = 'center';
     title.style.width = '100%';

    // 创建蝴蝶结图片
    const img = document.createElement('img');
    img.src = '/image/hudiejie.png';
    img.className = 'widget-bow-img';
    img.alt = '';

    title.appendChild(img);
  });
})();

