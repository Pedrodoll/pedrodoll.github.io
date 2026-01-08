// script.js
function setTheme(theme) {
    const body = document.body;
  
    body.classList.remove('light-mode', 'dark-mode', 'adaptive-mode');
  
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else if (theme === 'adaptive') {
      // Adaptive mode: Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        body.classList.add('dark-mode');
      } else {
        body.classList.add('light-mode');
      }
      localStorage.setItem('theme', 'adaptive');
    }
  }
  
  function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToApply = savedTheme ? savedTheme : 'adaptive'; // Default to adaptive mode
    setTheme(themeToApply);
    updateThemeIcon(themeToApply); // Update the theme icon
  }
  
  // Apply theme on page load
  applySavedTheme();
  
  // Listen for system preference changes (adaptive mode)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'adaptive') {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  const themes = ['light', 'dark', 'adaptive'];
  let currentThemeIndex = 2; // Start at adaptive (index 2)
  
  function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    setTheme(newTheme);
    updateThemeIcon(newTheme);
  }
  
  // Initialize currentThemeIndex based on saved theme
  function initializeThemeIndex() {
    const savedTheme = localStorage.getItem('theme') || 'adaptive';
    currentThemeIndex = themes.indexOf(savedTheme);
    if (currentThemeIndex === -1) currentThemeIndex = 2; // Default to adaptive
  }
  
  initializeThemeIndex();
  
  function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
  
    // Remove any existing theme-related classes
    themeIcon.classList.remove('light-icon', 'dark-icon', 'adaptive-icon');
  
    if (theme === 'light') {
      themeIcon.classList.add('light-icon'); // Add class for light mode
      themeIcon.alt = 'Switch to Dark Mode';
    } else if (theme === 'dark') {
      themeIcon.classList.add('dark-icon'); // Add class for dark mode
      themeIcon.alt = 'Switch to Adaptive Mode';
    } else if (theme === 'adaptive') {
      themeIcon.classList.add('adaptive-icon'); // Add class for adaptive mode
      themeIcon.alt = 'Switch to Light Mode';
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const main = document.querySelector("main");

    function adjustMainMargin() {
        const headerHeight = header.offsetHeight;
        main.style.marginTop = `${headerHeight}px`;
    }

    // Adjust margin on page load and window resize
    adjustMainMargin();
    window.addEventListener("resize", adjustMainMargin);
});

// Progress bar functionality
function updateProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;
  
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Calculate scroll percentage
  const scrollableHeight = documentHeight - windowHeight;
  const scrollPercentage = (scrollTop / scrollableHeight) * 100;
  
  // Update progress bar width
  progressBar.style.width = scrollPercentage + '%';
}

// Update progress bar on scroll and page load
window.addEventListener('scroll', updateProgressBar);
window.addEventListener('load', updateProgressBar);

// Carousel functionality
let slideIndex = 1; // Start at image 1

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function currentSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
  const carousel = document.querySelector('.carousel:not(#carousel-2)'); // Target first carousel only
  if (!carousel) return;
  
  const slides = carousel.getElementsByClassName('carousel-image');
  const dots = carousel.querySelector('.carousel-dots').getElementsByClassName('dot');
  
  if (!slides.length) return; // Exit if no carousel on page
  
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  
  // Remove active from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  
  // Show current slide
  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
  
  // Update caption text based on current slide
  updateCarouselCaption(slideIndex);
}

// Captions for each image
const carouselCaptions = {
  1: "",
  2: "<span class='caption-underline'>Figure on the right:</span> Examples of sampled lava flow outcrops for surface exposure dating.",
  3: "<span class='caption-underline'>Figure on the right:</span> Geochemistry of sampled lavas and analysed pyroxene phenocrysts.",
  4: "<span class='caption-underline'>Figure on the right:</span> Comparison between eruption age obtained in the study and previous chronological constraints of studied flows.",
  5: "<span class='caption-underline'>Figure on the right:</span> Lava flows emplaced at Ruapehu through time after the Last Glacial Maximum, interpreted from our data."
};

function updateCarouselCaption(slideNumber) {
  const captionElement = document.getElementById('carousel-caption');
  if (captionElement) {
    captionElement.innerHTML = carouselCaptions[slideNumber] || ""; // Use empty string if caption not found
  }
}

