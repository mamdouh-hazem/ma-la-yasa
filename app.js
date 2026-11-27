(function () {
  // book: opens, turns pages and closes on its own (no tap needed)
  var book = document.getElementById('book');
  var pagesEl = document.getElementById('bookPages');
  var leaf = book.querySelector('.leaf'), front = book.querySelector('.leaf-front');
  var pages = [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return 'bp' + i + '.jpg'; });
  pages.forEach(function (p) { var im = new Image(); im.src = p; });
  var url = function (i) { return 'url(' + pages[i] + ')'; };
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur = 0;
  function later(ms, fn) { setTimeout(fn, ms); }
  function turn() {
    var n = cur; while (n === cur) n = 1 + Math.floor(Math.random() * (pages.length - 1));
    front.style.backgroundImage = url(cur); pagesEl.style.backgroundImage = url(n);
    leaf.classList.remove('is-turn'); void leaf.offsetWidth; leaf.classList.add('is-turn');
    cur = n;
    later(1150, function () { leaf.classList.remove('is-turn'); });
  }
  function cycle() {
    cur = 0; pagesEl.style.backgroundImage = url(0);
    book.classList.add('is-open');
    var t = 2200, k;
    for (k = 0; k < 3; k++) { later(t, turn); t += 2300; }
    later(t, function () { book.classList.remove('is-open'); });
    later(t + 4200, cycle);
  }
  if (!still) later(2500, cycle);

  // table of contents: the 23 parts (v8)
  var parts = [
    'أساسيات لا غنى عنها',
    'كيف تتعامل مع القضايا؟',
    'فن كتابة وصياغة الأعمال القانونية',
    'العمل داخل المحاكم وأقلام الكتاب والنيابات',
    'مهارات المحامي في المرافعة والإقناع وإدارة الجلسة',
    'البحث القانوني والأحكام القضائية والتشريعات',
    'أصول مهنة المحاماة وأخلاقياتها ومسؤوليات المحامي',
    'إدارة مكتب المحاماة والعمل القانوني باحتراف',
    'الشركات والعقود التجارية والمعاملات القانونية للأعمال',
    'القانون المدني والالتزامات والمسؤولية المدنية والتعويض',
    'قانون المرافعات المدنية والتجارية وإجراءات التقاضي',
    'المبادئ الأساسية للقانون الجنائي والإجراءات الجنائية',
    'القانون التجاري والأعمال التجارية والشركات والأوراق التجارية والإفلاس',
    'قانون الشركات عمليًا: التأسيس والإدارة والتعديل والاندماج والتصفية',
    'قانون الإثبات في المواد المدنية والتجارية',
    'القانون الإداري ومنازعات مجلس الدولة',
    'قانون الملكية الفكرية في مصر',
    'الأوراق التجارية في القانون المصري: الكمبيالة والسند الإذني والشيك',
    'قانون حماية المستهلك والمنافسة والممارسات التجارية في مصر',
    'قانون الضرائب في مصر: الضرائب على الدخل والقيمة المضافة والمنازعات الضريبية',
    'الإفلاس وإعادة الهيكلة والصلح الواقي من الإفلاس في القانون المصري',
    'قانون الاستثمار في مصر: تأسيس المشروعات والحوافز والضمانات والمناطق الاستثمارية',
    'قانون العمل والتأمينات الاجتماعية في مصر'
  ];
  var ol = document.getElementById('tocList');
  parts.forEach(function (t) {
    var li = document.createElement('li');
    li.textContent = t;
    ol.appendChild(li);
  });
})();
