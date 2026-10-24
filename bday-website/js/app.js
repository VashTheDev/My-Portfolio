(function () {
  const C = window.CONTENT;
  const name = (C.herName || "my love").trim() || "my love";

  const visited = new Set();
  let screen = "cover";
  let busy = false;
  let beat = 0;
  const noLines = ["Not yet", "Wrong answer…", "Try the other one", "My heart says yes", "Okay but… yes?"];
  let noI = 0;

  const $ = (id) => document.getElementById(id);

  function empty(text, fallback) {
    const v = (text || "").trim();
    if (v) return escapeHtml(v).replace(/\n/g, "<br>");
    return `<span class="placeholder">${fallback}</span>`;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function mediaBlock(src, type, label) {
    if (src) {
      if (type === "video") {
        return `<video controls playsinline src="${escapeHtml(src)}"></video>`;
      }
      return `<img alt="" src="${escapeHtml(src)}">`;
    }
    return `<div class="media-slot"><span>${label}</span></div>`;
  }

  function renderStatic() {
    $("who").textContent = name;
    $("coverKicker").textContent = C.cover.kicker;
    $("coverQuestion").textContent = C.cover.question;
    $("yesBtn").textContent = C.cover.yes;
    $("noBtn").textContent = C.cover.no;

    $("noteBody").innerHTML = empty(
      C.whyYouMatter,
      "Your short note goes here — why she matters.<br>Open js/content.js and fill whyYouMatter"
    );

    const beats = C.us
      .map((item, i) => {
        const n = String(i + 1).padStart(2, "0");
        const kind = item.type === "video" ? "video" : "photo";
        const folder = `media/us/${n}.${kind === "video" ? "mp4" : "jpg"}`;
        const cap = empty(item.caption, `Caption for beat ${i + 1}<br>js/content.js → us[${i}].caption`);
        const date = empty(item.date, "date — us[" + i + "].date");
        const slot = mediaBlock(
          item.src,
          kind,
          `${kind === "video" ? "Video" : "Photo"} ${i + 1}<br>drop file, then set us[${i}].src<br>${folder}`
        );
        return `<article class="beat${i === 0 ? " on" : ""}">${slot}<div class="meta"><div class="date">${date}</div><div class="cap">${cap}</div></div></article>`;
      })
      .join("");
    $("timeline").innerHTML = beats;
    updateBeat();

    $("reasons").innerHTML = C.reasons
      .map((line, i) => {
        const body = empty(line, `Reason ${i + 1} — js/content.js → reasons[${i}]`);
        return `<div class="reason"><div class="num">${i + 1}</div><p>${body}</p></div>`;
      })
      .join("");

    const L = C.letters;
    $("letterHers").innerHTML = L.hers
      ? `<img alt="her handwritten letter" src="${escapeHtml(L.hers)}">`
      : `Her handwritten letter<br>media/letters/hers.jpg<br>letters.hers`;
    $("letterYours").innerHTML = L.yours
      ? `<img alt="your handwritten letter" src="${escapeHtml(L.yours)}">`
      : `Your handwritten letter<br>media/letters/yours.jpg<br>letters.yours`;
    $("couple").innerHTML = L.couplePhoto
      ? `<img alt="us" src="${escapeHtml(L.couplePhoto)}">`
      : `photo of you two<br>media/letters/us.jpg<br>letters.couplePhoto`;
    $("letterMain").innerHTML = empty(
      L.main,
      "Your main typed letter goes here.<br>js/content.js → letters.main"
    );
    $("letterExtras").innerHTML = (L.extras || [])
      .map((src, i) => {
        if (src) return `<div class="letter-pic"><img alt="" src="${escapeHtml(src)}"></div>`;
        return `<div class="letter-pic">Extra letter photo ${i + 1}<br>letters.extras[${i}]</div>`;
      })
      .join("");

    $("players").innerHTML = C.voices
      .map((v, i) => {
        const title = v.title || `Voice ${i + 1}`;
        const file = v.src
          ? `<audio controls preload="none" src="${escapeHtml(v.src)}"></audio>`
          : `<p>Empty — media/voices/0${i + 1}.mp3 then voices[${i}].src</p>`;
        return `<div class="player"><div class="play" aria-hidden="true">♫</div><div style="flex:1"><h3>${escapeHtml(
          title
        )}</h3>${file}</div></div>`;
      })
      .join("");

    $("endTitle").innerHTML = empty(C.ending.title, "The ending is still open");
    $("endBody").innerHTML = empty(
      C.ending.body,
      "We’ll write this last. js/content.js → ending.title and ending.body"
    );
  }

  function updateBeat() {
    const cards = document.querySelectorAll("#timeline .beat");
    cards.forEach((el, i) => el.classList.toggle("on", i === beat));
    const n = cards.length || 1;
    $("tlCount").textContent = `${beat + 1} / ${n}`;
    $("tlPrev").disabled = beat <= 0;
    $("tlNext").disabled = beat >= n - 1;
  }

  function show(id) {
    document.querySelectorAll(".screen").forEach((el) => el.classList.toggle("on", el.id === "screen-" + id));
    screen = id;
    if (["us", "love", "letters", "voices"].includes(id)) {
      visited.add(id);
      document.querySelectorAll(".card[data-go]").forEach((btn) => {
        btn.classList.toggle("seen", visited.has(btn.getAttribute("data-go")));
      });
      const ready = visited.size >= 4;
      const fin = $("finale");
      fin.classList.toggle("ready", ready);
      fin.hidden = !ready;
      fin.disabled = !ready;
      fin.textContent = "🎉 Happy birthday! 🎊";
    }
    const sc = $("screen-" + id);
    if (sc) sc.scrollTop = 0;
    if (id === "us") updateBeat();
  }

  const hops = {
    "cover>note": "hearts",
    "note>menu": "hearts",
    "menu>us": "hearts",
    "menu>love": "hearts",
    "menu>letters": "hearts",
    "menu>voices": "hearts",
    "menu>ending": "hearts",
    "us>menu": "hearts",
    "love>menu": "hearts",
    "letters>menu": "hearts",
    "voices>menu": "hearts",
    "ending>menu": "hearts",
  };

  async function go(next, from) {
    if (busy) return;
    busy = true;
    const key = (from || screen) + ">" + next;
    try {
      await window.FX.play(hops[key] || "hearts", () => show(next));
    } finally {
      busy = false;
    }
  }

  function runaway() {
    const btn = $("noBtn");
    noI = (noI + 1) % noLines.length;
    btn.textContent = noLines[noI];
    const box = btn.parentElement.getBoundingClientRect();
    const maxX = Math.max(20, (box.width - btn.offsetWidth) / 2);
    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 36 - 8);
    btn.style.transform = `translate(${x}px, ${y}px) rotate(${x / 8}deg)`;
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go]");
    if (!t) return;
    const next = t.getAttribute("data-go");
    if (next === "ending" && visited.size < 4) return;
    go(next);
  });

  $("yesBtn").addEventListener("click", () => go("note", "cover"));
  $("noBtn").addEventListener("click", runaway);
  $("toMenu").addEventListener("click", () => go("menu", "note"));
  $("tlPrev").addEventListener("click", () => {
    if (beat > 0) {
      beat -= 1;
      updateBeat();
    }
  });
  $("tlNext").addEventListener("click", () => {
    const n = document.querySelectorAll("#timeline .beat").length;
    if (beat < n - 1) {
      beat += 1;
      updateBeat();
    }
  });

  renderStatic();
  show("cover");
})();
