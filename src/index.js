const remSize = parseInt(getComputedStyle(document.documentElement).fontSize);
// 何でも繋がってしまう漢字は意図的に削除 (一二三四五六七八九十百千上下左右)
// const s1a = Array.from('一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六');
const w1_ = Array.from(
  "雨円王音火花貝学気休玉金空月犬見口校山子糸字耳車手出女小森人水正生青夕石赤川先早草足村大男竹中虫町天田土日入年白文木本名目立力林",
);
const w2_ = Array.from(
  "引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話",
);
const w3_ = Array.from(
  "悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和",
);
const w4_ = Array.from(
  "愛案以衣位茨印英栄媛塩岡億加果貨課芽賀改械害街各覚潟完官管関観願岐希季旗器機議求泣給挙漁共協鏡競極熊訓軍郡群径景芸欠結建健験固功好香候康佐差菜最埼材崎昨札刷察参産散残氏司試児治滋辞鹿失借種周祝順初松笑唱焼照城縄臣信井成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲沖兆低底的典伝徒努灯働特徳栃奈梨熱念敗梅博阪飯飛必票標不夫付府阜富副兵別辺変便包法望牧末満未民無約勇要養浴利陸良料量輪類令冷例連老労録",
);
const w5_ = Array.from(
  "圧囲移因永営衛易益液演応往桜可仮価河過快解格確額刊幹慣眼紀基寄規喜技義逆久旧救居許境均禁句型経潔件険検限現減故個護効厚耕航鉱構興講告混査再災妻採際在財罪殺雑酸賛士支史志枝師資飼示似識質舎謝授修述術準序招証象賞条状常情織職制性政勢精製税責績接設絶祖素総造像増則測属率損貸態団断築貯張停提程適統堂銅導得毒独任燃能破犯判版比肥非費備評貧布婦武復複仏粉編弁保墓報豊防貿暴脈務夢迷綿輸余容略留領歴",
);
const w6_ = Array.from(
  "胃異遺域宇映延沿恩我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴券絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除承将傷障蒸針仁垂推寸盛聖誠舌宣専泉洗染銭善奏窓創装層操蔵臓存尊退宅担探誕段暖値宙忠著庁頂腸潮賃痛敵展討党糖届難乳認納脳派拝背肺俳班晩否批秘俵腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優預幼欲翌乱卵覧裏律臨朗論",
);
// https://okjiten.jp/7-tyuugakuseikanji.html
// 漢検4級
const w7_ = Array.from(
  "握扱依威偉為違緯維壱芋隠陰鋭影越援縁煙鉛汚押奥憶菓箇暇雅介壊戒皆較獲刈甘監汗歓勧乾鑑環含奇鬼祈輝幾儀戯詰脚却丘及朽拠巨距御驚凶恐響叫狭狂況仰駆屈掘繰傾恵迎撃肩堅遣兼軒圏剣玄誇鼓枯継互更荒抗攻稿香恒項豪込婚鎖歳彩載剤咲惨雌伺紫刺脂旨執芝煮斜釈寂狩朱趣需秀舟襲柔獣瞬巡旬盾紹召沼詳床称畳丈飾殖触浸震慎侵寝振薪陣尽尋吹是征姓井跡扇占鮮訴燥騒僧贈即俗耐替拓沢濁脱丹端嘆淡弾恥遅致蓄沖跳徴澄珍沈抵堤摘滴添殿途吐渡奴怒透唐桃盗塔到倒逃踏稲闘胴峠突鈍曇弐悩濃輩杯泊拍迫薄爆髪抜罰繁販搬範般盤被疲彼避尾微匹描浜敏怖膚浮腐敷普賦舞幅払噴柄壁捕舗峰抱砲肪坊忙冒傍帽凡盆漫慢妙眠矛霧娘茂網猛黙紋踊雄与誉腰溶躍謡翼雷頼絡欄離粒慮療隣涙隷麗齢暦劣烈恋露郎惑腕",
);
// 漢検3級
const w8_ = Array.from(
  "哀慰詠悦閲炎宴欧殴乙卸穏架佳華嫁餓怪悔塊概慨該穫隔郭岳掛滑勘肝貫敢緩冠換喚企軌棄棋忌既岐騎犠欺菊吉喫虐虚脅峡凝緊斤愚偶遇啓鶏携掲刑憩契鯨賢倹幻雇顧弧孤悟娯甲孔控拘郊硬綱巧坑慌絞酵克獄魂紺恨墾催債削錯搾撮擦暫施祉諮侍慈軸湿疾赦邪殊寿潤遵徐如晶掌鐘焦衝昇匠譲錠嬢冗嘱辱審伸辛粋炊遂衰穂酔随髄瀬牲婿請隻惜斥籍摂潜繕措阻粗礎双桑葬掃遭憎促賊逮胎怠滞袋滝託卓択諾奪胆鍛壇稚畜窒駐抽鋳彫超聴陳鎮墜訂帝締哲斗塗陶凍痘匿篤豚尿粘婆排陪縛伐帆伴藩畔蛮泌卑碑姫漂苗赴符封伏覆墳紛癖募慕簿崩芳胞縫倣邦飽奉妨乏謀膨房某墨没翻魔埋膜又魅滅免幽憂誘擁揚揺抑裸濫吏隆了猟陵糧厘零霊励裂錬廉炉漏廊浪楼湾",
);
// const w9_ = Array.from(
//   "亜尉逸姻韻畝浦疫謁猿凹翁虞渦禍靴寡稼蚊拐懐劾涯垣核殻嚇潟括喝渇褐轄且缶陥患堪棺款閑寛憾還艦頑飢宜偽擬糾窮拒享挟恭矯暁菌琴謹襟吟隅勲薫茎渓蛍慶傑嫌献謙繭顕懸弦呉碁江肯侯洪貢溝衡購拷剛酷昆懇佐唆詐砕宰栽斎崎索酢桟傘肢嗣賜滋璽漆遮蛇酌爵珠儒囚臭愁酬醜汁充渋銃叔淑粛塾俊准殉循庶緒叙升抄肖尚宵症祥渉訟硝粧詔奨彰償礁浄剰縄壌醸津唇娠紳診刃迅甚帥睡枢崇据杉斉逝誓析拙窃仙栓旋践遷薦繊禅漸租疎塑壮荘捜挿曹喪槽霜藻妥堕惰駄泰濯但棚痴逐秩嫡衷弔挑眺釣懲勅朕塚漬坪呈廷邸亭貞逓偵艇泥迭徹撤悼搭棟筒謄騰洞督凸屯軟尼妊忍寧把覇廃培媒賠伯舶漠肌鉢閥煩頒妃披扉罷猫賓頻瓶扶附譜侮沸雰憤丙併塀幣弊偏遍泡俸褒剖紡朴僕撲堀奔麻摩磨抹岬銘妄盲耗厄愉諭癒唯悠猶裕融庸窯羅酪痢履柳竜硫虜涼僚寮倫累塁戻鈴賄枠挨曖宛嵐畏萎椅彙茨咽淫唄鬱怨媛艶旺岡臆俺苛牙瓦楷潰諧崖蓋骸柿顎葛釜鎌韓玩伎亀毀畿臼嗅巾僅錦惧串窟熊詣憬稽隙桁拳鍵舷股虎錮勾梗喉乞傲駒頃痕沙挫采塞埼柵刹拶斬恣摯餌鹿叱嫉腫呪袖羞蹴憧拭尻芯腎須裾凄醒脊戚煎羨腺詮箋膳狙遡曽爽痩踪捉遜汰唾堆戴誰旦綻緻酎貼嘲捗椎爪鶴諦溺填妬賭藤瞳栃頓貪丼那奈梨謎鍋匂虹捻罵剥箸氾汎阪斑眉膝肘阜訃蔽餅璧蔑哺蜂貌頬睦勃昧枕蜜冥麺冶弥闇喩湧妖瘍沃拉辣藍璃慄侶瞭瑠呂賂弄籠麓脇",
// );
const w1 = w1_;
const w2 = w2_.concat(w1);
const w3 = w3_.concat(w2);
const w4 = w4_.concat(w3);
const w5 = w5_.concat(w4);
const w6 = w6_.concat(w5);
const w7 = w7_.concat(w6);
const w8 = w8_.concat(w7);
const wordsList = [w1, w1, w2, w3, w4, w5, w6, w7, w8, w8];
const size = 10;
const meiro = new Array(12);
let score = 0;
let counter = 0;
let prevPos = 1;
let idiomEnds = [];
let idiomsNum;
let isCorrect = true;
let idioms = [];
let ignores = [];
let words = w4;
let level = 4;
let course = 2;
let errorAudio, correctAudio, incorrectAudio;
loadAudios();
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
loadConfig();

