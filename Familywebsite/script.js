const members = [
  { id: "father", title: "Father", name: "Narasimharao", meta: "Age 48", img: "images/father.jpeg",
    text: ["Though my father, Narasimharao, left us when I was just six months old, his presence is always felt in our hearts. Even without memories, I carry his love and blessings with me every day. He remains a guiding light for our family, and his strength continues to inspire us."] },
  { id: "mother", title: "Mother", name: "Durga", meta: "Age 35", img: "images/mother.jpeg",
    text: ["She is the heart of the home, loving and kind. Working as a daily-wager, she balances responsibilities with patience and strength, inspiring us all.",
           "When my father passed away, she carried the entire responsibility with courage and love. She worked hard, faced many struggles, and raised all three of us with care and dedication. Without her, we would not be who we are today. She is our guiding light and the heart of our home."] },
  { id: "elder_sister", title: "Elder Sister", name: "Leeala Vathi", meta: "22 years old, Homemaker", img: "images/sister.jpeg",
    text: ["A homemaker who is caring and supportive. She brings creativity and joy into the family, guiding us with her wisdom and kindness.",
           "She has always had a deep interest in studies. But when our mother had to raise three children alone, she could not continue her education and was married at a young age. Even though her dreams of studying were left behind, today she is happy with her family and lives with love and contentment."] },
  { id: "younger_brother", title: "Younger Brother", name: "Prabhu Kumar", meta: "B.Tech, 3rd year", img: "images/brother.jpeg",
    text: ["His youthful energy adds joy and liveliness to the household. He is cheerful, curious, and loved by everyone for his playful nature.",
           "Beyond his studies, he has been a source of strength and support for me and my sister, filling the gap left by our father's absence. His care, responsibility, and love make him an important pillar of our family, and we are proud to have him by our side."] },
  { id: "swathi", title: "Swathi", name: "Swathi", meta: "B.Tech, final year", img: "images/swathi.jpeg",
    text: ["I am Swathi, currently in my final year of B.Tech. I carry three big dreams in my heart: to secure a good job, to build a house of our own since we have always lived in a rented home, and to take care of my mother, sister, and brother with love and responsibility. My journey is driven by determination, hope, and the desire to give my family the happiness they truly deserve."] }
];

const row = document.getElementById("polaroids");
const story = document.getElementById("story");
let current = 0;

members.forEach((m, i) => {
  const b = document.createElement("button");
  b.className = "polaroid";
  b.innerHTML = `<img src="${m.img}" alt="${m.title}"><b>${m.title}</b>`;
  b.onclick = () => show(i);
  row.appendChild(b);
});

function show(i, fromHash) {
  current = (i + members.length) % members.length;
  const m = members[current];
  [...row.children].forEach((el, k) => el.classList.toggle("active", k === current));
  story.innerHTML = `
    <div class="card">
      <img src="${m.img}" alt="${m.title}">
      <div>
        <div class="role">${m.title}</div>
        ${m.id === "father" ? '<div class="remember"><i></i>Forever in our hearts</div>' : ""}
        <h2>${m.name}</h2>
        <div class="meta">${m.meta}</div>
        ${m.text.map(t => `<p>${t}</p>`).join("")}
      </div>
    </div>
    <div class="nav">
      <button id="prev">&larr; Previous</button>
      <button id="next">Next &rarr;</button>
    </div>`;
  document.getElementById("prev").onclick = () => show(current - 1);
  document.getElementById("next").onclick = () => show(current + 1);
  if (!fromHash) history.replaceState(null, "", "#" + m.id);
}

const start = members.findIndex(m => "#" + m.id === location.hash);
show(start >= 0 ? start : 1, true);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") show(current + 1);
  if (e.key === "ArrowLeft") show(current - 1);
});

const splash = document.getElementById("splash");
const closeSplash = () => splash.classList.add("hide");
splash.onclick = closeSplash;
setTimeout(closeSplash, 2600);

["#e8a317", "#f06292", "#ff8a65", "#ffd54f"].forEach((c, k) => {
  for (let i = 0; i < 5; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.background = c;
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
    p.style.animationDuration = 11 + Math.random() * 12 + "s";
    p.style.animationDelay = -Math.random() * 20 + "s";
    document.body.appendChild(p);
  }
});

function node(id, cx, cy, r, label, sub) {
  const i = members.findIndex(m => m.id === id);
  return `<g class="node" onclick="show(${i}); document.getElementById('polaroids').scrollIntoView({behavior:'smooth', block:'center'})">
    <clipPath id="c-${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    <circle cx="${cx}" cy="${cy}" r="${r + 5}" fill="#fff" stroke="#e8a317" stroke-width="3"/>
    <image href="${members[i].img}" x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" preserveAspectRatio="xMidYMin slice" clip-path="url(#c-${id})"/>
    <text x="${cx}" y="${cy + r + 30}" text-anchor="middle" font-size="22">${label}</text>
    <text x="${cx}" y="${cy + r + 52}" text-anchor="middle" font-size="15" style="fill:#7b5e57">${sub}</text></g>`;
}
document.getElementById("tree").innerHTML = `<svg viewBox="0 0 900 470">
  <path class="line" d="M450 120 V190 M150 190 H750 M150 190 V255 M450 190 V255 M750 190 V255"/>
  <path class="line" d="M385 70 H515"/>
  <path class="heart" d="M450 78 C430 60 436 46 450 56 C464 46 470 60 450 78Z"/>
  ${node("father", 330, 70, 48, "Father", "In our hearts")}
  ${node("mother", 570, 70, 48, "Mother", "Heart of the home")}
  ${node("elder_sister", 150, 310, 54, "Elder Sister", "Homemaker")}
  ${node("swathi", 450, 310, 54, "Swathi", "B.Tech, Final year")}
  ${node("younger_brother", 750, 310, 54, "Younger Brother", "B.Tech 3rd year")}
</svg>`;

const lb = document.getElementById("lightbox");
lb.onclick = () => lb.classList.remove("open");
story.addEventListener("click", e => {
  if (e.target.tagName === "IMG") { lb.querySelector("img").src = e.target.src; lb.classList.add("open"); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("open"); });

const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
                                    { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
