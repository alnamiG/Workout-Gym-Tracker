document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector('.slides');
  const slideImages = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let currentIndex = 0;

  function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideImages.length;
    updateSlidePosition();
  });

  prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
    updateSlidePosition();
  });

  // Auto-slide every 3 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideImages.length;
    updateSlidePosition();
  }, 3000);
});
