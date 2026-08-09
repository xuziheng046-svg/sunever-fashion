const productCategories = ["blazer", "suit", "coat", "mens-double-face-coat", "double-face-coat"];

function makeProducts({ count, name, directory, prefix, imageCounts = {}, defaultImageCount = 3 }) {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const padded = String(number).padStart(2, "0");
    const imageCount = imageCounts[number] || defaultImageCount;
    return {
      id: number,
      name: `${name} ${padded}`,
      images: Array.from({ length: imageCount }, (_, imageIndex) => `image/${directory}/${prefix}-${padded}-${imageIndex + 1}.jpg`)
    };
  });
}

const productsByCategory = {
  blazer: makeProducts({ count: 20, name: "Men's Blazer", directory: "blazers", prefix: "blazer" }),
  coat: makeProducts({ count: 21, name: "Men's Coat", directory: "mens-coat", prefix: "mens-coat", defaultImageCount: 1 }),
  "mens-double-face-coat": makeProducts({ count: 13, name: "Men's Double Face Coat", directory: "double-face-men", prefix: "mens-double-face" }),
  "double-face-coat": makeProducts({ count: 20, name: "Lady's Double Face Coat", directory: "double-face-women", prefix: "ladys-double-face", imageCounts: { 3: 2, 4: 2, 17: 2 } })
};

const viewNames = ["Front", "Back", "Inside"];
let activeCategory = "blazer";
let activeProductIndex = 0;
let activeImageIndex = 0;

function productCard(product, productIndex) {
  const summary = product.images.length === 1 ? "Product view." : product.images.length === 3 ? "Front, back and inside views." : "Front and back views.";
  return `<article class="coat-card blazer-card">
    <div class="blazer-gallery" data-product-index="${productIndex}">
      <button class="coat-open blazer-main" type="button" data-product-index="${productIndex}" data-image-index="0" aria-label="Open ${product.name}">
        <div class="coat-image"><img src="${product.images[0]}" alt="${product.name} — front view" loading="lazy"></div>
      </button>
      ${product.images.length > 1 ? `<div class="blazer-thumbnails" aria-label="${product.name} views">
        ${product.images.map((image, imageIndex) => `<button class="blazer-thumb${imageIndex === 0 ? " is-active" : ""}" type="button" data-image-index="${imageIndex}" aria-label="Show ${viewNames[imageIndex].toLowerCase()} view"><img src="${image}" alt="" loading="lazy"></button>`).join("")}
      </div>` : ""}
      <div class="coat-info"><h3>${product.name}</h3><p>${summary}</p></div>
    </div>
  </article>`;
}

function currentProducts() {
  return productsByCategory[activeCategory] || [];
}

function renderProductCategory(category = "blazer") {
  const lookbook = document.querySelector(".coat-lookbook");
  if (!lookbook) return;
  activeCategory = category;
  const products = currentProducts();
  if (products.length) {
    lookbook.innerHTML = products.map(productCard).join("");
    return;
  }
  const label = document.querySelector(`.coat-filter[data-category="${category}"]`)?.textContent || "This category";
  const emptyMessage = translations[currentLanguage]?.["category.empty"] || "Products will be added soon.";
  lookbook.innerHTML = `<p class="category-empty">${label} · ${emptyMessage}</p>`;
}

function openProductLightbox(productIndex, imageIndex = 0) {
  const lightbox = document.querySelector("#coat-lightbox");
  const products = currentProducts();
  if (!lightbox || !products.length) return;
  activeProductIndex = productIndex;
  const product = products[activeProductIndex];
  activeImageIndex = (imageIndex + product.images.length) % product.images.length;
  const image = lightbox.querySelector(".coat-lightbox-image");
  image.src = product.images[activeImageIndex];
  image.alt = `${product.name} — ${viewNames[activeImageIndex].toLowerCase()} view`;
  lightbox.querySelector(".coat-lightbox-title").textContent = product.name;
  lightbox.querySelector(".coat-lightbox-meta").textContent = `${viewNames[activeImageIndex]} · ${activeImageIndex + 1} / ${product.images.length}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeProductLightbox() {
  const lightbox = document.querySelector("#coat-lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

function bindProductGallery() {
  document.addEventListener("click", (event) => {
    const thumbnail = event.target.closest(".blazer-thumb");
    if (thumbnail) {
      const gallery = thumbnail.closest(".blazer-gallery");
      const imageIndex = Number(thumbnail.dataset.imageIndex);
      const product = currentProducts()[Number(gallery.dataset.productIndex)];
      gallery.querySelector(".blazer-main img").src = product.images[imageIndex];
      gallery.querySelector(".blazer-main img").alt = `${product.name} — ${viewNames[imageIndex].toLowerCase()} view`;
      gallery.querySelector(".blazer-main").dataset.imageIndex = String(imageIndex);
      gallery.querySelectorAll(".blazer-thumb").forEach((item) => item.classList.toggle("is-active", item === thumbnail));
      return;
    }
    const openButton = event.target.closest(".coat-open");
    if (openButton) openProductLightbox(Number(openButton.dataset.productIndex), Number(openButton.dataset.imageIndex));
    if (event.target.closest(".coat-lightbox-close")) closeProductLightbox();
    if (event.target.closest(".coat-lightbox-prev")) openProductLightbox(activeProductIndex, activeImageIndex - 1);
    if (event.target.closest(".coat-lightbox-next")) openProductLightbox(activeProductIndex, activeImageIndex + 1);
    if (event.target.id === "coat-lightbox") closeProductLightbox();
  });
  document.querySelectorAll(".coat-filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".coat-filter").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderProductCategory(button.dataset.category);
    });
  });
  document.querySelector(".language-toggle")?.addEventListener("click", () => window.setTimeout(() => renderProductCategory(activeCategory), 0));
  document.addEventListener("keydown", (event) => {
    if (!document.querySelector("#coat-lightbox.open")) return;
    if (event.key === "Escape") closeProductLightbox();
    if (event.key === "ArrowLeft") openProductLightbox(activeProductIndex, activeImageIndex - 1);
    if (event.key === "ArrowRight") openProductLightbox(activeProductIndex, activeImageIndex + 1);
  });
}

bindProductGallery();
renderProductCategory();
