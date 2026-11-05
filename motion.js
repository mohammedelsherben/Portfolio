// ===== الحركة والعرض التجريبي / Motion and the agent demo =====
// يستخدم متغيرات من script.js: texts و scenarios و lang
// Uses globals from script.js: texts, scenarios, lang

(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (selector) => document.querySelector(selector);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // ---------- Hero: الاسم حرفاً حرفاً (EN) أو كلمة كلمة (AR) + كتابة المسمى ----------
  // Arabic letters are never split, because that breaks their joining.
  let heroRun = 0;

  function heroText() {
    const run = ++heroRun;

    const h1 = $(".hero h1");
    const name = h1.textContent;
    const step = lang === "en" ? 45 : 150;
    let index = 0;
    h1.setAttribute("aria-label", name);
    h1.style.setProperty("--step", `${step}ms`);
    h1.innerHTML = name
      .trim()
      .split(/\s+/)
      .map((word) => {
        const pieces = lang === "en" ? [...word] : [word];
        const inner = pieces
          .map((piece) => `<span class="char" style="--i:${index++}">${piece}</span>`)
          .join("");
        return `<span class="word" aria-hidden="true">${inner}</span>`;
      })
      .join(" ");

    const role = $(".hero .role");
    const full = role.textContent;
    role.setAttribute("aria-label", full);
    if (reduce) return;

    role.textContent = "";
    let n = 0;
    const type = () => {
      if (run !== heroRun) return;
      n += 1;
      role.textContent = full.slice(0, n);
      if (n < full.length) setTimeout(type, 45);
    };
    setTimeout(type, index * step + 500);
  }

  // ---------- العناوين: تبديل حروف (EN فقط) ----------
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const scrambles = new Set();
  let headingObserver;

  function scramble(el) {
    const final = el.textContent;
    const total = 20;
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const done = Math.floor((frame / total) * final.length);
      el.textContent = [...final]
        .map((c, i) => (c === " " || i < done ? c : LETTERS[Math.floor(Math.random() * LETTERS.length)]))
        .join("");
      if (frame >= total) {
        clearInterval(id);
        scrambles.delete(id);
        el.textContent = final;
      }
    }, 40);
    scrambles.add(id);
  }

  function headings() {
    if (headingObserver) headingObserver.disconnect();
    scrambles.forEach(clearInterval);
    scrambles.clear();
    if (reduce || lang !== "en" || !("IntersectionObserver" in window)) return;

    headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scramble(entry.target);
            headingObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll("h2 [data-i18n]").forEach((el) => headingObserver.observe(el));
  }

  // ---------- العرض التجريبي للوكيل / Agent demo (scripted simulation) ----------
  let demoRun = 0;
  let current = null;
  let demoObserver;
  let chipsBound = false;

  function addMsg(kind, label) {
    const el = document.createElement("div");
    el.className = `msg ${kind}`;
    el.innerHTML = "<small></small><span class='txt'></span>";
    el.firstChild.textContent = label;
    $("#demo-log").appendChild(el);
    return el.querySelector(".txt");
  }

  function addStep(box, label, done) {
    const row = document.createElement("div");
    row.className = done ? "step done" : "step";
    row.innerHTML = "<i class='mark'></i><span></span>";
    row.lastChild.textContent = label;
    box.appendChild(row);
    return row;
  }

  async function typeInto(node, text, delay, run) {
    node.classList.add("caret");
    for (let i = 1; i <= text.length; i++) {
      if (run !== demoRun) return false;
      node.textContent = text.slice(0, i);
      await sleep(delay);
    }
    node.classList.remove("caret");
    return true;
  }

  async function play(id, animate) {
    const run = ++demoRun;
    const scenario = scenarios.find((s) => s.id === id) || scenarios[0];
    current = scenario.id;
    document
      .querySelectorAll("#demo-chips .chip")
      .forEach((chip) => chip.classList.toggle("active", chip.dataset.id === scenario.id));

    const L = texts[lang];
    const log = $("#demo-log");
    log.innerHTML = "";
    const userText = addMsg("user", L.demo_you);
    const box = document.createElement("div");
    box.className = "steps";

    if (!animate) {
      userText.textContent = scenario.user[lang];
      scenario.steps[lang].forEach((label) => addStep(box, label, true));
      log.appendChild(box);
      addMsg("agent", L.demo_agent).textContent = scenario.reply[lang];
      return;
    }

    if (!(await typeInto(userText, scenario.user[lang], 28, run))) return;
    await sleep(350);
    if (run !== demoRun) return;

    log.appendChild(box);
    for (const label of scenario.steps[lang]) {
      const row = addStep(box, label, false);
      await sleep(650);
      if (run !== demoRun) return;
      row.classList.add("done");
    }
    await sleep(250);
    if (run !== demoRun) return;

    await typeInto(addMsg("agent", L.demo_agent), scenario.reply[lang], 22, run);
  }

  function demo() {
    if (!$("#demo-log")) return;

    const chips = $("#demo-chips");
    chips.innerHTML = scenarios
      .map((s) => `<button class="chip" type="button" data-id="${s.id}">${s.label[lang]}</button>`)
      .join("");
    if (!chipsBound) {
      chips.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (chip) play(chip.dataset.id, !reduce);
      });
      chipsBound = true;
    }

    play(current || scenarios[0].id, false);

    // يعمل مرة واحدة عند ظهور القسم / plays once when the section scrolls into view
    if (demoObserver) demoObserver.disconnect();
    if (!reduce && "IntersectionObserver" in window && !demo.seen) {
      demoObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            demo.seen = true;
            demoObserver.disconnect();
            play(current || scenarios[0].id, true);
          }
        },
        { threshold: 0.4 }
      );
      demoObserver.observe($(".demo-win"));
    }
  }

  // ---------- شريط تقدم السكرول ----------
  const bar = $(".progress");
  let ticking = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty("--p", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    },
    { passive: true }
  );
  updateProgress();

  // ---------- الأزرار المغناطيسية، وميل البطاقات ----------
  if (finePointer && !reduce) {
    let magnet = null;
    let tilted = null;

    const clear = (el, props) => props.forEach((p) => el.style.removeProperty(p));

    document.addEventListener(
      "pointermove",
      (e) => {
        const target = e.target.closest ? e.target : null;

        // أزرار مغناطيسية / magnetic buttons
        const mag = target && target.closest(".btn, .pill-btn");
        if (magnet && magnet !== mag) {
          clear(magnet, ["--mx", "--my"]);
          magnet = null;
        }
        if (mag) {
          const r = mag.getBoundingClientRect();
          mag.style.setProperty("--mx", `${((e.clientX - (r.left + r.width / 2)) * 0.25).toFixed(1)}px`);
          mag.style.setProperty("--my", `${((e.clientY - (r.top + r.height / 2)) * 0.25).toFixed(1)}px`);
          magnet = mag;
        }

        // ميل البطاقات مع بريق يتبع المؤشر / card tilt with a spotlight
        const card = target && target.closest("[data-tilt]");
        if (tilted && tilted !== card) {
          clear(tilted, ["--rx", "--ry", "--sx", "--sy"]);
          tilted = null;
        }
        if (card) {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          card.style.setProperty("--ry", `${((px - 0.5) * 8).toFixed(2)}deg`);
          card.style.setProperty("--rx", `${((0.5 - py) * 6).toFixed(2)}deg`);
          card.style.setProperty("--sx", `${(px * 100).toFixed(1)}%`);
          card.style.setProperty("--sy", `${(py * 100).toFixed(1)}%`);
          tilted = card;
        }
      },
      { passive: true }
    );
  }

  // ---------- يُستدعى من script.js بعد كل رسم للصفحة ----------
  function refresh() {
    heroText();
    headings();
    demo();
  }

  window.portfolioMotion = { refresh };
  refresh();
})();
