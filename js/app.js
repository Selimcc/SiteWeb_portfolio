/* ============================================================
   Rendu et navigation. Le contenu vient de js/data.js.
   Liens : #presentation, #projets, #projets/<id>, #parcours, #contact
   ============================================================ */
(() => {
  "use strict";

  const S = window.SITE;
  const P = S.person;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rich = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const VIEWS = [
    { id: "presentation", label: "Présentation" },
    { id: "projets", label: "Projets" },
    { id: "parcours", label: "Parcours" },
    { id: "competences", label: "Compétences" },
    { id: "contact", label: "Contact" },
  ];
  const ALIASES = { "": "presentation", accueil: "presentation", moi: "presentation" };
  const catOrder = Object.fromEntries(S.categories.map((c, i) => [c.id, i]));
  const PROJECTS = S.projects.filter((p) => !p.hidden).sort((a, b) => catOrder[a.cat] - catOrder[b.cat]);
  const projectsById = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
  const catById = Object.fromEntries(S.categories.map((c) => [c.id, c]));
  const inCat = (id) => PROJECTS.filter((p) => p.cat === id);
  const isDone = (status) => /termin|publi|jouable|livr|en ligne/i.test(status);
  const initials = P.name.split(" ").map((w) => w[0]).join("");

  const state = { view: null, filter: "all", open: null, navToken: 0, lastFocus: null };

  /* ---------------- Icônes (traits simples) ---------------- */
  const PATHS = {
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    download: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-6 3 4-14"/>',
    file: '<path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 13.8-1.5 7.2 5-2.8 5 2.8-1.5-7.2"/>',
  };
  const icon = (n, s = 18) => `<svg class="ico" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[n]}</svg>`;

  /* ---------------- Composants ---------------- */
  const badge = (status) => `<span class="badge${isDone(status) ? " done" : ""}">${esc(status)}</span>`;
  const tags = (list, max) => `<div class="tags">${list.slice(0, max ?? list.length).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>`;

  const projectCard = (p, i) => `
    <button class="pcard st" style="--i:${i}" data-project="${esc(p.id)}">
      ${p.image ? `<div class="thumb"><img src="${esc(p.image)}" alt="" loading="lazy" decoding="async"></div>` : ""}
      <div class="pc-top"><span>${esc(p.where)}</span>${badge(p.status)}</div>
      <h3>${esc(p.title)}<span class="pc-go">${icon("arrow", 16)}</span></h3>
      <p>${rich(p.tagline)}</p>
      ${tags(p.stack, 3)}
    </button>`;

  /* ---------------- Colonne profil ---------------- */
  function renderSide() {
    $("#side").innerHTML = `
      <div class="side-top">
        <div class="avatar"><img src="${esc(P.photo)}" alt="Portrait de ${esc(P.name)}" decoding="async"><span class="initials" aria-hidden="true">${esc(initials)}</span></div>
        <div><p class="name">${esc(P.name)}</p><p class="role">${esc(P.title)}</p></div>
        <a class="btn btn-sm cv-mini" href="${esc(P.cv)}" target="_blank" rel="noopener">CV</a>
      </div>
      <p class="status"><span class="dot" aria-hidden="true"></span>${esc(P.status)}</p>
      <ul class="meta">${P.meta.map((m) => `<li>${icon(m.icon, 16)}<span>${esc(m.text)}</span></li>`).join("")}</ul>
      <nav class="vnav" id="nav" aria-label="Navigation principale">
        <span class="seg-pill" aria-hidden="true"></span>
        ${VIEWS.map((v, i) => `<button data-nav="${v.id}"><span class="num">0${i + 1}</span>${v.label}</button>`).join("")}
      </nav>
      <div class="side-foot">
        <a class="btn btn-block" href="${esc(P.cv)}" target="_blank" rel="noopener">${icon("download", 17)} Télécharger mon CV</a>
        <div class="side-links">
          <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${esc(P.github)}" target="_blank" rel="noopener">GitHub</a>
          <a href="mailto:${esc(P.email)}">E-mail</a>
        </div>
      </div>`;
  }

  /* ---------------- Vues ---------------- */
  function viewPresentation() {
    const A = S.about;
    const now = projectsById[P.now];
    const stats = P.stats.map((s) => {
      const v = String(s.value).replace("{projects}", PROJECTS.length);
      return `<div class="stat"><p class="v"${/^\d+$/.test(v) ? ` data-num="${v}"` : ""}>${esc(v)}</p><p class="l">${esc(s.label)}</p></div>`;
    }).join("");
    const words = P.rotate || [];
    const rot = words.length
      ? `<span class="sr-only">${esc(words[0])}</span><span class="rot" aria-hidden="true">${words.map((w, i) => `<span class="${i ? "" : "on"}">${esc(w)}</span>`).join("")}</span>`
      : "";
    // La ponctuation qui suit {rotate} est intégrée à chaque mot pour éviter un espace flottant
    const m = P.headline.match(/\{rotate\}([.!?…]?)/);
    const punct = m ? m[1] : "";
    const rotP = punct ? rot.replace(/<\/span>(?=<span|<\/span>$)/g, `${esc(punct)}</span>`) : rot;
    const headline = rich(P.headline.replace(`{rotate}${punct}`, "{rotate}")).replace("{rotate}", rotP);
    const featured = (P.featured || []).map((id) => projectsById[id]).filter(Boolean);
    return `
    <section class="view" data-view="presentation" aria-labelledby="t-presentation">
      <p class="kicker st" style="--i:0">Présentation</p>
      <h1 class="title st" style="--i:0" id="t-presentation">${headline}</h1>
      <div class="hero">
        <div class="summary st" style="--i:1">${A.summary.map((t) => `<p>${rich(t)}</p>`).join("")}</div>
        <div class="stats st" style="--i:2">${stats}</div>
      </div>
      <div class="two">
        ${now ? `
        <a class="card feature st" style="--i:3" href="#presentation/${esc(now.id)}">
          <p class="label"><span class="dot" aria-hidden="true"></span>En ce moment</p>
          <h3>${esc(now.title)}</h3>
          <p class="txt">${rich(now.tagline)}</p>
          <span class="link">Voir le projet ${icon("arrow", 15)}</span>
        </a>` : ""}
        <div class="card approach st" style="--i:4">
          <p class="label">Ma façon de travailler</p>
          <ul>${A.approach.map((x) => `<li><strong>${esc(x.title)}</strong><span>${esc(x.text)}</span></li>`).join("")}</ul>
        </div>
      </div>
      ${featured.length ? `
      <div class="highlights st" style="--i:5">
        <div class="hl-head"><p class="label">Projets phares</p><a class="link" href="#projets">Voir les ${PROJECTS.length} projets ${icon("arrow", 15)}</a></div>
        <div class="hl-grid">${featured.map((p) => `
          <button class="mini" data-project="${esc(p.id)}" style="--c:var(--c-${p.cat})">
            <span class="mini-top"><span class="cat"><span class="cdot"></span>${esc(catById[p.cat].label)}</span>${icon("arrow", 15)}</span>
            <strong>${esc(p.title)}</strong>
            <span class="mini-txt">${rich(p.tagline)}</span>
          </button>`).join("")}
        </div>
      </div>` : ""}
      <p class="interests st" style="--i:6"><strong>En dehors du travail</strong>${A.interests.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</p>
    </section>`;
  }

  function viewProjects() {
    const filters = [{ id: "all", label: "Tous", n: PROJECTS.length }, ...S.categories.map((c) => ({ id: c.id, label: c.label, n: inCat(c.id).length }))];
    const tabs = filters.map((f) => `
      <button role="tab" id="tab-${f.id}" aria-controls="pgroups" data-tab="${f.id}" aria-selected="${f.id === state.filter}">
        ${esc(f.label)} <span class="count">${f.n}</span>
      </button>`).join("");
    return `
    <section class="view" data-view="projets" aria-labelledby="t-projets">
      <div class="st" style="--i:0"><p class="kicker">Projets</p><h2 class="title" id="t-projets">Ce que j'ai réalisé</h2></div>
      <div class="filterbar st" style="--i:1">
        <div class="seg tabs" role="tablist" aria-label="Filtrer les projets"><span class="seg-pill" aria-hidden="true"></span>${tabs}</div>
        <p class="fb-hint" id="fb-hint"></p>
      </div>
      <div id="pgroups" role="tabpanel"></div>
    </section>`;
  }

  function viewPath() {
    const J = S.journey;
    const tl = (items) => `<ul class="tl">${items.map((e, i) => `
      <li style="--d:${i}"><p class="date">${esc(e.date)}</p><h3>${esc(e.title)}</h3><p class="org">${esc(e.org)}</p>${e.text ? `<p>${esc(e.text)}</p>` : ""}</li>`).join("")}</ul>`;
    return `
    <section class="view" data-view="parcours" aria-labelledby="t-parcours">
      <div class="vh-row st" style="--i:0">
        <div><p class="kicker">Parcours</p><h2 class="title" id="t-parcours">Expérience et formation</h2></div>
        <a class="btn btn-sec" href="${esc(P.cv)}" target="_blank" rel="noopener">${icon("download", 16)} CV complet en PDF</a>
      </div>
      <div class="path">
        <div class="card st" style="--i:1"><p class="label">Expérience</p>${tl(J.experience)}</div>
        <div class="path-side">
          <div class="card st" style="--i:2"><p class="label">Formation</p>${tl(J.education)}</div>
          ${(J.engagements || []).length ? `<div class="card st" style="--i:3"><p class="label">Engagements</p>${tl(J.engagements)}</div>` : ""}
        </div>
      </div>
    </section>`;
  }

  function viewSkills() {
    const J = S.journey;
    return `
    <section class="view" data-view="competences" aria-labelledby="t-competences">
      <p class="kicker st" style="--i:0">Compétences</p>
      <h2 class="title st" style="--i:0" id="t-competences">Ce que je sais faire</h2>
      <div class="certs st" style="--i:1">${(J.certifications || []).map((c) => `
        <div class="card cert"><span class="ic">${icon("award", 22)}</span><span><strong>${esc(c.title)}</strong><span>${esc(c.org)}</span></span></div>`).join("")}
      </div>
      <div class="skills">${J.skills.map((g, i) => `
        <div class="card skill st" style="--i:${i + 2}"><h4>${esc(g.group)}</h4><div class="tags">${g.items.map((t, j) => `<span class="tag" style="--t:${j}">${esc(t)}</span>`).join("")}</div></div>`).join("")}
      </div>
    </section>`;
  }

  function viewContact() {
    const row = (ic, lbl, val, href, act) => `
      <${href ? `a href="${esc(href)}" target="_blank" rel="noopener"` : "div"} class="crow">
        <span class="ic">${icon(ic, 20)}</span>
        <span><span class="lbl">${lbl}</span><br><span class="val">${esc(val)}</span></span>
        <span class="act">${act}</span>
      </${href ? "a" : "div"}>`;
    const av = P.availability || [];
    return `
    <section class="view" data-view="contact" aria-labelledby="t-contact">
      <p class="kicker st" style="--i:0">Contact</p>
      <h2 class="title st" style="--i:0" id="t-contact">Échangeons</h2>
      <p class="desc st" style="--i:1">Une opportunité en data, en IA ou dans le cloud, une mission freelance ou simplement une question : je réponds volontiers.</p>
      <div class="contact-grid">
        <div class="contact-list st" style="--i:2">
          ${row("mail", "E-mail", P.email, null, `<button class="btn btn-sec btn-sm" id="copy-mail">${icon("copy", 15)} Copier</button><a class="btn btn-sm" href="mailto:${esc(P.email)}">Écrire</a>`)}
          ${row("user", "LinkedIn", P.linkedin.replace(/^https?:\/\/(www\.)?/, ""), P.linkedin, icon("ext", 17))}
          ${row("code", "GitHub", P.github.replace(/^https?:\/\/(www\.)?/, ""), P.github, icon("ext", 17))}
          ${row("file", "CV", "Télécharger en PDF", P.cv, icon("download", 17))}
        </div>
        ${av.length ? `
        <aside class="card avail st" style="--i:3">
          <p class="label"><span class="dot" aria-hidden="true"></span>Disponibilité</p>
          <dl>${av.map((a) => `<div><dt>${esc(a.label)}</dt><dd>${esc(a.value)}</dd></div>`).join("")}</dl>
          <a class="btn btn-block" href="mailto:${esc(P.email)}">${icon("mail", 16)} Me proposer un échange</a>
        </aside>` : ""}
      </div>
      <div class="cta-band st" style="--i:4">
        <div><p class="cta-t">Vous recrutez en data, IA ou cloud ?</p><p class="cta-s">Mon CV résume mon parcours en une page, et mes ${PROJECTS.length} projets sont détaillés sur ce site.</p></div>
        <div class="cta-b"><a class="btn btn-light" href="${esc(P.cv)}" target="_blank" rel="noopener">${icon("download", 16)} Télécharger le CV</a><a class="btn btn-outline-light" href="#projets">Voir les projets ${icon("arrow", 15)}</a></div>
      </div>
      <p class="foot st" style="--i:5">© ${new Date().getFullYear()} ${esc(P.name)} · ${esc(P.location)}</p>
    </section>`;
  }

  function drawerContent(p) {
    const labels = { github: "Code sur GitHub", demo: "Voir la démo" };
    const links = Object.entries(p.links || {}).filter(([, url]) => url)
      .map(([k, url]) => `<a class="btn btn-sm${k === "demo" ? "" : " btn-sec"}" href="${esc(url)}" target="_blank" rel="noopener">${esc(labels[k] || k)} ${icon("ext", 15)}</a>`).join("");
    return `
      ${p.image ? `<div class="thumb"><img src="${esc(p.image)}" alt=""></div>` : ""}
      <div class="d-head">
        <div class="pc-top"><span>${esc(p.where)}${p.year ? ` · ${esc(p.year)}` : ""}</span>${badge(p.status)}</div>
        <h2 id="d-title">${esc(p.title)}</h2>
        <p>${rich(p.tagline)}</p>
      </div>
      <div class="d-sec"><h4>Contexte</h4><p>${rich(p.context)}</p></div>
      <div class="d-sec"><h4>Ce que j'ai fait</h4><ul>${p.did.map((d) => `<li>${rich(d)}</li>`).join("")}</ul></div>
      <div class="d-sec"><h4>Ce que j'en retiens</h4><p class="learned">${rich(p.learned)}</p></div>
      <div class="d-sec"><h4>Outils</h4>${tags(p.stack)}</div>
      ${links ? `<div class="d-links">${links}</div>` : ""}`;
  }

  /* ---------------- Indicateurs animés (nav + onglets) ---------------- */
  function movePill(seg) {
    const pill = seg && $(".seg-pill", seg);
    const active = seg && $('[aria-current="page"],[aria-selected="true"]', seg);
    if (!pill || !active || !seg.offsetParent) return;
    pill.style.setProperty("--x", active.offsetLeft + "px");
    pill.style.setProperty("--y", active.offsetTop + "px");
    pill.style.setProperty("--w", active.offsetWidth + "px");
    pill.style.setProperty("--h", active.offsetHeight + "px");
  }
  const moveAllPills = () => { movePill($("#nav")); movePill($(".tabs")); };

  /* ---------------- Projets ---------------- */
  const currentList = () => (state.filter === "all" ? PROJECTS : inCat(state.filter));
  function renderGrid(animate) {
    const cats = state.filter === "all" ? S.categories : [catById[state.filter]];
    let n = 0;
    $("#pgroups").innerHTML = cats.map((c) => {
      const list = inCat(c.id);
      if (!list.length) return "";
      return `
      <section class="pgroup" style="--c:var(--c-${c.id})">
        <div class="pg-head"><h3><span class="cdot"></span>${esc(c.label)}<span class="count">${list.length}</span></h3><p>${esc(c.desc)}</p></div>
        <div class="pgrid">${list.map((p) => projectCard(p, Math.min(n++, 9))).join("")}</div>
      </section>`;
    }).join("");
    $("#fb-hint").textContent = state.filter === "all"
      ? `${PROJECTS.length} projets · cliquez sur une catégorie pour filtrer`
      : `${currentList().length} projets · ${catById[state.filter].label}`;
    $$("[data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === state.filter)));
    movePill($(".tabs"));
    const box = $("#pgroups");
    box.classList.remove("is-switching");
    if (animate && !reduce) { void box.offsetWidth; box.classList.add("is-switching"); }
  }

  function setFilter(f, animate = true) {
    if (f !== "all" && !catById[f]) return;
    if (f === state.filter && f !== "all") f = "all";   // recliquer sur une catégorie active = tout réafficher
    if (f === state.filter) return;
    state.filter = f;
    renderGrid(animate);
    const bar = $(".filterbar");
    if (bar && bar.getBoundingClientRect().top < 0) bar.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }

  const drawer = $("#drawer");
  function openProject(id) {
    const p = projectsById[id];
    if (!p) return;
    if (!currentList().includes(p)) setFilter("all", false);
    if (!state.open) state.lastFocus = document.activeElement;
    state.open = id;
    const list = currentList();
    $("#drawer-pos").textContent = `${catById[p.cat].label} · ${list.indexOf(p) + 1} / ${list.length}`;
    $("#drawer-body").innerHTML = drawerContent(p);
    $("#drawer-body").scrollTop = 0;
    document.title = `${p.title} · ${P.name}`;
    if (drawer.hidden) {
      drawer.hidden = false;
      document.body.classList.add("locked");
      requestAnimationFrame(() => requestAnimationFrame(() => drawer.classList.add("open")));
      setTimeout(() => $(".drawer-bar .icon-btn").focus({ preventScroll: true }), 60);
    }
  }

  function closeProject() {
    if (!state.open) return;
    state.open = null;
    drawer.classList.remove("open");
    document.body.classList.remove("locked");
    setTimeout(() => { if (!state.open) drawer.hidden = true; }, reduce ? 0 : 450);
    state.lastFocus?.focus?.({ preventScroll: true });
  }

  function stepProject(dir) {
    const list = currentList();
    const i = list.findIndex((p) => p.id === state.open);
    location.hash = `${state.view}/${list[(i + dir + list.length) % list.length].id}`;
  }

  /* ---------------- Navigation entre vues ---------------- */
  function show(view, animate) {
    view = ALIASES[view] ?? view;
    if (!VIEWS.some((v) => v.id === view)) view = "presentation";
    if (view === state.view) return;
    const token = ++state.navToken;
    const prev = state.view && $(`.view[data-view="${state.view}"]`);
    const next = $(`.view[data-view="${view}"]`);
    state.view = view;

    $$("#nav button").forEach((b) => (b.dataset.nav === view ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current")));
    movePill($("#nav"));
    $(`#nav [data-nav="${view}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce ? "auto" : "smooth" });
    const label = VIEWS.find((v) => v.id === view).label;
    document.title = view === "presentation" ? `${P.name} · Ingénieur Data & IA` : `${label} · ${P.name}`;

    const enter = () => {
      if (token !== state.navToken) return;
      $$(".view").forEach((v) => { if (v !== next) { v.hidden = true; v.classList.remove("is-leaving", "is-entering"); } });
      next.hidden = false;
      next.classList.remove("is-leaving", "is-entering");
      window.scrollTo({ top: 0, behavior: "instant" });
      if (animate && !reduce) { void next.offsetWidth; next.classList.add("is-entering"); }
      if (view === "projets") requestAnimationFrame(() => movePill($(".tabs")));
      if (view === "presentation") countUp();
    };
    if (prev && animate && !reduce) { prev.classList.add("is-leaving"); setTimeout(enter, 140); }
    else enter();
  }

  function route() {
    const [view, id] = location.hash.replace(/^#\/?/, "").split("/");
    show(view, state.view !== null);
    if (id && projectsById[id]) openProject(id);
    else closeProject();
  }

  /* ---------------- Animations ---------------- */
  function countUp() {
    $$("[data-num]").forEach((el) => {
      const target = Number(el.dataset.num);
      if (reduce || target < 2) { el.textContent = target; return; }
      const t0 = performance.now(), dur = 1100;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function startRotator() {
    const rot = $(".rot");
    if (!rot || reduce) return;
    const words = $$("span", rot);
    if (words.length < 2) return;
    let i = 0;
    setInterval(() => {
      if (state.view !== "presentation" || document.hidden) return;
      const cur = words[i]; i = (i + 1) % words.length;
      cur.classList.remove("on"); cur.classList.add("out");
      words[i].classList.remove("out"); words[i].classList.add("on");
      setTimeout(() => cur.classList.remove("out"), 600);
    }, 2800);
  }

  // Halo lumineux qui suit le curseur sur les cartes
  function spotlight() {
    if (!matchMedia("(hover: hover)").matches) return;
    document.addEventListener("pointermove", (e) => {
      const c = e.target.closest?.(".pcard,.feature,.skill,.cert,.mini,.avail");
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------------- Init ---------------- */
  function init() {
    renderSide();
    $("#app").insertAdjacentHTML("beforeend", viewPresentation() + viewProjects() + viewPath() + viewSkills() + viewContact());
    $$(".view").forEach((v) => (v.hidden = true));
    $(".drawer-bar .icon-btn").innerHTML = icon("close", 18);
    renderGrid(false);

    // Photo absente → initiales
    const av = $(".avatar"), img = $("img", av);
    const noPhoto = () => av.classList.add("no-photo");
    img.addEventListener("error", noPhoto);
    if (img.complete && !img.naturalWidth) noPhoto();

    // Clics délégués
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-nav],[data-tab],[data-project],[data-close],[data-step],#copy-mail");
      if (!t) return;
      if (t.dataset.nav) location.hash = t.dataset.nav;
      else if (t.dataset.tab) setFilter(t.dataset.tab);
      else if (t.dataset.project) location.hash = `${state.view}/${t.dataset.project}`;
      else if (t.hasAttribute("data-close")) location.hash = state.view;
      else if (t.dataset.step) stepProject(Number(t.dataset.step));
      else if (t.id === "copy-mail") {
        navigator.clipboard?.writeText(P.email).then(() => {
          const html = t.innerHTML;
          t.textContent = "Copié";
          setTimeout(() => (t.innerHTML = html), 1500);
        });
      }
    });

    // Clavier : Échap ferme, ←/→ change de projet
    document.addEventListener("keydown", (e) => {
      if (!state.open) return;
      if (e.key === "Escape") location.hash = state.view;
      if (e.key === "ArrowRight") stepProject(1);
      if (e.key === "ArrowLeft") stepProject(-1);
    });

    addEventListener("hashchange", route);
    const setStick = () => document.documentElement.style.setProperty("--stick", (innerWidth < 1024 ? $("#side").offsetHeight : 0) + "px");
    setStick();
    addEventListener("resize", () => requestAnimationFrame(() => { moveAllPills(); setStick(); }), { passive: true });
    document.fonts?.ready.then(moveAllPills);

    route();
    if (!reduce) $(`.view[data-view="${state.view}"]`).classList.add("is-entering");
    if (state.view === "presentation") countUp();
    startRotator();
    spotlight();
    requestAnimationFrame(moveAllPills);
  }

  init();
})();
