// script.js

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

        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(answer => {
            if (answer !== answerElement) {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 16px';
                answer.previousElementSibling.classList.remove('active');
            }
        });

        // Toggle the clicked answer
        if (!isActive) {
            // Open the clicked answer
            answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
            answerElement.style.padding = '16px';
            questionElement.classList.add('active');
        } else {
            // Close the clicked answer
            answerElement.style.maxHeight = '0';
            answerElement.style.padding = '0 16px';
            questionElement.classList.remove('active');
        }
    }
});