function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.dataset.theme = "dark";
  }
}

function playAudio(audioBuffer, volume) {
  const audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  if (volume) {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(audioContext.destination);
    audioSource.connect(gainNode);
    audioSource.start();
  } else {
    audioSource.connect(audioContext.destination);
    audioSource.start();
  }
}

function unlockAudio() {
  audioContext.resume();
}

function loadAudio(url) {
  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      return new Promise((resolve, reject) => {
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
          resolve(audioBuffer);
        }, (err) => {
          reject(err);
        });
      });
    });
}

function loadAudios() {
  promises = [
    loadAudio("/kanji-meiro/mp3/cat.mp3"),
    loadAudio("/kanji-meiro/mp3/correct3.mp3"),
    loadAudio("/kanji-meiro/mp3/incorrect1.mp3"),
  ];
  Promise.all(promises).then((audioBuffers) => {
    errorAudio = audioBuffers[0];
    correctAudio = audioBuffers[1];
    incorrectAudio = audioBuffers[2];
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
  return array;
}

function prependIdiomLink(idiom, correct) {
  const a = document.createElement("a");
  a.textContent = idiom;
  a.href = "https://www.google.com/search?q=" + idiom + "とは";
  a.target = "_blank";
  a.rel = "noopener noreferer";
  if (correct) {
    a.className = "btn btn-light m-1";
  } else {
    a.className = "btn btn-secondary m-1";
  }
  solvedPanel.prepend(a);
}

function showSolved() {
  const currPos = idiomEnds.findIndex((x) => x > prevPos);
  if (currPos >= 0) {
    idioms.slice(currPos, idiomsNum).forEach((idiom) => {
      prependIdiomLink(idiom, false);
    });
  }
}

function showAnswer() {
  showSolved(false);
  const trs = document.getElementById("meiro").children;
  for (let x = 0; x < size; x++) {
    const tds = trs[x].children;
    for (let y = 0; y < size; y++) {
      if (meiro[x][y] > 0) {
        tds[y].className = "";
        tds[y].classList.add("table-danger");
      }
    }
  }
  const startButton = document.getElementById("startButton");
  startButton.classList.remove("d-none");
  const answerButton = document.getElementById("answerButton");
  answerButton.classList.add("d-none");
}

function getNeighborText(trs, x, y, direction) {
  let text = trs[x].children[y].textContent;
  if (direction == 1) {
    if (meiro[x - 1][y] != 0) {
      text += trs[x - 1].children[y].textContent;
    }
  } else if (direction == 2) {
    if (meiro[x + 1][y] != 0) {
      text += trs[x + 1].children[y].textContent;
    }
  } else if (direction == 3) {
    if (meiro[x][y - 1] != 0) {
      text += trs[x].children[y - 1].textContent;
    }
  } else {
    if (meiro[x][y + 1] != 0) {
      text += trs[x].children[y + 1].textContent;
    }
  }
  return text;
}

function setNeighborText(trs, x, y, direction, text, isAnswer) {
  if (!isAnswer) {
    trs[x].children[y].textContent = text[0];
  }
  if (direction == 1) {
    trs[x - 1].children[y].textContent = text[1];
  } else if (direction == 2) {
    trs[x + 1].children[y].textContent = text[1];
  } else if (direction == 3) {
    trs[x].children[y - 1].textContent = text[1];
  } else {
    trs[x].children[y + 1].textContent = text[1];
  }
}

function generateRandomText(text, isAnswer) {
  if (isAnswer) {
    const first = text[0];
    for (let i = 0; i < 5; i++) { // どうしても熟語ができてしまうケースがあるため回数打ち切り
      text = first + words[getRandomInt(0, words.length)];
      if (!includeIdiom(text)) return text;
    }
  } else {
    for (let i = 0; i < 5; i++) { // どうしても熟語ができてしまうケースがあるため回数打ち切り
      for (let j = 0; j < 2; j++) {
        text[j] = words[getRandomInt(0, words.length)];
      }
      if (!includeIdiom(text)) return text;
    }
  }
  return text;
}

function includeIdiom(text) {
  if (idioms.includes(text.slice(0, 2)) && ignores.includes(text.slice(0, 2))) {
    return true;
  } else {
    return false;
  }
}

function strictNeighbor(trs, x, y, direction, isAnswer) {
  let text = getNeighborText(trs, x, y, direction);
  if (text.length == 2) { // 解答ノードを含まない時
    text = generateRandomText(text, isAnswer);
    setNeighborText(trs, x, y, direction, text, isAnswer);
  }
}

function strictSolution() {
  const trs = document.getElementById("meiro").children;
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (meiro[x][y] == 0) {
        // 解答ノード以外は隣接ニ文字だけ見て熟語ができないようにする
        if (0 <= x - 1) {
          strictNeighbor(trs, x, y, 1, false);
        }
        if (x + 1 < size) {
          strictNeighbor(trs, x, y, 2, false);
        }
        if (0 <= y - 1) {
          strictNeighbor(trs, x, y, 3, false);
        }
        if (y + 1 < size) {
          strictNeighbor(trs, x, y, 4, false);
        }
      } else {
        // 解答ノードは別解ができないようにする
        const routes = getNeighborRoutes(x, y);
        for (let j = 0; j < routes.length; j++) {
          strictNeighbor(trs, x, y, routes[j][2], true);
        }
      }
    }
  }
}

