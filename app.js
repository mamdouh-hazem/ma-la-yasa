(function () {
  // book: open cover, turn to a random page, close (same flow as the Ezzayyak book)
  var book = document.getElementById('book');
  var pagesEl = document.getElementById('bookPages');
  var hintEl = document.getElementById('bookHint');
  var leaf = book.querySelector('.leaf'), front = book.querySelector('.leaf-front');
  var pages = [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return 'bp' + i + '.jpg'; });
  pages.forEach(function (p) { var im = new Image(); im.src = p; });
  var url = function (i) { return 'url(' + pages[i] + ')'; };
  var hints = ['اضغط على الكتاب لفتحه', 'اضغط لصفحة أخرى', 'اضغط لإغلاق الكتاب'];
  var labels = ['افتح الكتاب', 'اعرض صفحة أخرى', 'أغلق الكتاب'];
  var busy = false;
  function hold(ms) { busy = true; setTimeout(function () { busy = false; }, ms); }
  function step() {
    if (busy) return;
    var st = +book.getAttribute('data-state'), cur = +book.getAttribute('data-page');
    var next = st === 0 ? 1 : st === 1 ? 2 : 0;
    if (st === 0) {
      pagesEl.style.backgroundImage = url(0); book.setAttribute('data-page', 0);
      book.classList.add('is-open'); hold(1100);
    } else if (st === 1) {
      var n = cur; while (n === cur) n = 1 + Math.floor(Math.random() * (pages.length - 1));
      front.style.backgroundImage = url(cur); pagesEl.style.backgroundImage = url(n);
      leaf.classList.remove('is-turn'); void leaf.offsetWidth; leaf.classList.add('is-turn');
      book.setAttribute('data-page', n); hold(1000);
      setTimeout(function () { leaf.classList.remove('is-turn'); }, 1000);
    } else {
      book.classList.remove('is-open'); hold(1100);
    }
    book.setAttribute('data-state', next);
    hintEl.textContent = hints[next];
    book.setAttribute('aria-label', labels[next]);
  }
  book.addEventListener('click', step);

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
