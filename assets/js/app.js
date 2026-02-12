const PLATES = {
  intestines: {
    title: "Torso & intestines",
    sub: "Organ layout + teaching clarity",
    src: "assets/img/vesalius_intestines.jpg",
    credit: "Vesalius torso plate showing organs and intestinal structure.",
    notes: [
      { title: "Layering", text: "Vesalius separated layers so students could clearly see internal structure." },
      { title: "Intestinal loops", text: "The loops show general placement rather than exact modern anatomy." },
      { title: "Teaching pose", text: "The dramatic pose helps viewers understand the structure more easily." }
    ]
  },

  vessels: {
    title: "Veins & arteries",
    sub: "Early understanding of circulation",
    src: "assets/img/vesalius_vessels.jpg",
    credit: "Illustration of veins and arteries from Vesalius' Fabrica.",
    notes: [
      { title: "Vessel mapping", text: "Major vessels are shown clearly for teaching purposes." },
      { title: "Observation", text: "Vesalius relied on dissection rather than ancient texts." },
      { title: "Learning tool", text: "Printed images allowed anatomy to be studied without a body present." }
    ]
  },

  skeleton: {
    title: "Skeleton",
    sub: "Accuracy and symbolism",
    src: "assets/img/vesalius_skeleton.jpg",
    credit: "Skeleton plate from De Humani Corporis Fabrica (1543).",
    notes: [
      { title: "Accuracy", text: "Bones are drawn with careful observation from real dissections." },
      { title: "Weight bearing", text: "Pelvis and femur show how the body supports weight." },
      { title: "Symbolism", text: "The dramatic pose reflects Renaissance themes of life and death." }
    ]
  }
};

const modal = document.getElementById("modal");
const mImg = document.getElementById("mImg");
const mTitle = document.getElementById("mTitle");
const mSub = document.getElementById("mSub");
const mCredit = document.getElementById("mCredit");
const mCaption = document.getElementById("mCaption");
const noteList = document.getElementById("noteList");

function escapeHtml(s){
  return String(s).replace(/[&<>"]/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;"
  }[c]));
}

function openModal(key){
  const plate = PLATES[key];
  if (!plate) return;

  mTitle.textContent = plate.title;
  mSub.textContent = plate.sub;
  mCredit.textContent = plate.credit;

  if (mCaption) mCaption.textContent = plate.credit;

  mImg.src = plate.src;

  noteList.innerHTML = "";

  const noteEls = [];

  function setActive(i){
    noteEls.forEach(el => el.classList.remove("is-active"));
    if (noteEls[i]) noteEls[i].classList.add("is-active");
  }

  plate.notes.forEach((n, idx) => {
    const card = document.createElement("div");
    card.className = "note";
    card.innerHTML = `<b>${idx + 1}. ${escapeHtml(n.title)}</b><p>${escapeHtml(n.text)}</p>`;

    card.addEventListener("click", () => {
      setActive(idx);
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    noteList.appendChild(card);
    noteEls.push(card);
  });

  if (plate.notes.length) setActive(0);

  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".plate").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.plate));
});

modal.addEventListener("click", (e) => {
  if (e.target?.dataset?.close) closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
});
