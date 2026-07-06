const coatItems = [
  { id: 13, category: ["short", "stand"], position: "54% 40%", name: { en: "Black stand-collar short coat", zh: "黑色立领短款外套" }, tags: { en: ["Stand collar", "Short", "Black"], zh: ["立领", "短款", "黑色"] } },
  { id: 14, category: ["short"], position: "55% 42%", name: { en: "Charcoal lapel work jacket", zh: "深灰翻领工装夹克" }, tags: { en: ["Lapel", "Patch pockets", "Charcoal"], zh: ["翻领", "贴袋", "深灰"] } },
  { id: 15, category: ["short"], position: "55% 42%", name: { en: "Navy multi-pocket jacket", zh: "藏蓝多口袋夹克" }, tags: { en: ["Multi-pocket", "Navy", "Short"], zh: ["多口袋", "藏蓝", "短款"] } },
  { id: 16, category: ["short", "single"], position: "56% 42%", name: { en: "Black short tailored coat", zh: "黑色翻领短西服" }, tags: { en: ["Lapel", "Short blazer", "Black"], zh: ["翻领", "短西服", "黑色"] } },
  { id: 17, category: ["double"], position: "56% 42%", name: { en: "Black double-breasted long coat", zh: "黑色双排扣长大衣" }, tags: { en: ["Double-breasted", "Long", "Black"], zh: ["双排扣", "长款", "黑色"] } },
  { id: 18, category: ["double"], position: "57% 42%", name: { en: "Black double-breasted tailored overcoat", zh: "黑色双排扣西服大衣" }, tags: { en: ["Double-breasted", "Peak lapel", "Long"], zh: ["双排扣", "宽驳领", "长款"] } },
  { id: 19, category: ["single"], position: "56% 42%", name: { en: "Light grey single-breasted coat", zh: "浅灰单排扣大衣" }, tags: { en: ["Single-breasted", "Light grey", "Lapel"], zh: ["单排扣", "浅灰", "翻领"] } },
  { id: 20, category: ["single"], position: "56% 43%", name: { en: "Navy single-breasted coat", zh: "藏蓝单排扣大衣" }, tags: { en: ["Single-breasted", "Navy", "Lapel"], zh: ["单排扣", "藏蓝", "翻领"] } },
  { id: 21, category: ["single"], position: "57% 42%", name: { en: "Beige wool-touch lapel coat", zh: "米色翻领羊毛大衣" }, tags: { en: ["Beige", "Lapel", "Wool touch"], zh: ["米色", "翻领", "羊毛感"] } },
  { id: 22, category: ["single", "texture"], position: "56% 42%", name: { en: "Taupe herringbone coat", zh: "棕灰人字纹大衣" }, tags: { en: ["Herringbone", "Taupe", "Lapel"], zh: ["人字纹", "棕灰", "翻领"] } },
  { id: 23, category: ["single", "texture"], position: "55% 42%", name: { en: "Black-white herringbone coat", zh: "黑白人字纹大衣" }, tags: { en: ["Herringbone", "Black white", "Lapel"], zh: ["人字纹", "黑白", "翻领"] } },
  { id: 24, category: ["single"], position: "56% 42%", name: { en: "Navy mid-long single coat", zh: "藏蓝单排扣中长大衣" }, tags: { en: ["Single-breasted", "Mid-long", "Navy"], zh: ["单排扣", "中长款", "藏蓝"] } },
  { id: 25, category: ["single", "texture"], position: "56% 42%", name: { en: "Brown textured raglan coat", zh: "棕色纹理拉格兰大衣" }, tags: { en: ["Textured fabric", "Raglan sleeve", "Brown"], zh: ["纹理面料", "拉格兰袖", "棕色"] } },
  { id: 26, category: ["short", "texture"], position: "56% 42%", name: { en: "Grey short wool-touch jacket", zh: "灰色翻领短款呢外套" }, tags: { en: ["Short", "Lapel", "Grey"], zh: ["短款", "翻领", "灰色"] } },
  { id: 27, category: ["stand"], position: "57% 42%", name: { en: "Camel stand-collar mid coat", zh: "驼色立领中长大衣" }, tags: { en: ["Stand collar", "Camel", "Concealed placket"], zh: ["立领", "驼色", "暗门襟"] } },
  { id: 28, category: ["single", "texture"], position: "56% 42%", name: { en: "Blue textured lapel coat", zh: "蓝色纹理翻领外套" }, tags: { en: ["Blue", "Textured fabric", "Lapel"], zh: ["蓝色", "纹理面料", "翻领"] } },
  { id: 29, category: ["single"], position: "56% 42%", name: { en: "Navy relaxed lapel long coat", zh: "藏蓝翻领长大衣" }, tags: { en: ["Navy", "Long", "Lapel"], zh: ["藏蓝", "长款", "翻领"] } }
];

