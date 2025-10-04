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

