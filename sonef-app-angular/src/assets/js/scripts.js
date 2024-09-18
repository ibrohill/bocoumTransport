document.addEventListener('DOMContentLoaded', function() {
    // Sélection du formulaire de réservation
    const reservationForm = document.getElementById('reservation-form');

    if (reservationForm) {
        // Sélection des éléments du formulaire
        const datesInput = reservationForm.querySelector('#dates');
        const personnesInput = reservationForm.querySelector('#personnes');
        const submitButton = reservationForm.querySelector('button[type="submit"]');

        // Configuration du date picker avec Flatpickr (un plugin JavaScript léger pour les calendriers)
        flatpickr(datesInput, {
            minDate: 'today',
            dateFormat: 'Y-m-d',
        });

        // Validation du formulaire avant la soumission
        reservationForm.addEventListener('submit', function(event) {
            if (!datesInput.value || !personnesInput.value) {
                event.preventDefault();
                alert('Veuillez remplir toutes les informations.');
            }
        });
    }

    // Slider functionality
    const slides = document.querySelectorAll('.gallery-slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    showSlide(currentIndex); // Show the first slide initially
    document.querySelector('.burger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
        document.querySelector('.burger').classList.toggle('toggle');
    });
});
