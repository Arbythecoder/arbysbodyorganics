document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.classList.add("animate__animated"); // Add animation class
    card.dataset.animation && card.classList.add(`animate__${card.dataset.animation}`);
  });
});
