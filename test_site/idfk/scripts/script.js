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

document.addEventListener('DOMContentLoaded', function() {
    const texts = {
        "EN": {
            "home": "Home",
            "contacts": "Contacts",
            "login": "Login",
            "logout": "Log Out",
            "aboutUs": "About Us",
            "rules": "Rules",
            "camperUsageInstructions": "Camper Usage Instructions",
            "reservations": "Reservations",
            "malibu": "Malibu",
            "zuma": "Zuma",
            "eco": "Eco",
            "standard": "Standard",
            "vip": "First Class",
            "priceEco": "290 BGN/day",
            "priceStandard": "320 BGN/day",
            "priceVIP": "390 BGN/day",
            "bookNow": "Book Now",
            "reservation": "Reservations",
            "learn": "Learn More",
            "malibu": "Camper Malibu",
            "zuma": "Camper Zuma",
            "book-our": "Book one of our campers",
            "dream": "If you're dreaming of a flawless getaway in a top-notch camper, look no further!<br>Our premium campers are meticulously maintained and ready to provide you with the ultimate vacation experience.<br>Explore our exceptional selection below and get ready for the adventure of a lifetime!"
        },
        "BG": {
            "home": "Начало",
            "contacts": "Контакти",
            "login": "Вход",
            "logout": "Изход",
            "aboutUs": "За нас",
            "rules": "Правила",
            "camperUsageInstructions": "Инструкции за употреба на кемпера",
            "reservations": "Резервации",
            "malibu": "Малибу",
            "zuma": "Зума",
            "eco": "Икономичен",
            "standard": "Стандартен",
            "vip": "Първа Класа",
            "priceEco": "290 BGN/ден",
            "priceStandard": "320 BGN/ден",
            "priceVIP": "390 BGN/ден",
            "bookNow": "Резервирай сега",
            "reservation": "Резервации",
            "learn": "Научи Повече",
            "malibu": "Кемпер Малибу",
            "zuma": "Кемпер Зума",
            "book-our": "Резервирайте един от нашите кемпери",
            "dream": "Ако мечтаете за безупречно бягство с първокласен кемпер, не търсете повече!<br>Нашите премиум кемпери са перфектно поддържани и готови да ви предоставят върховното ваканционно изживяване.<br>Разгледайте нашата изключителна селекция по-долу и се пригответе за приключението на живота си!"
        }
    };

    function updateTextContent(language) {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            element.innerHTML = texts[language][key];  
        });
    }

    let currentLanguage = sessionStorage.getItem('preferredLanguage') || 'EN';

    if (!sessionStorage.getItem('languagePromptShown')) {
        const userWantsTranslation = confirm("Would you like to translate the page to Bulgarian?");
        currentLanguage = userWantsTranslation ? 'BG' : 'EN';
        sessionStorage.setItem('preferredLanguage', currentLanguage);
        sessionStorage.setItem('languagePromptShown', 'true');
    }

    updateTextContent(currentLanguage);

    const navItems = document.querySelectorAll('.nav-slider ul li');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function updateNavSlider() {
        navItems.forEach((item, index) => {
            item.style.display = index === currentIndex ? 'block' : 'none';
            item.style.opacity = index === currentIndex ? '1' : '0';
        });
    }

    leftArrow.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : navItems.length - 1;
        updateNavSlider();
    });

    rightArrow.addEventListener('click', function() {
        currentIndex = (currentIndex < navItems.length - 1) ? currentIndex + 1 : 0;
        updateNavSlider();
    });

    updateNavSlider();
});

$(document).ready(function () {
    if ($(window).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }

    $(window).scroll(function () {
        console.log($(this).scrollTop());
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
});

function toggleBenefits(element) {
    var benefitsList = document.querySelector('.benefits-list');
    if (benefitsList.classList.contains('show')) {
        element.classList.remove('hovered');
        element.innerHTML = '<span>...</span>';
        
        var listItems = Array.from(benefitsList.querySelectorAll('li'));
        listItems.reverse().forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('show');
            }, index * 300); 
        });

        setTimeout(() => {
            benefitsList.classList.remove('show');
        }, listItems.length * 300); 
    } else {
        element.classList.add('hovered');
        element.innerHTML = '<span>X</span>';
        benefitsList.classList.add('show');
        
        var listItems = benefitsList.querySelectorAll('li');
        listItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 300); 
        });
    }
}