function startGame() {
  while (solvedPanel.firstChild) {
    solvedPanel.removeChild(solvedPanel.firstChild);
  }
  generateGame();
  strictSolution();
  const startButton = document.getElementById("startButton");
  startButton.classList.add("d-none");
  const answerButton = document.getElementById("answerButton");
  answerButton.classList.remove("d-none");
  prevPos = 1;
}

function isPassableRoute(x, y, routes) {
  if (routes.length == 4) {
    return true;
  } else if (routes.length == 3) {
    if (x == 0 || x == size - 1 || y == 0 || y == size - 1) {
      return true;
    }
  }
  return false;
}

function isPassableNeighbor(x, y, routes) {
  if (routes.length >= 3) {
    return true;
  } else if (routes.length == 2) {
    if (x == 0 || x == size - 1 || y == 0 || y == size - 1) {
      return true;
    }
  }
  return false;
}

function getRoute(x, y, direction, n) {
  const directions = shuffle([1, 2, 3, 4]);
  let tmpRoutes = getNeighborRoutes(x, y);
  if (!isPassableNeighbor(x, y, tmpRoutes)) {
    return false;
  }

  for (let d = 0; d < directions.length; d++) {
    if (directions[d] == 1 && 0 <= x - n && direction != 2) {
      let passable = true;
      for (let i = 1; i <= n; i++) {
        tmpRoutes = getNeighborRoutes(x - i, y);
        if (!isPassableRoute(x - i, y, tmpRoutes)) {
          passable = false;
          break;
        }
      }
      if (passable) return [x - 1, y, 1];
    }
    if (directions[d] == 2 && x + n < size && direction != 1) {
      let passable = true;
      for (let i = 1; i <= n; i++) {
        tmpRoutes = getNeighborRoutes(x + i, y);
        if (!isPassableRoute(x + i, y, tmpRoutes)) {
          passable = false;
          break;
        }
      }
      if (passable) return [x + 1, y, 2];
    }
    if (directions[d] == 3 && 0 <= y - n && direction != 4) {
      let passable = true;
      for (let i = 1; i <= n; i++) {
        tmpRoutes = getNeighborRoutes(x, y - i);
        if (!isPassableRoute(x, y - i, tmpRoutes)) {
          passable = false;
          break;
        }
      }
      if (passable) return [x, y - 1, 3];
    }
    if (directions[d] == 4 && y + n < size && direction != 3) {
      let passable = true;
      for (let i = 1; i <= n; i++) {
        tmpRoutes = getNeighborRoutes(x, y + i);
        if (!isPassableRoute(x, y + i, tmpRoutes)) {
          passable = false;
          break;
        }
      }
      if (passable) return [x, y + 1, 4];
    }
  }
  return false;
}

