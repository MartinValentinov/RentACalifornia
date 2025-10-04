document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const containerBackground = document.querySelector('.container-background');
    const langToggle = document.getElementById("language-toggle");
    const navItems = document.querySelectorAll('.nav-slider ul li');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleAnswer(this);
            if (window.innerWidth <= 980) {
                toggleZoomEffect(containerBackground);
            }
        });
    });

    langToggle.addEventListener('click', function() {
        toggleLanguage(langToggle);
    });

    leftArrow.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : navItems.length - 1;
        updateNavSlider();
    });

    rightArrow.addEventListener('click', function() {
        currentIndex = (currentIndex < navItems.length - 1) ? currentIndex + 1 : 0;
        updateNavSlider();
    });

    containerBackground.addEventListener('animationend', function() {
        containerBackground.classList.remove('zoom-in', 'zoom-out');
    });

    updateNavSlider();

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

    function toggleZoomEffect(containerElement) {
        if (containerElement.classList.contains('zoom-in')) {
            containerElement.classList.replace('zoom-in', 'zoom-out');
        } else {
            containerElement.classList.replace('zoom-out', 'zoom-in');
        }
    }

    function toggleLanguage(langToggleElement) {
        const currentLang = langToggleElement.innerText;
        const newLang = currentLang === "ENG" ? "BG" : "EN";
        langToggleElement.innerText = newLang;

        document.querySelectorAll("[data-lang]").forEach(element => {
            const key = element.getAttribute("data-lang");
            element.innerHTML = translations[newLang][key];
        });
    }

    function updateNavSlider() {
        navItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }

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

    const translations = {
        "BG": {
            "contacts": "Контакти",
            "reservations": "Резервации",
            "parking": "Паркинг",
            "howToRent": "Как да наема?",
            "plansAndPrices": "Планове и цени",
            "rentTitle": "Наеми Grand California 600",
            "noHiddenFees": "Без скрити такси! Без такса почистване!",
            "rentFullDay": "Наем за пълни 24 часа!",
            "start": "Начало",
            "departure": "Кога е тръгването",
            "end": "Край",
            "return": "Кога е връщането",
            "search": "ТЪРСИ",
            "welcomeTitle": "Добре дошли на борда на VW Grand California 600",
            "funWay": "Може би най-лесният и забавен за управление кемпер",
            "faqTitle": "Въпроси и Отговори",
            "faqQuestion1": "Въпрос 1",
            "faqAnswer1": "Отговор на въпрос 1",
            "faqQuestion2": "Въпрос 2",
            "faqAnswer2": "Отговор на въпрос 2",
            "communityBenefitsTitle": "Присъединете се към нашата общност и се насладете на ексклузивни предимства!",
            "communityBenefitsText": "Създайте акаунт днес и отключете свят на вълнуващи функции и предимства, предназначени специално за вас. Кликнете тук, за да видите какви вълнуващи неща ви очакват!",
            "benefit1": "<strong>Ексклузивни отстъпки:</strong> Спестете повече със специални оферти и отстъпки само за членове.",
            "benefit2": "<strong>Приоритетна поддръжка:</strong> Получавайте бърза и специализирана помощ от нашия екип за поддръжка.",
            "benefit3": "<strong>Ранен достъп:</strong> Бъдете първите, които ще научат за нашите най-нови актуализации и нови продукти.",
            "benefit4": "<strong>Персонализирано изживяване:</strong> Наслаждавайте се на персонализирани препоръки и персонализирано изживяване.",
            "benefit5": "<strong>Достъп до общността:</strong> Свържете се с други членове и споделяйте вашите преживявания.",
            "joinCommunity": "Присъединете се към нашата общност",
            "contactsTitle": "Контакти и адреси",
            "address": "Някъде в София",
            "phone": "+012 345 67890",
            "email": "info@example.com",
            "home": "Начало",
            "aboutUs": "За нас",
            "services": "Услуги",
            "contactUs": "Свържете се с нас",
            "followUsTitle": "Следвайте ни",
            "privacyPolicy": "Политика за поверителност",
            "termsOfService": "Общи условия",
            "cookies": "Бисквитки"
        },
        "EN": {
            "contacts": "Contacts",
            "reservations": "Reservations",
            "parking": "Parking",
            "howToRent": "How to Rent?",
            "plansAndPrices": "Plans & Prices",
            "rentTitle": "Rent Grand California 600",
            "noHiddenFees": "No hidden fees! No cleaning fee!",
            "rentFullDay": "Rent for a full 24 hours!",
            "start": "Start",
            "departure": "When is departure",
            "end": "End",
            "return": "When is return",
            "search": "Search",
            "welcomeTitle": "Welcome Aboard the VW Grand California 600",
            "funWay": "Maybe the easiest and most fun camper to drive",
            "faqTitle": "Questions and Answers",
            "faqQuestion1": "Question 1",
            "faqAnswer1": "Answer to question 1",
            "faqQuestion2": "Question 2",
            "faqAnswer2": "Answer to question 2",
            "communityBenefitsTitle": "Join Our Community and Enjoy Exclusive Benefits!",
            "communityBenefitsText": "Create an account today and unlock a world of exciting features and benefits designed just for you. Click here to see what exciting things are waiting for you!",
            "benefit1": "<strong>Exclusive Discounts:</strong> Save more with special offers and member-only discounts.",
            "benefit2": "<strong>Priority Support:</strong> Get fast and dedicated help from our support team.",
            "benefit3": "<strong>Early Access:</strong> Be the first to know about our latest updates and new products.",
            "benefit4": "<strong>Personalized Experience:</strong> Enjoy personalized recommendations and a tailored experience.",
            "benefit5": "<strong>Community Access:</strong> Connect with other members and share your experiences.",
            "joinCommunity": "Join Our Community",
            "contactsTitle": "Contacts & Addresses",
            "address": "Somewhere in Sofia",
            "phone": "+012 345 67890",
            "email": "info@example.com",
            "home": "Home",
            "aboutUs": "About Us",
            "services": "Services",
            "contactUs": "Contact Us",
            "followUsTitle": "Follow Us",
            "privacyPolicy": "Privacy Policy",
            "termsOfService": "Terms of Service",
            "cookies": "Cookies"
        }
    };
});
