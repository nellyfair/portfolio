document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const navItems = document.querySelectorAll('.nav-links .nav ul li a');
    const searchInput = document.querySelector('nav input[name="search"]');
    const projectItems = document.querySelectorAll('.project-item');

    // Navigation Toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close Mobile Menu on Link Click
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Smooth Scroll for Navigation Links
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - (nav.classList.contains('active') ? nav.offsetHeight : 0),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Link Highlighting on Scroll
    window.addEventListener('scroll', () => {
        const fromTop = window.scrollY + (nav.classList.contains('active') ? nav.offsetHeight + 50 : 50);

        navItems.forEach(link => {
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);

            if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    });

    // Search Functionality for Projects
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        projectItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});