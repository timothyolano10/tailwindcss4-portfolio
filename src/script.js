document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing All Page Scripts...");

    // --- General Site Functionality (Mobile Menu, Scroll, Nav, Form, etc.) ---
    console.log("Initializing General Site JS...");

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('main-nav'); // Assuming 'main-nav' is the ID of your <nav> element

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    } else {
        console.warn("Mobile menu button or menu element not found.");
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link'); // Ensure your nav links have this class
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return; // Ignore "#" or external links

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault(); // Prevent default only if target exists

                // Calculate offset to account for fixed navbar height (if navbar exists)
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Also close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                     mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Scroll reveal animations
    const sections = document.querySelectorAll('.section-fade'); // Ensure target sections have this class

    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        // Check if top edge is within 80% of the viewport height from the top
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0; // Also check bottom edge
    }

    // Function to handle scroll reveal
    function revealOnScroll() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible'); // Ensure your CSS defines .section-fade.visible { opacity: 1; transform: translateY(0); ... }
            }
            // Optional: else { section.classList.remove('visible'); } // If you want elements to hide again when scrolled out
        });
    }
    // Initial check on page load
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true }); // Use passive listener for scroll performance

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Function to toggle back to top button visibility
        function toggleBackToTopButton() {
            if (window.pageYOffset > 300) { // Show after scrolling 300px
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
                backToTopButton.style.pointerEvents = 'auto'; // Ensure clickable when visible
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
                backToTopButton.style.pointerEvents = 'none'; // Prevent clicking when invisible
            }
        }
         // Initial check
        toggleBackToTopButton();
        window.addEventListener('scroll', toggleBackToTopButton, { passive: true });

        // Scroll to top when clicking the button
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.warn("Back to top button not found.");
    }


    // Navbar visibility toggle based on scrolling past a certain point (e.g., 'about' section)
    const aboutSection = document.getElementById('about'); // Or another appropriate section ID

    if (navbar && aboutSection) {
        function toggleNavbarVisibility() {
            const scrollPosition = window.scrollY;
            // Get the position where the top of the about section is a bit down the screen (e.g., 100px from top)
            const triggerPosition = aboutSection.offsetTop - 100; // Adjust offset as needed

            if (scrollPosition >= triggerPosition) {
                navbar.classList.remove('opacity-0', 'invisible');
                navbar.classList.add('opacity-100', 'visible', 'bg-white'); // Add background on scroll
                navbar.style.pointerEvents = 'auto';
            } else {
                navbar.classList.remove('opacity-100', 'visible', 'bg-white');
                navbar.classList.add('opacity-0', 'invisible');
                navbar.style.pointerEvents = 'none';
            }
        }
        // Initial check
        toggleNavbarVisibility();
        window.addEventListener('scroll', toggleNavbarVisibility, { passive: true });
    } else {
         console.warn("Navbar or 'about' section element not found for visibility toggle.");
         // Ensure navbar is visible by default if the toggle elements aren't found
         if(navbar) {
             navbar.classList.remove('opacity-0', 'invisible');
             navbar.classList.add('opacity-100', 'visible', 'bg-white'); // Or default state
             navbar.style.pointerEvents = 'auto';
         }
    }


    // Contact form handling
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject'); // Optional
            const messageInput = document.getElementById('message');

            // Check if elements exist before accessing value
            const name = nameInput ? nameInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const subject = subjectInput ? subjectInput.value : ''; // Handle optional field
            const message = messageInput ? messageInput.value : '';

            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill out Name, Email, and Message fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Placeholder for actual submission logic (e.g., fetch API call)
            console.log('Form submitted (Placeholder):', { name, email, subject, message });
            alert('Message sent successfully (Placeholder)!');

            // Reset the form after mock submission
            contactForm.reset();
        });
    } else {
        console.warn("Contact form not found.");
    }

    // Active navigation link highlighting
    const sections_array = Array.from(document.querySelectorAll('section[id]')); // Get sections with IDs

    if (sections_array.length > 0 && navLinks.length > 0) {
        function highlightActiveNavLink() {
            const scrollPosition = window.scrollY;
            const navHeightOffset = navbar ? navbar.offsetHeight + 20 : 100; // Offset for navbar height + buffer

            let currentSectionId = null;

             // Iterate backwards to find the section currently in view
             for (let i = sections_array.length - 1; i >= 0; i--) {
                const section = sections_array[i];
                const sectionTop = section.offsetTop - navHeightOffset;

                if (scrollPosition >= sectionTop) {
                    currentSectionId = section.id;
                    break; // Found the current section
                }
            }

             // If scrolled to the very top, maybe highlight the first link or none
             if (scrollPosition < sections_array[0].offsetTop - navHeightOffset) {
                 currentSectionId = sections_array[0].id; // Or set to null to highlight none
             }

            navLinks.forEach(link => {
                // Check if the link's href matches the current section ID
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.remove('text-gray-700'); // Or your default text color class
                    link.classList.add('text-indigo-600'); // Your active color class
                } else {
                    link.classList.remove('text-indigo-600');
                    link.classList.add('text-gray-700');
                }
            });
        }
        // Initial check
        highlightActiveNavLink();
        window.addEventListener('scroll', highlightActiveNavLink, { passive: true });
    } else {
        console.warn("Sections with IDs or nav links not found for active highlighting.");
    }


    // --- Project Slider Functionality ---
    console.log("Initializing Project Slider JS...");

    const track = document.getElementById('project-track');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    // Check if slider elements are present ON THIS PAGE before setting up slider logic
    if (track && prevButton && nextButton) {

        const slides = Array.from(track.children); // Get the wrapper divs for width calculation

        if (slides.length === 0) {
            console.warn("No slides found in the project track.");
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            // Slider variables are scoped within this block
            let currentIndex = 0;
            let slidesToShow = 3;
            let totalSlides = slides.length;
            let slideWidth = slides[0].offsetWidth;

            // --- Slider Helper Functions ---
            function updateSlidesToShow() {
                const windowWidth = window.innerWidth;
                if (windowWidth < 768) { slidesToShow = 1; }
                else if (windowWidth < 1024) { slidesToShow = 2; }
                else { slidesToShow = 3; }

                if (slides.length > 0) { slideWidth = slides[0].offsetWidth; }
                else { slideWidth = 0; }
            }

            function moveToSlide(index) {
                if (!track || slideWidth === 0) return;
                const maxIndex = totalSlides - slidesToShow;
                const clampedIndex = Math.max(0, Math.min(index, maxIndex < 0 ? 0 : maxIndex)); // Ensure maxIndex isn't negative

                const newTransformValue = -clampedIndex * slideWidth;
                track.style.transform = `translateX(${newTransformValue}px)`;
                currentIndex = clampedIndex;
                updateButtons();
            }

            function updateButtons() {
                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex >= totalSlides - slidesToShow || totalSlides <= slidesToShow;

                if (totalSlides <= slidesToShow) {
                    prevButton.style.visibility = 'hidden';
                    nextButton.style.visibility = 'hidden';
                } else {
                    prevButton.style.visibility = 'visible';
                    nextButton.style.visibility = 'visible';
                }
            }

            // --- Slider Event Listeners ---
            nextButton.addEventListener('click', () => { moveToSlide(currentIndex + 1); });
            prevButton.addEventListener('click', () => { moveToSlide(currentIndex - 1); });

            // Debounce function (defined only if slider exists)
            function debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => { clearTimeout(timeout); func(...args); };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }

            const handleResize = debounce(() => {
                updateSlidesToShow();
                const currentTransition = track.style.transition;
                track.style.transition = 'none';
                moveToSlide(currentIndex); // Re-align based on new dimensions
                // Use requestAnimationFrame to ensure the style recalculation happens before restoring transition
                requestAnimationFrame(() => {
                     requestAnimationFrame(() => { // Double RAF for good measure in some browsers
                        track.style.transition = currentTransition || 'transform 0.5s ease-in-out';
                    });
                 });
            }, 250);

            window.addEventListener('resize', handleResize);

            // --- Initial Slider Setup ---
            updateSlidesToShow();
            moveToSlide(0);

            console.log("Project Slider Initialized.");
        }

    } else {
        console.warn("Project slider elements (#project-track, #prev-button, #next-button) not found on this page. Skipping slider initialization.");
    }

    console.log("All Page Scripts Initialized.");
}); // End of DOMContentLoaded listener