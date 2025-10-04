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

document.addEventListener('DOMContentLoaded', function() {
    const scrollButton1 = document.getElementById('scrollButton1');
    const scrollButton2 = document.getElementById('scrollButton2');

    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');

    scrollButton1.addEventListener('click', function() {
        section1.scrollIntoView({ behavior: 'smooth' });
    });

    scrollButton2.addEventListener('click', function() {
        section2.scrollIntoView({ behavior: 'smooth' });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleAnswer(this);
        });
    });

    function toggleAnswer(questionElement) {
        const answerElement = questionElement.nextElementSibling;
        const isActive = questionElement.classList.contains('active');

        document.querySelectorAll('.faq-answer').forEach(answer => {
            if (answer !== answerElement) {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 16px';
                answer.previousElementSibling.classList.remove('active');
            }
        });

        if (!isActive) {
            answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
            answerElement.style.padding = '30px';
            questionElement.classList.add('active');
        } else {
            answerElement.style.maxHeight = '0';
            answerElement.style.padding = '0 16px';
            questionElement.classList.remove('active');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.faq-question');
    const containerBackground = document.querySelector('.container-background');

    containerBackground.addEventListener('animationend', function(event) {
        containerBackground.classList.remove('zoom-in', 'zoom-out');
    });

    questions.forEach(question => {
        question.addEventListener('click', function() {
            if (window.innerWidth <= 980) {
                if (containerBackground.classList.contains('zoom-in')) {
                    containerBackground.classList.remove('zoom-in');
                    containerBackground.classList.add('zoom-out');
                } else {
                    containerBackground.classList.remove('zoom-out');
                    containerBackground.classList.add('zoom-in');
                }
            }
        });
    });
    const answer = this.nextElementSibling;
    answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
});

document.getElementById("hamburger").addEventListener("click", function() {
    document.getElementById("hamburger").style.display = "none";
    document.getElementById("menu-text").style.display = "none";  // Hide the "Меню" button
    document.getElementById("mobile-menu").classList.add("active");
});

document.getElementById("close-menu").addEventListener("click", function() {
    document.getElementById("mobile-menu").classList.remove("active");
    document.getElementById("hamburger").style.display = "flex";
    document.getElementById("menu-text").style.display = "none";  // Keep the "Меню" button hidden
});

document.getElementById("terms-button").addEventListener("click", function() {
    // Example: Scroll to a specific section
    window.location.href = "#terms-section"; // This could navigate to a section of the page
});


// Auto-slide feature (optional)
// setInterval(() => moveSlide(1), 3000);

// Initial display
updateSlidePosition_n();
updateSlidePosition_m();
updateSlidePosition_e()
updateSlidePosition();


function toggleBenefits(element) {
    const benefitsList = document.querySelector('.benefits-list');
    const listItems = Array.from(benefitsList.querySelectorAll('li'));

    if (benefitsList.classList.contains('show')) {
        element.classList.remove('hovered');
        element.innerHTML = '<span>...</span>';

        listItems.reverse().forEach((item, index) => {
            setTimeout(() => item.classList.remove('show'), index * 300);
        });

        setTimeout(() => benefitsList.classList.remove('show'), listItems.length * 300);
    } else {
        element.classList.add('hovered');
        element.innerHTML = '<span>X</span>';
        benefitsList.classList.add('show');

        listItems.forEach((item, index) => {
            setTimeout(() => item.classList.add('show'), index * 300);
        });
    }
}