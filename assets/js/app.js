const PLATES = {
  intestines: {
    title: "Torso & intestines",
    sub: "Organ layout + teaching clarity",
    src: "assets/img/vesalius_intestines.jpg",
    credit: "Wikimedia Commons (Wellcome Collection scan) — Exposed torso revealing intestines, by Vesalius. File: vesalius_intestines.jpg",
    notes: [
      { title: "Layering", text: "The plate separates layers so students can see what sits on top of what—like a built-in lesson." },
      { title: "Intestinal loops", text: "Notice how the loops are arranged to show general placement, even if exact detail varies from modern diagrams." },
      { title: "Teaching pose", text: "The figure stands like a statue; that theatrical pose makes the anatomy easier to remember." }
    ]
  },
  vessels: {
    title: "Veins & arteries",
    sub: "Circulation understanding (pre‑Harvey)",
    src: "assets/img/vesalius_vessels.jpg",
    credit: "Wikimedia Commons (Wellcome Collection scan) — Male figure showing veins and arteries, by Vesalius. File: vesalius_vessels.jpg",
    notes: [
      { title: "Vessel mapping", text: "Dense lines represent major vessels. The goal is clarity of routes, not a perfect modern map." },
      { title: "Evidence over authority", text: "Vesalius promoted learning from dissection and observation rather than repeating older texts." },
      { title: "Visual explanation", text: "Illustrations let readers study the same “specimen” repeatedly—something dissections couldn’t offer." }
    ]
  },
  skeleton: {
    title: "Skeleton “memento mori”",
    sub: "Accuracy + Renaissance storytelling",
    src: "assets/img/vesalius_skeleton.jpg",
    credit: "Wikimedia Commons (Wellcome Collection scan) — Skeleton contemplating a skull, by Vesalius. File: vesalius_skeleton.jpg",
    notes: [
      { title: "Skull & spine", text: "The skull and vertebrae show careful attention to form—use this as an example of improved accuracy." },
      { title: "Pelvis + femur", text: "Key weight-bearing structures are emphasised; compare to your textbook skeleton diagram." },
      { title: "Storytelling", text: "The pose (holding a skull) reflects Renaissance symbolism: life, death, and the study of the body." }
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

  
const dotEls = [];
const noteEls = [];

function setActive(i){
  dotEls.forEach(el => el.classList.remove("is-active"));
  noteEls.forEach(el => el.classList.remove("is-active"));
  if (dotEls[i]) dotEls[i].classList.add("is-active");
  if (noteEls[i]) noteEls[i].classList.add("is-active");
}

plate.notes.forEach((n, idx) => {
  const d = document.createElement("button");
  d.className = "dot";
  d.type = "button";
  d.style.left = (n.x * 100) + "%";
  d.style.top  = (n.y * 100) + "%";
  d.setAttribute("aria-label", `Annotation ${idx + 1}: ${n.title}`);

  const card = document.createElement("div");
  card.className = "note";
  card.id = `note-${key}-${idx}`;
  card.innerHTML = `<b>${idx + 1}. ${escapeHtml(n.title)}</b><p>${escapeHtml(n.text)}</p>`;

  // dot -> scroll & highlight the matching note
  d.addEventListener("click", () => {
    setActive(idx);
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    flash(card);
  });

  // note -> highlight matching dot (nice for students)
  card.addEventListener("click", () => {
    setActive(idx);
    flash(card);
  });

  dots.appendChild(d);
  noteList.appendChild(card);

  dotEls.push(d);
  noteEls.push(card);
});

// default highlight the first annotation
if (plate.notes.length) setActive(0);

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
