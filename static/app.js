document.addEventListener('DOMContentLoaded', function() {
  const prevButton = document.querySelector('#controls .prev');
  const nextButton = document.querySelector('#controls .next');
  const slides = document.querySelectorAll('#slider input[type="radio"]');
  let currentSlide = 0;

  function updateSlide(index) {
    slides[index].checked = true;
    currentSlide = index;
  }

  prevButton.addEventListener('click', function(e) {
    e.preventDefault();
    let newIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(newIndex);
  });

  nextButton.addEventListener('click', function(e) {
    e.preventDefault();
    let newIndex = (currentSlide + 1) % slides.length;
    updateSlide(newIndex);
  });

  // Initialize the first slide
  updateSlide(0);
});

