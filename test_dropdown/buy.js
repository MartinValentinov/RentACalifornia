function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function changeSlide(n) {
    slideIndex += n;
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    updateSlidePosition();
}

function updateSlidePosition() {
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

  let slideIndex_e = 0;
const slides_e = document.querySelector('.slides-e');
const totalSlides_e = document.querySelectorAll('.slide-e').length;

function changeSlide_e(n) {
    slideIndex_e += n;
    if (slideIndex_e < 0) {
        slideIndex_e = totalSlides_e - 1;
    } else if (slideIndex_e >= totalSlides_e) {
        slideIndex_e = 0;
    }
    updateSlidePosition_e();
}


function updateSlidePosition_e() {
  slides_e.style.transform = `translateX(${-slideIndex_e * 100}%)`;
}

// slider.js

let slideIndex_m = 0;
const slidesContainer = document.querySelector('.slides-container');
const slides_m = document.querySelectorAll('.slide-m');
const totalSlides_m = slides_m.length;
const slidesPerView = 4; // Number of slides visible at once

function moveSlide(step) {
    slideIndex_m += step;

    // Looping mechanism to reset the slide index
    if (slideIndex_m > totalSlides_m - slidesPerView) {
        slideIndex_m = 0;
    } else if (slideIndex_m < 0) {
        slideIndex_m = totalSlides_m - slidesPerView;
    }

    updateSlidePosition_m();
}

function updateSlidePosition_m() {
    // Calculate the offset to slide the images
    const offset = -slideIndex_m * (120 / slidesPerView); // Adjust for slides per view
    slidesContainer.style.transform = `translateX(${offset}%)`;
}


let slideIndex_n = 0;
const slidesContainer_n = document.querySelector('.slides-container-n');
const slides_n = document.querySelectorAll('.slide-n');
const totalSlides_n = slides_n.length;
const slidesPerView_n = 3; // Number of slides visible at once


function moveSlide_n(step) {
    slideIndex_n += step;

    // Looping mechanism to reset the slide index
    if (slideIndex_n > totalSlides_n - slidesPerView_n) {
        slideIndex_n = 0;
    } else if (slideIndex_n < 0) {
        slideIndex_n = totalSlides_n - slidesPerView_n;
    }

    updateSlidePosition_n();
}

function updateSlidePosition_n() {
    // Calculate the offset to slide the images
    const offset = -slideIndex_n * (120.5 / slidesPerView_n); // Adjust for slides per view
    slidesContainer_n.style.transform = `translateX(${offset}%)`;
}

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.include-plan-button');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hiddenContent = this.nextElementSibling;
            const icon = this.querySelector('i');
            const isOpen = hiddenContent.style.height && hiddenContent.style.height !== '0px';

            if (isOpen) {
                hiddenContent.style.height = '0px';
                icon.classList.remove('fa-angle-up');
                icon.classList.add('fa-angle-down');
            } else {
                // Open this one
                hiddenContent.style.height = hiddenContent.scrollHeight + 'px';
                icon.classList.remove('fa-angle-down');
                icon.classList.add('fa-angle-up');
            }
        });
    });
});




// Auto-slide feature (optional)
// setInterval(() => moveSlide(1), 3000);

// Initial display
updateSlidePosition_n();
updateSlidePosition_m();
updateSlidePosition_e()
updateSlidePosition();