function getNeighborRoutes(x, y) {
  const routes = [];
  if (0 <= x - 1 && meiro[x - 1][y] == 0) {
    routes.push([x - 1, y, 1]);
  }
  if (x + 1 < size && meiro[x + 1][y] == 0) {
    routes.push([x + 1, y, 2]);
  }
  if (0 <= y - 1 && meiro[x][y - 1] == 0) {
    routes.push([x, y - 1, 3]);
  }
  if (y + 1 < size && meiro[x][y + 1] == 0) {
    routes.push([x, y + 1, 4]);
  }
  return routes;
}

function paint(x, y, direction, n) {
  if (direction == 1) {
    for (let i = 0; i < n; i++) {
      counter += 1;
      meiro[x - i][y] = counter;
    }
    return [x - n + 1, y];
  } else if (direction == 2) {
    for (let i = 0; i < n; i++) {
      counter += 1;
      meiro[x + i][y] = counter;
    }
    return [x + n - 1, y];
  } else if (direction == 3) {
    for (let i = 0; i < n; i++) {
      counter += 1;
      meiro[x][y - i] = counter;
    }
    return [x, y - n + 1];
  } else {
    for (let i = 0; i < n; i++) {
      counter += 1;
      meiro[x][y + i] = counter;
    }
    return [x, y + n - 1];
  }
}

