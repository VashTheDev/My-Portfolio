const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      navLinks?.classList.remove("active");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

const modal = document.querySelector("[data-modal]");
const modalOpenButtons = document.querySelectorAll("[data-modal-open]");
const modalCloseButton = document.querySelector("[data-modal-close]");

const openModal = () => modal?.classList.add("active");
const closeModal = () => modal?.classList.remove("active");

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

modalCloseButton?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const carousel = document.querySelector("[data-carousel]");
const carouselCards = carousel ? Array.from(carousel.children) : [];
let carouselIndex = 0;

const updateCarousel = () => {
  if (!carousel) return;
  carouselCards.forEach((card, index) => {
    card.style.display = index === carouselIndex ? "grid" : "none";
  });
};

const showCarousel = () => {
  if (!carousel) return;
  if (window.innerWidth < 768 && carouselCards.length) {
    updateCarousel();
  } else {
    carouselCards.forEach((card) => {
      card.style.display = "grid";
    });
  }
};

const nextButton = document.querySelector("[data-carousel-next]");
const prevButton = document.querySelector("[data-carousel-prev]");

nextButton?.addEventListener("click", () => {
  carouselIndex = (carouselIndex + 1) % carouselCards.length;
  updateCarousel();
});

prevButton?.addEventListener("click", () => {
  carouselIndex =
    (carouselIndex - 1 + carouselCards.length) % carouselCards.length;
  updateCarousel();
});

window.addEventListener("resize", showCarousel);
showCarousel();
