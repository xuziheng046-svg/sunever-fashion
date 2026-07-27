const productCategories = ["blazer", "suit", "coat", "double-face-coat"];

const blazerItems = Array.from({ length: 20 }, (_, index) => {
  const productNumber = index + 1;
  return {
    id: productNumber,
    name: `Men's Blazer ${String(productNumber).padStart(2, "0")}`,
    images: [1, 2, 3].map((view) => `image/blazers/blazer-${String(productNumber).padStart(2, "0")}-${view}.jpg`)
  };
});

let activeCategory = "blazer";
let activeProductIndex = 0;
let activeImageIndex = 0;

function blazerCard(product, productIndex) {
  return `<article class="coat-card blazer-card">
    <div class="blazer-gallery" data-product-index="${productIndex}">
      <button class="coat-open blazer-main" type="button" data-product-index="${productIndex}" data-image-index="0" aria-label="Open ${product.name}">
        <div class="coat-image"><img src="${product.images[0]}" alt="${product.name} — view 1" loading="lazy"></div>
      </button>
      <div class="blazer-thumbnails" aria-label="${product.name} views">
        ${product.images.map((image, imageIndex) => `<button class="blazer-thumb${imageIndex === 0 ? " is-active" : ""}" type="button" data-image-index="${imageIndex}" aria-label="Show view ${imageIndex + 1}"><img src="${image}" alt="" loading="lazy"></button>`).join("")}
      </div>
      <div class="coat-info"><h3>${product.name}</h3><p>Three coordinated views of one product.</p></div>
    </div>
  </article>`;
}

function renderProductCategory(category = "blazer") {
  const lookbook = document.querySelector(".coat-lookbook");
  if (!lookbook) return;
  activeCategory = category;
  if (category === "blazer") {
    lookbook.innerHTML = blazerItems.map(blazerCard).join("");
    return;
  }
  const label = document.querySelector(`.coat-filter[data-category="${category}"]`)?.textContent || "This category";
  const emptyMessage = translations[currentLanguage]?.["category.empty"] || "Products will be added soon.";
  lookbook.innerHTML = `<p class="category-empty">${label} · ${emptyMessage}</p>`;
}

function openProductLightbox(productIndex, imageIndex = 0) {
  const lightbox = document.querySelector("#coat-lightbox");
  if (!lightbox || activeCategory !== "blazer") return;
  activeProductIndex = productIndex;
  activeImageIndex = (imageIndex + 3) % 3;
  const product = blazerItems[activeProductIndex];
  const image = lightbox.querySelector(".coat-lightbox-image");
  image.src = product.images[activeImageIndex];
  image.alt = `${product.name} — view ${activeImageIndex + 1}`;
  lightbox.querySelector(".coat-lightbox-title").textContent = product.name;
  lightbox.querySelector(".coat-lightbox-meta").textContent = `View ${activeImageIndex + 1} / 3`;
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
      const product = blazerItems[Number(gallery.dataset.productIndex)];
      gallery.querySelector(".blazer-main img").src = product.images[imageIndex];
      gallery.querySelector(".blazer-main img").alt = `${product.name} — view ${imageIndex + 1}`;
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

  document.querySelector(".language-toggle")?.addEventListener("click", () => {
    window.setTimeout(() => renderProductCategory(activeCategory), 0);
  });

  document.addEventListener("keydown", (event) => {
    if (!document.querySelector("#coat-lightbox.open")) return;
    if (event.key === "Escape") closeProductLightbox();
    if (event.key === "ArrowLeft") openProductLightbox(activeProductIndex, activeImageIndex - 1);
    if (event.key === "ArrowRight") openProductLightbox(activeProductIndex, activeImageIndex + 1);
  });
}

bindProductGallery();
renderProductCategory();