function _p() {
  let str = "";
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      str += meiro[i][j];
    }
    str += "\n";
  }
  console.log(str);
}

function checkIdiomEnds() {
  let count = 0;
  idiomEnds = [];
  for (let i = 0; i < counter; i++) {
    count += idioms[i].length;
    idiomEnds.push(count);
  }
}

function generateGame() {
  // 開始地点を選び隣接しないように熟語を埋めていく
  idioms = shuffle(idioms);
  let generating = true;
  while (generating) {
    let x1 = 0;
    let y1 = getRandomInt(1, size - 1);
    let painting = true;
    counter = 0;
    for (let x = 0; x < size; x++) {
      meiro[x] = new Array(size);
      for (let y = 0; y < size; y++) {
        meiro[x][y] = 0;
      }
    }
    let route = getRoute(x1, y1, -1, idioms[0].length);
    let xy = paint(x1, y1, route[2], idioms[0].length);
    x1 = xy[0];
    y1 = xy[1];
    let i = 1;
    while (painting) {
      const firsts = shuffle(getNeighborRoutes(x1, y1));
      if (firsts.length == 0) {
        painting = false;
      } else {
        let noRoute = true;
        for (let j = 0; j < firsts.length; j++) {
          route = getRoute(
            firsts[j][0],
            firsts[j][1],
            firsts[j][2],
            idioms[i].length - 1,
          );
          if (route) {
            noRoute = false;
            paint(firsts[j][0], firsts[j][1], firsts[j][2], 1);
            xy = paint(route[0], route[1], route[2], idioms[i].length - 1);
            x1 = xy[0];
            y1 = xy[1];
            if (x1 == 0 || x1 == size - 1 || y1 == 0 || y1 == size - 1) {
              painting = false;
              if (counter > 20) { // 良い迷路になっている
                generating = false;
              }
            }
            i += 1;
            break;
          }
        }
        if (noRoute) painting = false;
      }
    }
    idiomsNum = i;
  }
  checkIdiomEnds();
  const idiomStr = idioms.slice(0, idiomsNum).join("");
  const meiroNode = document.getElementById("meiro");
  while (meiroNode.firstChild) meiroNode.removeChild(meiroNode.firstChild);
  for (let x = 0; x < size; x++) {
    const tr = document.createElement("tr");
    meiroNode.appendChild(tr);
    for (let y = 0; y < size; y++) {
      const td = document.createElement("td");
      const currPos = meiro[x][y];
      if (currPos == 0) {
        td.textContent = words[getRandomInt(0, words.length)];
      } else {
        if (currPos == 1) {
          td.classList.add("table-secondary");
        }
        td.textContent = idiomStr[currPos - 1];
      }
      tr.appendChild(td);
      td.onclick = function () {
        meiroClickEvent(this, currPos);
      };
    }
  }
}

