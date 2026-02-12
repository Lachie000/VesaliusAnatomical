const PLATES = {
  intestines: {
    title: "Torso & intestines",
    sub: "Organ layout + teaching clarity",
    src: "assets/img/vesalius_intestines.jpg",
    credit: "Wikimedia Commons (Wellcome Collection scan) — Exposed torso revealing intestines, by Vesalius. File: vesalius_intestines.jpg",
    notes: [
      { x: 0.52, y: 0.42, title: "Layering", text: "The plate separates layers so students can see what sits on top of what—like a built-in lesson." },
      { x: 0.62, y: 0.55, title: "Intestinal loops", text: "Notice how the loops are arranged to show general placement, even if exact detail varies from modern diagrams." },
      { x: 0.40, y: 0.32, title: "Teaching pose", text: "The figure stands like a statue; that theatrical pose makes the anatomy easier to remember." }
    ]
  },
  vessels: {
    title: "Veins & arteries",
    sub: "Circulation understanding (pre‑Harvey)",
    src: "assets/img/vesalius_vessels.jpg",
    credit: "Wikimedia Commons (Wellcome Collection scan) — Male figure showing veins and arteries, by Vesalius. File: vesalius_vessels.jpg",
    notes: [
      { x: 0.58, y: 0.36, title: "Vessel mapping", text: "Dense lines represent major vessels. The goal is clarity of routes, not a perfect modern map." },
      { x: 0.52, y: 0.60, title: "Evidence over authority", text: "Vesalius promoted learning from dissection and observation rather than repeating older texts." },
      { x: 0.46, y: 0.20, title: "Visual explanation", text: "Illustrations let readers study the same “specimen” repeatedly—something dissections couldn’t offer." }
    ]
  },
  skeleton: {
    title: "Skeleton “memento mori”",
    sub: "Accuracy + Renaissance storytelling",
    src: "assets/img/vesalius_skeleton.jpg",
    credit: "Wikimedia Commons (Wellcome Collection scan) — Skeleton contemplating a skull, by Vesalius. File: vesalius_skeleton.jpg",
    notes: [
      { x: 0.52, y: 0.25, title: "Skull & spine", text: "The skull and vertebrae show careful attention to form—use this as an example of improved accuracy." },
      { x: 0.58, y: 0.58, title: "Pelvis + femur", text: "Key weight-bearing structures are emphasised; compare to your textbook skeleton diagram." },
      { x: 0.80, y: 0.30, title: "Storytelling", text: "The pose (holding a skull) reflects Renaissance symbolism: life, death, and the study of the body." }
    ]
  }
};

const modal = document.getElementById("modal");
const mImg = document.getElementById("mImg");
const mTitle = document.getElementById("mTitle");
const mSub = document.getElementById("mSub");
const mCredit = document.getElementById("mCredit");
const dots = document.getElementById("dots");
const noteList = document.getElementById("noteList");

function openModal(key){
  const plate = PLATES[key];
  if (!plate) return;

  mTitle.textContent = plate.title;
  mSub.textContent = plate.sub;
  mCredit.textContent = plate.credit;

  mImg.src = plate.src;

  dots.innerHTML = "";
  noteList.innerHTML = "";

  plate.notes.forEach((n, idx) => {
    const d = document.createElement("button");
    d.className = "dot";
    d.type = "button";
    d.style.left = (n.x * 100) + "%";
    d.style.top  = (n.y * 100) + "%";
    d.setAttribute("aria-label", `Annotation ${idx + 1}: ${n.title}`);
    d.addEventListener("click", () => {
      const el = document.getElementById(`note-${key}-${idx}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      flash(el);
    });
    dots.appendChild(d);

    const card = document.createElement("div");
    card.className = "note";
    card.id = `note-${key}-${idx}`;
    card.innerHTML = `<b>${idx + 1}. ${escapeHtml(n.title)}</b><p>${escapeHtml(n.text)}</p>`;
    noteList.appendChild(card);
  });

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function escapeHtml(s){
  return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

function flash(el){
  if (!el) return;
  el.animate([{ transform:"scale(1)" }, { transform:"scale(1.02)" }, { transform:"scale(1)"}], { duration: 280 });
}

document.querySelectorAll(".plate").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.plate));
});

modal.addEventListener("click", (e) => {
  const close = e.target?.dataset?.close;
  if (close) closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
});