let activeCoatList = coatItems;
let activeCoatIndex = 0;

function coatLanguage() {
  return document.documentElement.lang === "zh-CN" ? "zh" : "en";
}

function renderCoatShowcase(filter = "all") {
  const lookbook = document.querySelector(".coat-lookbook");
  if (!lookbook) return;
  const language = coatLanguage();
  activeCoatList = filter === "all" ? coatItems : coatItems.filter((coat) => coat.category.includes(filter));
  lookbook.innerHTML = activeCoatList.slice(0, 6).map((coat) => {
    const fullIndex = activeCoatList.findIndex((item) => item.id === coat.id);
    const hint = language === "zh" ? "点击打开大图，可连续查看当前分类的全部产品。" : "Open the viewer to browse every item in this category.";
    return `<article class="coat-card"><button class="coat-open" type="button" data-coat-index="${fullIndex}" aria-label="${coat.name[language]}"><div class="coat-image" style="--position: ${coat.position}"><img src="image/coat-${coat.id}.jpg" alt="${coat.name[language]}" loading="lazy"></div><div class="coat-info"><h3>${coat.name[language]}</h3><p>${hint}</p><div class="coat-tags">${coat.tags[language].map((tag) => `<span>${tag}</span>`).join("")}</div></div></button></article>`;
  }).join("");
}

function openCoatLightbox(index) {
  const lightbox = document.querySelector("#coat-lightbox");
  if (!lightbox || !activeCoatList.length) return;
  activeCoatIndex = (index + activeCoatList.length) % activeCoatList.length;
  const coat = activeCoatList[activeCoatIndex];
  const language = coatLanguage();
  const image = lightbox.querySelector(".coat-lightbox-image");
  image.src = `image/coat-${coat.id}.jpg`;
  image.alt = coat.name[language];
  lightbox.querySelector(".coat-lightbox-title").textContent = coat.name[language];
  lightbox.querySelector(".coat-lightbox-meta").textContent = `${activeCoatIndex + 1} / ${activeCoatList.length}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeCoatLightbox() {
  const lightbox = document.querySelector("#coat-lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

function bindCoatGallery() {
  document.addEventListener("click", (event) => {
    const openButton = event.target.closest(".coat-open");
    if (openButton) openCoatLightbox(Number(openButton.dataset.coatIndex));
    if (event.target.closest(".coat-lightbox-close")) closeCoatLightbox();
    if (event.target.closest(".coat-lightbox-prev")) openCoatLightbox(activeCoatIndex - 1);
    if (event.target.closest(".coat-lightbox-next")) openCoatLightbox(activeCoatIndex + 1);
    if (event.target.id === "coat-lightbox") closeCoatLightbox();
  });

  document.querySelectorAll(".coat-filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".coat-filter").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderCoatShowcase(button.dataset.filter);
    });
  });

  document.querySelector(".language-toggle")?.addEventListener("click", () => {
    window.setTimeout(() => renderCoatShowcase(document.querySelector(".coat-filter.is-active")?.dataset.filter || "all"), 0);
  });

  document.addEventListener("keydown", (event) => {
    if (!document.querySelector("#coat-lightbox.open")) return;
    if (event.key === "Escape") closeCoatLightbox();
    if (event.key === "ArrowLeft") openCoatLightbox(activeCoatIndex - 1);
    if (event.key === "ArrowRight") openCoatLightbox(activeCoatIndex + 1);
  });
}

bindCoatGallery();
renderCoatShowcase();
