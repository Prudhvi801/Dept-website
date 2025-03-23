document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Toggle the menu visibility
            menuToggle.classList.toggle('open'); // Optional: Change icon on toggle
        });
    } else {
        console.error("Menu toggle or navLinks not found!");
    }
});
