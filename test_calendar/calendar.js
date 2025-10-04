document.addEventListener('DOMContentLoaded', () => {
    const months = document.getElementById('months');
    const monthDivs = months.querySelectorAll('.month');

    monthDivs.forEach(month => {
        month.addEventListener('click', () => {
            monthDivs.forEach(m => m.classList.remove('active'));

            month.classList.add('active');
        });
    });
});
