document.addEventListener('DOMContentLoaded', function() {
    const image = document.querySelector('.enlargeable-image');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');

    image.addEventListener('click', function() {
        overlay.classList.add('visible');
    });

    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('visible');
    });
});


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