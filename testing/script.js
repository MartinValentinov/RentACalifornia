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