// Initialize carousel on page load
window.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.carousel')) {
    showSlide(slideIndex);
  }
});

// Second Carousel functionality
let slideIndex2 = 1; // Start at image 1 for second carousel

function changeSlide2(n) {
  showSlide2(slideIndex2 += n);
}

function currentSlide2(n) {
  showSlide2(slideIndex2 = n);
}

function showSlide2(n) {
  const carousel = document.getElementById('carousel-2');
  if (!carousel) return;
  
  const slides = carousel.getElementsByClassName('carousel-image');
  const dots = carousel.querySelector('.carousel-dots').getElementsByClassName('dot');
  
  if (!slides.length) return;
  
  if (n > slides.length) { slideIndex2 = 1; }
  if (n < 1) { slideIndex2 = slides.length; }
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  
  // Remove active from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  
  // Show current slide
  slides[slideIndex2 - 1].classList.add('active');
  dots[slideIndex2 - 1].classList.add('active');
  
  // Update caption text based on current slide
  updateCarouselCaption2(slideIndex2);
}

// Captions for second carousel
const carouselCaptions2 = {
  1: "",
  2: "<span class='caption-underline'>Figure on the right:</span> Example of relative stratigraphy analyses (a-b and d-e) and example of sampled lava flow outcrop (c).",
  3: "<span class='caption-underline'>Figure on the right:</span> Stepwise demagnetization graphs.",
  4: "<span class='caption-underline'>Figure on the right:</span> Example of the process involved in the eruption age refinements using the Archeomagnetic Dating tool of <a href='https://doi.org/10.1016/j.jas.2010.09.021' target='_blank'>Pavón-Carrasco et al. (2011)</a> or the update of <a href='https://doi.org/10.1111/arcm.13009' target='_blank'>Serrano et al. (2024)</a>.",
  5: "<span class='caption-underline'>Figure on the right:</span> Matches of flow directions with the <a href='https://doi.org/10.1016/0031-9201(94)90093-0' target='_blank'>NZPSV11k.2023 record (Turner & Corkill, 2023)</a>.",
  6: "<span class='caption-underline'>Figure on the right:</span> Lava flows emplaced at Ruapehu through time during the Holocene, interpreted from our data."
};

function updateCarouselCaption2(slideNumber) {
  const captionElement = document.getElementById('carousel-caption-2');
  if (captionElement) {
    captionElement.innerHTML = carouselCaptions2[slideNumber] || ""; // Use empty string if caption not found
  }
}

// Initialize second carousel on page load
window.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('carousel-2')) {
    showSlide2(slideIndex2);
  }
});

// Third Carousel functionality
let slideIndex3 = 1; // Start at image 1 for third carousel

function changeSlide3(n) {
  showSlide3(slideIndex3 += n);
}

function currentSlide3(n) {
  showSlide3(slideIndex3 = n);
}

function showSlide3(n) {
  const carousel = document.getElementById('carousel-3');
  if (!carousel) return;
  
  const slides = carousel.getElementsByClassName('carousel-image');
  const dots = carousel.querySelector('.carousel-dots').getElementsByClassName('dot');
  
  if (!slides.length) return;
  
  if (n > slides.length) { slideIndex3 = 1; }
  if (n < 1) { slideIndex3 = slides.length; }
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  
  // Remove active from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  
  // Show current slide
  slides[slideIndex3 - 1].classList.add('active');
  dots[slideIndex3 - 1].classList.add('active');
  
  // Update caption text based on current slide
  updateCarouselCaption3(slideIndex3);
}

// Captions for third carousel
const carouselCaptions3 = {
  1: "",
  2: "<span class='caption-underline'>Figure on the right:</span> Cumulative erupted volume at Ruapehu during the last 50 ka (Mangawhero and Whakapapa formations), considering only effusive eruptions.",
  3: "<span class='caption-underline'>Figure on the right:</span> Cumulative erupted volume at Ruapehu during the last 20 kyr, including effusive and explosive eruptions."
};

function updateCarouselCaption3(slideNumber) {
  const captionElement = document.getElementById('carousel-caption-3');
  if (captionElement) {
    captionElement.innerHTML = carouselCaptions3[slideNumber] || ""; // Use empty string if caption not found
  }
}

// Initialize third carousel on page load
window.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('carousel-3')) {
    showSlide3(slideIndex3);
  }
});