function meiroClickEvent(obj, currPos) {
  obj.classList.toggle("table-primary");
  if (obj.classList.contains("table-primary")) {
    if (prevPos == currPos) {
      playAudio(errorAudio);
    } else if (currPos - prevPos == 1 && currPos != 0) { // 正解
      prevPos += 1;
      playAudio(correctAudio);
      obj.onclick = function () {};
      const pos = idiomEnds.findIndex((x) => x == currPos);
      if (pos >= 0) {
        if (isCorrect) {
          score += idioms[pos].length;
          document.getElementById("score").textContent = score;
        }
        prependIdiomLink(idioms[pos], isCorrect);
        isCorrect = true;
      }
    } else {
      obj.classList.toggle("table-primary");
      playAudio(incorrectAudio);
      isCorrect = false;
    }
  }
}

function resizeFontSize(node) {
  const meiroSize = document.getElementById("meiroOuter").offsetWidth;
  const margin = 1.2; // 小さすぎると overflow で表示が崩れる
  const padding = remSize * 5;
  const border = 11;
  const fontSize = (meiroSize - padding - border) / 12 / margin;
  node.style.fontSize = fontSize + "px";
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    delete document.documentElement.dataset.theme;
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.dataset.theme = "dark";
  }
}

function getProblemUrls(course) {
  switch (course) {
    case 0:
      return [
        ["data/idiom/2/"],
        ["data/ignored/2/"],
      ];
    case 1:
      return [
        ["data/idiom/3/"],
        ["data/ignored/3/"],
      ];
    default:
      return [
        ["data/idiom/2/", "data/idiom/3/"],
        ["data/ignored/2/", "data/ignored/3/"],
      ];
  }
}

function fetchProblems(level) {
  const promises = [];
  const [idiomUrls, ignoredUrls] = getProblemUrls(course);
  idioms = [];
  ignores = [];
  for (const url of idiomUrls) {
    const promise = new Promise((resolve) => {
      fetch(url + level + ".lst")
        .then((response) => response.text())
        .then((text) => {
          resolve({ type: "idiom", content: text.trim().split("\n") });
        });
    });
    promises.push(promise);
  }
  for (const url of ignoredUrls) {
    const promise = new Promise((resolve) => {
      fetch(url + level + ".lst")
        .then((response) => response.text())
        .then((text) => {
          resolve({ type: "ignored", content: text.trim().split("\n") });
        });
    });
    promises.push(promise);
  }
  return promises;
}

function loadIdiomsAndIgnores(data) {
  idioms = [];
  ignores = [];
  data.forEach((datum) => {
    if (datum.type == "idiom") {
      idioms = idioms.concat(datum.content);
    } else {
      ignores = ignores.concat(datum.content);
    }
  });
}

const meiroObj = document.getElementById("meiro");
resizeFontSize(meiroObj);
window.addEventListener("resize", function () {
  resizeFontSize(meiroObj);
});
Promise.all(fetchProblems(level)).then((data) => {
  loadIdiomsAndIgnores(data);
  generateGame();
  strictSolution();
  while (solvedPanel.firstChild) {
    solvedPanel.removeChild(solvedPanel.firstChild);
  }
  showAnswer();
});

document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("startButton").onclick = startGame;
document.getElementById("answerButton").onclick = showAnswer;
document.getElementById("levelOption").addEventListener("change", function () {
  level = this.selectedIndex + 1;
  words = wordsList[level];
  Promise.all(fetchProblems(level)).then((data) => {
    loadIdiomsAndIgnores(data);
    startGame();
  });
});
document.getElementById("courseOption").addEventListener("change", function () {
  course = this.selectedIndex;
  Promise.all(fetchProblems(level)).then((data) => {
    loadIdiomsAndIgnores(data);
    startGame();
  });
});
document.addEventListener("click", unlockAudio, {
  once: true,
  useCapture: true,
});
