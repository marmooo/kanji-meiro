import { JKAT } from "https://cdn.jsdelivr.net/npm/@marmooo/kanji@0.1.1/esm/jkat.js";
import { createWorker } from "https://cdn.jsdelivr.net/npm/emoji-particle@0.0.4/+esm";

const remSize = parseInt(getComputedStyle(document.documentElement).fontSize);
// 何でも繋がってしまう漢字は意図的に削除 (一二三四五六七八九十百千上下左右)
const words1 = Array.from(
  "雨円王音火花貝学気休玉金空月犬見口校山子糸字耳車手出女小森人水正生青夕石赤川先早草足村大男竹中虫町天田土日入年白文木本名目立力林",
);
const wordsList = [words1, ...JKAT.slice(1)];
const size = 10;
const meiro = new Array(12);
const emojiParticle = initEmojiParticle();
let score = 0;
let consecutiveWins = 0;
let counter = 0;
let prevPos = 1;
let idiomEnds = [];
let idiomsNum;
let isCorrect = true;
let idioms = [];
let ignores = [];
let level = 4;
let words = wordsList[level - 1];
let course = 2;
let audioContext;
const audioBufferCache = {};
loadConfig();

function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    document.documentElement.setAttribute("data-bs-theme", "light");
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function createAudioContext() {
  if (globalThis.AudioContext) {
    return new globalThis.AudioContext();
  } else {
    console.error("Web Audio API is not supported in this browser");
    return null;
  }
}

function unlockAudio() {
  if (audioContext) {
    audioContext.resume();
  } else {
    audioContext = createAudioContext();
    loadAudio("error", "mp3/cat.mp3");
    loadAudio("correct", "mp3/correct3.mp3");
    loadAudio("incorrect", "mp3/incorrect1.mp3");
  }
  document.removeEventListener("pointerdown", unlockAudio);
  document.removeEventListener("keydown", unlockAudio);
}

async function loadAudio(name, url) {
  if (!audioContext) return;
  if (audioBufferCache[name]) return audioBufferCache[name];
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioBufferCache[name] = audioBuffer;
    return audioBuffer;
  } catch (error) {
    console.error(`Loading audio ${name} error:`, error);
    throw error;
  }
}

function playAudio(name, volume) {
  if (!audioContext) return;
  const audioBuffer = audioBufferCache[name];
  if (!audioBuffer) {
    console.error(`Audio ${name} is not found in cache`);
    return;
  }
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  const gainNode = audioContext.createGain();
  if (volume) gainNode.gain.value = volume;
  gainNode.connect(audioContext.destination);
  sourceNode.connect(gainNode);
  sourceNode.start();
}

function initEmojiParticle() {
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    pointerEvents: "none",
    top: "0px",
    left: "0px",
  });
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  document.body.prepend(canvas);

  const offscreen = canvas.transferControlToOffscreen();
  const worker = createWorker();
  worker.postMessage({ type: "init", canvas: offscreen }, [offscreen]);

  globalThis.addEventListener("resize", () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    worker.postMessage({ type: "resize", width, height });
  });
  return { canvas, offscreen, worker };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  for (let i = array.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i);
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
  return array;
}

function prependIdiomLink(idiom, correct) {
  const a = document.createElement("a");
  a.textContent = idiom;
  if (document.documentElement.lang.startsWith("zh")) {
    a.href = "https://www.bing.com/search?q=" + idiom;
  } else {
    a.href = "https://www.google.com/search?q=" + idiom + "とは";
  }
  a.target = "_blank";
  a.rel = "noopener noreferer";
  if (correct) {
    a.className = "btn btn-light m-1";
  } else {
    a.className = "btn btn-secondary m-1";
  }
  a.role = "button";
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

function randomizeText(text, isAnswer) {
  if (isAnswer) {
    const first = text[0];
    for (let i = 0; i < 5; i++) { // どうしても熟語ができてしまうケースがあるため回数打ち切り
      text = first + words[getRandomInt(0, words.length)];
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
    text = randomizeText(text, isAnswer);
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
      td.onclick = (event) => {
        meiroClickEvent(event.target, currPos);
      };
    }
  }
}

function meiroClickEvent(obj, currPos) {
  obj.classList.toggle("table-primary");
  if (obj.classList.contains("table-primary")) {
    if (prevPos == currPos) {
      playAudio("error");
    } else if (currPos - prevPos == 1 && currPos != 0) { // 正解
      prevPos += 1;
      playAudio("correct");
      obj.onclick = () => {};
      const pos = idiomEnds.findIndex((x) => x == currPos);
      if (pos >= 0) {
        if (isCorrect) {
          consecutiveWins += 1;
          score += idioms[pos].length;
          document.getElementById("score").textContent = score;
        } else {
          consecutiveWins = 1;
        }
        for (let i = 0; i < consecutiveWins; i++) {
          emojiParticle.worker.postMessage({
            type: "spawn",
            options: {
              particleType: "popcorn",
              originX: Math.random() * emojiParticle.canvas.width,
              originY: Math.random() * emojiParticle.canvas.height,
            },
          });
        }
        prependIdiomLink(idioms[pos], isCorrect);
        isCorrect = true;
      }
    } else {
      obj.classList.toggle("table-primary");
      playAudio("incorrect");
      isCorrect = false;
    }
  }
}

function resizeFontSize(node) {
  const meiroSize = document.getElementById("masu").offsetWidth;
  const margin = 1.2; // 小さすぎると overflow で表示が崩れる
  const padding = remSize * 5;
  const border = 11;
  const fontSize = (meiroSize - padding - border) / 12 / margin;
  node.style.fontSize = fontSize + "px";
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

async function fetchProblems(level) {
  const [idiomUrls, ignoredUrls] = getProblemUrls(course);
  const fetchList = (urls, type) => {
    return Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url + level + ".lst");
        const text = await res.text();
        return { type, content: text.trim().split("\n") };
      }),
    );
  };
  const idioms = await fetchList(idiomUrls, "idiom");
  const ignores = await fetchList(ignoredUrls, "ignored");
  return [...idioms, ...ignores];
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
globalThis.addEventListener("resize", () => {
  resizeFontSize(meiroObj);
});
fetchProblems(level).then((data) => {
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
document.getElementById("levelOption").addEventListener("change", (event) => {
  level = event.target.selectedIndex;
  words = wordsList[level];
  fetchProblems(level + 1).then((data) => {
    loadIdiomsAndIgnores(data);
    startGame();
  });
});
document.getElementById("courseOption").addEventListener("change", (event) => {
  course = event.target.selectedIndex;
  fetchProblems(level + 1).then((data) => {
    loadIdiomsAndIgnores(data);
    startGame();
  });
});
document.addEventListener("pointerdown", unlockAudio, { once: true });
document.addEventListener("keydown", unlockAudio, { once: true });
