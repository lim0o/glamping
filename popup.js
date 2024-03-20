//POP UP RESERVATION
const popup = document.querySelector('.pop-up');
const cross = document.querySelector('.pop-up-infos span');
const reserver = document.querySelectorAll('.button_container');
// JavaScript: Open the popup with a slide-in effect from the right
reserver.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the button's default behavior
        popup.style.display = 'block'; // Display the popup
        setTimeout(() => {
            popup.style.transform = 'translateX(0)'; // Slide in
        }, 10); // Timeout allows the display change to take effect so the transition can occur
    });
});

// JavaScript: Close the popup by sliding it out to the right
cross.addEventListener('click', () => {
    popup.style.transform = 'translateX(400px)'; // Slide out
    setTimeout(() => {
        popup.style.display = 'none'; // Hide after sliding out
    }, 300); // Match this timeout with the transition duration
});
