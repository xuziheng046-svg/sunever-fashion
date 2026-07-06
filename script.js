const coats = [
  { id: 13, name: "黑色立领短款外套", category: ["short", "stand"], tags: ["立领", "短款", "黑色"], description: "利落立领配单排扣，适合商务休闲与轻通勤场景。", position: "54% 40%" },
  { id: 14, name: "深灰翻领工装夹克", category: ["short"], tags: ["翻领", "贴袋", "深灰"], description: "短款版型搭配大贴袋，视觉更轻松，适合日常搭配。", position: "55% 42%" },
  { id: 15, name: "藏蓝多口袋夹克", category: ["short"], tags: ["多口袋", "藏蓝", "短款"], description: "四袋设计保留西装线条，也增加了实穿的层次感。", position: "55% 42%" },
  { id: 16, name: "黑色翻领短西服", category: ["short", "single"], tags: ["翻领", "短西服", "黑色"], description: "三粒扣翻领款，廓形干净，适合偏正式的通勤造型。", position: "56% 42%" },
  { id: 17, name: "黑色双排扣长大衣", category: ["double"], tags: ["双排扣", "长款", "黑色"], description: "双排扣门襟和宽驳领，整体更成熟稳重。", position: "56% 42%" },
  { id: 18, name: "黑色双排扣西服大衣", category: ["double"], tags: ["双排扣", "宽驳领", "长款"], description: "排扣布局清晰，适合作为商务外套的主推款。", position: "57% 42%" },
  { id: 19, name: "浅灰单排扣大衣", category: ["single"], tags: ["单排扣", "浅灰", "翻领"], description: "浅灰色调柔和，单排扣设计简洁耐看。", position: "56% 42%" },
  { id: 20, name: "藏蓝单排扣大衣", category: ["single"], tags: ["单排扣", "藏蓝", "翻领"], description: "深色基础款大衣，线条规整，适合秋冬通勤。", position: "56% 43%" },
  { id: 21, name: "米色翻领羊毛大衣", category: ["single"], tags: ["米色", "翻领", "羊毛感"], description: "浅米色提升亲和度，适合更柔和的商务风格。", position: "57% 42%" },
  { id: 22, name: "棕灰人字纹大衣", category: ["single", "texture"], tags: ["人字纹", "棕灰", "翻领"], description: "纹理明显，保留复古感，适合强调面料质感的陈列。", position: "56% 42%" },
  { id: 23, name: "黑白人字纹大衣", category: ["single", "texture"], tags: ["人字纹", "黑白", "翻领"], description: "黑白纹理对比强，商品辨识度高，适合作为视觉重点。", position: "55% 42%" },
  { id: 24, name: "藏蓝单排扣中长大衣", category: ["single"], tags: ["单排扣", "中长款", "藏蓝"], description: "简洁门襟和直身版型，呈现稳重的正装外套气质。", position: "56% 42%" },
  { id: 25, name: "棕色纹理拉格兰大衣", category: ["single", "texture"], tags: ["纹理呢料", "拉格兰袖", "棕色"], description: "拉格兰袖与暗门襟处理，让长款大衣更柔和自然。", position: "56% 42%" },
  { id: 26, name: "灰色翻领短款呢外套", category: ["short", "texture"], tags: ["短款", "翻领", "灰色"], description: "灰色呢料短款，胸袋细节清楚，适合日常系列。", position: "56% 42%" },
  { id: 27, name: "驼色立领中长大衣", category: ["stand"], tags: ["立领", "驼色", "暗门襟"], description: "立领和隐藏门襟更现代，适合简洁高级的陈列风格。", position: "57% 42%" },
  { id: 28, name: "蓝色纹理翻领外套", category: ["single", "texture"], tags: ["蓝色", "纹理呢料", "翻领"], description: "蓝色面料增加年轻感，同时保持商务外套的稳重轮廓。", position: "56% 42%" },
  { id: 29, name: "藏蓝翻领长大衣", category: ["single"], tags: ["藏蓝", "长款", "翻领"], description: "宽松翻领长款，适合偏休闲的商务穿搭。", position: "56% 42%" }
];

const lookbook = document.querySelector(".lookbook");
const buttons = document.querySelectorAll(".filter-button");

function renderCoats(filter = "all") {
  const visibleCoats = filter === "all" ? coats : coats.filter((coat) => coat.category.includes(filter));
  lookbook.innerHTML = visibleCoats.map((coat) => `
    <article class="coat-card">
      <div class="coat-image" style="--position: ${coat.position}">
        <img src="image/coat-${coat.id}.jpg" alt="${coat.name}" loading="lazy">
      </div>
      <div class="coat-info">
        <h3>${coat.name}</h3>
        <p>${coat.description}</p>
        <div class="tags">${coat.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderCoats(button.dataset.filter);
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderCoats();
