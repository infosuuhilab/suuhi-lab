// ===== 数秘簡易診断 =====
(function() {
  var yearSel = document.getElementById('suuhi-year');
  var monthSel = document.getElementById('suuhi-month');
  var daySel = document.getElementById('suuhi-day');
  var btn = document.getElementById('suuhi-btn');
  var result = document.getElementById('suuhi-result');
  var resultNumber = document.getElementById('suuhi-result-number');
  var resultKeyword = document.getElementById('suuhi-result-keyword');
  var resultDesc = document.getElementById('suuhi-result-desc');
  var catWork = document.getElementById('suuhi-cat-work');
  var catLife = document.getElementById('suuhi-cat-life');
  var catMoney = document.getElementById('suuhi-cat-money');
  var catLove = document.getElementById('suuhi-cat-love');
  if (!yearSel) return;

  function addOpt(sel, val, txt) {
    var o = document.createElement('option');
    o.value = val; o.textContent = txt;
    sel.appendChild(o);
  }
  addOpt(yearSel, '', '----');
  for (var y = 2010; y >= 1940; y--) addOpt(yearSel, y, y);
  addOpt(monthSel, '', '--');
  for (var m = 1; m <= 12; m++) addOpt(monthSel, m, m);
  addOpt(daySel, '', '--');
  for (var d = 1; d <= 31; d++) addOpt(daySel, d, d);

  var data = {
    1:  { keyword: '開拓者・リーダー',     desc: '自分の道を切り開く強い意志の持ち主。\n人に頼らず独立独歩で進む姿勢が才能です。',
          cats: { work: '挑戦と立ち上げの場で輝くタイプ。\nリーダーポジションで本領を発揮します。',
                  life: '人に流されず、自分のペースで進むことが大切。\n朝の時間を「自分のため」に使うと運気が整います。',
                  money: 'コツコツより一点集中の投資・自己投資が向く。\n自分が決めたものに使うと巡りがよくなります。',
                  love: '受け身では出会いが進まないタイプ。\n惹かれた人には自分から動くと関係が深まります。' } },
    2:  { keyword: '協調・サポーター',     desc: '人の気持ちに寄り添う共感力が天才的。\n縁の下の力持ちとして、周囲に安心感を与えます。',
          cats: { work: 'チームの調整役・サポート役で力を発揮。\n2人組のパートナーシップで成果が倍増します。',
                  life: '一人で抱え込まず、誰かと話す時間を持つこと。\n感受性が強いので、休む環境づくりが鍵です。',
                  money: '感情で動くと損をしやすいタイプ。\n信頼できる人と相談しながら決めるのが◎。',
                  love: '尽くしすぎて疲れやすい傾向。\n「自分の気持ち」を先に伝える練習が幸せを呼びます。' } },
    3:  { keyword: '創造・表現者',         desc: '豊かな感性と表現力で人を惹きつける才能。\nアイデアと言葉で世界を彩ることができます。',
          cats: { work: 'クリエイティブ・発信・人前に立つ仕事が天職。\n楽しさを優先するほど結果がついてきます。',
                  life: '楽しさを我慢すると枯れてしまうタイプ。\n「ワクワク」を生活の中心に置くことが大切。',
                  money: '楽しい体験への出費は良い循環を生む。\nただし衝動買いは要注意。',
                  love: 'ノリと会話のテンポが合う人と相性◎。\n暗くて重い関係は本来のあなたを消してしまいます。' } },
    4:  { keyword: '堅実・努力家',         desc: 'コツコツと積み上げる力が誰よりも強い。\n信頼と実績を着実に築いていくタイプです。',
          cats: { work: '安定・継続・専門性で評価されるタイプ。\n短期勝負より長期戦で勝てる人です。',
                  life: 'ルーティンを整えると一気に運気が上がる。\n寝具・水・食を整えることが特に効果的。',
                  money: '貯蓄・積立が抜群に向く堅実派。\n固定費の見直しから始めると◎。',
                  love: '時間をかけて信頼を築くタイプ。\n安心感のある相手と長く続く関係になります。' } },
    5:  { keyword: '自由・冒険者',         desc: '変化と刺激の中で輝く自由な魂の持ち主。\n好奇心と行動力で新しい世界を切り開きます。',
          cats: { work: '同じ場所に留まると窮屈になるタイプ。\n変化のある仕事・複数の収入源が向いています。',
                  life: '旅・移動・新しい体験がエネルギー源。\n「束縛」を感じると一気に元気を失います。',
                  money: '体験への投資がリターンを生むタイプ。\nお金を「動かす」ことを意識すると流れが変わります。',
                  love: '自由を尊重してくれる相手と長続き。\n束縛・干渉が多い関係はあなたを枯らします。' } },
    6:  { keyword: '愛情・調和',           desc: '深い愛情と美意識で周囲を包み込む存在。\n人と人をつなぐ才能があります。',
          cats: { work: '人を育てる・場を整える仕事が天職。\n美容・教育・ホスピタリティとの相性が抜群です。',
                  life: '住空間・身の回りの美しさが運気に直結。\n部屋を整えるだけで気分も流れも変わります。',
                  money: '人や家族のために使うお金が良縁を呼ぶ。\nただし尽くしすぎ・貸しすぎには注意。',
                  love: '面倒見がよく、愛情深いパートナー。\n「自分の幸せ」も同じくらい大切にすると満たされます。' } },
    7:  { keyword: '探究・哲学者',         desc: '真実を追い求める深い知性の持ち主。\n直感と分析力で物事の本質を見抜きます。',
          cats: { work: '専門性・研究・分析の領域で力を発揮。\n一人で集中できる環境が成果を生みます。',
                  life: '一人時間が「充電」になるタイプ。\n読書・自然・静けさが心を整えてくれます。',
                  money: '感情より論理で判断するタイプ。\nじっくり調べてから動くと失敗が少ない。',
                  love: '心を開くまで時間がかかる繊細なタイプ。\n知性で響き合える相手と深い関係になります。' } },
    8:  { keyword: '成功・野心家',         desc: '結果にこだわり、大きな目標を実現する力がある。\nお金と成功を引き寄せるエネルギーの持ち主です。',
          cats: { work: '大きな組織・大きな数字を扱う仕事が向く。\n責任を持つほど力を発揮するタイプ。',
                  life: '休むことに罪悪感を持ちやすい傾向。\n「意識的にOFFを作る」ことが長期的な勝利の鍵。',
                  money: '稼ぐ力・動かす力ともに強いタイプ。\n投資・事業など「攻めの財運」が育ちやすい。',
                  love: '対等な相手・尊敬できる相手と長続き。\n弱さを見せられる人がそばにいると満たされます。' } },
    9:  { keyword: '奉仕・完成者',         desc: '広い視野と深い愛で人類に貢献する使命を持つ。\n許しと慈悲の心で周囲を癒す存在です。',
          cats: { work: '誰かの役に立つ仕事で本領を発揮。\n医療・福祉・教育・支援系との相性が抜群。',
                  life: '感受性が高く、影響を受けやすいタイプ。\nニュースや人混みから離れる時間を意識して。',
                  money: '人のために使うお金が巡りを良くする。\nただし「自分への投資」も忘れずに。',
                  love: '包容力があり、愛を与えるタイプ。\n受け取ることを許すと関係が深まります。' } },
    11: { keyword: '直感・スピリチュアル', desc: '鋭い直感と高い精神性を持つマスターナンバー。\n見えない世界とつながる特別な感受性があります。',
          cats: { work: 'ひらめき・直感を活かす仕事が天職。\n芸術・癒し・スピリチュアル系と相性◎。',
                  life: '繊細さは弱点ではなく才能。\n静かな環境と良質な睡眠が運気を整えます。',
                  money: '直感に従ったお金の使い方が成功を呼ぶ。\n「なんとなく」のひらめきを大切に。',
                  love: '魂レベルで響き合うパートナーと出会う運。\n表面的な関係より深いつながりを求めるタイプ。' } },
    22: { keyword: '大きなビジョン',       desc: '夢を現実に変える力を持つマスタービルダー。\n大きなビジョンで世界に貢献できる器があります。',
          cats: { work: 'スケールの大きな事業・社会貢献が天職。\n組織を作り、人を巻き込む力があります。',
                  life: '使命感が強く、走り続けてしまうタイプ。\n「立ち止まる勇気」が長期的な成功を作ります。',
                  money: '大きな金額を動かす器を持つ。\n社会のためにお金を使うほど巡りが良くなります。',
                  love: '同じビジョンを共有できる相手と長続き。\n仕事と人生のパートナーが重なるタイプ。' } },
    33: { keyword: '慈悲・マスター',       desc: '無条件の愛で人を癒す最高のマスターナンバー。\nその存在自体が周囲に光をもたらします。',
          cats: { work: '人を癒し、導く仕事が天職。\n教育・カウンセリング・医療と深い縁があります。',
                  life: '人のエネルギーを受けやすいタイプ。\n自然・水・静けさが心の浄化になります。',
                  money: '愛と豊かさが循環するタイプ。\n与えることで巡ってくる豊かさを信じて。',
                  love: '愛を与えることが使命のように深い愛情。\n受け取ることを学ぶと関係がより満たされます。' } }
  };

  function calcSuuhi(y, m, d) {
    var digits = String(y) + String(m) + String(d);
    var sum = 0;
    for (var i = 0; i < digits.length; i++) sum += parseInt(digits[i], 10);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      var s = 0, str = String(sum);
      for (var j = 0; j < str.length; j++) s += parseInt(str[j], 10);
      sum = s;
    }
    return sum;
  }

  btn.addEventListener('click', function() {
    var y = yearSel.value, m = monthSel.value, d = daySel.value;
    if (!y || !m || !d) { alert('年・月・日をすべて選択してください'); return; }
    var num = calcSuuhi(parseInt(y), parseInt(m), parseInt(d));
    var info = data[num];
    if (!info) return;

    // Animated number reveal
    result.style.display = 'block';
    resultKeyword.textContent = info.keyword;
    resultDesc.innerHTML = info.desc.replace(/\n/g, '<br>');
    if (info.cats) {
      if (catWork)  catWork.innerHTML  = info.cats.work.replace(/\n/g, '<br>');
      if (catLife)  catLife.innerHTML  = info.cats.life.replace(/\n/g, '<br>');
      if (catMoney) catMoney.innerHTML = info.cats.money.replace(/\n/g, '<br>');
      if (catLove)  catLove.innerHTML  = info.cats.love.replace(/\n/g, '<br>');
    }

    var start = 0;
    var duration = 700;
    var startT = performance.now();
    function tick(t) {
      var p = Math.min(1, (t - startT) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      var current = Math.floor(eased * num);
      resultNumber.textContent = current >= num ? num : Math.max(1, current);
      if (p < 1) requestAnimationFrame(tick);
      else resultNumber.textContent = num;
    }
    requestAnimationFrame(tick);

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        result.classList.add('show');
      });
    });
  });
})();

// ===== Variant Switcher =====
(function() {
  var tabs = document.querySelectorAll('.variant-tab');
  var saved = localStorage.getItem('suuhi-variant') || 'A';
  setVariant(saved);
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var v = tab.dataset.variant;
      setVariant(v);
      localStorage.setItem('suuhi-variant', v);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  function setVariant(v) {
    document.body.dataset.variant = v;
    tabs.forEach(function(t) {
      t.classList.toggle('active', t.dataset.variant === v);
    });
  }
})();

// ===== Motif Switcher (default: stars) =====
(function() {
  var saved = localStorage.getItem('suuhi-motif') || 'stars';
  document.body.dataset.motif = saved;
  window.__setMotif = function(m) {
    document.body.dataset.motif = m;
    localStorage.setItem('suuhi-motif', m);
  };
})();

// ===== Scroll Fade-in =====
(function() {
  var targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  targets.forEach(function(el) { observer.observe(el); });
  window.addEventListener('load', function() {
    targets.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  });
})();
