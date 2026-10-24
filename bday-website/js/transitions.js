(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = () => document.getElementById("fx");
  const COLORS = ["#9b1d3a", "#2c4a7c", "#5c2d6e", "#c45c74", "#7d97c4", "#b089c0", "#4a1020", "#f6eef4"];
  const HEARTS = ["💗", "💖", "💕", "💘", "💞", "❤️", "🩷", "💓", "♥", "♡"];

  function clear() {
    const el = root();
    el.innerHTML = "";
    el.className = "fx";
    document.querySelectorAll(".screen.leaving").forEach((screen) => screen.classList.remove("leaving"));
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function blanket(kind) {
    const wrap = document.createElement("div");
    wrap.className = "fx-blanket " + (kind || "");
    const cols = 10;
    const rows = 14;
    const total = cols * rows;
    for (let i = 0; i < total; i += 1) {
      const s = document.createElement("span");
      const row = Math.floor(i / cols);
      const col = i % cols;
      s.textContent = HEARTS[i % HEARTS.length];
      s.style.color = COLORS[i % COLORS.length];
      s.style.setProperty("--d", (row * 0.018 + col * 0.012) + "s");
      s.style.setProperty("--r", (i % 7) * 8 - 20 + "deg");
      s.style.setProperty("--s", 1.15 + (i % 5) * 0.12);
      wrap.appendChild(s);
    }
    return wrap;
  }

  function tint(cls) {
    const d = document.createElement("div");
    d.className = "fx-tint " + (cls || "");
    return d;
  }

  async function coverThenReveal(build, uncoverClass, coverMs, uncoverMs) {
    const el = root();
    el.className = "fx live";
    build(el);
    await wait(coverMs);
    if (typeof window.__onCovered === "function") window.__onCovered();
    el.classList.add("uncover", uncoverClass);
    await wait(uncoverMs);
  }

  const api = {
    async hearts() {
      const el = root();
      const currentScreen = document.querySelector(".screen.on");
      const hearts = ["💗", "💜", "💙", "💖", "❤️", "💜", "💙", "💗"];
      const positions = [
        [43, 65, -24, -8], [49, 70, 18, 6], [55, 63, 30, -12], [39, 72, -12, 10],
        [59, 68, 12, -4], [46, 60, -34, 8], [53, 74, 24, 12], [50, 66, -4, -10],
      ];

      el.className = "fx live";
      currentScreen?.classList.add("leaving");
      hearts.forEach((heart, i) => {
        const particle = document.createElement("span");
        const [left, top, drift, turn] = positions[i];
        particle.className = "fx-heart";
        particle.textContent = heart;
        particle.style.setProperty("--left", left + "%");
        particle.style.setProperty("--top", top + "%");
        particle.style.setProperty("--drift", drift + "px");
        particle.style.setProperty("--turn", turn + "deg");
        particle.style.setProperty("--size", (1.05 + (i % 3) * 0.18) + "rem");
        particle.style.setProperty("--delay", (i * 0.025) + "s");
        el.appendChild(particle);
      });

      await wait(180);
      if (typeof window.__onCovered === "function") window.__onCovered();
      await wait(560);
    },

    async petals() {
      await coverThenReveal(
        (el) => {
          el.appendChild(tint("lilac"));
          const b = blanket("drop-in");
          b.querySelectorAll("span").forEach((s, i) => {
            s.textContent = ["❀", "✿", "♥", "❁"][i % 4];
          });
          el.appendChild(b);
        },
        "out-fall",
        780,
        820
      );
    },

    async bounce() {
      await coverThenReveal(
        (el) => {
          el.appendChild(tint("candy"));
          el.appendChild(blanket("bounce-in"));
        },
        "out-down",
        800,
        750
      );
    },

    async stickers() {
      await coverThenReveal(
        (el) => {
          el.appendChild(tint("cream"));
          el.appendChild(blanket("slap"));
        },
        "out-peel",
        760,
        800
      );
    },

    async iris() {
      await coverThenReveal(
        (el) => {
          el.appendChild(tint("pink"));
          el.appendChild(blanket("from-center"));
        },
        "out-iris",
        700,
        780
      );
    },

    async wash() {
      await coverThenReveal(
        (el) => {
          el.appendChild(tint("wash-in"));
          el.appendChild(blanket("grow"));
        },
        "out-fade",
        680,
        700
      );
    },

    async ribbon() {
      await coverThenReveal(
        (el) => {
          el.appendChild(tint("red"));
          el.appendChild(blanket("sides"));
        },
        "out-split",
        720,
        780
      );
    },

    async seal() {
      await coverThenReveal(
        (el) => {
          el.appendChild(tint("rose"));
          el.appendChild(blanket("pop"));
          const seal = document.createElement("div");
          seal.className = "fx-big-heart";
          seal.textContent = "♥";
          el.appendChild(seal);
        },
        "out-zoom",
        780,
        820
      );
    },

    async polaroid() {
      await coverThenReveal(
        (el) => {
          el.appendChild(tint("cream"));
          el.appendChild(blanket("spin-in"));
        },
        "out-spin",
        760,
        800
      );
    },
  };

  window.FX = {
    names: ["hearts", "petals", "bounce", "stickers", "iris", "wash", "ribbon", "seal", "polaroid"],
    async play(name, onCovered) {
      window.__onCovered = onCovered;
      try {
        if (reduced) {
          if (onCovered) onCovered();
          return;
        }
        const fn = api[name] || api.hearts;
        await fn();
      } finally {
        window.__onCovered = null;
        clear();
      }
    },
  };
})();
